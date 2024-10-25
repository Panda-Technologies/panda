"use client";

import React from 'react';
import CourseCalendar from '@components/courses/calendar'; 
import {useCreate, useDelete, useGetIdentity} from '@refinedev/core';
import { 
  GET_USER_QUERY, 
  GET_CLASS_SCHEDULES_QUERY 
} from '@graphql/queries';
import { 
  ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION, 
  REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION 
} from '@graphql/mutations';
import useDataFetch from "@utilities/data-fetch";
import {ClassSchedule, User} from "@graphql/generated/graphql";
import CourseFetch from "@utilities/fetchClasses";

interface Event {
    id: string;
    title: string;
    day: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
};

const Page: React.FC = () => {
    const [activeSchedule, setActiveSchedule] = React.useState<ClassSchedule | null>(null);

    const { data: identity } = useGetIdentity<{ id: string }>();
    const userId = identity?.id;

    const { getCourse } = CourseFetch();

    const useGetUser = () => {
        const { data, isLoading, error } = useDataFetch<{ getUser: User }>(
            GET_USER_QUERY,
            { id: userId },
            "user"
            );
        return { data: data?.getUser, isLoading, error };
    }

    const useGetClassSchedules = () => {
        const { data, isLoading, error } = useDataFetch<{ getClassSchedules: ClassSchedule[] }>(
            GET_CLASS_SCHEDULES_QUERY,
            { id: userId },
            "class schedules"
        );
        return { data: data?.getClassSchedules, isLoading, error };
    }

    const { mutate: addClassToSchedule } = useCreate();
    const { mutate: removeClassFromSchedule } = useDelete();

    const handleEventMove = (event: Event) => {
      addClassToSchedule({
        resource: "classScheduleEntries",
        values: {
          classScheduleId: activeSchedule?.id,
          classId: Number(event.id),
        },
        meta: {
          gqlMutation: ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION
        }
      });
    };
    
    const handleEventRemove = (eventId: string) => {
      removeClassFromSchedule({
        resource: "classScheduleEntries",
        id: eventId,
        meta: {
          gqlMutation: REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION
        }
      });
    };
    
    if (!useGetUser()?.data) {
      return <div>Loading...</div>;
    }

    return (
      <CourseCalendar
        events={activeSchedule!.entries!.map(entry => ({
            id: `${entry!.class!.id}`,
            title: entry!.class!.title,
            day: entry!.class!.dayOfWeek,
            startTime: entry!.class!.startTime,
            endTime: entry!.class!.endTime,
            color: 'blue',
            professor: entry!.class!.professor,
        } as Event))}
        onEventMove={handleEventMove}
        onEventRemove={handleEventRemove}
      />
    );
}

export default Page;