"use client";

import React from 'react';
import CourseCalendar from '@components/courses/calendar'; 
import { useOne, useCreate, useDelete } from '@refinedev/core';
import { 
  GET_USER_QUERY, 
  GET_CLASS_SCHEDULES_QUERY 
} from '../../graphql/queries';
import { 
  ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION, 
  REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION 
} from '../../graphql/mutations';

export interface Event {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
  professor: string;
}

const Page: React.FC = () => {
  
    const userId = 1; // Assume we have the user ID from authentication

    const { data: userData } = useOne({
      resource: "users",
      id: userId,
      meta: {
        gqlQuery: GET_USER_QUERY
      }
    });

    const { data: classSchedulesData } = useOne({
      resource: "classSchedules",
      id: userId,
      meta: {
        gqlQuery: GET_CLASS_SCHEDULES_QUERY
      }
    });

    const { mutate: addClassToSchedule } = useCreate();
    const { mutate: removeClassFromSchedule } = useDelete();

    const handleEventMove = (newEvent: Event) => {
      addClassToSchedule({
        resource: "classScheduleEntries",
        values: {
          classScheduleId: classSchedulesData?.data[0].id,
          classId: parseInt(newEvent.id),
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
    
    if (!userData?.data) {
      return <div>Loading...</div>;
    }

    return (
      <CourseCalendar 
        userId={userData.data.id}
        onEventMove={handleEventMove} 
        onEventRemove={handleEventRemove}
      />
    );
}

export default Page;