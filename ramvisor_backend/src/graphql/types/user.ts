import {booleanArg, extendType, floatArg, inputObjectType, intArg, list, nonNull, objectType, stringArg,} from "nexus";
import {loginResolve, logoutResolve} from "../resolvers/loginResolver";
import {registerResolve} from "../resolvers/registerResolver";
import {PrismaClient} from "@prisma/client";

export const user = objectType({
    name: "user",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("email");
        t.string("university");
        t.boolean("isPremium");

        t.int("yearInUniversity");
        t.string("graduationSemesterName");
        t.float("gpa");
        t.float("attendancePercentage");
        t.float("assignmentCompletionPercentage");
        t.int("degreeId");
        t.list.int("takenClassIds");
        t.list.field("tasks", {type: "task"});
        t.list.field("classSchedules", {type: "classSchedule"});
        t.list.field("degreePlanners", {type: "degreePlanner"});
        t.field("degree", {type: "degree"});
    },
});

export const classTakenInput = inputObjectType({
    name: "classTakenInput",
    definition(t) {
        t.nonNull.string("id")
    },
})

export const classTakenResult = objectType({
    name: "classTakenResult",
    definition(t) {
        t.nonNull.list.int("classIds")
    }
})

export const graduationSemesterInput = inputObjectType({
    name: "graduationSemesterInput",
    definition(t) {
        t.nonNull.string("id")
        t.nonNull.string("semesterName");
        t.nonNull.int("year");
    }
})

export const userQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("getUser", {
            type: "user",
            args: {id: nonNull(stringArg())},
            resolve: (_, {id}, {prisma}: { prisma: PrismaClient }) =>
                prisma.user.findUnique({where: {id}}),
        });

        t.field("me", {
            type: "user",
            resolve: async (_, __, { prisma, session }): Promise<any> => {
                if (!session.userId) {
                    throw new Error("Not authenticated");
                }

                const user = await prisma.user.findUnique({
                    where: { id: session.userId }
                });

                if (!user) {
                    throw new Error("User not found");
                }

                return user;
            }
        });

        t.field("classTaken", {
            type: "classTakenResult",
            args: {
                input: nonNull(classTakenInput)
            },
            resolve: async (_, {input}, {prisma}: { prisma: PrismaClient }) => {
                const {id} = input
                const takenUserClasses = await prisma.user.findUnique({
                    where: {id},
                    select: {takenClassIds: true}
                });

                if (!takenUserClasses) {
                    throw new Error("User not found");
                }

                return takenUserClasses;
            },
        });

        t.field("getPremiumStatus", {
            type: "Boolean",
            args: {
                id: nonNull(stringArg())
            },
            resolve: async (_, {id}, {prisma}: { prisma: PrismaClient }) => {
                const user = await prisma.user.findUnique({
                    where: {id: id},
                    select: {isPremium: true}
                })

                return user?.isPremium ?? false;
            }
        })

        t.field("getGraduationSemester", {
            type: "String",
            args: {
                id: nonNull(stringArg())
            },
            resolve: async (_, {id}, {prisma}: { prisma: PrismaClient }) => {
                try {
                    const user = await prisma.user.findUnique({
                        where: { id },
                        select: { graduationSemesterName: true }
                    });

                    if (!user) {
                        throw new Error("User not found");
                    }

                    return user.graduationSemesterName;
                } catch (error) {
                    throw new Error(`Error retrieving graduation semester: ${(error as Error).message}`);
                }
            }
        })
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
            resolve: (_, args, {prisma}) =>
                prisma.user.update({
                    where: {id: args.id},
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
                takenClassIds: list(intArg()),
            },
            resolve: (_, args, {prisma}: { prisma: PrismaClient }) =>
                prisma.user.update({
                    where: {id: args.id},
                    data: args,
                }),
        })

        t.field("setUserGraduationSemester", {
            type: "user",
            args: {
                input: nonNull(graduationSemesterInput)
            },
            resolve: (_, { input }, {prisma}: { prisma: PrismaClient }) => {
                const { semesterName, year, id } = input;
                const graduationSemester = `${semesterName} ${year}`

                return prisma.user.update({
                    where: {id: id},
                    data: {
                        graduationSemesterName: graduationSemester,
                    }
                })
            }
        })

        t.field("updatePremiumStatus", {
            type: "user",
            args: {
                id: nonNull(stringArg()),
                isPremium: nonNull(booleanArg()),
            },
            resolve: (_, {id, isPremium}, {prisma}: { prisma: PrismaClient }) =>
                prisma.user.update({
                    where: {id: id},
                    data: {
                        isPremium: isPremium
                    },
                }),
        })
    },
});
