import {extendType, nonNull, intArg, objectType, list, inputObjectType} from "nexus";
import {getCurrentSemester} from "../../utils";
import {IMyContext} from "../../interface";

export const classSchedule = objectType({
    name: "classSchedule",
    definition(t) {
        t.nonNull.int("id");
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
        t.nonNull.string('userId');
        t.string('semesterId');
    },
});

export const updateClassScheduleInput = inputObjectType({
    name: 'updateClassScheduleInput',
    definition(t) {
        t.nonNull.int('id');
        t.string('semesterId');
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
            resolve: async (_, __, {prisma, session}: IMyContext) => prisma.classSchedule.findMany({
                where: {userId: session.userId},
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
            resolve: async (_, {input}, {prisma}) => {
                let {userId, semesterId} = input;
                if (!userId) {
                    throw new Error("userId is required");
                }
                if (!semesterId) {
                    semesterId = getCurrentSemester();
                }

                return await prisma.classSchedule.create({
                    data: {
                        userId,
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
            resolve: async (_, { input }, { prisma }) => {
                const { update } = input;
                const { classScheduleId, classCode, sectionId } = update;

                const classRecord = await prisma.class.findFirst({
                    where: { classCode: classCode.split('-')[0] },
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
                    include: { class: true }
                });
            }
        });
    },
});