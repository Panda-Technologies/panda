"use client";

import DegreeHeader from "@components/degree/header";
import DegreeSearch from "@components/degree/search";
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
  DegreePlanner,
  Maybe,
  Semester,
  SemesterEntry,
} from "@graphql/generated/graphql";
import {
  GET_CLASS_QUERY,
  GET_CLASSES_QUERY,
  GET_DEGREE_PLANNERS_QUERY,
  GET_DEGREE_QUERY,
  GET_DEGREE_REQUIREMENTS_QUERY,
} from "@graphql/queries";
import {
  BaseKey,
  useCustom,
  useDelete,
  useGetIdentity,
  useList,
  useUpdate,
} from "@refinedev/core";
import React, { useCallback, useEffect, useMemo } from "react";
import { message } from "antd";
import {
  REMOVE_CLASS_FROM_SEMESTER_MUTATION,
  UPDATE_SEMESTER_MUTATION,
} from "@graphql/mutations";

export interface Degree {
  id: number;
  name: String;
  numberOfCores: number;
  numberOfElectives: number;
}

export interface ApCredits {
  calculus: boolean;
  statistics: boolean;
  computerScience: boolean;
  physics: boolean;
  chemistry: boolean;
  biology: boolean;
  environmentalScience: boolean;
}

export interface Requirement {
  id: number;
  name: String;
  completed: number;
  required: number;
  isElective?: boolean;
}

export interface CollapsibleRequirement {
  degreeId: number;
  name: String;
  subRequirements: Requirement[];
}

const handleApiError = (error: any, customMessage: string) => {
  console.error(`${customMessage}:`, error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    message.error(
      `Error ${error.response.status}: ${
        error.response.data.message || "An error occurred"
      }`
    );
  } else if (error.request) {
    // The request was made but no response was received
    message.error(
      "No response received from server. Please check your connection."
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    message.error("An unexpected error occurred. Please try again later.");
  }
};

const useFetchPlanners = (userId: string | undefined) => {
  const {
    data: plannerData,
    isLoading: plannerLoading,
    refetch: refetchPlanners,
    error: plannerError,
  } = useCustom<{ getPlanners: DegreePlanner[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_DEGREE_PLANNERS_QUERY,
      variables: { userId: userId },
    },
  });

  useEffect(() => {
    if (plannerError) {
      handleApiError(plannerError, "Error fetching planners");
    }
  }, [plannerError]);

  return { plannerData, plannerLoading, refetchPlanners };
};

const useFetchRequirements = (degreeId: number) => {
  const {
    data: requirementsData,
    isLoading: requirementsLoading,
    refetch: refetchRequirements,
    error: requirementsError,
  } = useCustom<{ getRequirements: Map<Class, String> }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_DEGREE_REQUIREMENTS_QUERY,
      variables: { degreeId: degreeId },
    },
  });

  useEffect(() => {
    if (requirementsError) {
      handleApiError(requirementsError, "Error fetching requirements");
    }
  }, [requirementsError]);

  return { requirementsData, requirementsLoading, refetchRequirements };
};

const useFetchDegrees = (userId: string | undefined) => {
  const {
    data: degreesData,
    isLoading: degreesLoading,
    refetch: refetchDegrees,
    error: degreesError,
  } = useCustom<{ getDegrees: Degree[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_DEGREE_QUERY,
      variables: { userId: userId },
    },
  });

  useEffect(() => {
    if (degreesError) {
      handleApiError(degreesError, "Error fetching degrees");
    }
  }, [degreesError]);

  return { degreesData, degreesLoading, refetchDegrees };
};

