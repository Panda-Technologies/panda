"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { message } from "antd";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent, DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor, rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Class,
  Degree,
  DegreePlanner,
  Requirement,
  Semester, SemesterEntry,
  User
} from "@graphql/generated/graphql";
import {
  GET_DEGREE_PLANNERS_QUERY,
  GET_REQUIREMENTS_QUERY, GET_USER_QUERY,
} from "@graphql/queries";
import {
  CREATE_DEGREE_PLANNER_MUTATION,
  DELETE_DEGREE_PLANNER_MUTATION,
  REMOVE_CLASS_FROM_SEMESTER_MUTATION,
  UPDATE_SEMESTER_MUTATION,
} from "@graphql/mutations";
import DegreeSearch from "@components/degree/search";
import DegreeHeader from "@components/degree/header";
import NewPlannerModal from "@components/degree/new-planner";
import RequirementItem from "@components/degree/requirement-item";
import { SortableCourse } from "@components/degree/sortable-course";
import DroppableSemester from "@components/degree/droppable-semester";
import useDataFetch from "@utilities/data-fetch";
import CourseFetch from "@utilities/fetchClasses";
import {useLazyQuery, useQuery} from "@apollo/client";
import { useMutation } from "@apollo/client";
import {asArray} from "@graphql-tools/utils";
import {getAlphabetColor} from "@utilities/helpers.ts";

