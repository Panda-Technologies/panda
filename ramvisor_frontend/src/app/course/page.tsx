"use client";

import React, {useEffect} from 'react';
import CourseCalendar from '@components/courses/calendar';
import {BaseRecord, CreateResponse, HttpError, useCreate, useDelete, useGetIdentity} from '@refinedev/core';
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

interface Event {
    id: string;
    title: string;
    day: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
}

const useGetUser = (userId: string) => {
    const { data, isLoading, error } = useDataFetch<{ getUser: User }>(
        GET_USER_QUERY,
        { id: userId },
        "user"
    );
    return { data: data?.getUser, isLoading, error };
}

const useGetClassSchedules = (userId: string) => {
    const { data, isLoading, error } = useDataFetch<{ getClassSchedules: ClassSchedule[] }>(
        GET_CLASS_SCHEDULES_QUERY,
        { userId: userId },
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

    const { data: identity } = useGetIdentity<{ id: string }>();
    const userId = identity?.id;

    const { data: classSchedules } = useGetClassSchedules(userId!);
    const { data: classes } = useGetClasses();

    const { mutate: addClassToSchedule } = useCreate();
    const { mutate: removeClassFromSchedule } = useDelete();

    useEffect(() => {
        if (classSchedules && classSchedules.length > 0) {
            setActiveSchedule(classSchedules[0]);
        }
    }, [classSchedules]);

    const handleEventMove = (event: Event) => {
        if (!activeSchedule?.id) return;

        addClassToSchedule({
            resource: "classScheduleEntries",
            values: {
                classScheduleId: activeSchedule.id,
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

    const events = activeSchedule?.entries?.flatMap(entry => {
        if (!entry?.class) return [];

        return entry.class.sections?.map(section => {
            if (!section) return undefined;

            return {
                id: `${entry.class?.id}-${section.section}`,
                title: entry.class?.title ?? "",
                day: section.dayOfWeek ?? "",
                startTime: section.startTime ?? "",
                endTime: section.endTime ?? "",
                color: entry.class?.color ?? "blue",
                professor: section.professor ?? "",
            } as Event;
        }) ?? [];
    }).filter((event): event is Event => event !== undefined) ?? [];

    return (
        <CourseCalendar
            courses={classes ?? []}
            events={events}
            onEventMove={handleEventMove}
            onEventRemove={handleEventRemove}
        />
    );
}

export default Page;