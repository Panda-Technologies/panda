import {extendType, inputObjectType, intArg, nonNull, objectType} from "nexus";
import {classColumns, classHeaders, intColumns} from "../../constants";
import {canvasClass, classColumnTypes, IMyContext} from "../../interface";
import {extractDayCode, parseCSV, processInstructorName, processTime} from "../../utils";
import * as fs from 'fs';
import * as path from 'path';

// Define interfaces for the class data
interface ClassData {
  classCode: string;
  credits: number;
  courseType?: string;
  title: string;
  category?: string;
  description?: string;
  ideaGenEd?: string[];
  prerequisites?: (string | string[])[];
  color?: string;
}

interface TimeData {
  startTime: string;
  endTime: string;
}

// The rest of the file remains unchanged up to the classMutation
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
    t.nonNull.list.int('coreDegreeId');
    t.list.string('ideaGenEd');
    t.list.string('prerequisites');
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
    t.nonNull.int('totalAvailable')
    t.nonNull.int('totalCapacity');
    t.nonNull.string('location');
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
    t.nonNull.string('color');
    t.list.string('ideaGenEd');
    t.list.string('prerequisites');
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
    t.string('description');
    t.string('color');
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

// Helper function to create a section for a class
async function createClassSection(
    tx: any,
    classId: number,
    section: number,
    dayCode: string,
    times: TimeData,
    totalAvailable: number,
    totalCapacity: number,
    location: string,
    professorName: string
): Promise<any> {
  return await tx.classSection.create({
    data: {
      classId: classId,
      section: section,
      dayOfWeek: dayCode,
      startTime: times.startTime,
      endTime: times.endTime,
      totalAvailable: totalAvailable,
      totalCapacity: totalCapacity,
      location: location,
      professor: professorName,
      rateMyProfessorRating: 0.0
    }
  });
}

// Helper function to create a unique section key
function createSectionKey(
    section: number,
    dayCode: string,
    startTime: string,
    endTime: string,
    professor: string
): string {
  return `${section}-${dayCode}-${startTime}-${endTime}-${professor}`;
}

