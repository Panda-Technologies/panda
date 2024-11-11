import { PrismaClient } from "@prisma/client";
import {
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from "nexus";

export const requirement = objectType({
  name: "requirement",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("category");
    t.nonNull.boolean("isElective");
    t.nonNull.list.int("classIds");
    t.nonNull.int("degreeId");
  },
});

export const createRequirementInput = inputObjectType({
  name: "CreateRequirementInput",
  definition(t) {
    t.nonNull.string("category");
    t.nonNull.boolean("isElective");
    t.nonNull.list.int("classIds");
    t.nonNull.int("degreeId");
  },
});

export const updateRequirementInput = inputObjectType({
  name: "UpdateRequirementInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("category");
    t.boolean("isElective");
    t.list.int("classIds");
    t.int("degreeId");
  },
});

export const requirementQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getRequirement", {
      type: "requirement",
      args: {
        category: nonNull(stringArg()),
        degreeId: nonNull(intArg()),
      },
      resolve: (
        _,
        { category, degreeId },
        { prisma }: { prisma: PrismaClient }
      ) => {
        return prisma.requirement.findFirst({
          where: {category, degreeId},
        });
      },
    });

    t.list.field("getRequirements", {
      type: "requirement",
      args: {
        degreeId: nonNull(intArg()),
      },
      resolve: (
        _,
        { degreeId },
        { prisma }: { prisma: PrismaClient }
      ) => {
        return prisma.requirement.findMany({where: {degreeId}});
      },
    });
  },
});

export const requirementMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createRequirement", {
      type: "requirement",
      args: {
        data: nonNull(createRequirementInput),
      },
      resolve: (_, { data }, { prisma }: { prisma: PrismaClient }) => {
        return prisma.requirement.create({data});
      },
    });

    t.field("updateRequirement", {
      type: "requirement",
      args: {
        data: nonNull(updateRequirementInput),
      },
      resolve: (_, { data }, { prisma }: { prisma: PrismaClient }) => {
        const { id } = data;
        return prisma.requirement.update({where: {id}, data});
      },
    });
  },
});
