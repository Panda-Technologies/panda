import { objectType, extendType, nonNull, stringArg, intArg, floatArg } from "nexus";
import { loginResolve, logoutResolve } from "../resolvers/loginResolver";
import { registerResolve } from "../resolvers/registerResolver";

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('email');
    t.string('university');
    t.int('yearInUniversity');
    t.float('gpa');
    t.float('attendancePercentage');
    t.float('assignmentCompletionPercentage');
    t.int('degreeId');
    t.list.field('tasks', { type: 'Task' });
    t.list.field('classSchedules', { type: 'ClassSchedule' });
    t.list.field('degreeSchedules', { type: 'DegreeSchedule' });
    t.field('degree', { type: 'Degree' });
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getUser', {
      type: 'User',
      args: { id: nonNull(intArg()) },
      resolve: (_, { id }, { prisma }) => prisma.user.findUnique({ where: { id } })
    });
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: loginResolve
    });

    t.field('logout', {
      type: 'Boolean',
      resolve: logoutResolve
    });

    t.field('register', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: registerResolve
    });

    t.field('updateUserProfile', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        university: nonNull(stringArg()),
        yearInUniversity: nonNull(intArg()),
        degreeId: nonNull(intArg())
      },
      resolve: (_, args, { prisma }) => prisma.user.update({
        where: { id: args.id },
        data: args
      })
    });

    t.field('updateUserAcademicInfo', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        gpa: floatArg(),
        attendancePercentage: floatArg(),
        assignmentCompletionPercentage: floatArg()
      },
      resolve: (_, args, { prisma }) => prisma.user.update({
        where: { id: args.id },
        data: args
      })
    });
  },
});