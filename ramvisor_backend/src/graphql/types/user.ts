import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  floatArg,
  list,
} from "nexus";
import { loginResolve, logoutResolve } from "../resolvers/loginResolver";
import { registerResolve } from "../resolvers/registerResolver";
import { PrismaClient } from "@prisma/client";

export const user = objectType({
  name: "user",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("email");
    t.string("university");
    t.int("yearInUniversity");
    t.float("gpa");
    t.float("attendancePercentage");
    t.float("assignmentCompletionPercentage");
    t.int("degreeId");
    t.list.int("takenClassIds");
    t.list.field("tasks", { type: "task" });
    t.list.field("classSchedules", { type: "classSchedule" });
    t.list.field("degreePlanners", { type: "degreePlanner" });
    t.field("degree", { type: "degree" });
  },
});

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getUser", {
      type: "user",
      args: { id: nonNull(stringArg()) },
      resolve: (_, { id }, { prisma }: { prisma: PrismaClient }) =>
        prisma.user.findUnique({ where: { id } }),
    });

    t.field("classTaken", {
      type: "Boolean",
      args: {
        id: nonNull(stringArg()),
        classId: nonNull(intArg()),
      },
      resolve: async (_, { id, classId }, { prisma }: { prisma: PrismaClient }) => {
        const user = await prisma.user.findUnique({
          where: { id },
          select: { takenClassIds: true },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user.takenClassIds.includes(classId);
      },
    });
  },
});

export const userMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("login", {
      type: "Boolean",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: loginResolve,
    });

    t.field("logout", {
      type: "Boolean",
      resolve: logoutResolve,
    });

    t.field("register", {
      type: "Boolean",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: registerResolve,
    });

    t.field("updateUserProfile", {
      type: "user",
      args: {
        id: nonNull(stringArg()),
        university: nonNull(stringArg()),
        yearInUniversity: nonNull(intArg()),
        degreeId: nonNull(intArg()),
      },
      resolve: (_, args, { prisma }) =>
        prisma.user.update({
          where: { id: args.id },
          data: args,
        }),
    });

    t.field("updateUserAcademicInfo", {
      type: "user",
      args: {
        id: nonNull(stringArg()),
        gpa: floatArg(),
        attendancePercentage: floatArg(),
        assignmentCompletionPercentage: floatArg(),
        takenClassIds: list(stringArg()),
      },
      resolve: (_, args, { prisma }: { prisma: PrismaClient }) =>
        prisma.user.update({
          where: { id: args.id },
          data: args,
        }),
    });
  },
});
