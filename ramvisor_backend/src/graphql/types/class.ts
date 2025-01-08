import {extendType, inputObjectType, intArg, nonNull, objectType} from "nexus";
import {PrismaClient} from "@prisma/client";
import {getEndTime, getStartTime, parseCSV, processComponent, processInstructor} from "../../utils";
import {headers} from "../../constants";
import {canvasClass, IMyContext} from "../../interface";

export const Class = objectType({
  name: 'Class',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('classCode');
    t.nonNull.int('credits');
    t.nonNull.string('courseType');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('category');
    t.nonNull.string('color');
    t.nonNull.float('rateMyProfessorRating');
    t.nonNull.list.int('coreDegreeId');
    t.list.int('electiveDegreeId');
    t.list.field('sections', { type: 'classSection' });
    t.list.field('classSchedules', { type: 'classSchedule' });
  },
});

export const classSection = objectType({
  name: 'classSection',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('section');
    t.nonNull.int('classId');
    t.nonNull.string('dayOfWeek');
    t.nonNull.string('startTime');
    t.nonNull.string('endTime');
    t.nonNull.string('professor');
    t.string('rateMyProfessorRating');
  },
});

// Add class entries and class template, separate out for ease of access
export const CreateClassInput = inputObjectType({
  name: 'CreateClassInput',
  definition(t) {
    t.nonNull.string('classCode');
    t.nonNull.string('courseType');
    t.nonNull.int('credits');
    t.nonNull.string('title');
    t.nonNull.string('category');
    t.nonNull.string('description');
    t.nonNull.string('dayOfWeek');
    t.nonNull.string('startTime');
    t.nonNull.string('endTime');
    t.nonNull.string('color');
    t.nonNull.string('professor');
    t.nonNull.float('rateMyProfessorRating');
    t.nonNull.int('coreDegreeId');
    t.nonNull.list.int('electiveDegreeId');
  },
});

export const UpdateClassInput = inputObjectType({
  name: 'UpdateClassInput',
  definition(t) {
    t.nonNull.int('id');
    t.string('classCode');
    t.string('courseType');
    t.int('credits');
    t.string('title');
    t.string('category');
    t.string('dayOfWeek');
    t.string('description');
    t.string('startTime');
    t.string('endTime');
    t.string('color');
    t.string('professor');
    t.float('rateMyProfessorRating');
    t.int('coreDegreeId');
    t.list.int('electiveDegreeId');
  },
});

export const listClassInput = inputObjectType({
    name: 'listClassInput',
    definition(t) {
        t.nonNull.string('classCode');
        t.nonNull.string('color');
        t.nonNull.string('sectionId');
        t.nonNull.string('semesterId');
    },
})

export const importCanvasClassesInput = inputObjectType({
  name: 'importCanvasClassesInput',
  definition(t) {
   t.list.field('courseInput', { type: 'listClassInput' });
  },
});

export const deleteClassInput = inputObjectType({
  name: 'deleteClassInput',
  definition(t) {
    t.nonNull.int('id');
  },
});

export const classQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getClasses', {
      type: 'Class',
      resolve: async (_, __, { prisma }) => {
        return prisma.class.findMany({
          include: {
            sections: true
          }
        });
      }
    });

    t.field('getClass', {
      type: 'Class',
      args: { id: nonNull(intArg()) },
      resolve: (_, { id }, { prisma }) => prisma.class.findUnique({ where: { id } })
    });
  },
});


