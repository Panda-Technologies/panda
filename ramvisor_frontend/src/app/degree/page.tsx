"use client";

import React, {useState, useCallback, useMemo, useEffect} from "react";
import {useGetIdentity, useCustom, useList, useUpdate, useDelete, useCreate} from "@refinedev/core";
import {message} from "antd";
import {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    Class,
    ClassTakenResult,
    Degree,
    DegreePlanner,
    Requirement,
    Semester,
} from "@graphql/generated/graphql";
import {
    CLASS_TAKEN_QUERY,
    GET_CLASSES_QUERY,
    GET_DEGREE_PLANNERS_QUERY,
    GET_DEGREE_QUERY,
    GET_GRADUATION_SEMESTER_QUERY,
    GET_PREMIUM_STATUS_QUERY,
    GET_REQUIREMENTS_QUERY,
} from "@graphql/queries";
import {
    REMOVE_CLASS_FROM_SEMESTER_MUTATION,
    RESET_DEGREE_PLANNER_MUTATION,
    UPDATE_SEMESTER_MUTATION,
} from "@graphql/mutations";
import DegreeSearch from "@components/degree/search";
import DegreeHeader from "@components/degree/header";
import NewPlannerModal from "@components/degree/new-planner";
import RequirementItem from "@components/degree/requirement-item";
import {SortableCourse} from "@components/degree/sortable-course";
import DroppableSemester from "@components/degree/droppable-semester";
import useDataFetch from "@components/degree/data-fetch";

// Custom hooks using FetchData generic

const useFetchPlanners = (userId: string | undefined) => {
    const { data, isLoading, error } = useDataFetch<{ getDegreePlanners: DegreePlanner[] }>(
        GET_DEGREE_PLANNERS_QUERY,
        { userId },
        "planners"
    );
    return { planners: data?.getDegreePlanners, isLoading, error };
};

const useFetchRequirements = (degreeId: number | null) => {
    const { data, isLoading, error } = useDataFetch<{ getRequirements: Requirement[] }>(
        GET_REQUIREMENTS_QUERY,
        { degreeId },
        "requirements"
    );
    return { requirementsData: data?.getRequirements, isLoading, error };
};

const useFetchDegrees = (userId: string | undefined) => {
    const { data, isLoading, error } = useDataFetch<{ getDegrees: Degree[] }>(
        GET_DEGREE_QUERY,
        { userId },
        "degrees"
    );
    return { degreesData: data?.getDegrees, isLoading, error };
};

const useCheckIsPremium = (userId: string | undefined) => {
    const { data, isLoading, error } = useDataFetch<{ getPremiumStatus: boolean }>(
        GET_PREMIUM_STATUS_QUERY,
        { id: userId },
        "premium status"
    );
    return { isPremium: data?.getPremiumStatus ?? false, isLoading, error };
};

const useGetGraduationSemester = (userId: string | undefined) => {
    const { data, isLoading, error} = useDataFetch<{ getGraduationSemester: string }>(
        GET_GRADUATION_SEMESTER_QUERY,
        { id: userId },
        "graduation semester"
    );
    return { graduationSemester: data?.getGraduationSemester ?? false, isLoading, error };
};

const useGetCheckIsTaken = (userId: string) => {
    const { data, isLoading, error } = useDataFetch<{ getCheckIsTaken: ClassTakenResult }>(
        CLASS_TAKEN_QUERY,
        { id: userId },
        "class taken result"
    );
    return { classTakenData: data?.getCheckIsTaken, isLoading, error };
};

