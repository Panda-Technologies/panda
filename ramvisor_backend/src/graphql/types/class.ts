import {extendType, inputObjectType, intArg, nonNull, objectType} from "nexus";
import {PrismaClient} from "@prisma/client";
import {getEndTime, getStartTime, parseCSV, processComponent, processInstructor} from "../../utils";
import {headers} from "../../constants";

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
    t.nonNull.string('dayOfWeek');
    t.nonNull.string('startTime');
    t.nonNull.string('endTime');
    t.nonNull.string('color');
    t.nonNull.string('professor');
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

        // Process each class entry
        for (const entry of classes) {
          if (!entry.code || processedClasses.has(entry.code)) {
            continue;
          }

          // Create the base class first
          const newClass = await prisma.class.create({
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

          // Create the first section
          const times = processTime(entry.time);
          await prisma.classSection.create({
            data: {
              classId: newClass.id,
              section: entry.section || 0,
              dayOfWeek: entry.days?.trim(),
              startTime: times.startTime,
              endTime: times.endTime,
              professor: processInstructor(entry.Instructor),
              rateMyProfessorRating: 0.0
            }
          });

          processedClasses.set(entry.code, true);
        }

        // Add additional sections for existing classes
        for (const entry of classes) {
          if (!entry.code || !processedClasses.has(entry.code)) {
            continue;
          }

          const existingClass = await prisma.class.findFirst({
            where: { classCode: entry.code }
          });

          if (existingClass) {
            const times = processTime(entry.time);
            await prisma.classSection.create({
              data: {
                classId: existingClass.id,
                section: entry.section || 0,
                dayOfWeek: entry.days?.trim(),
                startTime: times.startTime,
                endTime: times.endTime,
                professor: processInstructor(entry.Instructor),
                rateMyProfessorRating: 0.0
              }
            });
          }
        }

        // Return the first class as required by the mutation type
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

    t.field('deleteClass', {
      type: 'Class',
      args: {
        input: nonNull(deleteClassInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.class.delete({ where: { id: input.id } })
    });
  },
});
