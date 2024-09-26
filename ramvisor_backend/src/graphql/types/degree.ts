import {
  extendType,
  nonNull,
  intArg,
  objectType,
  inputObjectType,
} from "nexus";
import { Class as PrismaClass } from "@prisma/client";

export const degree = objectType({
  name: "degree",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.list.string("reqCategories");
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
    t.nonNull.list.string("reqCategories");
    t.nonNull.int("numberOfElectives");
  },
});

export const updateDegreeInput = inputObjectType({
  name: "updateDegreeInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.list.string("reqCategories");
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
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.degree.findUnique({ where: { id } }),
    });

    t.field("getDegreeRequirements", {
      type: "degree",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, { prisma }) => {
        const coreCourses: PrismaClass[] = await prisma.Class.findMany({
          where: { coredegreeId: { has: id } },
        });
        const electiveCourses: PrismaClass[] = await prisma.Class.findMany({
          where: { electivedegreeId: { has: id } },
        });

        const requirements = new Map<PrismaClass, String>();
        coreCourses.forEach((course) => {
          requirements.set(course, "Core");
        });
        electiveCourses.forEach((course) => {
          requirements.set(course, "Elective");
        });

        return requirements;
      },
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
  },
});
