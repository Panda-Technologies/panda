import {
  objectType,
  extendType,
  nonNull,
  inputObjectType,
  stringArg,
} from "nexus";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
    t.nonNull.string("dueDate");
    t.nonNull.int("stageId");
    t.string("classCode");
    t.string("description");
    t.nonNull.string("title");
    t.field("user", { type: "User" });
  },
});

const TaskInputFields = inputObjectType({
  name: "TaskInputFields",
  definition(t) {
    t.nonNull.string("title");
    t.int("stageId");
    t.nonNull.string("userId");
    t.nonNull.string("dueDate");
    t.string("classCode");
    t.string("description");
  },
});

export const CreateTaskInput = inputObjectType({
  name: "CreateTaskInput",
  definition(t) {
    t.field("task", { type: TaskInputFields });
  },
});

const UpdateTaskFields = inputObjectType({
  name: "UpdateTaskFields",
  definition(t) {
    t.nonNull.int("id");
    t.string("title");
    t.string("dueDate");
    t.int("stageId");
    t.string("classCode");
    t.string("description");
  },
});

export const UpdateTaskInput = inputObjectType({
  name: "UpdateTaskInput",
  definition(t) {
    t.nonNull.int("id");
    t.field("update", { type: UpdateTaskFields });
  },
});

export const DeleteTaskInput = inputObjectType({
  name: "DeleteTaskInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const TaskQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getTasks", {
      type: "Task",
      args: { userId: nonNull(stringArg()) },
      resolve: (_, { userId }, { prisma }) =>
        prisma.task.findMany({ where: { userId } }),
    });
  },
});

export const TaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTask", {
      type: "Task",
      args: {
        input: CreateTaskInput,
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
      type: "Task",
      args: {
        input: UpdateTaskInput,
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
      type: "Task",
      args: {
        input: DeleteTaskInput,
      },
      resolve: (_, { input }, { prisma }) =>
        prisma.task.delete({ where: { id: input.id } }),
    });
  },
});
