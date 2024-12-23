import {extendType, nonNull, intArg, objectType, list, inputObjectType} from "nexus";
import {getCurrentSemester} from "../../utils";
import {IMyContext} from "../../interface";

export const classSchedule = objectType({
    name: "classSchedule",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("userId");
        t.nonNull.string("semesterId");
        t.field("user", {type: "user"});
        t.list.field("entries", {type: "classScheduleEntry"});
    },
});

export const classScheduleEntry = objectType({
    name: "classScheduleEntry",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.int("classScheduleId");
        t.nonNull.int("classId");
        t.nonNull.int("sectionId");
        t.field("class", {type: "Class"});
        t.field("classSchedule", {type: "classSchedule"});
    },
});

export const createClassScheduleInput = inputObjectType({
    name: 'createClassScheduleInput',
    definition(t) {
        t.string('semesterId');
        t.string('title');
    },
});

export const updateClassScheduleInput = inputObjectType({
    name: 'updateClassScheduleInput',
    definition(t) {
        t.nonNull.int('id');
        t.string('title');
        t.string('semesterId');
    },
});

export const resetClassScheduleInput = inputObjectType({
    name: 'resetClassScheduleInput',
    definition(t) {
        t.nonNull.string('id');
        t.nonNull.field('update', {
            type: inputObjectType({
                name: 'resetClassScheduleUpdateInput',
                definition(t) {
                    t.nonNull.int('id');
                }
            })
        })
    },
});

export const classScheduleUpdateInput = inputObjectType({
    name: 'ClassScheduleUpdateInput',
    definition(t) {
        t.nonNull.int('classScheduleId');
        t.nonNull.string('classCode');
        t.nonNull.string('sectionId');
    },
});

export const addClassToScheduleInput = inputObjectType({
    name: 'addClassToScheduleInput',
    definition(t) {
        t.nonNull.string('id');
        t.nonNull.field('update', {type: 'ClassScheduleUpdateInput'});
    },
});

export const removeClassFromScheduleInput = inputObjectType({
    name: 'removeClassFromScheduleInput',
    definition(t) {
        t.nonNull.string('id');
        t.nonNull.field('update', {type: 'ClassScheduleUpdateInput'});
    },
});

export const classScheduleQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('getClassSchedules', {
            type: 'classSchedule',
            resolve: async (_, __, {prisma, req}: IMyContext) => {
                const userId = req.session.userId;
                if (!userId) {
                    throw new Error("User not authenticated");
                }

                const schedules = await prisma.classSchedule.findMany({
                    where: {userId: userId},
                    include: {
                        entries: {
                            include: {
                                class: {
                                    include: {
                                        sections: true
                                    }
                                }
                            }
                        }
                    }
                })
                console.log("Schedules", schedules);
                if (!schedules) {
                    const defaultSchedule = await prisma.classSchedule.create({
                        data: {
                            userId: userId,
                            title: 'Default Schedule',
                            semesterId: getCurrentSemester(),
                            entries: {
                                create: []
                            }
                        }
                    })
                    console.log("Default Schedule", defaultSchedule);
                    return [defaultSchedule];
                }
                return schedules;
            }
        });

        t.field('getClassScheduleEntries', {
            type: list('classScheduleEntry'),
            args: {
                classScheduleId: nonNull(intArg())
            },
            resolve: (_, {classScheduleId}, {prisma}) => prisma.classScheduleEntry.findMany({
                where: {classScheduleId},
                include: {class: true}
            })
        });
    }
});

export const classScheduleMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createClassSchedule", {
            type: "classSchedule",
            args: {
                input: createClassScheduleInput,
            },
            resolve: async (_, {input}, {prisma, req}: IMyContext) => {
                let {semesterId, title} = input;
                const userId = req.session.userId;
                if (!userId) {
                    throw new Error("User not authenticated");
                }
                if (!semesterId) {
                    semesterId = getCurrentSemester();
                }

                return prisma.classSchedule.create({
                    data: {
                        userId,
                        title,
                        semesterId,
                        entries: {
                            create: []
                        }
                    },
                    include: {
                        entries: true
                    }
                });
            },
        });

        t.field("updateClassSchedule", {
            type: "classSchedule",
            args: {
                input: nonNull(updateClassScheduleInput),
            },
            resolve: (_, {input}, {prisma}) =>
                prisma.classSchedule.update({
                    where: {id: input.id},
                    data: input,
                    include: {entries: true},
                }),
        });

        t.field("resetClassSchedule", {
            type: "classSchedule",
            args: {
                input: nonNull(resetClassScheduleInput),
            },
            resolve: (_, {input}, {prisma}) =>
                prisma.classSchedule.update({
                    where: {id: input.update.id},
                    data: {
                        entries: {
                            deleteMany: {}
                        }
                    }
                }),
        });

        t.field("deleteClassSchedule", {
            type: "classSchedule",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_, {id}, {prisma}) =>
                prisma.classSchedule.delete({
                    where: {id},
                    include: {entries: true},
                }),
        });

        t.field('addClassToClassSchedule', {
            type: 'classScheduleEntry',
            args: {
                input: nonNull('addClassToScheduleInput'),
            },
            resolve: async (_, {input}, {prisma}) => {
                const {update} = input;
                const {classScheduleId, classCode, sectionId} = update;

                const classRecord = await prisma.class.findFirst({
                    where: {classCode: classCode.split('-')[0]},
                });

                if (!classRecord) {
                    throw new Error(`Class with code ${classCode} not found`);
                }

                return await prisma.classScheduleEntry.create({
                    data: {
                        classScheduleId: classScheduleId,
                        classId: classRecord.id,
                        sectionId: parseInt(sectionId)
                    },
                    include: {class: true}
                });
            }
        });

        t.field('removeClassFromClassSchedule', {
            type: 'classScheduleEntry',
            args: {
                input: nonNull(removeClassFromScheduleInput),
            },
            resolve: async (_, {input}, {prisma}) => {
                const {update} = input;
                const {classScheduleId, classCode, sectionId} = update;

                const classRecord = await prisma.class.findFirst({
                    where: {classCode: classCode.split('-')[0]},
                });

                if (!classRecord) {
                    throw new Error(`Class with code ${classCode} not found`);
                }

                const entry = await prisma.classScheduleEntry.findFirst({
                    where: {
                        classScheduleId,
                        classId: classRecord.id,
                        sectionId: parseInt(sectionId)
                    }
                });

                if (!entry) {
                    throw new Error('Class schedule entry not found');
                }

                return await prisma.classScheduleEntry.delete({
                    where: {
                        id: entry.id
                    },
                    include: {class: true}
                });
            }
        });
    },
});