// Main component
const DegreePage: React.FC = () => {
    // State declarations
    const [activeId, setActiveId] = useState<number | null>(null);
    const [activeSemester, setActiveSemester] = useState<number | null>(null);
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [activePlanner, setActivePlanner] = useState<DegreePlanner | null>(null);
    const [showRequirementDetails, setShowRequirementDetails] = useState<boolean>(false);
    const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
    const [majorRequirements, setMajorRequirements] = useState<Map<Degree, Requirement[]>>(new Map());
    const [activeDegree, setActiveDegree] = useState<Degree | null>(null);
    const [showNewPlannerModal, setShowNewPlannerModal] = useState<boolean>(false);
    const [showAIPlanModal, setShowAIPlanModal] = useState<boolean>(false);

    // Identity and user ID
    const {data: identity} = useGetIdentity<{ id: string }>();
    const userId = useMemo(() => identity?.id, [identity]);

    // Custom hooks
    const {isPremium} = useCheckIsPremium(userId);
    const {graduationSemester} = useGetGraduationSemester(userId);
    const {planners, isLoading: plannersLoading} = useFetchPlanners(userId);
    const {degreesData, isLoading: degreesLoading} = useFetchDegrees(userId);
    const {classTakenData, isLoading, error} = useGetCheckIsTaken(userId ?? "");

    // Fetch requirements for the first and second degree
    const firstDegreeId = useMemo(() => degreesData?.[0]?.id ?? null, [degreesData]);
    const secondDegreeId = useMemo(() => degreesData?.[1]?.id ?? null, [degreesData]);

    const {requirementsData: firstMajorReq, isLoading: firstMajorReqLoading} = useFetchRequirements(firstDegreeId);
    const {requirementsData: secondMajorReq, isLoading: secondMajorReqLoading} = useFetchRequirements(secondDegreeId);

    // Fetch courses
    const {
        data: coursesData,
        isLoading: coursesLoading,
        error: coursesError,
    } = useList<Class>({
        resource: "classes",
        meta: {
            gqlQuery: GET_CLASSES_QUERY,
        },
    });

    // Memoize courses map
    const coursesMap = useMemo(() => {
        const map = new Map<number, Class>();
        coursesData?.data?.forEach((course) => {
            if (course) map.set(course.id, course);
        });
        return map;
    }, [coursesData]);

    // Get course function
    const getCourse = useCallback(
        (classId: number) => coursesMap.get(classId),
        [coursesMap]
    );

    // Memoize taken courses Set
    const takenCoursesSet: Set<number> = useMemo(() => {
        if (classTakenData) {
            let takenClassesSet: Set<number>
            try {
                takenClassesSet = new Set(
                    classTakenData.classIds
                        .filter((classId): classId is number => classId !== undefined && classId !== null) // Filter out invalid classIds)
                );
                if (takenClassesSet && takenClassesSet.size > 0) {
                    return takenClassesSet;
                }
            } catch (error) {
                console.error('Error checking taken classes:', error);
            }
        }
        return new Set<number>();
    }, [classTakenData])

    // Get Filtered Taken Courses
    const filterTakenCourses = useCallback((classIds: number[]): number[] => {
        return classIds.filter((classId) => takenCoursesSet.has(classId));
    }, [takenCoursesSet]);

    // Mutations
    const {mutate: updatePlanner} = useUpdate();
    const {mutate: deletePlanner} = useDelete();
    const {mutate: removeClassFromSemester} = useDelete();
    const {mutate: createPlanner} = useCreate();

    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    // Effect to set active planner and semesters
    useEffect(() => {
        if (planners && planners.length > 0) {
            const firstPlanner = planners[0];
            setActivePlanner(firstPlanner);
            setSemesters((firstPlanner?.semester || []).filter((semester): semester is Semester => semester !== null));
        }
    }, [planners]);

    // Effect to set major requirements
    useEffect(() => {
        if (degreesData && firstMajorReq && secondMajorReq) {
            const majorReqMap = new Map<Degree, Requirement[]>();

            if (degreesData[0]) {
                majorReqMap.set(degreesData[0], firstMajorReq);
            }

            if (degreesData[1]) {
                majorReqMap.set(degreesData[1], secondMajorReq);
            }

            setMajorRequirements(majorReqMap);
        }
    }, [degreesData, firstMajorReq, secondMajorReq]);


    // Drag and drop handlers
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as number);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const {over} = event;
        if (over?.data.current && (over.data.current as any).type === "semester") {
            setActiveSemester(over.id as number);
        } else {
            setActiveSemester(null);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over || !over.data.current) {
            setActiveId(null);
            setActiveSemester(null);
            return;
        }

        if ((over.data.current as any).type === "Semester") {
            handleDropIntoSemester(activeId as number, over.id as number);
        }

        setActiveId(null);
        setActiveSemester(null);
    };

    const handleDropIntoSemester = useCallback(
        (courseId: number, semesterId: number) => {
            const course = getCourse(courseId);
            if (!course) return;

            setSemesters((prevSemesters) => {
                return prevSemesters.map((semester) => {
                    if (semester.id === semesterId) {
                        if ((semester.credits ?? 0) + course.credits > 18) {
                            message.error("Cannot add course. It would exceed the 18 credit limit.");
                            return semester;
                        }

                        if (semester.entries?.some((c) => c?.classId === courseId)) {
                            return semester;
                        }

                        const updatedCourses = [
                            ...(semester.entries
                                ?.map((e) => e?.classId !== undefined ? getCourse(e.classId) : null)
                                .filter((course): course is Class => course !== null) ?? []),
                            course,
                        ];
                        const updatedCredits = updatedCourses.reduce(
                            (sum, c) => sum + (c?.credits ?? 0),
                            0
                        );

                        message.success(`Added ${course.title} to ${semester.name}`);

                        return {
                            ...semester,
                            courses: updatedCourses,
                            credits: updatedCredits,
                        };
                    }
                    return semester;
                });
            });

            updatePlanner(
                {
                    resource: "semesters",
                    id: semesterId,
                    values: {
                        id: semesterId,
                        name: semesters.find((s) => s.id === semesterId)?.name,
                        entries: semesters.find((s) => s.id === semesterId)?.entries,
                    },
                    meta: {
                        gqlMutation: UPDATE_SEMESTER_MUTATION,
                    },
                },
                {
                    onSuccess: () => {
                        message.success("Course added to semester successfully");
                    },
                    onError: (error) => {
                        message.error("Failed to add course to semester");
                        console.error("Error updating semester:", error);
                        // Revert the local state change
                        setSemesters((prevSemesters) => {
                            return prevSemesters.map((semester) => {
                                if (semester.id === semesterId) {
                                    const updatedCourses = semester.entries?.filter((c) => c?.id !== courseId);
                                    const updatedCredits = updatedCourses?.reduce(
                                        (sum, e) => sum + (e ? getCourse(e.classId)?.credits ?? 0 : 0),
                                        0
                                    );
                                    return {
                                        ...semester,
                                        courses: updatedCourses,
                                        credits: updatedCredits ?? 0,
                                    };
                                }
                                return semester;
                            });
                        });
                    },
                }
            );
        },
        [getCourse, semesters, updatePlanner]
    );

    const getDegreeScheduleEntryId = useCallback((courseId: number) => {
        return semesters.flatMap((semester) => semester.entries)
            .find((entry) => entry?.classId === courseId)?.id;
    }, [semesters]);

    const removeFromSemester = useCallback((semesterId: number, courseId: number) => {
        removeClassFromSemester({
                resource: "degree",
                id: courseId,
                values: {
                    classId: courseId,
                    semesterId: semesterId,
                },
                meta: {
                    gqlMutation: REMOVE_CLASS_FROM_SEMESTER_MUTATION,
                },
            },
            {
                onSuccess: () => {
                    message.success("Course removed from semester successfully");
                    // Update local state
                    setSemesters((prevSemesters) =>
                        prevSemesters.map((semester) =>
                            semester.id === semesterId
                                ? {
                                    ...semester,
                                    entries: semester.entries?.filter((entry) => entry?.classId !== courseId) || [],
                                    credits: (semester.credits || 0) - (getCourse(courseId)?.credits || 0),
                                }
                                : semester
                        )
                    );
                },
                onError: (error) => {
                    message.error("Failed to remove course from semester");
                    console.error("Error removing course from semester:", error);
                },
            });
    }, [removeClassFromSemester, getCourse]);

    const handleCreateNewPlanner = useCallback(() => {
        setShowNewPlannerModal(true);
    }, []);

    const closeNewPlannerModal = useCallback(() => {
        setShowNewPlannerModal(false);
    }, []);

    const handleRequirementClick = useCallback((requirement: Requirement) => {
        setSelectedRequirement(requirement);
        setShowRequirementDetails(true);
    }, []);

    const handleGetRequirementCredits = useCallback((requirement: Requirement) => {
        return requirement.classIds.reduce((total: number, classId) => {
            const course = classId ? getCourse(classId) : null;
            return total + (course?.credits || 0);
        }, 0);
    }, [getCourse]);

    const handleLoadPlanner = useCallback((plannerId: number): boolean => {
        const plannerToLoad = planners?.find((planner) => planner.id === plannerId);
        if (plannerToLoad) {
            setActivePlanner(plannerToLoad);
            setSemesters((plannerToLoad.semester || []).filter((semester): semester is Semester => semester !== null));
            return true;
        }
        return false;
    }, [planners]);

    const handleResetPlanner = useCallback(() => {
        if (!activePlanner) return;

        setSemesters([]);
        updatePlanner({
                resource: "degreePlanner",
                id: activePlanner.id,
                values: {
                    id: activePlanner.id,
                },
                meta: {
                    gqlMutation: RESET_DEGREE_PLANNER_MUTATION
                },
            },
            {
                onSuccess: () => {
                    message.success("Planner reset successfully");
                },
                onError: (error) => {
                    message.error("Failed to reset planner");
                    console.error("Error resetting planner:", error);
                },
            });
    }, [activePlanner, updatePlanner]);

    const handleGetGraduationSemester = useCallback(() => {
        if (!activePlanner?.semester || activePlanner.semester.length === 0) {
            return null;
        }
        return activePlanner.semester.find((semester) => semester?.name === graduationSemester)?.id;
    }, [activePlanner, graduationSemester]);

    // if (plannersLoading || degreesLoading || firstMajorReqLoading || secondMajorReqLoading || coursesLoading) {
    //     return <div>Loading...</div>; // Consider using a more sophisticated loading component
    // }

    // if (coursesError) {
    //     return <div>Error loading courses. Please try again later.</div>;
    // }

    function handleFindCourses(selectedRequirement: Requirement | null) {

    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            backgroundColor: "#f3f4f6",
        }}>
            <DegreeHeader
                getPlanners={() => planners || []}
                activePlanner={activePlanner}
                setActivePlanner={setActivePlanner}
                isPremium={isPremium}
                gradSemesterId={handleGetGraduationSemester()}
                setShowNewPlannerModal={setShowNewPlannerModal}
                setShowAIPlanModal={setShowAIPlanModal}
                loadPlanner={handleLoadPlanner}
                resetPlanner={handleResetPlanner}
            />
            <div style={{display: "flex", flex: 1, overflow: "hidden"}}>
                <DegreeSearch
                    removeFromSemester={removeFromSemester}
                    getClasses={coursesData?.data || []}
                    getDegreeScheduleEntryId={getDegreeScheduleEntryId}
                    getClass={getCourse}
                    getSemesters={semesters}
                    requirement={selectedRequirement}
                    setShowRequirementDetails={setShowRequirementDetails}
                    getDegree={activeDegree}
                />
                <div style={{
                    width: "60%",
                    padding: "16px",
                    backgroundColor: "#f3f4f6",
                    overflowY: "auto",
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "16px",
                    }}>
                        {semesters.map((semester) => (
                            <DroppableSemester
                                key={semester.id}
                                semester={semester}
                                activeSemester={activeSemester}
                                setActiveSemester={setActiveSemester}
                            >
                                {semester.entries?.map((entry) => {
                                    const course = getCourse(entry?.classId ?? -1);
                                    return course ? (
                                        <SortableCourse
                                            key={entry?.id}
                                            course={course}
                                            Semesters={semesters}
                                            degree={activeDegree}
                                            onRemoveFromSemester={removeFromSemester}
                                            semesterId={semester.id}
                                        />
                                    ) : null;
                                })}
                            </DroppableSemester>
                        ))}
                    </div>
                </div>
                <div style={{
                    width: "20%",
                    padding: "16px",
                    backgroundColor: "white",
                    color: "#111827",
                    overflowY: "auto",
                    borderLeft: "1px solid #e5e7eb",
                }}>
                    <div style={{display: "flex", marginBottom: "16px"}}>
                        {degreesData?.map((degree, index) => (
                            <button
                                key={degree.id}
                                style={{
                                    marginRight: index === 0 ? "8px" : "0",
                                    padding: "4px 12px",
                                    borderRadius: "4px",
                                    backgroundColor: activeDegree?.id === degree.id ? "#3B82F6" : "#E5E7EB",
                                    color: activeDegree?.id === degree.id ? "white" : "#374151",
                                }}
                                onClick={() => setActiveDegree(degree)}
                            >
                                {degree.name}
                            </button>
                        ))}
                    </div>
                    {activeDegree && (
                        <div>
                            <h2 style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginBottom: "16px",
                                color: "#111827",
                            }}>
                                {activeDegree.name} Requirements
                            </h2>
                            {majorRequirements.get(activeDegree)?.map((requirement) => (
                                <div key={requirement.id} style={{marginBottom: "16px"}}>
                                    <RequirementItem
                                        requirement={requirement}
                                        onRequirementClick={handleRequirementClick}
                                        getClass={getCourse}
                                        getTotalCredits={handleGetRequirementCredits}
                                        checkClassTaken={(classIds) => filterTakenCourses(classIds)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showRequirementDetails && selectedRequirement && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        padding: "24px",
                        borderRadius: "8px",
                        maxWidth: "28rem",
                        backgroundColor: "white",
                        color: "#111827",
                    }}>
                        <h2 style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "16px",
                        }}>
                            {selectedRequirement.category}
                        </h2>
                        <p style={{color: "#374151"}}>
                            {selectedRequirement.category.toLowerCase().includes("prerequisite")
                                ? "This requirement is a prerequisite for your degree. Make sure to complete all required courses."
                                : "This requirement is essential for your degree. Make sure to complete all required courses."}
                        </p>
                        <button
                            onClick={() => handleFindCourses(selectedRequirement)}
                            style={{
                                marginTop: "16px",
                                padding: "8px 16px",
                                borderRadius: "4px",
                                backgroundColor: "#3B82F6",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            Find Courses for this Requirement
                        </button>
                        <button
                            onClick={() => setShowRequirementDetails(false)}
                            style={{
                                marginTop: "16px",
                                marginLeft: "8px",
                                padding: "8px 16px",
                                borderRadius: "4px",
                                backgroundColor: "#D1D5DB",
                                color: "#1F2937",
                                cursor: "pointer",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showNewPlannerModal && (
                <NewPlannerModal
                    onClose={() => setShowNewPlannerModal(false)}
                    userId={userId || ""}
                    degreeId={activeDegree?.id || 0}
                />
            )}
        </div>
    );
}

export default DegreePage;