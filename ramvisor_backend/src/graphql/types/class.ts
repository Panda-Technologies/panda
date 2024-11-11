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
    t.list.field('classSchedules', { type: 'classSchedule' });
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
      resolve: (_, __, { prisma }) => prisma.class.findMany()
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
          if (!timeStr || timeStr === 'TBA') {
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

        await prisma.class.createMany({
          data: classes.map((c) => {
            const times = processTime(c.time);
            return {
              classCode: c.code?.trim() || '',
              courseType: processComponent(c.component),
              credits: c.units || 0,
              title: c['course title']?.trim() || '',
              category: c.subject?.trim() || 'General',
              description: c.topics?.trim() || 'No description available',
              dayOfWeek: c.days?.trim() || 'TBA',
              startTime: times.startTime,
              endTime: times.endTime,
              color: "blue",
              professor: processInstructor(c.Instructor),
              rateMyProfessorRating: 0.0,
              coreDegreeId: [],
              electiveDegreeId: [],
            };
          }),
          skipDuplicates: true,
        });

        // Return the first class as required by the mutation type
        return prisma.class.findFirst();
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
