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
    REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION, RESET_CLASS_SCHEDULE_MUTATION
} from '@graphql/mutations';
import useDataFetch from "@utilities/data-fetch";
import {Class, ClassSchedule, User} from "@graphql/generated/graphql";
import {wait} from "@apollo/client/testing";
import {getRandomLightColor} from "@components/courses/addable-course";
import NewScheduleModal from "@components/courses/new-schedule";
import {message} from "antd";

export interface eventSection {
    id: string;
    name: string;
    day: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
}

const availableSemesters = [
    { id: "Fall 2024" },
    { id: "Spring 2025" },
];

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
    const [schedules, setSchedules] = React.useState<ClassSchedule[] | undefined>(undefined);
    const [showNewScheduleModal, setShowNewScheduleModal] = React.useState<boolean>(false);

    const LAST_SCHEDULE_KEY = 'last_active_schedule';

    const { data: classSchedules, isLoading: classScheduleLoading } = useGetClassSchedules();
    const { data: classes } = useGetClasses();

    const { mutate: addClassToSchedule } = useUpdate();
    const { mutate: removeClassFromSchedule } = useUpdate();
    const { mutate: resetSchedule } = useUpdate();

    useEffect(() => {
        const savedScheduleId = localStorage.getItem(LAST_SCHEDULE_KEY);
        console.log("Saved schedule id", savedScheduleId);
            if (!classScheduleLoading && classSchedules && classSchedules.length > 0) {
                setSchedules(classSchedules);
                if (savedScheduleId) {
                    const savedSchedule = classSchedules.find(schedule => schedule.id === parseInt(savedScheduleId));
                    if (savedSchedule) {
                        setActiveSchedule(savedSchedule);
                    } else {
                        localStorage.clear();
                        setActiveSchedule(classSchedules[0]);
                    }
                } else {
                    setActiveSchedule(classSchedules[0]);
                }
            }
        console.log(classSchedules);
    }, [classSchedules, classScheduleLoading]);

    const handlEventAdd = (eventId: string, eventSectionId: string) => {
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
                    throw new Error("Failed to add class to schedule");
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

    const handleActiveScheduleReset = () => {
        resetSchedule({
            id: 'reset',
            resource: 'classSchedule',
            values: {
                id: activeSchedule?.id,
            },
            meta: {
                gqlMutation: RESET_CLASS_SCHEDULE_MUTATION
            },
        },
            {
                onSuccess: () => {
                    return true;
                },
                onError: (error: HttpError) => {
                    console.error(error);
                    throw new Error("Failed to reset schedule");
                }
            })
    }

    const cacheActiveSchedule = (scheduleId: number) => {
        localStorage.setItem(LAST_SCHEDULE_KEY, scheduleId.toString());
    }

    const closeNewScheduleModal = () => {
        setShowNewScheduleModal(false);
    }
    const openNewScheduleModal = () => {
        setShowNewScheduleModal(true);
    }

    const events = activeSchedule?.entries?.flatMap(entry => {
        if (!entry?.class) return [];

        return entry.class.sections?.map(section => {
            if (!section) return undefined;
            console.log("Section", section);
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

    const handleScheduleCreation = (schedule: ClassSchedule) => {
        setSchedules(prevSchedules => {
            return [...prevSchedules ?? [], schedule];
        })
        try {
            cacheActiveSchedule(schedule.id);
        } catch (error) {
            console.error('Failed to save active schedule:', error);
        }
        setActiveSchedule(schedule);
    }

    return (
        <>{showNewScheduleModal && (
            <NewScheduleModal onClose={closeNewScheduleModal} semesterId={activeSchedule?.semesterId ?? "Fall 2024"} semesters={availableSemesters} onFinish={handleScheduleCreation} isVisible={showNewScheduleModal}/>
            )}
            <CourseCalendar
            courses={classes ?? []}
            scheduleList={schedules ?? []}
            activeSchedule={activeSchedule}
            handleEventRemove={handleEventRemove}
            handleEventAdd={handlEventAdd}
            handleOpenNewScheduleModal={openNewScheduleModal}
            handleActiveScheduleReset={handleActiveScheduleReset}
            scheduleLoading={classScheduleLoading}
            setActiveSchedule={setActiveSchedule}
            cacheActiveSchedule={cacheActiveSchedule}
            events={events}/></>
    );
}

export default Page;