// Main component
const DegreePage: React.FC = () => {
  // State declarations
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeSemester, setActiveSemester] = useState<number | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [activePlanner, setActivePlanner] = useState<DegreePlanner | null>(
    null
  )
  const [planners, setPlanners] = useState<DegreePlanner[]>([]);

  const LAST_PLANNER_KEY = 'last_active_planner'

  const [showRequirementDetails, setShowRequirementDetails] =
    useState<boolean>(false);
  const [selectedRequirement, setSelectedRequirement] =
    useState<Requirement | null>(null);
  const [majorRequirements, setMajorRequirements] = useState<
    Map<Degree, Requirement[]>
  >(new Map());
  const [activeDegree, setActiveDegree] = useState<Degree | null>(null);
  const [showNewPlannerModal, setShowNewPlannerModal] =
    useState<boolean>(false);
  const [showAIPlanModal, setShowAIPlanModal] = useState<boolean>(false);

  interface OptimisticSemesterEntry {
    classId: number;
    class: Class;
    semester: Semester;
    semesterId: number;
  }

  // Custom hooks
  const { data: userData } = useQuery<{ getUser: User }>(GET_USER_QUERY, {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-only",
  })
  const { data: plannersData, error: PlannerError } = useQuery<{ getDegreePlanners: DegreePlanner[] }>(GET_DEGREE_PLANNERS_QUERY, {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-only",
  })
  const [useFetchRequirements] = useLazyQuery<{ getRequirements: Requirement[] }>(GET_REQUIREMENTS_QUERY, {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-only",
  })

  // Instantiate variables from data fetching
  const firstDegree = useMemo(
    () => {
      if (userData?.getUser.degrees) {
        return userData?.getUser?.degrees[0] ?? null;
      }
    },
    [userData]
  );
  const secondDegree = useMemo(
      () => {
        if (userData?.getUser.degrees) {
          return userData?.getUser?.degrees[1] ?? null;
        }
      },
      [userData]
  );
  const classTakenData = useMemo(() => {
    return userData?.getUser?.takenClassIds ?? null;
  }, [userData]
);
  const degreePlanners = useCallback(() => {
    if (!plannersData?.getDegreePlanners) {
      return [];
    }
    return plannersData?.getDegreePlanners;
  }, [plannersData]
  );
  const graduationSemester = useMemo(() => {
    return userData?.getUser?.graduationSemesterName ?? null;
  }, [userData]
  );
  const degrees = useMemo(() => {
    if (userData?.getUser?.degrees == undefined) {
      return [] as Degree[]
    }
    return userData.getUser.degrees as Degree[];
  }, [userData]
  );
  const isPremium = useMemo(() => {
    return userData?.getUser?.isPremium ?? false;
  }, [userData]
  );

  // Fetch courses
  const { getCourse, coursesData, coursesLoading, coursesError } =
    CourseFetch();

  // Memoize taken courses Set
  const takenCoursesSet: Set<number> = useMemo(() => {
    if (classTakenData) {
      let takenClassesSet: Set<number>;
      try {
        takenClassesSet = new Set(
          classTakenData.filter(
            (classId): classId is number =>
              classId !== undefined && classId !== null
          ) // Filter out invalid classIds)
        );
        if (takenClassesSet && takenClassesSet.size > 0) {
          return takenClassesSet;
        }
      } catch (error) {
        console.error("Error checking taken classes:", error);
      }
    }
    return new Set<number>();
  }, [classTakenData]);

  // Get Filtered Taken Courses
  const filterTakenCourses = useCallback(
      (classIds: number[]): number[] => {
        return classIds.filter((classId) =>
            takenCoursesSet.has(classId) || semesters.some((semester) =>
                semester.entries?.some((entry) => entry?.classId === classId))
        );
      },
      [takenCoursesSet, semesters]
  );


  // Mutations
  const [updatePlanner] = useMutation(UPDATE_SEMESTER_MUTATION)
  const [deletePlanner] = useMutation(DELETE_DEGREE_PLANNER_MUTATION)
  const [removeClassFromSemester] = useMutation(REMOVE_CLASS_FROM_SEMESTER_MUTATION)
  const [createPlanner] = useMutation(CREATE_DEGREE_PLANNER_MUTATION)

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleLoadPlanner = useCallback(
      (plannerId: number): boolean => {
        const plannerToLoad = degreePlanners().find(
            (planner: DegreePlanner) => planner.id === plannerId
        );
        if (plannerToLoad) {
          setActivePlanner(plannerToLoad);
          const sortedSemesters = (plannerToLoad.semester || [])
              .filter((semester): semester is Semester => semester !== null)
              .sort((a, b) => {
                // Extract year and season from semester names
                const [seasonA, yearA] = a.name.split(' ');
                const [seasonB, yearB] = b.name.split(' ');

                // Compare years first
                if (yearA !== yearB) {
                  return parseInt(yearA) - parseInt(yearB);
                }

                // If years are equal, compare seasons
                const seasonOrder = {
                  'Spring': 0,
                  'Summer': 1,
                  'Fall': 2,
                  'Winter': 3
                };

                return seasonOrder[seasonA as keyof typeof seasonOrder] -
                    seasonOrder[seasonB as keyof typeof seasonOrder];
              });

          setSemesters(sortedSemesters);
          cacheActivePlanner(plannerId);
          return true;
        }
        return false;
      },
      [degreePlanners]
  );

  // Effect to set active planner and semesters
  useEffect(() => {
    const planners = degreePlanners();
    if (planners.length > 0) {
      setPlanners(planners);

      let selectedPlanner: DegreePlanner | undefined;

      // Try to load last used planner
      const lastPlannerId = localStorage.getItem(LAST_PLANNER_KEY);
      if (lastPlannerId) {
        selectedPlanner = planners.find(
            (planner) => planner.id === parseInt(lastPlannerId)
        );
      }

      // If no last planner found, use first planner
      if (!selectedPlanner && planners.length > 0) {
        selectedPlanner = planners[0];
      }

      // Update state if we found a planner
      if (selectedPlanner) {
        setActivePlanner(selectedPlanner);
        handleLoadPlanner(selectedPlanner?.id)
      }
    }
  }, [degreePlanners, handleLoadPlanner]);

  // Effect to set major requirements
  useEffect(() => {
    if (firstDegree?.id) {
      const LoadRequirements = async () => {
        const firstReqResult = await useFetchRequirements({
          variables: {
            degreeId: firstDegree.id,
          },
        });
        const firstReqs = firstReqResult.data?.getRequirements ?? null;

        let secondReqs;
          const secondReqResult = await useFetchRequirements({
            variables: {
              degreeId: secondDegree?.id,
            }
          })
          secondReqs = secondReqResult.data?.getRequirements ?? null;

        const majorReqMap = new Map<Degree, Requirement[]>();
        if (firstDegree && firstReqs) {
          majorReqMap.set(firstDegree, firstReqs);
        }
        if (secondDegree && secondReqs) {
          majorReqMap.set(secondDegree, secondReqs);
        }
        setMajorRequirements(majorReqMap);
      };

      LoadRequirements();
    }
  }, [firstDegree, firstDegree?.id, secondDegree, secondDegree?.id, useFetchRequirements]);



  // Drag and drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over?.data.current && (over.data.current as any).type === "semester") {
      setActiveSemester(over.id as number);
    } else {
      setActiveSemester(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !over.data.current) {
      setActiveId(null);
      setActiveSemester(null);
      return;
    }

    const targetSemesterId = parseInt(over.id.toString());

    if (active.id && targetSemesterId) {
      handleDropIntoSemester(parseInt(active.id.toString()), targetSemesterId);
    }

    setActiveId(null);
    setActiveSemester(null);
  };

  // Rewrite this function to utilize onSuccess better
  const handleDropIntoSemester = useCallback(
      (courseId: number, semesterId: number) => {
        const course = getCourse(courseId);
        if (!course) return;

        // Find source semester if course is being moved
        const sourceSemester = semesters.find((semester) =>
            semester.entries?.some((entry) => entry?.classId === courseId)
        );

        // Target semester validation
        const targetSemester = semesters.find(s => s.id === semesterId);
        if (!targetSemester) return;

        // Credit limit check
        const targetSemesterNewCredits = (targetSemester.credits || 0) + course.credits;
        if (targetSemesterNewCredits > 18) {
          message.error("Cannot add course. It would exceed the 18 credit limit.");
          return;
        }

        // Prepare optimistic updates
        setSemesters(prevSemesters => {
          return prevSemesters.map(semester => {
            // Remove from source semester
            if (semester.id === sourceSemester?.id) {
              const updatedEntries = semester.entries?.filter(
                  entry => entry?.classId !== courseId
              ) ?? [];
              return {
                ...semester,
                entries: updatedEntries,
                credits: (semester.credits || 0) - course.credits
              };
            }
            // Add to target semester
            if (semester.id === semesterId) {
              const newEntry: OptimisticSemesterEntry = {
                classId: courseId,
                class: course,
                semester: semester,
                semesterId: semesterId
              };
              const updatedEntries = [...(semester.entries || []), newEntry as SemesterEntry];
              return {
                ...semester,
                entries: updatedEntries,
                credits: targetSemesterNewCredits
              };
            }
            return semester;
          });
        });

        // Execute backend updates
        const updateSequence = async () => {
          try {
            // Remove from source semester if moving
            if (sourceSemester) {
              await updatePlanner({
                variables: {
                  input: {
                    id: sourceSemester.id,
                    name: sourceSemester.name,
                    entries: sourceSemester.entries
                        ?.filter(entry => entry?.classId !== courseId)
                        .map(entry => ({ classId: entry!.classId }))
                  }
                }
              });
            }

            // Add to target semester
            await updatePlanner({
              variables: {
                input: {
                  id: semesterId,
                  name: targetSemester.name,
                  entries: [
                    ...(targetSemester.entries?.map(entry => ({
                      classId: entry!.classId
                    })) || []),
                    { classId: courseId }
                  ]
                }
              }
            });

            message.success(`${course.classCode} moved to ${targetSemester.name}`, 0.5);
          } catch (error) {
            message.error("Failed to update course placement");
            console.error("Error updating semester:", error);

            // Revert optimistic update on failure
            setSemesters(prevSemesters => {
              return prevSemesters.map(semester => {
                if (semester.id === sourceSemester?.id) {
                  return sourceSemester;
                }
                if (semester.id === semesterId) {
                  return targetSemester;
                }
                return semester;
              });
            });
          }
        };

        updateSequence();
      },
      [getCourse, updatePlanner, semesters]
  );


  const getDegreeScheduleEntryId = useCallback(
    (courseId: number) => {
      return semesters
        .flatMap((semester) => semester.entries)
        .find((entry) => entry?.classId === courseId)?.id;
    },
    [semesters]
  );

  const removeFromSemester = useCallback(
    (semesterId: number, courseId: number) => {
      removeClassFromSemester(
        {
          variables: {
            input: {
              classId: courseId,
              semesterId: semesterId,
            }
          },
          onCompleted: () => {
            message.success("Course removed from semester successfully");
            // Update local state
            setSemesters((prevSemesters) =>
              prevSemesters.map((semester) =>
                semester.id === semesterId
                  ? {
                      ...semester,
                      entries:
                        semester.entries?.filter(
                          (entry) => entry?.classId !== courseId
                        ) || [],
                      credits:
                        (semester.credits || 0) -
                        (getCourse(courseId)?.credits || 0),
                    }
                  : semester
              )
            );
          },
          onError: (error: Error) => {
            message.error("Failed to remove course from semester");
            console.error("Error removing course from semester:", error);
          },
        }
      );
    },
    [removeClassFromSemester, getCourse]
  );

  const closeNewPlannerModal = useCallback(() => {
    setShowNewPlannerModal(false);
  }, []);

  const handleRequirementClick = useCallback((requirement: Requirement) => {
    setSelectedRequirement(requirement);
    setShowRequirementDetails(true);
  }, []);

  const handleGetRequirementCredits = useCallback(
    (requirement: Requirement) => {
      return requirement.classIds.reduce((total: number, classId) => {
        const course = classId ? getCourse(classId) : null;
        console.log('course', classId);
        return total + (course?.credits || 0);
      }, 0);
    },
    [getCourse]
  );

  const cacheActivePlanner = (plannerId: number) => {
    localStorage.setItem(LAST_PLANNER_KEY, plannerId.toString());
  }

  const handleCreatePlanner = (newPlanner: DegreePlanner) => {
    setPlanners(prevPlanners => {
      return [...prevPlanners ?? [], newPlanner];
    })
    try {
      cacheActivePlanner(newPlanner.id);
    } catch (error) {
      console.error('Failed to save active planner:', error);
    }
    setActivePlanner(newPlanner);
  }

  const handleResetPlanner = useCallback(() => {
    if (!activePlanner) return;

    setSemesters([]);
    updatePlanner(
      {
        variables: {
          id: activePlanner.id,
        },
        onCompleted: () => {
          message.success("Planner reset successfully");
        },
        onError: (error: Error) => {
          message.error("Failed to reset planner");
          console.error("Error resetting planner:", error);
        },
      }
    );
  }, [activePlanner, updatePlanner]);

  const handleGetGraduationSemester = useCallback(() => {
    if (!activePlanner?.semester || activePlanner.semester.length === 0) {
      return null;
    }
    return activePlanner.semester.find(
      (semester) => semester?.name === graduationSemester
    )?.id;
  }, [activePlanner, graduationSemester]);

  // if (plannersLoading || degreesLoading || firstMajorReqLoading || secondMajorReqLoading || coursesLoading) {
  //     return <div>Loading...</div>; // Consider using a more sophisticated loading component
  // }

  // if (coursesError) {
  //     return <div>Error loading courses. Please try again later.</div>;
  // }

  function handleFindCourses(selectedRequirement: Requirement | null) {}

  return (
    <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
    >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: "-24px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        position: "fixed",
        top: 88,
        left: 224,
        right: 20,
        backgroundColor: "#f3f4f6",
      }}
    >
      <DegreeHeader
        getPlanners={planners}
        activePlanner={activePlanner}
        setActivePlanner={setActivePlanner}
        isPremium={isPremium}
        gradSemesterId={handleGetGraduationSemester()}
        setShowNewPlannerModal={setShowNewPlannerModal}
        setShowAIPlanModal={setShowAIPlanModal}
        loadPlanner={handleLoadPlanner}
        resetPlanner={handleResetPlanner}
      />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <DegreeSearch
          removeFromSemester={removeFromSemester}
          getClasses={coursesData?.getClasses || []}
          getDegreeScheduleEntryId={getDegreeScheduleEntryId}
          getClass={getCourse}
          getSemesters={semesters}
          requirement={selectedRequirement}
          setShowRequirementDetails={setShowRequirementDetails}
          getDegree={activeDegree}
        />
        <div
          style={{
            width: "60%",
            padding: "16px",
            backgroundColor: "#f3f4f6",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
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
        <div
          style={{
            width: "20%",
            padding: "16px",
            backgroundColor: "white",
            color: "#111827",
            borderLeft: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", marginBottom: "16px" }}>
            {degrees.map((degree, index) => (
              <button
                key={degree?.id}
                style={{
                  marginRight: index === 0 ? "8px" : "0",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  backgroundColor:
                    activeDegree?.id === degree?.id ? "#3B82F6" : "#E5E7EB",
                  color: activeDegree?.id === degree?.id ? "white" : "#374151",
                }}
                onClick={() => setActiveDegree(degree)}
              >
                {degree?.name}
              </button>
            ))}
          </div>
          {activeDegree && (
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                }}
              >
                {activeDegree.name} Requirements
              </h2>
              {majorRequirements.get(activeDegree)?.map((requirement) => (
                <div key={requirement.id} style={{ marginBottom: "16px" }}>
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
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "24px",
              borderRadius: "8px",
              maxWidth: "28rem",
              backgroundColor: "white",
              color: "#111827",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              {selectedRequirement.category}
            </h2>
            <p style={{ color: "#374151" }}>
              {selectedRequirement.category
                .toLowerCase()
                .includes("prerequisite")
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
        <NewPlannerModal
          onClose={closeNewPlannerModal}
          degrees={degrees}
          isVisible={showNewPlannerModal}
          onFinish={handleCreatePlanner}
        />
    </div>
      <DragOverlay>
        {activeId ? (
            <div style={{
              padding: "8px",
              borderRadius: "12px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: getAlphabetColor(getCourse(activeId)?.classCode ?? "").bg,
              color: getAlphabetColor(getCourse(activeId)?.classCode ?? "").text
            }}>
              <span style={{ fontWeight: "bold" }}>{getCourse(activeId)?.classCode}</span>
            </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DegreePage;