export const classMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createClass', {
      type: 'Class',
      args: {
        input: nonNull(CreateClassInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.class.create({ data: input })
    });

    t.field('generateClassesFromScrape', {
      type: 'Class',
      resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
        const classes = await parseCSV('../big_pdf_lessons.csv', headers);

        const processTime = (timeStr: string): { startTime: string, endTime: string } => {
          if (!timeStr || timeStr.trim().includes("TBA") || timeStr.trim().includes("NULL")) {
            return { startTime: '00:00', endTime: '00:00' };
          }
          try {
            return {
              startTime: getStartTime(timeStr),
              endTime: getEndTime(timeStr)
            };
          } catch (error) {
            console.error(`Error processing time: ${timeStr}`);
            return { startTime: '00:00', endTime: '00:00' };
          }
        };
        const processedClasses = new Map<string, boolean>();
        const batchSize = 100;
        let currentBatch: typeof classes = [];

        const createSectionKey = (
            section: number | undefined,
            days: string | undefined,
            timeStr: string | undefined,
            professor: string | undefined
        ): string => {
          const times = processTime(timeStr || '');
          return `${section || 0}-${days?.trim() || 'TBA'}-${times.startTime}-${times.endTime}-${processInstructor(professor || '')}`;
        };

        const processBatch = async (batch: typeof classes) => {
          await prisma.$transaction(async (tx) => {
            for (const entry of batch) {
              if (!entry.code) continue;

              if (processedClasses.has(entry.code)) {
                const existingClass = await tx.class.findFirst({
                  where: { classCode: entry.code },
                  include: { sections: true }
                });

                if (existingClass) {
                  const existingSectionKeys = new Set(
                      existingClass.sections.map(section =>
                          createSectionKey(
                              section.section,
                              section.dayOfWeek,
                              `${section.startTime}-${section.endTime}`,
                              section.professor
                          )
                      )
                  );

                  const newSectionKey = createSectionKey(
                      entry.section,
                      entry.days,
                      entry.time,
                      entry.Instructor
                  );

                  if (!existingSectionKeys.has(newSectionKey)) {
                    const times = processTime(entry.time);
                    await tx.classSection.create({
                      data: {
                        classId: existingClass.id,
                        section: entry.section || 0,
                        dayOfWeek: entry.days?.trim() || 'TBA',
                        startTime: times.startTime,
                        endTime: times.endTime,
                        professor: processInstructor(entry.Instructor),
                        rateMyProfessorRating: 0.0
                      }
                    });
                    console.log(`Added new section ${newSectionKey} to class ${entry.code}`);
                  } else {
                    console.log(`Skipping duplicate section ${newSectionKey} for class ${entry.code}`);
                  }
                }
                continue;
              }

              try {
                const newClass = await tx.class.create({
                  data: {
                    classCode: entry.code.trim(),
                    courseType: processComponent(entry.component),
                    credits: entry.units || 0,
                    title: entry['course title']?.trim() || '',
                    category: entry.subject?.trim() || 'General',
                    description: entry.topics?.trim() || 'No description available',
                    color: 'blue',
                    coreDegreeId: [],
                    electiveDegreeId: []
                  }
                });

                const times = processTime(entry.time);
                await tx.classSection.create({
                  data: {
                    classId: newClass.id,
                    section: entry.section || 0,
                    dayOfWeek: entry.days?.trim() || 'TBA',
                    startTime: times.startTime,
                    endTime: times.endTime,
                    professor: processInstructor(entry.Instructor),
                    rateMyProfessorRating: 0.0
                  }
                });

                processedClasses.set(entry.code, true);
                console.log(`Created new class ${entry.code} with initial section`);
              } catch (error) {
                console.error(`Error processing class ${entry.code}:`, error);
              }
            }
          });
        };

        for (let i = 0; i < classes.length; i++) {
          currentBatch.push(classes[i]);

          if (currentBatch.length === batchSize || i === classes.length - 1) {
            await processBatch(currentBatch);
            currentBatch = [];
            console.log(`Processed batch ending at index ${i}`);
          }
        }

        return prisma.class.findFirst({
          include: { sections: true }
        });
      }
    });

    t.field('updateClass', {
      type: 'Class',
      args: {
        input: nonNull(UpdateClassInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.class.update({
        where: { id: input.id },
        data: input,
      })
    });

    t.field('importCanvasClasses', {
      type: 'Class',
      args: {
        input: nonNull(importCanvasClassesInput)
      },
      resolve: async (_, { input }, { prisma, req }: IMyContext) => {
        const userId = req.session.userId;
        if (!userId) {
          throw new Error('User not authenticated');
        }

        // Format course codes and prepare input
        const formattedCourses = input.courseInput.map((course: canvasClass) => ({
          ...course,
          classCode: course.classCode.replace(/([A-Z]+)(\d)/, '$1 $2')
        }));

        const classCodes = formattedCourses.map((course: canvasClass) => course.classCode);
        console.log('Processing courses:', classCodes);

        try {
          return await prisma.$transaction(async (tx) => {
            // Step 1: Find and validate existing classes
            const existingClasses = await tx.class.findMany({
              where: {
                classCode: { in: classCodes }
              },
              include: {
                sections: true
              }
            });

            if (existingClasses.length !== classCodes.length) {
              const foundCodes = existingClasses.map(c => c.classCode);
              const missingCodes = classCodes.filter((code: string) => !foundCodes.includes(code));
              throw new Error(`Classes not found: ${missingCodes.join(', ')}`);
            }

            // Step 2: Update class colors if needed
            const classMap = new Map(existingClasses.map(c => [c.classCode, c]));

            for (const course of formattedCourses) {
              const existingClass = classMap.get(course.classCode);
              if (existingClass && existingClass.color === 'blue' && existingClass.color !== course.color) {
                await tx.class.update({
                  where: { id: existingClass.id },
                  data: { color: course.color }
                });
              }
            }

            // Step 3: Handle schedule
            const currentSchedule = await tx.classSchedule.findFirst({
              where: {
                userId: req.session.userId,
                isCurrent: true
              }
            });

            const scheduleEntries = formattedCourses.map((course: canvasClass) => ({
              classId: classMap.get(course.classCode)!.id,
              sectionId: parseInt(course.sectionId)
            }));

            if (currentSchedule) {
              await tx.classSchedule.update({
                where: { id: currentSchedule.id },
                data: {
                  entries: {
                    deleteMany: {},
                    create: scheduleEntries
                  }
                }
              });
            } else {
              await tx.classSchedule.create({
                data: {
                  userId: userId,
                  semesterId: formattedCourses[0].semesterId,
                  title: 'Current Schedule',
                  isCurrent: true,
                  entries: {
                    create: scheduleEntries
                  }
                }
              });
            }

            // Step 4: Return updated class
            const updatedClass = await tx.class.findFirst({
              where: { id: existingClasses[0].id },
              include: {
                sections: true
              }
            });

            if (!updatedClass) {
              throw new Error('Failed to fetch updated class');
            }

            return updatedClass;
          });
        } catch (error) {
          console.error('Failed to import classes:', error);
          throw error;
        }
      }
    });

    t.field('deleteClass', {
      type: 'Class',
      args: {
        input: nonNull(deleteClassInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.class.delete({ where: { id: input.id } })
    });
  },
});
