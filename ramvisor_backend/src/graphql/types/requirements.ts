import {extendType, inputObjectType, intArg, nonNull, objectType, stringArg,} from "nexus";
import {IMyContext} from "../../interface";

export const requirement = objectType({
  name: "requirement",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("category");
    t.nonNull.string("reqType");
    t.nonNull.list.int("classIds");
    t.nonNull.int("degreeId");
    t.list.string("classNames")
  },
});

export const createRequirementInput = inputObjectType({
  name: "CreateRequirementInput",
  definition(t) {
    t.nonNull.string("category");
    t.nonNull.string("reqType");
    t.nonNull.list.int("classIds");
    t.nonNull.int("degreeId");
  },
});

export const updateRequirementInput = inputObjectType({
  name: "UpdateRequirementInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("category");
    t.string("reqType");
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
        { prisma }: IMyContext
      ) => {
        return prisma.requirement.findFirst({
          where: {category, degreeId},
        });
      },
    });

    t.list.field("getRequirements", {
      type: "requirement",
      args: {
        degreeId: intArg(),
        degreeName: stringArg(),
      },
      resolve: async (
        _,
        { degreeId, degreeName },
        { prisma }: IMyContext
      ) => {
        if (!degreeId && !degreeName) {
          throw new Error("At least one of degreeId or degreeName must be provided");
        }
        if (degreeId) {
          return prisma.requirement.findMany({where: {degreeId}});
        }
        const degree = await prisma.degree.findFirst({
          where: {name: degreeName},
        });
        if (!degree) {
          throw new Error("Degree not found");
        }
        const requirements = await prisma.requirement.findMany({where: {degreeId: degree.id}});

        const classIds = requirements.map(req => req.classIds).flat();

        const classes = await prisma.class.findMany({
          where: {
            id: {
              in: classIds
            }
          },
          select: {
            id: true,
            title: true,
            classCode: true
          }
        });

        const classMap = new Map(classes.map(c => [c.id, c]));

        return requirements.map(req => {
          const classNames = req.classIds.map(classId => classMap.get(classId)?.title || 'Unknown');

          return {...req, classNames};
        });
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
      resolve: (_, { data }, { prisma }: IMyContext) => {
        return prisma.requirement.create({data});
      },
    });

    t.field("updateRequirement", {
      type: "requirement",
      args: {
        data: nonNull(updateRequirementInput),
      },
      resolve: (_, { data }, { prisma }: IMyContext) => {
        const { id } = data;
        return prisma.requirement.update({where: {id}, data});
      },
    });
  },
});
