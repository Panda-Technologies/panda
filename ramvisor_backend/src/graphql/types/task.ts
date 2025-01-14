import {
  objectType,
  extendType,
  inputObjectType,
} from "nexus";
import {IMyContext} from "../../interface";
import {authenticateUser} from "../../utils";

export const task = objectType({
  name: "task",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("userId");
    t.nonNull.string("dueDate");
    t.nonNull.int("stageId");
    t.string("classCode");
    t.string("description");
    t.nonNull.string("source");
    t.nonNull.string("title");
    t.field("user", { type: "user" });
  },
});

const taskInputFields = inputObjectType({
  name: "taskInputFields",
  definition(t) {
    t.nonNull.string("title");
    t.int("stageId");
    t.nonNull.string("dueDate");
    t.string("classCode");
    t.string("description");
    t.string("source");
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

export const listTaskInput = inputObjectType({
  name: 'listTaskInput',
  definition(t) {
    t.nonNull.string('classCode');
    t.nonNull.list.field('assignment', { type: taskInputFields }); // Changed to list
  },
})

export const importCanvasTasksInput = inputObjectType({
  name: 'importCanvasTasksInput',
  definition(t) {
    t.list.field('taskInput', { type: 'listTaskInput' });
  },
});

export const taskQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getTasks", {
      type: "task",
      resolve: async (_, __, { prisma, session }: IMyContext) => {
        console.log('\n=== GetTasks Query ===');
        if (!session.userId) {
          throw new Error("Not authenticated");
        }

        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);

        const oldCompletedTasks = await prisma.completedTasks.findMany({
          where: {
            userId: session.userId,
            completedAt: {
              lt: oneDayAgo
            }
          },
          select: {
            classCode: true,
            title: true
          }
        });

        return prisma.task.findMany({
          where: {
            userId: session.userId,
            NOT: {
              OR: oldCompletedTasks.map(ct => ({
                classCode: ct.classCode,
                title: ct.title
              }))
            }
          },
          orderBy: {
            dueDate: 'asc'
          }
        });
      }
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
      resolve: async (_, { input }, { prisma, session }: IMyContext) => {
        const { task } = input;
        const userId = authenticateUser(session);

        if (task.stageId === 3) {
          await prisma.completedTasks.create({
            data: {
              userId,
              classCode: task.classCode,
              title: task.title,
              source: task.source
            }
          });
        }

        return prisma.task.create({
          data: {
            title: task.title,
            stageId: task.stageId || 1,
            userId: userId,
            dueDate: task.dueDate,
            classCode: task.classCode || undefined,
            description: task.description || undefined,
            source: 'app'
          },
        });
      },
    });

    t.field("importCanvasTasks", {
      type: 'task',
      args: {
        input: importCanvasTasksInput,
      },
      resolve: async (_, { input }, { prisma, req }: IMyContext) => {
        const userId = authenticateUser(req.session);
        const { taskInput } = input;

        try {
          return await prisma.$transaction(async (tx) => {
            // Get all existing tasks and completed tasks in parallel
            const [existingTasks, completedTasks] = await Promise.all([
              tx.task.findMany({
                where: {
                  userId,
                },
                select: {
                  title: true,
                  classCode: true
                }
              }),
              tx.completedTasks.findMany({
                where: {
                  userId
                },
                select: {
                  title: true,
                  classCode: true
                }
              })
            ]);

            // Create efficient lookup maps
            const existingMap = new Map(
                existingTasks.map(task =>
                    [`${task.classCode}-${task.title.toLowerCase().trim()}`, true]
                )
            );
            const completedMap = new Map(
                completedTasks.map(task =>
                    [`${task.classCode}-${task.title.toLowerCase().trim()}`, true]
                )
            );

            const tasksToCreate = [];

            for (const taskList of taskInput) {
              const classCode = taskList.classCode;

              for (const assignment of taskList.assignment) {
                const taskKey = `${classCode}-${assignment.title.toLowerCase().trim()}`;

                if (existingMap.has(taskKey) || completedMap.has(taskKey)) {
                  continue;
                }

                tasksToCreate.push({
                  title: assignment.title,
                  stageId: assignment.stageId || 1,
                  userId,
                  dueDate: assignment.dueDate,
                  classCode,
                  description: assignment.description || undefined,
                  source: 'canvas'
                });
              }
            }

            if (tasksToCreate.length === 0) {
              return tx.task.findFirst({
                where: { userId },
                orderBy: { dueDate: 'asc' }
              });
            }

            await tx.task.createMany({
              data: tasksToCreate,
              skipDuplicates: true
            });

            return tx.task.findFirst({
              where: {
                userId,
                title: tasksToCreate[tasksToCreate.length - 1].title,
                classCode: tasksToCreate[tasksToCreate.length - 1].classCode
              }
            });
          });

        } catch (error) {
          console.error('Error importing tasks:', error);
          throw error;
        }
      }
    });

    t.field("updateTask", {
      type: "task",
      args: {
        input: updateTaskInput,
      },
      resolve: async (_, { input }, { prisma, session }: IMyContext) => {
        const userId = authenticateUser(session);
        const { id, update } = input;

        return prisma.$transaction(async (tx) => {
          const task = await tx.task.findUnique({
            where: { id }
          });

          if (!task) {
            throw new Error("Task not found");
          }

          if (update.stageId === 3) {
            try {
              await tx.completedTasks.create({
                data: {
                  userId,
                  classCode: update.classCode || task.classCode,
                  title: update.title || task.title,
                  source: task.source
                }
              });
            } catch (error: any) {
              if (error.code === 'P2002') {
                console.log('Task already marked as completed');
              } else {
                throw error;
              }
            }
          }
          else if (task.stageId === 3 && (update.stageId === 1 || update.stageId === 2)) {
            await tx.completedTasks.deleteMany({
              where: {
                userId,
                classCode: task.classCode || update.classCode,
                title: task.title
              }
            });
          }

          return tx.task.update({
            where: { id },
            data: {
              title: update.title,
              dueDate: update.dueDate,
              stageId: update.stageId,
              classCode: update.classCode,
              description: update.description,
              source: update.source,
            },
          });
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
