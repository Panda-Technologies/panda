import { PrismaClient } from "@prisma/client";
import { semesterEntry as prismaSemesterEntry } from "@prisma/client";
import {
  extendType,
  nonNull,
  intArg,
  objectType,
  inputObjectType,
  stringArg,
} from "nexus";
// Destructure all inputs from prisma client into separate consts for readability
export const degreePlanner = objectType({
  name: "degreePlanner",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
    t.nonNull.int("degreeId");
    t.field("user", { type: "user" });
    t.field("degree", { type: "degree" });
    t.list.field("semester", { type: "semester" });
  },
});

export const semester = objectType({
  name: "semester",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.int("credits");
    t.nonNull.int("degreeId");
    t.nonNull.int("plannerId");
    t.field("degreePlanner", { type: "degreePlanner" });
    t.list.field("entries", { type: "semesterEntry" });
  },
});

export const semesterEntry = objectType({
  name: "semesterEntry",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("semesterId");
    t.nonNull.int("classId");
    t.nonNull.int("index");
    t.field("semester", { type: "semester" });
    t.field("class", { type: "Class" });
  },
});

export const createDegreePlannerInput = inputObjectType({
  name: "createDegreePlannerInput",
  definition(t) {
    t.nonNull.string("userId");
    t.nonNull.int("degreeId");
  },
});

export const createSemesterInput = inputObjectType({
  name: "createSemesterInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("degreeId");
    t.nonNull.int("plannerId");
    t.list.nonNull.int("classIds");
  },
});

export const semesterEntryInput = inputObjectType({
  name: "semesterEntryInput",
  definition(t) {
    t.nonNull.int("classId");
    t.nonNull.int("index");
  },
});

export const updateSemesterInput = inputObjectType({
  name: "updateSemesterInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.nonNull.int("credits");
    t.list.nonNull.field("entries", { type: nonNull(semesterEntryInput) });
  },
});

export const addClassToSemesterInput = inputObjectType({
  name: "addClassToSemesterInput",
  definition(t) {
    t.nonNull.int("semesterId");
    t.nonNull.int("credits");
    t.nonNull.int("classId");
  },
});

export const removeClassFromSemesterInput = inputObjectType({
  name: "removeClassFromSemesterInput",
  definition(t) {
    t.nonNull.int("semesterId");
    t.nonNull.int("classId");
    t.nonNull.int("credits");
  },
});

export const degreePlannerQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getdegreePlanners", {
      type: "degreePlanner",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, { userId }, { prisma }) =>
        prisma.degreePlanner.findMany({
          where: { userId },
          include: {
            semester: {
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

export const semesterQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getsemesters", {
      type: "semester",
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
      type: "semester",
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

export const degreePlannerMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDegreePlanner", {
      type: "degreePlanner",
      args: {
        input: nonNull(createDegreePlannerInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degreePlanner.create({
          data: input,
          include: { semester: true },
        }),
    });

    t.field("deleteDegreePlanner", {
      type: "degreePlanner",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.degreePlanner.delete({
          where: { id },
          include: { semester: true },
        }),
    });
  },
});

export const semesterMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createSemester", {
      type: "semester",
      args: {
        input: nonNull(createSemesterInput),
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
      type: "semester",
      args: {
        input: nonNull(updateSemesterInput),
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
        entries.forEach((entry: prismaSemesterEntry) => {
          newEntriesMap.set(entry.classId, entry);
        });

        const classIdsToDelete = currentEntries
          .filter((entry) => !newEntriesMap.has(entry.classId))
          .map((entry) => entry.classId);

        // Entries to create (in newEntries but not in currentEntries)
        const entriesToCreate = entries.filter(
          (entry: prismaSemesterEntry) => !currentEntriesMap.has(entry.classId)
        );

        // Entries to update (in both currentEntries and newEntries)
        const entriesToUpdate = entries.filter((entry: prismaSemesterEntry) =>
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
            data: entriesToCreate.map((entry: prismaSemesterEntry) => ({
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

    t.field("deletesemester", {
      type: "semester",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.semester.delete({
          where: { id },
          include: { entries: true },
        }),
    });

    t.field("addClassTosemester", {
      type: "semesterEntry",
      args: {
        input: nonNull(addClassToSemesterInput),
      },
      resolve: async (_, { input }, { prisma }) => {
        const { classId, semesterId, credits } = input;
        const maxIndexEntry = await prisma.semesterEntry.findFirst({
          where: { semesterId: input.semesterId },
          orderBy: { index: "desc" },
        });
        const newIndex = maxIndexEntry ? maxIndexEntry.index + 1 : 0;

        if (credits) {
          await prisma.semester.update({
            where: { id: semesterId },
            data: { credits: { increment: credits } },
          })
        }
        return prisma.semesterEntry.create({
          data: {
            classId,
            semesterId,
            index: newIndex,
          },
          include: { class: true },
        });
      },
    });

    t.field("removeClassFromsemester", {
      type: "semesterEntry",
      args: {
        input: nonNull(removeClassFromSemesterInput),
      },
      resolve: (_, { input }, { prisma }) => {
        const { classId, semesterId, credits } = input;

        if (credits) {
          prisma.semester.update({
            where: { id: semesterId },
            data: { credits: { decrement: credits } },
          });
        }
        return prisma.semesterEntry.delete({
          where: { id: classId },
          include: { class: true },
        });
      },
    });
  },
});
