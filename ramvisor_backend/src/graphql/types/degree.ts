import {
    extendType,
    nonNull,
    objectType,
    inputObjectType,
} from "nexus";
import {authenticateUser, parseCSV} from "../../utils";
import {degreeColumnTypes, DegreeRequirement, IMyContext} from "../../interface";
import {degreeColumns, degreeHeaders, degreeIntColumns} from "../../constants";

export const degree = objectType({
    name: "degree",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("type");
        t.nonNull.list.string("coreCategories");
        t.nonNull.list.string("electiveCategories");
        t.nonNull.list.string("gatewayCategories");
        t.nonNull.float("numberOfCores");
        t.nonNull.float("numberOfElectives");
        t.list.field("semesters", {type: "semester"});
        t.list.field("users", {type: "user"});
    },
});

export const createDegreeInput = inputObjectType({
    name: "createDegreeInput",
    definition(t) {
        t.nonNull.string("name");
        t.nonNull.int("numberOfCores");
        t.nonNull.list.string("coreCategories");
        t.nonNull.list.string("gatewayCategories");
        t.nonNull.list.string("electiveCategories");
        t.nonNull.int("numberOfElectives");
    },
});

export const updateDegreeInput = inputObjectType({
    name: "updateDegreeInput",
    definition(t) {
        t.nonNull.int("id");
        t.string("name");
        t.list.string("coreCategories");
        t.list.string("gatewayCategories");
        t.list.string("electiveCategories");
        t.int("numberOfCores");
        t.int("numberOfElectives");
    },
});

export const deleteDegreeInput = inputObjectType({
    name: "deleteDegreeInput",
    definition(t) {
        t.nonNull.int("id");
    },
});

export const degreeQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllDegrees", {
            type: "degree",
            resolve: (_, __, {prisma}) => prisma.degree.findMany(),
        });

        t.field("getDegree", {
            type: "degree",
            resolve: (_, __, {prisma, req }: IMyContext) => {
                const userId = authenticateUser(req.session);
                return prisma.degree.findMany({where: {user: {some: {id: userId }}}})
            }
        });
    },
});

export const degreeMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createDegree", {
            type: "degree",
            args: {
                input: nonNull(createDegreeInput),
            },
            resolve: (_, {input}, {prisma}) =>
                prisma.degree.create({data: input}),
        });

        t.field("updateDegree", {
            type: "degree",
            args: {
                input: nonNull(updateDegreeInput),
            },
            resolve: (_, {input}, {prisma}) =>
                prisma.degree.update({
                    where: {id: input.id},
                    data: input,
                }),
        });

        t.field("deleteDegree", {
            type: "degree",
            args: {
                input: nonNull(deleteDegreeInput),
            },
            resolve: (_, {input}, {prisma}) =>
                prisma.degree.delete({where: {id: input.id}}),
        });

        t.field("createDegreeAndRequirements", {
            type: "Boolean",
            resolve: async (_, __, { prisma }: IMyContext) => {
                const degreeData = await parseCSV<degreeColumnTypes>(
                    "src/unc_degrees/Business_Admin.csv",
                    degreeHeaders,
                    degreeIntColumns
                );

                const degree = await prisma.degree.create({
                    data: {
                        name: "Business Administration",
                        type: "B.S.B.A.",
                        coreCategories: ["Core"],
                        electiveCategories: ["Electives"],
                        numberOfCores: 23,
                        numberOfElectives: 19.5,
                    },
                });

                const coreRequirement = await prisma.requirement.create({
                    data: {
                        degreeId: degree.id,
                        category: "Core",
                        classIds: [],
                        reqType: "CORE",
                    },
                });

                const electiveRequirement = await prisma.requirement.create({
                    data: {
                        degreeId: degree.id,
                        category: "Electives",
                        classIds: [],
                        reqType: "ELECTIVE",
                    },
                });

                const gatewayRequirement = await prisma.requirement.create({
                    data: {
                        degreeId: degree.id,
                        category: "Gateway",
                        classIds: [],
                        reqType: "GATEWAY",
                    }
                });

                let currentRequirement: DegreeRequirement | null = null;
                let courseGroup: number[] = [];

                for (let i = 0; i < degreeData.length; i++) {
                    const row = degreeData[i];
                    const course = row[degreeColumns.COURSE];
                    const type = row[degreeColumns.TYPE];

                    if (!course) {
                        if (currentRequirement && courseGroup.length > 0) {
                            await prisma.requirement.create({
                                data: {
                                    ...currentRequirement,
                                    classIds: courseGroup,
                                },
                            });
                            courseGroup = [];
                            currentRequirement = null;
                        }
                        continue;
                    }

                    if (course.toLowerCase().includes("choose")) {
                        if (currentRequirement) {
                            await prisma.requirement.create({
                                data: {
                                    ...currentRequirement,
                                    classIds: courseGroup,
                                },
                            });
                            courseGroup = [];
                        }

                        const categoryName = course.split(" ")[0];
                        const categoryChoose = course.split("(")[1].split(")")[0];
                        const category = `${categoryName}; ${categoryChoose}`;

                        await prisma.degree.update({
                            where: { id: degree.id },
                            data: {
                                [(type == 'Elective') ? "electiveCategories" : ((type == 'Gateway') ? "gatewayCategories" : "coreCategories")]: {
                                    push: category,
                                },
                            },
                        });

                        currentRequirement = {
                            degreeId: degree.id,
                            category: category,
                            classIds: [],
                            reqType: type.toUpperCase(),
                        };
                        continue;
                    }

                    const class_ = await prisma.class.findFirst({
                        where: { classCode: course }
                    });

                    if (class_) {
                        if (currentRequirement) {
                            courseGroup.push(class_.id);
                        } else {
                            const targetRequirement = type?.toLowerCase() === "elective"
                                ? electiveRequirement
                                : (type?.toLowerCase() === "gateway" ? gatewayRequirement : coreRequirement);

                            await prisma.requirement.update({
                                where: { id: targetRequirement.id },
                                data: {
                                    classIds: {
                                        push: class_.id,
                                    },
                                },
                            });
                        }
                    }
                }

                if (currentRequirement && courseGroup.length > 0) {
                    await prisma.requirement.create({
                        data: {
                            ...currentRequirement,
                            classIds: courseGroup,
                        },
                    });
                }
                return true;
            },
        });
    },
});
