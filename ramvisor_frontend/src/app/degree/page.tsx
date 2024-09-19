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
} from "@graphql/queries";
import {
  BaseKey,
  useCustom,
  useDelete,
  useGetIdentity,
  useUpdate,
} from "@refinedev/core";
import React, { useCallback, useEffect } from "react";
import { message } from "antd";
import { UPDATE_SEMESTER_MUTATION } from "@graphql/mutations";

type Props = {};

export interface Degree {
  id: number;
  name: String;
  numberOfCores: number;
  numberOfElectives: number;
}

const useFetchPlanners = (userId: string | undefined) => {
  const {
    data: plannerData,
    isLoading: plannerLoading,
    refetch: refetchPlanners,
  } = useCustom<{ getPlanners: DegreePlanner[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_DEGREE_PLANNERS_QUERY,
      variables: { userId: userId },
    },
  });

  return { plannerData, plannerLoading, refetchPlanners };
};

const DegreePage = (_props: Props) => {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const [activeSemester, setActiveSemester] = React.useState<number | null>(
    null
  );
  const [semesters, setSemesters] = React.useState<Semester[]>([]);
  const [activePlanner, setActivePlanner] =
    React.useState<DegreePlanner | null>(null);

  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id;

  const { plannerData, plannerLoading, refetchPlanners } = useFetchPlanners(userId);

  useEffect(() => { // Make sure to update the semesters when the planner data changes
    if (plannerData?.data.getPlanners) {
      const firstPlanner = plannerData.data.getPlanners[0];
      setActivePlanner(firstPlanner);
      setSemesters((firstPlanner?.Semester || []).filter((semester): semester is Semester => semester !== null));
    }
  }, [plannerData]);

  const {
    data: coursesData,
    isLoading: coursesLoading,
    refetch: refetchCourses,
  } = useCustom<{ getCourses: Class[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_CLASSES_QUERY,
    },
  });

  const UseFetchCourse = (classId: number) => {
    const {
      data: courseData,
      isLoading: courseLoading,
      refetch: refetchCourse,
    } = useCustom<{ getCourse: Class }>({
      url: "",
      method: "get",
      meta: {
        gqlQuery: GET_CLASS_QUERY,
        variables: { id: classId },
      },
    });
    return { courseData, courseLoading, refetchCourse };
  };

  const { mutate: updatePlanner } = useUpdate();
  const { mutate: DeletePlanner } = useDelete();

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
      const course = coursesData?.data.getCourses.find(
        (course) => course.id === courseId
      );
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
              ...(semester.entries?.map((e) => {
                if (e?.classId !== undefined) {
                  return UseFetchCourse(e.classId).courseData!.data.getCourse;
                }
                return null;
              }).filter((course) => course !== null) ?? []),
              course
            ];
            const updatedCredits = updatedCourses.reduce(
              (sum, e) =>
                sum +
                (e
                  ? UseFetchCourse(e.id).courseData!.data.getCourse.credits
                  : 0),
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
            (sum, e) =>
              sum +
              (e
                ? UseFetchCourse(e.classId).courseData!.data.getCourse.credits
                : 0),
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
                    (sum, e) =>
                      sum +
                      (e
                        ? UseFetchCourse(e.classId).courseData!.data.getCourse.credits
                        : 0),
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
    [coursesData, semesters, updatePlanner, refetchPlanners]
  );

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
        <DegreeSearch getSemesters={semesters} />
      </div>
    </>
  );
};

export default DegreePage;
