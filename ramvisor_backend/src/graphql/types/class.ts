import { objectType, extendType, nonNull, intArg, stringArg, floatArg } from "nexus";

export const Class = objectType({
  name: 'Class',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('classCode');
    t.nonNull.string('courseType');
    t.nonNull.string('title');
    t.nonNull.string('dayOfWeek');
    t.nonNull.string('startTime');
    t.nonNull.string('endTime');
    t.nonNull.string('color');
    t.nonNull.string('professor');
    t.nonNull.float('rateMyProfessorRating');
    t.nonNull.int('coreDegreeId');
    t.list.field('classSchedules', { type: 'ClassSchedule' });
  },
});

export const ClassQuery = extendType({
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

export const ClassMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createClass', {
      type: 'Class',
      args: {
        classCode: nonNull(stringArg()),
        courseType: nonNull(stringArg()),
        title: nonNull(stringArg()),
        dayOfWeek: nonNull(stringArg()),
        startTime: nonNull(stringArg()),
        endTime: nonNull(stringArg()),
        color: nonNull(stringArg()),
        professor: nonNull(stringArg()),
        rateMyProfessorRating: nonNull(floatArg()),
        coreDegreeId: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.class.create({ data: args })
    });

    // Add update and delete mutations here
  },
});