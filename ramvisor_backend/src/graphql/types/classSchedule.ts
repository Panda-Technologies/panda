import { extendType, nonNull, intArg, objectType, list, inputObjectType, stringArg } from "nexus";

export const ClassSchedule = objectType({
  name: "ClassSchedule",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
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

export const CreateClassScheduleInput = inputObjectType({
  name: 'CreateClassScheduleInput',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.int('semesterId');
  },
});

export const UpdateClassScheduleInput = inputObjectType({
  name: 'UpdateClassScheduleInput',
  definition(t) {
    t.nonNull.int('id');
    t.int('semesterId');
  },
});

export const AddClassToScheduleInput = inputObjectType({
  name: 'AddClassToScheduleInput',
  definition(t) {
    t.nonNull.int('classScheduleId');
    t.nonNull.int('classId');
  },
});

export const RemoveClassFromScheduleInput = inputObjectType({
  name: 'RemoveClassFromScheduleInput',
  definition(t) {
    t.nonNull.int('id');
  },
});

export const ClassScheduleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getClassSchedules', {
      type: 'ClassSchedule',
      args: {
        userId: nonNull(stringArg())
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
        input: nonNull(CreateClassScheduleInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.classSchedule.create({
          data: input,
          include: { entries: true },
        }),
    });

    t.field("updateClassSchedule", {
      type: "ClassSchedule",
      args: {
        input: nonNull(UpdateClassScheduleInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.classSchedule.update({
          where: { id: input.id },
          data: input,
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
        input: nonNull(AddClassToScheduleInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.classScheduleEntry.create({
        data: input,
        include: { class: true }
      })
    });

    t.field('removeClassFromClassSchedule', {
      type: 'ClassScheduleEntry',
      args: {
        input: nonNull(RemoveClassFromScheduleInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.classScheduleEntry.delete({
        where: { id: input.id },
        include: { class: true }
      })
    });
  },
});