const DegreePage = () => {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const [activeSemester, setActiveSemester] = React.useState<number | null>(
    null
  );
  const [semesters, setSemesters] = React.useState<Semester[]>([]);
  const [activePlanner, setActivePlanner] =
    React.useState<DegreePlanner | null>(null);
  const [showRequirementDetails, setShowRequirementDetails] =
    React.useState<boolean>(false);
  const [selectedRequirement, setSelectedRequirement] =
    React.useState<Requirement | null>(null);
  const [majorRequirements, setMajorRequirements] = React.useState<
    Map<Degree, Requirement[]>
  >(new Map());

  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id;

  const { plannerData, plannerLoading, refetchPlanners } =
    useFetchPlanners(userId);
  const { degreesData, degreesLoading, refetchDegrees } = useFetchDegrees(userId);
  const { requirementsData: firstMajorReq, requirementsLoading: firstMajorReqLoading, refetchRequirements: refetchFirstMajorReq } = useFetchRequirements(degreesData?.data?.getDegrees[0].id!);
  const { requirementsData: secondMajorReq, requirementsLoading: secondMajorReqLoading, refetchRequirements: refetchSecondMajorReq } = useFetchRequirements(degreesData?.data?.getDegrees[1].id!);


  useEffect(() => {
    // Make sure to update the semesters when the planner data changes
    if (plannerData?.data.getPlanners) {
      const firstPlanner = plannerData.data.getPlanners[0];
      setActivePlanner(firstPlanner);
      setSemesters(
        (firstPlanner?.semester || []).filter(
          (semester): semester is Semester => semester !== null
        )
      );
    }
  }, [plannerData]);

  useEffect(() => {
    const majorReqMap = new Map<Degree, Requirement[]>();
  
    // Check if degrees and requirements data are available
    if (degreesData?.data?.getDegrees && firstMajorReq?.data?.getRequirements && secondMajorReq?.data?.getRequirements) {
      const firstDegree = degreesData.data.getDegrees[0];
      const secondDegree = degreesData.data.getDegrees[1];
  
      // Function to convert Map<Class, String> to Requirement[]
      const convertToRequirements = (reqMap: Map<Class, String>): Requirement[] => {
        return Array.from(reqMap).map(([course, type]) => ({
          id: course.id,
          name: course.classCode,
          completed: 0,
          required: 1,
          isElective: type === "Elective",
        }));
      };
  
      // Map requirements for the first degree
      if (firstDegree) {
        const firstDegreeRequirements = convertToRequirements(firstMajorReq.data.getRequirements);
        majorReqMap.set(firstDegree, firstDegreeRequirements);
      }
  
      // Map requirements for the second degree (if it exists)
      if (secondDegree) {
        const secondDegreeRequirements = convertToRequirements(secondMajorReq.data.getRequirements);
        majorReqMap.set(secondDegree, secondDegreeRequirements);
      }
    }
  
    setMajorRequirements(majorReqMap);
  }, [degreesData, firstMajorReq, secondMajorReq]);

  const {
    data: coursesData,
    isLoading: coursesLoading,
    refetch: refetchCourses,
    error: coursesError,
  } = useList<Class>({
    resource: "classes",
    meta: {
      gqlQuery: GET_CLASSES_QUERY,
    },
  });

  useEffect(() => {
    if (coursesError) {
      handleApiError(coursesError, "Error fetching courses");
    }
  }, [coursesError]);

  const coursesMap = useMemo(() => {
    const map = new Map<number, Class>();
    coursesData?.data.forEach((course) => {
      map.set(course.id, course);
    });
    return map;
  }, [coursesData]);

  const getCourse = useCallback(
    (classId: number) => {
      return coursesMap.get(classId);
    },
    [coursesMap]
  );

  const { mutate: updatePlanner } = useUpdate();
  const { mutate: DeletePlanner } = useDelete();
  const { mutate: removeClassFromSemester } = useDelete();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (
      over &&
      over.data.current &&
      (over.data.current as any).type === "semester"
    ) {
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

    if ((over.data.current as any).type === "Semester") {
      handleDropIntoSemester(activeId as number, over.id as number);
    }

    setActiveId(null);
    setActiveSemester(null);
  };

  const handleDropIntoSemester = useCallback(
    (courseId: number, semesterId: number) => {
      const course = getCourse(courseId);
      if (!course) return null;

      setSemesters((prevSemesters) => {
        return prevSemesters.map((semester) => {
          if (semester.id === semesterId) {
            if ((semester.credits ?? 0) + course.credits > 18) {
              message.error(
                "Cannot add course. It would exceed the 18 credit limit.",
                3
              );
              return semester;
            }

            if (semester.entries?.some((c) => c?.classId === courseId)) {
              return semester;
            }

            const updatedCourses = [
              ...(semester.entries
                ?.map((e) => {
                  if (e?.classId !== undefined) {
                    return getCourse(e.classId);
                  }
                  return null;
                })
                .filter((course) => course !== null) ?? []),
              course,
            ];
            const updatedCredits = updatedCourses.reduce(
              (sum, e) => sum + (e ? getCourse(e.id)!.credits : 0),
              0
            );

            message.success(`Added ${course.title} to ${semester.name}`, 3);

            return {
              ...semester,
              courses: updatedCourses,
              credits: updatedCredits ?? 0,
            };
          }

          const updatedCourses = semester.entries?.filter(
            (e) => e?.id !== courseId
          );
          const updatedCredits = updatedCourses?.reduce(
            (sum, e) => sum + (e ? getCourse(e.classId)!.credits : 0),
            0
          );

          return {
            ...semester,
            courses: updatedCourses,
            credits: updatedCredits ?? 0,
          };
        });
      });

      updatePlanner(
        {
          resource: "semesters",
          id: semesterId as BaseKey,
          values: {
            id: semesterId,
            name: semesters.find((s) => s.id === semesterId)?.name,
            entries: {},
          },
          meta: {
            gqlMutation: UPDATE_SEMESTER_MUTATION,
          },
        },
        {
          onSuccess: (_data) => {
            message.success("Course added to semester successfully");
            refetchPlanners();
          },
          onError: (error) => {
            message.error("Failed to add course to semester");
            console.error("Error updating semester:", error);
            // Revert the local state change
            setSemesters((prevSemesters) => {
              return prevSemesters.map((semester) => {
                if (semester.id === semesterId) {
                  const updatedCourses = semester.entries?.filter(
                    (c) => c?.id !== courseId
                  );
                  const updatedCredits = updatedCourses?.reduce(
                    (sum, e) => sum + (e ? getCourse(e.classId)!.credits : 0),
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
    [getCourse, semesters, updatePlanner, refetchPlanners]
  );

  const getDegreeScheduleEntryId = (courseId: number) => {
    const Semesters: Semester[] = semesters;
    if (Semesters) {
      const entry = Semesters.flatMap((semester) => semester.entries).find(
        (entry) => entry?.classId === courseId
      );
      return entry?.id;
    }
  };

  const removeFromSemester = (semesterId: string, courseId: number) => {
    removeClassFromSemester({
      resource: "degree",
      id: getDegreeScheduleEntryId(courseId) ?? ("" as BaseKey),
      values: {
        id: getDegreeScheduleEntryId(courseId) ?? ("" as BaseKey),
      },
      meta: {
        gqlMutation: REMOVE_CLASS_FROM_SEMESTER_MUTATION,
      },
    });
  };

  const handleRequirementClick = (requirement: Requirement) => {
    setSelectedRequirement(requirement);
    setShowRequirementDetails(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <DegreeHeader
          getPlanners={() => plannerData?.data.getPlanners ?? []}
          activePlanner={activePlanner}
          setActivePlanner={setActivePlanner}
        />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <DegreeSearch
          removeFromSemester={removeFromSemester}
          getClasses={coursesData?.data ?? []}
          getDegreeScheduleEntryId={getDegreeScheduleEntryId}
          getClass={getCourse}
          getSemesters={semesters}
        />
      </div>
    </>
  );
};

export default DegreePage;