export const classMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createClass', {
      type: 'Class',
      args: {
        input: nonNull(CreateClassInput),
      },
      resolve: (_, { input }, { prisma }: IMyContext) => prisma.class.create({ data: input })
    });

    // Refactored function to generate classes from JSON file
    t.field('generateClassesFromScrape', {
      type: 'Class',
      resolve: async (_, __, { prisma }: IMyContext) => {
        try {
          // Read classes.json file
          const filePath = path.join(process.cwd(), 'classes.json');
          const classesData: ClassData[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          console.log(`Read ${classesData.length} classes from classes.json`);

          // Process in batches
          const batchSize = 50;
          let processedCount = 0;

          // Map to track successfully added classes
          const addedClasses = new Map<string, number>();

          for (let i = 0; i < classesData.length; i += batchSize) {
            const batch = classesData.slice(i, i + batchSize);

            await prisma.$transaction(async (tx) => {
              for (const classData of batch) {
                try {
                  // Skip if no class code
                  if (!classData.classCode) {
                    console.log("Skipping class with no class code");
                    continue;
                  }

                  // Check if class already exists
                  const existingClass = await tx.class.findFirst({
                    where: { classCode: classData.classCode }
                  });

                  if (!existingClass) {
                    // Create new class with proper defaults
                    const courseType = classData.courseType || 'LECTURE';
                    const category = classData.category || 'General';
                    const description = classData.description || 'No description available';

                    // Ensure ideaGenEd and prerequisites are arrays
                    const ideaGenEd = Array.isArray(classData.ideaGenEd) ? classData.ideaGenEd : [];

                    // Process prerequisites to ensure they're in the right format
                    let prerequisites: string[] = [];
                    if (Array.isArray(classData.prerequisites)) {
                      // If prerequisites is already an array of arrays, convert to JSON strings
                      prerequisites = classData.prerequisites.map(pathway =>
                          Array.isArray(pathway) ? JSON.stringify(pathway) : pathway as string
                      );
                    }

                    const newClass = await tx.class.create({
                      data: {
                        classCode: classData.classCode,
                        credits: classData.credits,
                        courseType: courseType,
                        title: classData.title,
                        category: category,
                        description: description,
                        color: classData.color || 'blue', // Default to blue if no color provided
                        ideaGenEd: ideaGenEd,
                        prerequisites: prerequisites,
                        coreDegreeId: [],
                        electiveDegreeId: []
                      }
                    });

                    addedClasses.set(classData.classCode, newClass.id);
                    processedCount++;

                    if (processedCount % 100 === 0) {
                      console.log(`Processed ${processedCount} classes`);
                    }
                  } else {
                    // Class already exists, just add to tracking map
                    addedClasses.set(classData.classCode, existingClass.id);
                  }
                } catch (error) {
                  console.error(`Error processing class ${classData.classCode}:`, error);
                }
              }
            });

            console.log(`Processed batch ending at index ${i + batch.length}`);
          }

          console.log(`Successfully processed ${processedCount} new classes`);

          // Return the first class as a sample of what was created
          return prisma.class.findFirst({
            include: { sections: true }
          });
        } catch (error) {
          console.error('Error generating classes from JSON:', error);
          throw error;
        }
      }
    });

    // Refactored function to generate sections from CSV, ensuring it only adds sections to existing classes
    t.field('generateSectionsFromScrape', {
      type: 'Class',
      resolve: async (_, __, { prisma }: IMyContext) => {
        // Parse the CSV file using the utility function
        const classes = await parseCSV<classColumnTypes>('UNC Courses.csv', classHeaders, intColumns);

        // Track processed classes to avoid duplicates
        const processedClasses = new Map<string, boolean>();
        const batchSize = 100;
        let currentBatch: typeof classes = [];
        let sectionsCreated = 0;
        let sectionsSkipped = 0;

        // Process each batch of classes
        const processBatch = async (batch: typeof classes) => {
          await prisma.$transaction(async (tx) => {
            for (const entry of batch) {
              // Skip if no course code
              if (!entry[classColumns.CODE]) continue;

              try {
                // Parse course code to extract section, properly handling honors courses
                const courseCodeMatch = entry[classColumns.CODE].match(/([A-Z]+\s\d+[A-Z]*)-(\d+)/);
                if (!courseCodeMatch) {
                  console.log(`Skipping invalid course code: ${entry[classColumns.CODE]}`);
                  continue;
                }

                const baseCode = courseCodeMatch[1];
                const section = parseInt(courseCodeMatch[2], 10);

                // Find the existing class first, we don't create classes in this function
                const existingClass = await tx.class.findFirst({
                  where: { classCode: baseCode },
                  include: { sections: true }
                });

                if (!existingClass) {
                  console.log(`Skipping section for non-existent class: ${baseCode}`);
                  sectionsSkipped++;
                  continue;
                }

                // Get data from the correct columns based on the CSV structure
                const instructorRaw = entry[classColumns.INSTRUCTOR] || '';
                const scheduleRaw = entry[classColumns.SCHEDULE] || '';
                const totalAvailable = entry[classColumns.ENROLL_TOTAL];
                const totalCapacity = entry[classColumns.ENROLL_CAP];
                const location = entry[classColumns.BUILDING].toLowerCase() === "unknown" ? "TBA" : entry[classColumns.BUILDING];

                // Process the data correctly
                const professorName = processInstructorName(instructorRaw);
                const dayCode = extractDayCode(scheduleRaw);
                const times = processTime(scheduleRaw);

                // Check if we've already processed this class
                if (processedClasses.has(baseCode)) {
                  // Check if this section already exists
                  const existingSectionKeys = new Set(
                      existingClass.sections.map(s =>
                          createSectionKey(
                              s.section,
                              s.dayOfWeek,
                              s.startTime,
                              s.endTime,
                              s.professor
                          )
                      )
                  );

                  const newSectionKey = createSectionKey(
                      section,
                      dayCode,
                      times.startTime,
                      times.endTime,
                      professorName
                  );

                  // Add new section if it doesn't already exist
                  if (!existingSectionKeys.has(newSectionKey)) {
                    await createClassSection(
                        tx,
                        existingClass.id,
                        section,
                        dayCode,
                        times,
                        totalAvailable,
                        totalCapacity,
                        location,
                        professorName
                    );

                    sectionsCreated++;
                    console.log(`Added new section ${newSectionKey} to class ${baseCode}`);
                  } else {
                    console.log(`Skipping duplicate section ${newSectionKey} for class ${baseCode}`);
                  }
                } else {
                  // This is the first time we're seeing this class
                  await createClassSection(
                      tx,
                      existingClass.id,
                      section,
                      dayCode,
                      times,
                      totalAvailable,
                      totalCapacity,
                      location,
                      professorName
                  );

                  sectionsCreated++;
                  processedClasses.set(baseCode, true);
                  console.log(`Added initial section ${section} to class ${baseCode}`);
                }
              } catch (error) {
                console.error(`Error processing class ${entry[classColumns.CODE]}:`, error);
              }
            }
          }, {
            timeout: 30000
          });
        };

        // Process all classes in batches
        for (let i = 0; i < classes.length; i++) {
          currentBatch.push(classes[i]);

          if (currentBatch.length === batchSize || i === classes.length - 1) {
            await processBatch(currentBatch);
            currentBatch = [];
            console.log(`Processed batch ending at index ${i}`);
          }
        }

        console.log(`Total sections created: ${sectionsCreated}`);
        console.log(`Total sections skipped (missing classes): ${sectionsSkipped}`);

        // Return the first class as a sample of what was created
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