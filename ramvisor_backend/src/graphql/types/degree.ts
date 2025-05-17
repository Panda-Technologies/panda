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

                console.log(`Parsed ${degreeData.length} rows from CSV`);

                const degree = await prisma.degree.create({
                    data: {
                        name: "Business Administration",
                        type: "B.S.B.A.",
                        coreCategories: ["Core"],
                        electiveCategories: ["Electives"],
                        gatewayCategories: ["Gateway"],
                        numberOfCores: 23,
                        numberOfElectives: 19.5,
                    },
                });

                console.log(`Created degree with ID: ${degree.id}`);

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

                // Track current requirement group and courses
                let currentRequirement: DegreeRequirement | null = null;
                let courseGroup: number[] = [];

                // Track which courses belong to which groups to prevent duplicates
                const courseAssignments: { [courseCode: string]: string } = {};

                // Process the CSV row by row
                for (let i = 0; i < degreeData.length; i++) {
                    // Normalize the course and type strings to replace non-breaking spaces with a normal space
                    const rawCourse = degreeData[i][degreeColumns.COURSE] || "";
                    const course = rawCourse.replace(/\u00A0/g, " ").trim();
                    const rawType = degreeData[i][degreeColumns.TYPE] || "";
                    const type = rawType.replace(/\u00A0/g, " ").trim();

                    console.log(`Processing row ${i}: Course="${course}", Type="${type}"`);

                    // Skip header row
                    if (course === "Course") {
                        continue;
                    }

                    // Handle empty rows: finalize any active requirement group regardless of whether courses have been added
                    if (!course) {
                        if (currentRequirement) {
                            console.log(`Finalizing group ${currentRequirement.category} due to empty row at line ${i}`);
                            await prisma.requirement.create({
                                data: {
                                    ...currentRequirement,
                                    classIds: courseGroup,
                                },
                            });
                            // Always reset the tracking variables so that subsequent rows start fresh
                            courseGroup = [];
                            currentRequirement = null;
                        }
                        continue;
                    }

                    // Check if this is a special category definition (containing a choice pattern)
                    const isCategoryDefinition =
                        course.toLowerCase().includes("choose") ||
                        (course.includes("(") && course.includes(")"));

                    if (isCategoryDefinition) {
                        // Finalize any previous requirement group before starting a new one.
                        if (currentRequirement && courseGroup.length > 0) {
                            console.log(`Finalizing previous group ${currentRequirement.category} before new category at line ${i}`);
                            await prisma.requirement.create({
                                data: {
                                    ...currentRequirement,
                                    classIds: courseGroup,
                                },
                            });
                            courseGroup = [];
                        }

                        // Extract category name and details
                        let categoryName: string, chooseDetails: string;
                        if (course.includes("(") && course.includes(")")) {
                            // Format like "Category Name (choose X of Y)"
                            categoryName = course.split("(")[0].trim();
                            try {
                                chooseDetails = course.split("(")[1].split(")")[0].trim();
                            } catch (error) {
                                chooseDetails = "choose 1";
                            }
                        } else if (course.toLowerCase().includes("choose")) {
                            // Format like "Choose one from the following"
                            const parts = course.split(" ");
                            categoryName = parts[0].trim(); // First word as category name
                            chooseDetails = course.substring(categoryName.length).trim();
                        } else {
                            // Other category definition format
                            categoryName = course;
                            chooseDetails = "choose 1";
                        }
                        const category = `${categoryName}; ${chooseDetails}`;
                        console.log(`Identified new category: "${category}" with type "${type}"`);

                        // Determine the requirement type based on the row's type
                        const reqType = type?.toUpperCase() || "CORE";

                        // Update the degree with this category in the appropriate list
                        const categoryField =
                            reqType === "ELECTIVE"
                                ? "electiveCategories"
                                : reqType === "GATEWAY"
                                    ? "gatewayCategories"
                                    : "coreCategories";

                        await prisma.degree.update({
                            where: { id: degree.id },
                            data: {
                                [categoryField]: {
                                    push: category,
                                },
                            },
                        });

                        // Create a new requirement object for this category
                        currentRequirement = {
                            degreeId: degree.id,
                            category,
                            classIds: [],
                            reqType,
                        };

                        console.log(`Started tracking new category: ${category} with type ${reqType}`);
                        continue;
                    }

                    // Update regex to also allow non-breaking spaces
                    const courseCodePattern = /^[A-Z]{3,4}[ \u00A0]+\d{3}[A-Z]?$/i;
                    if (!courseCodePattern.test(course)) {
                        console.log(`Skipping invalid course code: "${course}" at line ${i}`);
                        continue;
                    }

                    // Find the class in the database using the sanitized course code
                    console.log(`Looking up course in DB: "${course}"`);
                    const class_ = await prisma.class.findFirst({
                        where: { classCode: course },
                    });

                    if (!class_) {
                        console.log(`Class not found in database: "${course}"`);
                        continue;
                    }

                    // Check if course has already been assigned to prevent duplicates
                    if (courseAssignments[course]) {
                        console.log(`Course ${course} already assigned to ${courseAssignments[course]}`);
                        continue;
                    }

                    // Handle course assignment
                    if (currentRequirement) {
                        console.log(`Adding "${course}" to group "${currentRequirement.category}" at line ${i}`);
                        courseGroup.push(class_.id);
                        courseAssignments[course] = currentRequirement.category;
                    } else {
                        // No current group, add to default requirement based on type
                        const targetRequirement =
                            type.toLowerCase() === "elective"
                                ? electiveRequirement
                                : type.toLowerCase() === "gateway"
                                    ? gatewayRequirement
                                    : coreRequirement;

                        console.log(`Adding "${course}" to default ${type} requirement at line ${i}`);
                        await prisma.requirement.update({
                            where: { id: targetRequirement.id },
                            data: {
                                classIds: { push: class_.id },
                            },
                        });
                        courseAssignments[course] = `default ${type}`;
                    }
                }

                if (currentRequirement) {
                    console.log(`Finalizing final group ${currentRequirement.category} with ${courseGroup.length} courses`);
                    await prisma.requirement.create({
                        data: {
                            ...currentRequirement,
                            classIds: courseGroup,
                        },
                    });
                }

                return true;
            },
        })
    },
});
