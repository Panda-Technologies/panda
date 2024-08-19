import { objectType, extendType, nonNull, intArg, inputObjectType } from "nexus";

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

export const CreateTaskInput = inputObjectType({
  name: 'CreateTaskInput',
  definition(t) {
    t.nonNull.int('userId');
    t.nonNull.string('dueDate');
    t.nonNull.int('stageId');
    t.nonNull.string('classCode');
    t.nonNull.string('description');
    t.nonNull.string('title');
  },
});

export const UpdateTaskInput = inputObjectType({
  name: 'UpdateTaskInput',
  definition(t) {
    t.nonNull.int('id');
    t.string('dueDate');
    t.int('stageId');
    t.string('description');
    t.string('title');
  },
});

export const DeleteTaskInput = inputObjectType({
  name: 'DeleteTaskInput',
  definition(t) {
    t.nonNull.int('id');
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
        input: nonNull(CreateTaskInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.task.create({ data: input })
    });

    t.field('updateTask', {
      type: 'Task',
      args: {
        input: nonNull(UpdateTaskInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.task.update({
        where: { id: input.id },
        data: input
      })
    });

    t.field('deleteTask', {
      type: 'Task',
      args: {
        input: nonNull(DeleteTaskInput),
      },
      resolve: (_, { input }, { prisma }) => prisma.task.delete({ where: { id: input.id } })
    });
  },
});
