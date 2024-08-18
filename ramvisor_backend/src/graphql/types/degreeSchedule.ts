import { extendType, nonNull, intArg, objectType, list } from "nexus";

export const DegreeSchedule = objectType({
  name: 'DegreeSchedule',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('userId');
    t.nonNull.int('plannerId');
    t.nonNull.int('degreeId');
    t.nonNull.int('semesterId');
    t.field('user', { type: 'User' });
    t.field('degree', { type: 'Degree' });
    t.list.field('entries', { type: 'DegreeScheduleEntry' });
  },
});

export const DegreeScheduleEntry = objectType({
  name: 'DegreeScheduleEntry',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('degreeScheduleId');
    t.nonNull.int('classId');
    t.field('degreeSchedule', { type: 'DegreeSchedule' });
    t.field('class', { type: 'Class' });
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
      resolve: (_, { userId }, { prisma }) => prisma.degreeSchedule.findMany({ 
        where: { userId },
        include: { entries: { include: { class: true } } }
      })
    });

    t.field('getDegreeScheduleEntries', {
      type: list('DegreeScheduleEntry'),
      args: {
        degreeScheduleId: nonNull(intArg())
      },
      resolve: (_, { degreeScheduleId }, { prisma }) => prisma.degreeScheduleEntry.findMany({
        where: { degreeScheduleId },
        include: { class: true }
      })
    });
  }
});

export const DegreeScheduleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDegreeSchedule', {
      type: 'DegreeSchedule',
      args: {
        userId: nonNull(intArg()),
        plannerId: nonNull(intArg()),
        degreeId: nonNull(intArg()),
        semesterId: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.degreeSchedule.create({ 
        data: args,
        include: { entries: true }
      })
    });

    t.field('updateDegreeSchedule', {
      type: 'DegreeSchedule',
      args: {
        id: nonNull(intArg()),
        plannerId: intArg(),
        semesterId: intArg()
      },
      resolve: (_, args, { prisma }) => prisma.degreeSchedule.update({
        where: { id: args.id },
        data: args,
        include: { entries: true }
      })
    });

    t.field('deleteDegreeSchedule', {
      type: 'DegreeSchedule',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.degreeSchedule.delete({ 
        where: { id },
        include: { entries: true }
      })
    });

    t.field('addClassToDegreeSchedule', {
      type: 'DegreeScheduleEntry',
      args: {
        degreeScheduleId: nonNull(intArg()),
        classId: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.degreeScheduleEntry.create({
        data: args,
        include: { class: true }
      })
    });

    t.field('removeClassFromDegreeSchedule', {
      type: 'DegreeScheduleEntry',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.degreeScheduleEntry.delete({
        where: { id },
        include: { class: true }
      })
    });
  }
});