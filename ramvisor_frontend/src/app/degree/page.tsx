"use client";

import { Semester } from "@components/degree/droppable-semester";
import DegreeHeader from "@components/degree/header";
import DegreeSearch from "@components/degree/search";
import { DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Class, DegreePlanner, DegreeSchedule } from "@graphql/generated/graphql";
import { GET_CLASSES_QUERY, GET_DEGREE_PLANNERS_QUERY } from "@graphql/queries";
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
export interface DegreeScheduleEntry {
  id: number;
  degreeScheduleId: number;
  classId: number;
  degreeSchedule: DegreeSchedule;
  class: Class;
}

const DegreePage = (props: Props) => {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const [activeSemester, setActiveSemester] = React.useState<String | null>(null);
  const [semesters, setSemesters] = React.useState<Semester[]>([]);
  const [activePlanner, setActivePlanner] = React.useState<DegreeSchedule | null>(null);

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
      setActiveSemester(over.id as String);
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

    if ((over.data.current as any).type === 'semester') {
      handleDropIntoSemester(activeId as number, over.id as String);
    } else {
      handleReorderWithinSemester(active.id as number, over.id as String, (over.data.current as any).semesterId as String);
    }

    setActiveId(null);
    setActiveSemester(null);
  }

  const handleDropIntoSemester = useCallback((courseId: number, semesterId: String) => {
    const course = coursesData?.data.getCourses.find((course) => course.id === courseId);
    if (!course) return null;
    
    setSemesters((prevSemesters) => {
      return prevSemesters.map((semester) => {
        if (semester.id === semesterId) {
          if (semester.credits + course.credits > 18) {
            message.error("Cannot add course. It would exceed the 18 credit limit.", 3);
            return semester;
          }
  
          if (semester.courses.some((c) => c.id === courseId)) {
            return semester;
          }
  
          const updatedCourses = [...semester.courses, course];
          const updatedCredits = updatedCourses.reduce((sum, c) => sum + c.credits, 0);
  
          message.success(`Added ${course.title} to ${semester.name}`, 3);
  
          return {...semester, courses: updatedCourses, credits: updatedCredits};
        }
  
        const updatedCourses = semester.courses.filter((c) => c.id !== courseId);
        const updatedCredits = updatedCourses.reduce((sum, c) => sum + c.credits, 0);
  
        return {...semester, courses: updatedCourses, credits: updatedCredits};
      });
    });
  
    updatePlanner(
      {
        resource: "semesters",
        id: semesterId as BaseKey,
        values: {
          id: semesterId,
          classIds: [...semesters.find(s => s.id === semesterId)?.courses.map(c => c.id) || [], courseId]
        },
        meta: {
          gqlMutation: UPDATE_SEMESTER_MUTATION,
          variables: {
            input: {
              id: semesterId,
              classIds: [...semesters.find(s => s.id === semesterId)?.courses.map(c => c.id) || [], courseId]
            }
          }
        }
      },
      {
        onSuccess: (data) => {
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
