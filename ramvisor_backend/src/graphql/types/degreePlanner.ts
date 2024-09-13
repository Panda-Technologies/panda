import { PrismaClient } from "@prisma/client";
import {
  extendType,
  nonNull,
  intArg,
  objectType,
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
    t.field("semester", { type: "Semester" });
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
    t.list.nonNull.int("classIds");
  },
});

export const UpdateSemesterInput = inputObjectType({
  name: "UpdateSemesterInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.list.nonNull.int("classIds");
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
    t.nonNull.int("classId");
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
        prisma.semester.findMany({
          where: { plannerId },
          include: { entries: { include: { class: true } } },
        }),
    });

    t.field("getSemester", {
      type: "Semester",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.semester.findUnique({
          where: { id },
          include: { entries: { include: { class: true } } },
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
      resolve: async (_, { input }, { prisma }: { prisma: PrismaClient }) => {
        const { name, degreeId, plannerId, classIds } = input;
        const semester = await prisma.semester.create({
          data: {
            name,
            degreeId,
            plannerId,
            entries: {
              createMany: {
                data: classIds.map((classId: number) => ({ classId })),
              },
            },
          },
          include: { entries: { include: { class: true } } },
        });
        return semester;
      },
    });

    t.field("updateSemester", {
      type: "Semester",
      args: {
        input: nonNull(UpdateSemesterInput),
      },
      resolve: async (_, { input }, { prisma }: { prisma: PrismaClient }) => {
        const { id, name, classIds } = input;
        
        // Update semester name if provided
        if (name) {
          await prisma.semester.update({
            where: { id },
            data: { name },
          });
        }

        // Get current entries
        const currentEntries = await prisma.semesterEntry.findMany({
          where: { semesterId: id },
        });

        // Determine entries to delete and create
        const currentClassIds = currentEntries.map(entry => entry.classId);
        const classIdsToDelete = currentClassIds.filter((classId: number) => !classIds.includes(classId));
        const classIdsToAdd = classIds.filter((classId: number) => !currentClassIds.includes(classId));

        // Delete entries
        await prisma.semesterEntry.deleteMany({
          where: {
            semesterId: id,
            classId: { in: classIdsToDelete },
          },
        });

        // Add new entries
        await prisma.semesterEntry.createMany({
          data: classIdsToAdd.map((classId: number) => ({
            semesterId: id,
            classId,
          })),
        });

        // Fetch and return updated semester
        return prisma.semester.findUnique({
          where: { id },
          include: { entries: { include: { class: true } } },
        });
      },
    });

    t.field("deleteSemester", {
      type: "Semester",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.semester.delete({
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