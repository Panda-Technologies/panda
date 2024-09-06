import {
  extendType,
  nonNull,
  intArg,
  objectType,
  list,
  inputObjectType,
  stringArg,
} from "nexus";

export const DegreeSchedule = objectType({
  name: "DegreeSchedule",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
    t.nonNull.int("degreeId");
    t.nonNull.string("semesterId");
    t.field("user", { type: "User" });
    t.field("degree", { type: "Degree" });
    t.list.field("entries", { type: "DegreeScheduleEntry" });
  },
});

export const DegreeScheduleEntry = objectType({
  name: "DegreeScheduleEntry",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("degreeScheduleId");
    t.nonNull.int("classId");
    t.field("degreeSchedule", { type: "DegreeSchedule" });
    t.field("class", { type: "Class" });
  },
});

export const CreateDegreeScheduleInput = inputObjectType({
  name: "CreateDegreeScheduleInput",
  definition(t) {
    t.nonNull.string("userId");
    t.nonNull.int("degreeId");
    t.nonNull.string("semesterId");
  },
});

export const UpdateDegreeScheduleInput = inputObjectType({
  name: "UpdateDegreeScheduleInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("semesterId");
  },
});

export const AddClassToDegreeScheduleInput = inputObjectType({
  name: "AddClassToDegreeScheduleInput",
  definition(t) {
    t.nonNull.int("degreeScheduleId");
    t.nonNull.int("classId");
  },
});

export const RemoveClassFromDegreeScheduleInput = inputObjectType({
  name: "RemoveClassFromDegreeScheduleInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const DegreeScheduleQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getDegreeSchedules", {
      type: "DegreeSchedule",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, { userId }, { prisma }) =>
        prisma.degreeSchedule.findMany({
          where: { userId },
          include: { entries: { include: { class: true } } },
        }),
    });

    t.field("getDegreeScheduleEntries", {
      type: list("DegreeScheduleEntry"),
      args: {
        degreeScheduleId: nonNull(intArg()),
      },
      resolve: (_, { degreeScheduleId }, { prisma }) =>
        prisma.degreeScheduleEntry.findMany({
          where: { degreeScheduleId },
          include: { class: true },
        }),
    });
  },
});

export const DegreeScheduleMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDegreeSchedule", {
      type: "DegreeSchedule",
      args: {
        input: nonNull(CreateDegreeScheduleInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degreeSchedule.create({
          data: input,
          include: { entries: true },
        }),
    });

    t.field("updateDegreeSchedule", {
      type: "DegreeSchedule",
      args: {
        input: nonNull(UpdateDegreeScheduleInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degreeSchedule.update({
          where: { id: input.id },
          data: input,
          include: { entries: true },
        }),
    });

    t.field("deleteDegreeSchedule", {
      type: "DegreeSchedule",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.degreeSchedule.delete({
          where: { id },
          include: { entries: true },
        }),
    });

    t.field("addClassToDegreeSchedule", {
      type: "DegreeScheduleEntry",
      args: {
        input: nonNull(AddClassToDegreeScheduleInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degreeScheduleEntry.create({
          data: input,
          include: { class: true },
        }),
    });

    t.field('removeClassFromDegreeSchedule', {
      type: 'DegreeScheduleEntry',
      args: {
        input: nonNull(RemoveClassFromDegreeScheduleInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.degreeScheduleEntry.delete({
        where: { id: input.id },
        include: { class: true }
      })
    });
  },
});
