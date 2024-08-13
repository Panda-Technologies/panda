import { objectType, extendType, nonNull, intArg, stringArg } from "nexus";

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('userId');
    t.nonNull.string('dueDate');
    t.nonNull.int('stageId');
    t.nonNull.string('classCode');
    t.nonNull.string('description');
    t.nonNull.string('title');
    t.field('user', { type: 'User' });
  },
});

export const TaskQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getTasks', {
      type: 'Task',
      args: { userId: nonNull(intArg()) },
      resolve: (_, { userId }, { prisma }) => prisma.task.findMany({ where: { userId } })
    });
  },
});

export const TaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTask', {
      type: 'Task',
      args: {
        userId: nonNull(intArg()),
        dueDate: nonNull(stringArg()),
        stageId: nonNull(intArg()),
        classCode: nonNull(stringArg()),
        description: nonNull(stringArg()),
        title: nonNull(stringArg())
      },
      resolve: (_, args, { prisma }) => prisma.task.create({ data: args })
    });

    t.field('updateTask', {
      type: 'Task',
      args: {
        id: nonNull(intArg()),
        dueDate: stringArg(),
        stageId: intArg(),
        description: stringArg(),
        title: stringArg()
      },
      resolve: (_, args, { prisma }) => prisma.task.update({
        where: { id: args.id },
        data: args
      })
    });

    t.field('deleteTask', {
      type: 'Task',
      args: { id: nonNull(intArg()) },
      resolve: (_, { id }, { prisma }) => prisma.task.delete({ where: { id } })
    });
  },
});