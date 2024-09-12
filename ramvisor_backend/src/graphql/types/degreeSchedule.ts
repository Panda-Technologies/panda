import {
  extendType,
  nonNull,
  intArg,
  objectType,
  list,
  inputObjectType,
  stringArg,
} from "nexus";

export const DegreePlanner = objectType({
  name: "DegreePlanner",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
    t.nonNull.int("degreeId");
    t.field("user", { type: "User" });
    t.field("degree", { type: "Degree" });
    t.list.field("Semester", { type: "Semester" });
  },
});

export const Semester = objectType({
  name: "Semester",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.int("degreeId");
    t.nonNull.string("semesterId");
    t.nonNull.int("plannerId");
    t.field("degreePlanner", { type: "DegreePlanner" });
    t.list.field("entries", { type: "SemesterEntry" });
  },
});

export const SemesterEntry = objectType({
  name: "SemesterEntry",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("semesterId");
    t.nonNull.int("classId");
    t.field("Semester", { type: "Semester" });
    t.field("class", { type: "Class" });
  },
});

export const CreateDegreePlannerInput = inputObjectType({
  name: "CreateDegreePlannerInput",
  definition(t) {
    t.nonNull.string("userId");
    t.nonNull.int("degreeId");
  },
});

export const CreateSemesterInput = inputObjectType({
  name: "CreateSemesterInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("degreeId");
    t.nonNull.int("plannerId");
  },
});

export const UpdateSemesterInput = inputObjectType({
  name: "UpdateSemesterInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
  },
});

export const AddClassToSemesterInput = inputObjectType({
  name: "AddClassToSemesterInput",
  definition(t) {
    t.nonNull.int("semesterId");
    t.nonNull.int("classId");
  },
});

export const RemoveClassFromSemesterInput = inputObjectType({
  name: "RemoveClassFromSemesterInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const DegreePlannerQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getDegreePlanners", {
      type: "DegreePlanner",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, { userId }, { prisma }) =>
        prisma.degreePlanner.findMany({
          where: { userId },
          include: { Semester: { include: { entries: { include: { class: true } } } } },
        }),
    });
  },
});

export const SemesterQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getSemesters", {
      type: "Semester",
      args: {
        plannerId: nonNull(intArg()),
      },
      resolve: (_, { plannerId }, { prisma }) =>
        prisma.Semester.findMany({
          where: { plannerId },
          include: { entries: { include: { class: true } } },
        }),
    });

    t.field("getSemesterEntries", {
      type: list("SemesterEntry"),
      args: {
        semesterId: nonNull(intArg()),
      },
      resolve: (_, { semesterId }, { prisma }) =>
        prisma.SemesterEntry.findMany({
          where: { semesterId },
          include: { class: true },
        }),
    });
  },
});

export const DegreePlannerMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDegreePlanner", {
      type: "DegreePlanner",
      args: {
        input: nonNull(CreateDegreePlannerInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degreePlanner.create({
          data: input,
          include: { Semester: true },
        }),
    });

    t.field("deleteDegreePlanner", {
      type: "DegreePlanner",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.degreePlanner.delete({
          where: { id },
          include: { Semester: true },
        }),
    });
  },
});

export const SemesterMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createSemester", {
      type: "Semester",
      args: {
        input: nonNull(CreateSemesterInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.Semester.create({
          data: input,
          include: { entries: true },
        }),
    });

    t.field("updateSemester", {
      type: "Semester",
      args: {
        input: nonNull(UpdateSemesterInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.Semester.update({
          where: { id: input.id },
          data: input,
          include: { entries: true },
        }),
    });

    t.field("deleteSemester", {
      type: "Semester",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.Semester.delete({
          where: { id },
          include: { entries: true },
        }),
    });

    t.field("addClassToSemester", {
      type: "SemesterEntry",
      args: {
        input: nonNull(AddClassToSemesterInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.SemesterEntry.create({
          data: input,
          include: { class: true },
        }),
    });

    t.field('removeClassFromSemester', {
      type: 'SemesterEntry',
      args: {
        input: nonNull(RemoveClassFromSemesterInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.SemesterEntry.delete({
        where: { id: input.id },
        include: { class: true }
      })
    });
  },
});