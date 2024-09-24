import {
  objectType,
  extendType,
  nonNull,
  inputObjectType,
  stringArg,
} from "nexus";

export const task = objectType({
  name: "task",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
    t.nonNull.string("dueDate");
    t.nonNull.int("stageId");
    t.string("classCode");
    t.string("description");
    t.nonNull.string("title");
    t.field("user", { type: "user" });
  },
});

const taskInputFields = inputObjectType({
  name: "taskInputFields",
  definition(t) {
    t.nonNull.string("title");
    t.int("stageId");
    t.nonNull.string("userId");
    t.nonNull.string("dueDate");
    t.string("classCode");
    t.string("description");
  },
});

export const createTaskInput = inputObjectType({
  name: "createTaskInput",
  definition(t) {
    t.field("task", { type: taskInputFields });
  },
});

const updateTaskFields = inputObjectType({
  name: "updateTaskFields",
  definition(t) {
    t.nonNull.int("id");
    t.string("title");
    t.string("dueDate");
    t.int("stageId");
    t.string("classCode");
    t.string("description");
  },
});

export const updateTaskInput = inputObjectType({
  name: "updateTaskInput",
  definition(t) {
    t.nonNull.int("id");
    t.field("update", { type: updateTaskFields });
  },
});

export const deleteTaskInput = inputObjectType({
  name: "deleteTaskInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const taskQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getTasks", {
      type: "task",
      args: { userId: nonNull(stringArg()) },
      resolve: (_, { userId }, { prisma }) =>
        prisma.task.findMany({ where: { userId } }),
    });
  },
});

export const taskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTask", {
      type: "task",
      args: {
        input: createTaskInput,
      },
      resolve: async (_, { input }, { prisma }) => {
        const { task } = input;
        return prisma.task.create({
          data: {
            title: task.title,
            stageId: task.stageId || 1, // Default to 1 if not provided
            userId: task.userId,
            dueDate: task.dueDate,
            classCode: task.classCode || undefined,
            description: task.description || undefined,
          },
        });
      },
    });

    t.field("updateTask", {
      type: "task",
      args: {
        input: updateTaskInput,
      },
      resolve: async (_, { input }, { prisma }) => {
        const { id, update } = input;
        return prisma.task.update({
          where: { id },
          data: {
            title: update.title,
            dueDate: update.dueDate,
            stageId: update.stageId,
            classCode: update.classCode,
            description: update.description,
          },
        });
      },
    });

    t.field("deleteTask", {
      type: "task",
      args: {
        input: deleteTaskInput,
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.task.delete({ where: { id: input.id } }),
    });
  },
});
