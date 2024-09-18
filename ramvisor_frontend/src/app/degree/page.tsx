"use client";

import DegreeHeader from "@components/degree/header";
import DegreeSearch from "@components/degree/search";
import { DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Class, DegreePlanner, Maybe, Semester, SemesterEntry } from "@graphql/generated/graphql";
import { GET_CLASS_QUERY, GET_CLASSES_QUERY, GET_DEGREE_PLANNERS_QUERY } from "@graphql/queries";
import { BaseKey, useCustom, useDelete, useGetIdentity, useUpdate } from "@refinedev/core";
import React, { useCallback } from "react";
import { message } from "antd";
import { UPDATE_SEMESTER_MUTATION } from "@graphql/mutations";

type Props = {};

export interface Degree {
  id: number;
  name: String;
  numberOfCores: number;
  numberOfElectives: number;
}

const DegreePage = (_props: Props) => {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const [activeSemester, setActiveSemester] = React.useState<number | null>(null);
  const [semesters, setSemesters] = React.useState<Semester[]>([]);
  const [activePlanner, setActivePlanner] = React.useState<DegreePlanner | null>(null);

  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id;

  const { data: plannerData, isLoading: plannerLoading, refetch: refetchPlanners } = useCustom<{ getPlanners: DegreePlanner[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_DEGREE_PLANNERS_QUERY,
      variables: { userId: userId }
    }
  });

  const { data: coursesData, isLoading: coursesLoading, refetch: refetchCourses } = useCustom<{ getCourses: Class[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_CLASSES_QUERY,
    }
  });

const fetchCourseData = (classId: number) => {
  const { data: courseData, isLoading: courseLoading, refetch: refetchCourse } = useCustom<{ getCourse: Class }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_CLASS_QUERY,
      variables: { id: classId }
    }
  })
  return {courseData, courseLoading, refetchCourse}
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
    if (over && over.data.current && (over.data.current as any).type === 'semester') {
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

    if ((over.data.current as any).type === 'Semester') {
      handleDropIntoSemester(activeId as number, over.id as number);
    } else {
      handleReorderWithinSemester(active.id as number, over.id as number, (over.data.current as any).semesterId as number);
    }

    setActiveId(null);
    setActiveSemester(null);
  }

  const handleDropIntoSemester = useCallback((courseId: number, semesterId: number) => {
    const course = coursesData?.data.getCourses.find((course) => course.id === courseId);
    if (!course) return null;
    
    setSemesters((prevSemesters) => {
      return prevSemesters.map((semester) => {
        if (semester.id === semesterId) {
          if (semester.credits + course.credits > 18) {
            message.error("Cannot add course. It would exceed the 18 credit limit.", 3);
            return semester;
          }
  
          if (semester.entries?.some((c) => c?.classId === courseId)) {
            return semester;
          }
  
          const updatedCourses = [...(semester.entries ?? []), course];
          const updatedCredits = updatedCourses.reduce((sum, c) => sum + c.credits, 0);
  
          message.success(`Added ${course.title} to ${semester.name}`, 3);
  
          return {...semester, courses: updatedCourses, credits: updatedCredits};
        }
  
        const updatedCourses = semester.entries?.filter((c) => c?.id !== courseId);
        const updatedCredits = updatedCourses?.reduce((sum, c) => sum + (c ?  : 0), 0);
  
        return {...semester, courses: updatedCourses, credits: updatedCredits};
      });
    });
  
    updatePlanner(
      {
        resource: "semesters",
        id: semesterId as BaseKey,
        values: {
          id: semesterId,
          name: semesters.find(s => s.id === semesterId)?.name,
          entries: {}
        },
        meta: {
          gqlMutation: UPDATE_SEMESTER_MUTATION,
        }
      },
      {
        onSuccess: (_data) => {
          message.success("Course added to semester successfully");
          refetchPlanners();
        },
        onError: (error) => {
          message.error("Failed to add course to semester");
          console.error('Error updating semester:', error);
          // Revert the local state change
          setSemesters((prevSemesters) => {
            return prevSemesters.map((semester) => {
              if (semester.id === semesterId) {
                const updatedCourses = semester.courses.filter((c) => c.id !== courseId);
                const updatedCredits = updatedCourses.reduce((sum, c) => sum + c.credits, 0);
                return {...semester, courses: updatedCourses, credits: updatedCredits};
              }
              return semester;
            });
          });
        }
      }
    );
  }, [coursesData, semesters, updatePlanner, refetchPlanners]);

  const handleReorderWithinSemester = useCallback((activeId: number, overId: number, semesterId: number) => {
    setSemesters((prevSemesters) => {
      const updatedSemesters = prevSemesters.map((semester) => {
        if (semester.id === semesterId) {
          const oldIdx = semester.entries?.findIndex((entry) => entry?.id === activeId);
          const newIdx = semester.entries?.findIndex((entry) => entry?.id === overId);

          if (oldIdx !== -1 && newIdx !== -1) {
            const newCourses = [...semester.entries ?? []];
            const [reorderedItem] = newCourses.splice(oldIdx, 1);
            newCourses.splice((newIdx ? newIdx : 0), 0, reorderedItem);

            return { ...semester, courses: newCourses };
          }
        }
        return semester;
      });

      return updatedSemesters;
    });

    updatePlanner(
      {
        resource: "semesters",
        id: semesterId as BaseKey,
        values: {
          id: semesterId,
          name: 
          classIds: semesters.find(s => s.id === semesterId)?.courses.map(c => c.id) || []
        },
      }
    )
  })

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
        <DegreeHeader getPlanners={getPlanners} activePlanner={activePlanner} setActivePlanner={setActivePlanner}/>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <DegreeSearch getDegreeSchedules={getPlanners}/>
      </div>
    </>
  );
};

export default DegreePage;
