import { PrismaClient } from "@prisma/client";
import {
  extendType,
  nonNull,
  intArg,
  objectType,
  inputObjectType,
  stringArg,
} from "nexus";

export const degree = objectType({
  name: "degree",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.list.string("coreCategories");
    t.nonNull.list.string("electiveCategories");
    t.nonNull.int("numberOfCores");
    t.nonNull.int("numberOfElectives");
    t.list.field("semesters", { type: "semester" });
    t.list.field("users", { type: "user" });
  },
});

export const createDegreeInput = inputObjectType({
  name: "createDegreeInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("numberOfCores");
    t.nonNull.list.string("coreCategories");
    t.nonNull.list.string("electiveCategories");
    t.nonNull.int("numberOfElectives");
  },
});

export const updateDegreeInput = inputObjectType({
  name: "updateDegreeInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.list.string("coreCategories");
    t.list.string("electiveCategories");
    t.int("numberOfCores");
    t.int("numberOfElectives");
  },
});

export const deleteDegreeInput = inputObjectType({
  name: "deleteDegreeInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const degreeQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAlldegrees", {
      type: "degree",
      resolve: (_, __, { prisma }) => prisma.degree.findMany(),
    });

    t.field("getDegree", {
      type: "degree",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.degree.findUnique({ where: { id } }),
      resolve: (_, { userId }, { prisma }) =>
        prisma.degree.findMany({ where: { user: { some: { id: userId } } } }),
    });
  },
});

export const degreeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDegree", {
      type: "degree",
      args: {
        input: nonNull(createDegreeInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degree.create({ data: input }),
    });

    t.field("updateDegree", {
      type: "degree",
      args: {
        input: nonNull(updateDegreeInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degree.update({
          where: { id: input.id },
          data: input,
        }),
    });

    t.field("deleteDegree", {
      type: "degree",
      args: {
        input: nonNull(deleteDegreeInput),
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.degree.delete({ where: { id: input.id } }),
    });

    t.field("createDegreeRequirements", {
      type: "Boolean",
      args: {
        degreeId: nonNull(intArg()),
      },
      resolve: async (
        _,
        { degreeId },
        { prisma }: { prisma: PrismaClient }
      ) => {
        try {
          const degree = await prisma.degree.findUnique({
            where: { id: degreeId },
            select: {
              name: true,
              coreCategories: true,
              electiveCategories: true,
            },
          });

          if (!degree) {
            throw new Error(`Degree with id ${degreeId} not found`);
          }

          const createRequirement = async (
            categories: string[],
            isElective: boolean
          ) => {
            await Promise.all( // Used to run multiple promises concurrently on each element in the map
              categories.map(async (category) => {
                const classes = await prisma.class.findMany({
                  where: { category: category },
                });
                await prisma.requirement.create({
                  data: {
                    category,
                    classIds: classes.map((cls) => cls.id),
                    isElective,
                    degreeId,
                  },
                });
              })
            );
          };

          await createRequirement(degree.coreCategories, false);
          await createRequirement(degree.electiveCategories, true);

          return true;
        } catch (error) {
          console.error("Error creating degree requirements:", error);
          return false;
        }
      },
    });
  },
});
