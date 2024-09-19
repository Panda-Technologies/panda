import { objectType, extendType, nonNull, intArg, inputObjectType } from "nexus";

export const Class = objectType({
  name: 'Class',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('classCode');
    t.nonNull.int('credits');
    t.nonNull.string('courseType');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('dayOfWeek');
    t.nonNull.string('startTime');
    t.nonNull.string('endTime');
    t.nonNull.string('color');
    t.nonNull.string('professor');
    t.nonNull.float('rateMyProfessorRating');
    t.nonNull.int('coreDegreeId');
    t.list.int('electiveDegreeId');
    t.list.field('classSchedules', { type: 'ClassSchedule' });
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

export const DeleteClassInput = inputObjectType({
  name: 'DeleteClassInput',
  definition(t) {
    t.nonNull.int('id');
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
        input: nonNull(CreateClassInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.class.create({ data: input })
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
        input: nonNull(DeleteClassInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.class.delete({ where: { id: input.id } })
    });
  },
});