import { extendType, nonNull, intArg, objectType } from "nexus";

export const ClassSchedule = objectType({
    name: 'ClassSchedule',
    definition(t) {
      t.nonNull.int('id');
      t.nonNull.int('userId');
      t.nonNull.int('semesterId');
      t.nonNull.int('classId');
      t.field('user', { type: 'User' });
      t.field('class', { type: 'Class' });
    },
  });

export const ClassScheduleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getClassSchedules', {
      type: 'ClassSchedule',
      args: {
        userId: nonNull(intArg())
      },
      resolve: (_, { userId }, { prisma }) => prisma.classSchedule.findMany({ 
        where: { userId },
        include: { class: true }
      })
    })

    t.field('getClassSchedule', {
      type: 'ClassSchedule',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.classSchedule.findUnique({
        where: { id },
        include: { class: true }
      })
    })
  }
})

export const ClassScheduleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createClassSchedule', {
      type: 'ClassSchedule',
      args: {
        userId: nonNull(intArg()),
        semesterId: nonNull(intArg()),
        classId: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.classSchedule.create({ 
        data: args,
        include: { class: true }
      })
    })

    t.field('updateClassSchedule', {
      type: 'ClassSchedule',
      args: {
        id: nonNull(intArg()),
        semesterId: intArg(),
        classId: intArg()
      },
      resolve: (_, args, { prisma }) => prisma.classSchedule.update({
        where: { id: args.id },
        data: args,
        include: { class: true }
      })
    })

    t.field('deleteClassSchedule', {
      type: 'ClassSchedule',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.classSchedule.delete({ 
        where: { id },
        include: { class: true }
      })
    })
  }
})