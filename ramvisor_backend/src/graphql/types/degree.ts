import { extendType, nonNull, intArg, stringArg, objectType } from "nexus";

export const Degree = objectType({
    name: 'Degree',
    definition(t) {
      t.nonNull.int('id');
      t.nonNull.string('name');
      t.nonNull.int('numberOfCores');
      t.nonNull.int('numberOfElectives');
      t.list.field('degreeSchedules', { type: 'DegreeSchedule' });
      t.list.field('users', { type: 'User' });
    },
  });

export const DegreeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getAllDegrees', {
      type: 'Degree',
      resolve: (_, __, { prisma }) => prisma.degree.findMany()
    })

    t.field('getDegree', {
      type: 'Degree',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.degree.findUnique({ where: { id } })
    })
  }
})

export const DegreeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDegree', {
      type: 'Degree',
      args: {
        name: nonNull(stringArg()),
        numberOfCores: nonNull(intArg()),
        numberOfElectives: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.degree.create({ data: args })
    })

    t.field('updateDegree', {
      type: 'Degree',
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        numberOfCores: intArg(),
        numberOfElectives: intArg()
      },
      resolve: (_, args, { prisma }) => prisma.degree.update({
        where: { id: args.id },
        data: args
      })
    })

    t.field('deleteDegree', {
      type: 'Degree',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_, { id }, { prisma }) => prisma.degree.delete({ where: { id } })
    })
  }
})