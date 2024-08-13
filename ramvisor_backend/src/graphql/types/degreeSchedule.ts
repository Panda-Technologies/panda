import { extendType, nonNull, intArg, objectType } from "nexus";

export const DegreeSchedule = objectType({
    name: 'DegreeSchedule',
    definition(t) {
      t.nonNull.int('id');
      t.nonNull.int('userId');
      t.nonNull.int('plannerId');
      t.nonNull.int('degreeId');
      t.nonNull.int('semesterId');
      t.nonNull.int('courseId');
      t.field('user', { type: 'User' });
      t.field('degree', { type: 'Degree' });
    },
  });

export const DegreeScheduleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getDegreeSchedules', {
      type: 'DegreeSchedule',
      args: {
        userId: nonNull(intArg())
      },
      resolve: (_, { userId }, { prisma }) => prisma.degreeSchedule.findMany({ where: { userId } })
    })
  }
})

export const DegreeScheduleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDegreeSchedule', {
      type: 'DegreeSchedule',
      args: {
        userId: nonNull(intArg()),
        plannerId: nonNull(intArg()),
        degreeId: nonNull(intArg()),
        semesterId: nonNull(intArg()),
        courseId: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.degreeSchedule.create({ data: args })
    })

    t.field('updateDegreeSchedule', {
      type: 'DegreeSchedule',
      args: {
        id: nonNull(intArg()),
        plannerId: intArg(),
        semesterId: intArg(),
        courseId: intArg()
      },
      resolve: (_, args, { prisma }) => prisma.degreeSchedule.update({
        where: { id: args.id },
        data: args
      })
    })

    t.field('deleteDegreeSchedule', {
      type: 'DegreeSchedule',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.degreeSchedule.delete({ where: { id } })
    })
  }
})