import {
  extendType,
  nonNull,
  intArg,
  objectType,
  inputObjectType,
} from "nexus";

export const Degree = objectType({
  name: "Degree",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.int("numberOfCores");
    t.nonNull.int("numberOfElectives");
    t.list.field("semesters", { type: "Semester" });
    t.list.field("users", { type: "User" });
  },
});

export const CreateDegreeInput = inputObjectType({
  name: "CreateDegreeInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("numberOfCores");
    t.nonNull.int("numberOfElectives");
  },
});

export const UpdateDegreeInput = inputObjectType({
  name: "UpdateDegreeInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.int("numberOfCores");
    t.int("numberOfElectives");
  },
});

export const DeleteDegreeInput = inputObjectType({
  name: 'DeleteDegreeInput',
  definition(t) {
    t.nonNull.int('id');
  },
});

export const DegreeQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllDegrees", {
      type: "Degree",
      resolve: (_, __, { prisma }) => prisma.degree.findMany(),
    });

    t.field("getDegree", {
      type: "Degree",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.degree.findUnique({ where: { id } }),
    });
  },
});


export const DegreeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDegree', {
      type: 'Degree',
      args: {
        input: nonNull(CreateDegreeInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.degree.create({ data: input })
    });

    t.field('updateDegree', {
      type: 'Degree',
      args: {
        input: nonNull(UpdateDegreeInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.degree.update({
        where: { id: input.id },
        data: input
      })
    });

    t.field('deleteDegree', {
      type: 'Degree',
      args: {
        input: nonNull(DeleteDegreeInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.degree.delete({ where: { id: input.id } })
    });
  }
});
