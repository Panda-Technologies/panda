"use client";

import React, {useEffect} from 'react';
import CourseCalendar from '@components/courses/calendar';
import {BaseRecord, CreateResponse, HttpError, useCreate, useDelete, useGetIdentity, useUpdate} from '@refinedev/core';
import {
    GET_USER_QUERY,
    GET_CLASS_SCHEDULES_QUERY, GET_CLASSES_QUERY
} from '@graphql/queries';
import {
    ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION, CREATE_CLASS_SCHEDULE_MUTATION,
    REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION
} from '@graphql/mutations';
import useDataFetch from "@utilities/data-fetch";
import {Class, ClassSchedule, User} from "@graphql/generated/graphql";
import {wait} from "@apollo/client/testing";
import {getRandomLightColor} from "@components/courses/addable-course";

export interface eventSection {
    id: string;
    name: string;
    day: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
}

const useGetClassSchedules = () => {
    const { data, isLoading, error } = useDataFetch<{ getClassSchedules: ClassSchedule[] }>(
        GET_CLASS_SCHEDULES_QUERY,
        {},
        "class schedules"
    );
    return { data: data?.getClassSchedules, isLoading, error };
}

const useGetClasses = () => {
    const { data, isLoading, error } = useDataFetch<{ getClasses: Class[] }>(
        GET_CLASSES_QUERY,
        {},
        "classes"
    );
    return { data: data?.getClasses, isLoading, error };
}

const Page: React.FC = () => {
    const [activeSchedule, setActiveSchedule] = React.useState<ClassSchedule | undefined>(undefined);

    const { data: classSchedules, isLoading: classScheduleLoading } = useGetClassSchedules();
    const { data: classes } = useGetClasses();

    const { mutate: addClassToSchedule } = useUpdate();
    const { mutate: removeClassFromSchedule } = useUpdate();

    useEffect(() => {
        if (!classScheduleLoading && classSchedules && classSchedules.length > 0) {
            setActiveSchedule(classSchedules[0]);
        }
        console.log(classSchedules);
    }, [classSchedules, classScheduleLoading]);

    const handlEventAdd = async (eventId: string, eventSectionId: string) => {
        if (!activeSchedule?.id) return;

        addClassToSchedule({
            id: `${eventId}-${eventSectionId}`,
            resource: 'classSchedule',
            values: {
                classScheduleId: activeSchedule?.id,
                classCode: eventId,
                sectionId: eventSectionId,
            },
            meta: {
                gqlMutation: ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION
            },
        },
            {
                onSuccess: () => {
                    return true;
                },
                onError: (error: HttpError) => {
                    console.error(error);
                    return false;
                }
            }
        );
    };

    const handleEventRemove = (eventId: string, eventSectionId: string) => {
        removeClassFromSchedule({
            id: `${eventId}-${eventSectionId}`,
            resource: 'classSchedule',
            values: {
                classScheduleId: activeSchedule?.id,
                classCode: eventId,
                sectionId: eventSectionId,
            },
            meta: {
                gqlMutation: REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION
            },
        },
            {
                onSuccess: () => {
                    return true;
                },
                onError: (error: HttpError) => {
                    console.error(error);
                    throw new Error("Failed to remove class from schedule");
                }
            }
        );
    };

    const events = activeSchedule?.entries?.flatMap(entry => {
        if (!entry?.class) return [];

        return entry.class.sections?.map(section => {
            if (!section) return undefined;

            return {
                id: `${entry.class?.id}-${section.section}`,
                name: entry.class?.title ?? "",
                day: section.dayOfWeek ?? "",
                startTime: section.startTime ?? "",
                endTime: section.endTime ?? "",
                color: '#4ef442',
                professor: section.professor ?? "",
            } as eventSection;
        }) ?? [];
    }).filter((event): event is eventSection => event !== undefined) ?? [];

    return (
        <CourseCalendar
            courses={classes ?? []}
            activeSchedule={activeSchedule}
            handleEventRemove={handleEventRemove}
            handleEventAdd={handlEventAdd}
            scheduleLoading={classScheduleLoading}
            events={events}
        />
    );
}

export default Page;