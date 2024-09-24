import { extendType, nonNull, intArg, objectType, list, inputObjectType, stringArg } from "nexus";

export const classSchedule = objectType({
  name: "classSchedule",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
    t.nonNull.string("semesterId");
    t.field("user", { type: "user" });
    t.list.field("entries", { type: "classScheduleEntry" });
  },
});

export const classScheduleEntry = objectType({
  name: "classScheduleEntry",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("classScheduleId");
    t.nonNull.int("classId");
    t.field("classSchedule", { type: "classSchedule" });
    t.field("class", { type: "Class" });
  },
});

export const createClassScheduleInput = inputObjectType({
  name: 'createClassScheduleInput',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.string('semesterId');
  },
});

export const updateClassScheduleInput = inputObjectType({
  name: 'updateClassScheduleInput',
  definition(t) {
    t.nonNull.int('id');
    t.string('semesterId');
  },
});

export const addClassToScheduleInput = inputObjectType({
  name: 'addClassToScheduleInput',
  definition(t) {
    t.nonNull.int('classScheduleId');
    t.nonNull.int('classId');
  },
});

export const removeClassFromScheduleInput = inputObjectType({
  name: 'removeClassFromScheduleInput',
  definition(t) {
    t.nonNull.int('id');
  },
});

export const classScheduleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getclassSchedules', {
      type: 'classSchedule',
      args: {
        userId: nonNull(stringArg())
      },
      resolve: (_, { userId }, { prisma }) => prisma.classSchedule.findMany({ 
        where: { userId },
        include: { entries: { include: { class: true } } }
      })
    });

    t.field('getClassScheduleEntries', {
      type: list('classScheduleEntry'),
      args: {
        classScheduleId: nonNull(intArg())
      },
      resolve: (_, { classScheduleId }, { prisma }) => prisma.classScheduleEntry.findMany({
        where: { classScheduleId },
        include: { class: true }
      })
    });
  }
});

export const classScheduleMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createClassSchedule", {
      type: "classSchedule",
      args: {
        input: nonNull(createClassScheduleInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.classSchedule.create({
          data: input,
          include: { entries: true },
        }),
    });

    t.field("updateClassSchedule", {
      type: "classSchedule",
      args: {
        input: nonNull(updateClassScheduleInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.classSchedule.update({
          where: { id: input.id },
          data: input,
          include: { entries: true },
        }),
    });

    t.field("deleteClassSchedule", {
      type: "classSchedule",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.classSchedule.delete({
          where: { id },
          include: { entries: true },
        }),
    });

    t.field('addClassToClassSchedule', {
      type: 'classScheduleEntry',
      args: {
        input: nonNull(addClassToScheduleInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.classScheduleEntry.create({
        data: input,
        include: { class: true }
      })
    });

    t.field('removeClassFromClassSchedule', {
      type: 'classScheduleEntry',
      args: {
        input: nonNull(removeClassFromScheduleInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.classScheduleEntry.delete({
        where: { id: input.id },
        include: { class: true }
      })
    });
  },
});