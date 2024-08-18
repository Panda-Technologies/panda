import { extendType, nonNull, intArg, objectType, list } from "nexus";

export const ClassSchedule = objectType({
  name: "ClassSchedule",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("userId");
    t.nonNull.int("semesterId");
    t.field("user", { type: "User" });
    t.list.field("entries", { type: "ClassScheduleEntry" });
  },
});

export const ClassScheduleEntry = objectType({
  name: "ClassScheduleEntry",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("classScheduleId");
    t.nonNull.int("classId");
    t.field("classSchedule", { type: "ClassSchedule" });
    t.field("class", { type: "Class" });
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
        include: { entries: { include: { class: true } } }
      })
    });

    t.field('getClassScheduleEntries', {
      type: list('ClassScheduleEntry'),
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

export const ClassScheduleMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createClassSchedule", {
      type: "ClassSchedule",
      args: {
        userId: nonNull(intArg()),
        semesterId: nonNull(intArg()),
      },
      resolve: (_, args, { prisma }) =>
        prisma.classSchedule.create({
          data: args,
          include: { entries: true },
        }),
    });

    t.field("updateClassSchedule", {
      type: "ClassSchedule",
      args: {
        id: nonNull(intArg()),
        semesterId: intArg(),
      },
      resolve: (_, args, { prisma }) =>
        prisma.classSchedule.update({
          where: { id: args.id },
          data: args,
          include: { entries: true },
        }),
    });

    t.field("deleteClassSchedule", {
      type: "ClassSchedule",
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
      type: 'ClassScheduleEntry',
      args: {
        classScheduleId: nonNull(intArg()),
        classId: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.classScheduleEntry.create({
        data: args,
        include: { class: true }
      })
    });

    t.field('removeClassFromClassSchedule', {
      type: 'ClassScheduleEntry',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.classScheduleEntry.delete({
        where: { id },
        include: { class: true }
      })
    });
  },
});