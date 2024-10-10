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
  },
});

export const updateSemesterInput = inputObjectType({
  name: "updateSemesterInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.list.nonNull.field("entries", { type: nonNull(semesterEntryInput) });
  },
});

export const addClassToSemesterInput = inputObjectType({
  name: "addClassToSemesterInput",
  definition(t) {
    t.nonNull.int("semesterId");
    t.nonNull.int("classId");
  },
});

export const removeClassFromSemesterInput = inputObjectType({
  name: "removeClassFromSemesterInput",
  definition(t) {
    t.nonNull.int("semesterId");
    t.nonNull.int("classId");
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
                  include: { classId: true },
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
              include: { class: true },
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
              include: { class: true },
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
        const { name, degreeId, plannerId, classIds } = input;

        const classCreditsPromises = classIds.map(async (classId: number) => {
          const classCredits = await prisma.class.findUnique({
            where: { id: classId },
            select: { credits: true },
          });
          return classCredits?.credits || 0;
        });

        const allClassCredits = await Promise.all(classCreditsPromises);
        const credits = allClassCredits.reduce(
          (sum, credit) => sum + credit,
          0
        );

        const semester = await prisma.semester.create({
          data: {
            name,
            degreeId,
            plannerId,
            credits,
            entries: {
              createMany: {
                data: classIds.map((classId: number) => ({
                  classId,
                })),
              },
            },
          },
          include: {
            entries: {
              include: { class: true },
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
        const { id, name } = input;
        const entries: prismaSemesterEntry[] = input.entries; // Add type to entry
    
        // Start a transaction
        return prisma.$transaction(async (transactionPrisma) => {
          // Update name if provided
          if (name) {
            await transactionPrisma.semester.update({
              where: { id },
              data: { name },
            });
          }
    
          if (entries) {
            // Get current entries
            const currentEntries = await transactionPrisma.semesterEntry.findMany({
              where: { semesterId: id },
            });
    
            const currentEntriesSet = new Set(currentEntries.map(entry => entry.classId));
            const newEntriesSet = new Set(entries.map(entry => entry.classId));
    
            // Entries to delete
            const entriesToDelete = currentEntries.filter(entry => !newEntriesSet.has(entry.classId));
    
            // Entries to create
            const entriesToCreate = entries.filter(entry => !currentEntriesSet.has(entry.classId));
    
            // Delete entries
            if (entriesToDelete.length > 0) {
              await transactionPrisma.semesterEntry.deleteMany({
                where: {
                  semesterId: id,
                  classId: { in: entriesToDelete.map(entry => entry.classId) },
                },
              });
            }
    
            // Create new entries
            if (entriesToCreate.length > 0) {
              await transactionPrisma.semesterEntry.createMany({
                data: entriesToCreate.map(entry => ({
                  semesterId: id,
                  classId: entry.classId,
                })),
              });
            }
    
            // Recalculate credits
            const updatedEntries = await transactionPrisma.semesterEntry.findMany({
              where: { semesterId: id },
              include: { class: true },
            });
    
            const totalCredits = updatedEntries.reduce((sum, entry) => sum + (entry.class?.credits || 0), 0);
    
            // Update semester with new credit total
            await transactionPrisma.semester.update({
              where: { id },
              data: { credits: totalCredits },
            });
          }
    
          // Fetch and return updated semester
          return transactionPrisma.semester.findUnique({
            where: { id },
            include: {
              entries: {
                include: { class: true },
              },
            },
          });
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
        const { classId, semesterId } = input;

        const credits: number = await prisma.class.findUnique({
          where: { id: classId },
          select: { credits: true },
        });

        if (credits) {
          await prisma.semester.update({
            where: { id: semesterId },
            data: { credits: { increment: credits } },
          });
        }
        return prisma.semesterEntry.create({
          data: {
            classId,
            semesterId,
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
      resolve: async (_, { input }, { prisma }) => {
        const { classId, semesterId } = input;
    
        const classToRemove = await prisma.class.findUnique({
          where: { id: classId },
          select: { credits: true },
        });
    
        if (!classToRemove) {
          throw new Error(`Class with id ${classId} not found`);
        }
    
        const semesterEntry = await prisma.semesterEntry.findFirst({
          where: { semesterId, classId },
        });
    
        if (!semesterEntry) {
          throw new Error(`Class ${classId} not found in semester ${semesterId}`);
        }
    
        await prisma.semester.update({
          where: { id: semesterId },
          data: { credits: { decrement: classToRemove.credits } },
        });
    
        return prisma.semesterEntry.delete({
          where: { id: semesterEntry.id },
          include: { class: true },
        });
      },
    });
  },
});
