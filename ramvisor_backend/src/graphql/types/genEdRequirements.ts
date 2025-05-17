import { extendType, inputObjectType, intArg, nonNull, objectType, stringArg } from "nexus";
import { IMyContext } from "../../interface";
import {GenEdData} from "../../unc_degrees/GenEdData";

// Nexus object definition for GenEdCategory
export const GenEdCategory = objectType({
    name: "GenEdCategory",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.list.field("requirements", {
            type: "GenEdRequirement",
            resolve: (parent, _, { prisma }: IMyContext) => {
                return prisma.genEdRequirement.findMany({
                    where: { categoryId: parent.id }
                });
            }
        });
    },
});

// Nexus object definition for GenEdRequirement
export const GenEdRequirement = objectType({
    name: "GenEdRequirement",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("code");
        t.nonNull.string("name");
        t.nonNull.string("hours");
        t.nonNull.int("categoryId");
        t.nonNull.list.string("subTypes");
        t.field("category", {
            type: "GenEdCategory",
            resolve: (parent, _, { prisma }: IMyContext) => {
                return prisma.genEdCategory.findUnique({
                    where: { id: parent.categoryId }
                });
            }
        });
    },
});

// Input type for creating a GenEdCategory
export const createGenEdCategoryInput = inputObjectType({
    name: "CreateGenEdCategoryInput",
    definition(t) {
        t.nonNull.string("name");
    },
});

// Input type for creating a GenEdRequirement
export const createGenEdRequirementInput = inputObjectType({
    name: "CreateGenEdRequirementInput",
    definition(t) {
        t.nonNull.string("code");
        t.nonNull.string("name");
        t.nonNull.string("hours");
        t.nonNull.int("categoryId");
        t.list.string("subTypes");
    },
});

// Input type for updating a GenEdCategory
export const updateGenEdCategoryInput = inputObjectType({
    name: "UpdateGenEdCategoryInput",
    definition(t) {
        t.nonNull.int("id");
        t.string("name");
    },
});

// Input type for updating a GenEdRequirement
export const updateGenEdRequirementInput = inputObjectType({
    name: "UpdateGenEdRequirementInput",
    definition(t) {
        t.nonNull.int("id");
        t.string("code");
        t.string("name");
        t.string("hours");
        t.int("categoryId");
        t.list.string("subTypes");
    },
});

// Query extensions for GenEdCategory and GenEdRequirement
export const genEdQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllGenEdCategories", {
            type: "GenEdCategory",
            resolve: (_, __, { prisma }: IMyContext) => {
                return prisma.genEdCategory.findMany();
            },
        });

        t.field("getGenEdCategory", {
            type: "GenEdCategory",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_, { id }, { prisma }: IMyContext) => {
                return prisma.genEdCategory.findUnique({
                    where: { id },
                });
            },
        });

        t.field("getGenEdCategoryByName", {
            type: "GenEdCategory",
            args: {
                name: nonNull(stringArg()),
            },
            resolve: (_, { name }, { prisma }: IMyContext) => {
                return prisma.genEdCategory.findFirst({
                    where: { name },
                });
            },
        });

        t.list.field("getAllGenEdRequirements", {
            type: "GenEdRequirement",
            resolve: (_, __, { prisma }: IMyContext) => {
                return prisma.genEdRequirement.findMany();
            },
        });

        t.list.field("getGenEdRequirementsByCategory", {
            type: "GenEdRequirement",
            args: {
                categoryId: nonNull(intArg()),
            },
            resolve: (_, { categoryId }, { prisma }: IMyContext) => {
                return prisma.genEdRequirement.findMany({
                    where: { categoryId },
                });
            },
        });

        t.field("getGenEdRequirementByCode", {
            type: "GenEdRequirement",
            args: {
                code: nonNull(stringArg()),
            },
            resolve: (_, { code }, { prisma }: IMyContext) => {
                return prisma.genEdRequirement.findFirst({
                    where: { code },
                });
            },
        });
    },
});

// Mutation extensions for GenEdCategory and GenEdRequirement
export const genEdMutation = extendType({
    type: "Mutation",
    definition(t) {
        // Standard CRUD operations for GenEdCategory
        t.field("createGenEdCategory", {
            type: "GenEdCategory",
            args: {
                data: nonNull(createGenEdCategoryInput),
            },
            resolve: (_, { data }, { prisma }: IMyContext) => {
                return prisma.genEdCategory.create({ data });
            },
        });

        t.field("updateGenEdCategory", {
            type: "GenEdCategory",
            args: {
                data: nonNull(updateGenEdCategoryInput),
            },
            resolve: (_, { data }, { prisma }: IMyContext) => {
                const { id, ...rest } = data;
                return prisma.genEdCategory.update({
                    where: { id },
                    data: rest,
                });
            },
        });

        t.field("deleteGenEdCategory", {
            type: "GenEdCategory",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_, { id }, { prisma }: IMyContext) => {
                return prisma.genEdCategory.delete({
                    where: { id },
                });
            },
        });

        // Standard CRUD operations for GenEdRequirement
        t.field("createGenEdRequirement", {
            type: "GenEdRequirement",
            args: {
                data: nonNull(createGenEdRequirementInput),
            },
            resolve: (_, { data }, { prisma }: IMyContext) => {
                return prisma.genEdRequirement.create({ data });
            },
        });

        t.field("updateGenEdRequirement", {
            type: "GenEdRequirement",
            args: {
                data: nonNull(updateGenEdRequirementInput),
            },
            resolve: (_, { data }, { prisma }: IMyContext) => {
                const { id, ...rest } = data;
                return prisma.genEdRequirement.update({
                    where: { id },
                    data: rest,
                });
            },
        });

        t.field("deleteGenEdRequirement", {
            type: "GenEdRequirement",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_, { id }, { prisma }: IMyContext) => {
                return prisma.genEdRequirement.delete({
                    where: { id },
                });
            },
        });

        // Special seed function that uses the GenEdData directly
        t.field("seedGenEdRequirements", {
            type: "Boolean",
            resolve: async (_, __, { prisma }: IMyContext) => {
                try {
                    console.log("Starting Gen Ed requirements seeding...");

                    // First clear any existing data if needed
                    await prisma.genEdRequirement.deleteMany({});
                    await prisma.genEdCategory.deleteMany({});

                    // Process each category from the GenEdData
                    for (const category of GenEdData.categories) {
                        console.log(`Creating category: ${category.name}`);

                        // Create the category
                        const createdCategory = await prisma.genEdCategory.create({
                            data: {
                                name: category.name
                            }
                        });

                        // Create requirements for this category if they exist
                        if (category.requirements && category.requirements.length > 0) {
                            for (const req of category.requirements) {
                                console.log(`Creating requirement: ${req.name}`);

                                // Handle cases where code might be missing
                                const code = req.code || req.name;

                                // Initialize subTypes as empty array
                                let subTypes: string[] = [];

                                // Special case for "High-Impact Experience" - the only one with types in your data
                                if (req.name === "High-Impact Experience or second Research and Discovery" &&
                                    (req as any).types &&
                                    Array.isArray((req as any).types)) {
                                    subTypes = (req as any).types;
                                }

                                await prisma.genEdRequirement.create({
                                    data: {
                                        code: code,
                                        name: req.name,
                                        hours: String(req.hours),
                                        categoryId: createdCategory.id,
                                        subTypes: subTypes
                                    }
                                });
                            }
                        }
                    }

                    console.log("Successfully seeded Gen Ed requirements");
                    return true;
                } catch (error) {
                    console.error("Error seeding Gen Ed requirements:", error);
                    return false;
                }
            },
        });
    },
});