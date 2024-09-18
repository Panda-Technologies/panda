import { PrismaClient } from "@prisma/client";
import { SemesterEntry as PrismaSemesterEntry } from "@prisma/client";
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
    t.nonNull.int("credits");
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
    t.nonNull.int("index");
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

export const SemesterEntryInput = inputObjectType({
  name: "SemesterEntryInput",
  definition(t) {
    t.nonNull.int("classId");
    t.nonNull.int("index");
  },
});

export const UpdateSemesterInput = inputObjectType({
  name: "UpdateSemesterInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.nonNull.int("credits");
    t.list.nonNull.field("entries", { type: nonNull(SemesterEntryInput) });
  },
});

export const AddClassToSemesterInput = inputObjectType({
  name: "AddClassToSemesterInput",
  definition(t) {
    t.nonNull.int("semesterId");
    t.nonNull.int("credits");
    t.nonNull.int("classId");
  },
});

export const RemoveClassFromSemesterInput = inputObjectType({
  name: "RemoveClassFromSemesterInput",
  definition(t) {
    t.nonNull.int("semesterId");
    t.nonNull.int("classId");
    t.nonNull.int("credits");
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
          include: {
            Semester: {
              include: {
                entries: {
                  include: { classId: true, index: true },
                  orderBy: { index: "asc" },
                },
              },
            },
          },
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
          include: {
            entries: {
              include: { classId: true, index: true },
              orderBy: { index: "asc" },
            },
          },
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
          include: {
            entries: {
              include: { classId: true, index: true },
              orderBy: { index: "asc" },
            },
          },
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
        const { name, degreeId, plannerId, classIds, credits } = input;
        const semester = await prisma.semester.create({
          data: {
            name,
            degreeId,
            plannerId,
            credits,
            entries: {
              createMany: {
                data: classIds.map((classId: number, index: number) => ({
                  classId,
                  index,
                })),
              },
            },
          },
          include: {
            entries: {
              include: { class: true },
              orderBy: { index: "asc" },
            },
          },
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
        const { id, name, entries, credits } = input;

        if (name) {
          await prisma.semester.update({
            where: { id },
            data: { name },
          });
        }

        const currentEntries = await prisma.semesterEntry.findMany({
          where: { semesterId: id },
        });

        const currentEntriesMap = new Map();
        currentEntries.forEach((entry) => {
          currentEntriesMap.set(entry.classId, entry);
        });

        const newEntriesMap = new Map();
        entries.forEach((entry: PrismaSemesterEntry) => {
          newEntriesMap.set(entry.classId, entry);
        });

        const classIdsToDelete = currentEntries
          .filter((entry) => !newEntriesMap.has(entry.classId))
          .map((entry) => entry.classId);

        // Entries to create (in newEntries but not in currentEntries)
        const entriesToCreate = entries.filter(
          (entry: PrismaSemesterEntry) => !currentEntriesMap.has(entry.classId)
        );

        // Entries to update (in both currentEntries and newEntries)
        const entriesToUpdate = entries.filter((entry: PrismaSemesterEntry) =>
          currentEntriesMap.has(entry.classId)
        );

        // Delete entries
        if (classIdsToDelete.length > 0) {
          await prisma.semesterEntry.deleteMany({
            where: {
              semesterId: id,
              classId: { in: classIdsToDelete },
            },
          });
        }

        // Create new entries
        if (entriesToCreate.length > 0) {
          await prisma.semesterEntry.createMany({
            data: entriesToCreate.map((entry: PrismaSemesterEntry) => ({
              semesterId: id,
              classId: entry.classId,
              index: entry.index,
              credits: credits
            })),
          });
        }

        // Update existing entries if index has changed
        for (const entry of entriesToUpdate) {
          const currentEntry = currentEntriesMap.get(entry.classId);
          if (currentEntry.index !== entry.index) {
            await prisma.semesterEntry.update({
              where: { id: currentEntry.id },
              data: { index: entry.index },
            });
          }
        }

        // Fetch and return updated semester
        return prisma.semester.findUnique({
          where: { id },
          include: {
            entries: {
              include: { class: true },
              orderBy: { index: "asc" },
            },
          },
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
      resolve: async (_, { input }, { prisma }) => {
        // Find the current max index
        const maxIndexEntry = await prisma.semesterEntry.findFirst({
          where: { semesterId: input.semesterId },
          orderBy: { index: "desc" },
        });
        const newIndex = maxIndexEntry ? maxIndexEntry.index + 1 : 0;

        if (input)
        return prisma.semesterEntry.create({
          data: {
            ...input,
            index: newIndex,
          },
          include: { class: true },
        });
      },
    });

    t.field("removeClassFromSemester", {
      type: "SemesterEntry",
      args: {
        input: nonNull(RemoveClassFromSemesterInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.semesterEntry.delete({
          where: { id: input.classId },
          include: { class: true },
        }),
    });
  },
});
