"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { List, AutoSizer } from 'react-virtualized';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import DroppableCalendar from "@components/courses/droppable-calendar";
import { Class, ClassSchedule } from "@graphql/generated/graphql";
import AddableCourse, { flattenedCourse } from "@components/courses/addable-course";
import { useDelete, useUpdate } from "@refinedev/core";
import { ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION, REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION } from "@graphql/mutations";
import {eventSection} from "@app/course/page";
import {convertScheduleDays, convertTimeToMinutes} from "@utilities/helpers";

// Types
type CourseKey = string; // Format: "courseId-sectionId"

export type Section = {
    id: string;
    code: string;
    professor: string;
    startTime: string;
    endTime: string;
    day: string;
};

export type Course = {
    id: string;
    name: string;
    section: Section;
    color: string;
};

type Props = {
    events: eventSection[] | undefined;
    activeSchedule?: ClassSchedule;
    scheduleLoading?: boolean;
    courses: Class[];
};

// Fuse.js options for search
const fuseOptions = {
    keys: [
        { name: 'classCode', weight: 2 },
        { name: 'title', weight: 1 },
        { name: 'searchString', weight: 1 }
    ],
    threshold: 0.3,
    distance: 50,
    minMatchCharLength: 1,
    shouldSort: true,
    includeScore: true,
    useExtendedSearch: false,
    findAllMatches: true,
    location: 0,
    ignoreLocation: false
};

const CourseCalendar: React.FC<Props> = ({
                                             events,
                                             courses,
                                             activeSchedule,
                                             scheduleLoading
                                         }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeCourseMap, setActiveCourseMap] = useState<Map<CourseKey, Course>>(new Map());

    // Helper function to create unique course key
    const createCourseKey = (courseId: string, sectionId: string): CourseKey =>
        `${courseId}-${sectionId}`;

    const checkScheduleConflict = (course: Course) => {
        let conflict = false;
        const courseToAddDays = convertScheduleDays(course.section.day);
        const startTime = convertTimeToMinutes(course.section.startTime);
        const endTime = convertTimeToMinutes(course.section.endTime);
        activeCourseMap.forEach((activeCourse) => {
            const days = convertScheduleDays(activeCourse.section.day);
            if (days.some(day => courseToAddDays.includes(day))) {
                const activeStartTime = convertTimeToMinutes(activeCourse.section.startTime);
                const activeEndTime = convertTimeToMinutes(activeCourse.section.endTime);
                if ((startTime >= activeStartTime && startTime < activeEndTime) ||
                    (endTime > activeStartTime && endTime <= activeEndTime) ||
                    (startTime <= activeStartTime && endTime >= activeEndTime)) {
                    console.log('Conflict:', course, activeCourse);
                    conflict = true;
                }
            }
        });
        return conflict;
    };

    // Initialize schedule
    const handleSetSchedule = useCallback((schedule: ClassSchedule) => {
        if (!schedule?.entries) return;

        const newCourseMap = new Map<CourseKey, Course>();

        schedule.entries
            .filter(entry => entry?.class && entry?.sectionId)
            .forEach(entry => {
                const course = entry?.class;
                const matchingSection = course?.sections?.find(
                    section => section?.id === entry?.sectionId
                );

                if (!matchingSection) return;

                const courseKey = createCourseKey(course!.classCode, matchingSection.id.toString());
                newCourseMap.set(courseKey, {
                    id: course!.classCode,
                    name: course!.title,
                    color: course?.color || '#4A90E2',
                    section: {
                        id: matchingSection.id?.toString() || '',
                        code: matchingSection.section?.toString() || '',
                        professor: matchingSection.professor || '',
                        startTime: matchingSection.startTime || '',
                        endTime: matchingSection.endTime || '',
                        day: matchingSection.dayOfWeek || ''
                    }
                });
            });

        setActiveCourseMap(newCourseMap);
    }, []);

    useEffect(() => {
        if (!scheduleLoading && activeSchedule) {
            handleSetSchedule(activeSchedule);
        } else {
            setActiveCourseMap(new Map());
        }
    }, [activeSchedule, scheduleLoading, handleSetSchedule]);

    const { mutate: addCourse } = useUpdate();
    const { mutate: removeCourse } = useUpdate();
    // Course management handlers
    const handleAddCourse = useCallback((course: flattenedCourse, section: Section) => {
        const courseKey = createCourseKey(course.id, section.id);
        if (checkScheduleConflict({ id: course.id, name: course.name, color: course.color, section })) {
            message.error('Course schedule conflict', 1);
            return;
        }

        addCourse(
            {
                id: courseKey,
                resource: 'classSchedule',
                values: {
                    classScheduleId: activeSchedule?.id,
                    classCode: course.id,
                    sectionId: section.id,
                },
                meta: {
                    gqlMutation: ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION
                }
            },
            {
                onSuccess: () => {
                    if (!activeCourseMap.has(courseKey)) {
                        const courseToAdd: Course = {
                            id: course.id,
                            name: course.name,
                            color: course.color,
                            section: section
                        };
                        setActiveCourseMap(prevMap => {
                            const newMap = new Map(prevMap);
                            newMap.set(courseKey, courseToAdd);
                            return newMap;
                        });
                        message.success('Course added successfully', 1);
                    } else {
                        message.error('Course section already added', 1);
                    }
                },
                onError: () => {
                    message.error('Error adding course: Please try again later', 2);
                }
            }
        );
    }, [activeSchedule?.id, addCourse, activeCourseMap]);

    const handleRemoveCourse = useCallback((courseId: string, sectionId?: string) => {
        const courseKey = courseId && sectionId ? createCourseKey(courseId, sectionId) : (() => {
            console.log('CourseId:', courseId, 'SectionId:', sectionId);
            let foundCourseKey = '';
            activeCourseMap.forEach((_, key) => {
                if (key.includes(courseId)) {
                    foundCourseKey = key;
                }
            });
            return foundCourseKey;
        })();
        const course = activeCourseMap.get(courseKey);

        removeCourse(
            {
                id: courseKey,
                resource: 'classSchedule',
                values: {
                    classScheduleId: activeSchedule?.id,
                    classCode: course?.id,
                    sectionId: course?.section.id,
                },
                meta: {
                    gqlMutation: REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION
                }
            },
            {
                onSuccess: () => {
                    if (activeCourseMap.has(courseKey)) {
                        setActiveCourseMap(prevMap => {
                            const newMap = new Map(prevMap);
                            newMap.delete(courseKey);
                            return newMap;
                        });
                        message.success('Course removed successfully', 1);
                    } else {
                        message.error('Course section not found', 1);
                    }
                },
                onError: () => {
                    message.error('Error removing course: Please try again later', 2);
                }
            }
        );
    }, [activeSchedule?.id, removeCourse, activeCourseMap]);

    const checkCourseAdded = useCallback((course: flattenedCourse, section: Section) => {
        const courseKey = createCourseKey(course.id, section.id);
        return activeCourseMap.has(courseKey);
    }, [activeCourseMap]);

    const fuse = useMemo(() => {
        const searchData = courses.map(course => ({
            ...course,
            searchString: `${course.title.toLowerCase()} ${course.classCode.toLowerCase()}`
        }));
        return new Fuse(searchData, fuseOptions);
    }, [courses]);

    const searchResults = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return [];

        const exactMatches = courses.filter(course =>
            course.classCode.toLowerCase() === term ||
            course.classCode.toLowerCase().replace(/\s+/g, '') === term.replace(/\s+/g, '')
        );

        if (exactMatches.length > 0) {
            return exactMatches;
        }

        const results = fuse.search(term)
            .filter(result => (result.score || 1) < 0.4)
            .map(result => result.item);

        return results.slice(0, 100);
    }, [fuse, searchTerm, courses]);

    const debouncedSearch = debounce((value: string) => {
        setSearchTerm(value.toLowerCase().trim());
    }, 300);

    const flattenedResults = useMemo(() => {
        return searchResults.flatMap(course => {
            const transformedCourse = {
                id: course.classCode,
                name: course.title,
                color: course.color || '#4A90E2',
            };

            return course.sections?.map(section => ({
                course: transformedCourse,
                section: {
                    id: `${section?.id}`,
                    code: `${section?.section}`,
                    professor: section?.professor || '',
                    startTime: section?.startTime || '',
                    endTime: section?.endTime || '',
                    day: section?.dayOfWeek || '',
                }
            })) ?? [];
        });
    }, [searchResults]);
    // Row renderer for virtualized list
    const rowRenderer = useCallback(({
                                         key,
                                         index,
                                         style
                                     }: {
        key: string;
        index: number;
        style: React.CSSProperties;
    }) => {
        const { course, section } = flattenedResults[index];

        return (
            <div key={key} style={style}>
                <AddableCourse
                    key={`${course.id}-${section.id}`}
                    course={course}
                    section={section}
                    handleAddCourse={handleAddCourse}
                    checkCourseAdded={checkCourseAdded}
                    handleRemoveCourse={handleRemoveCourse}
                />
            </div>
        );
    }, [flattenedResults, handleAddCourse, handleRemoveCourse, checkCourseAdded]);

    return (
        <CalendarContainer>
            <Sidebar>
                <Input
                    placeholder="Search courses"
                    prefix={<SearchOutlined />}
                    onChange={(e) => debouncedSearch(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <ClassListWrapper>
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width - 5}
                                height={height}
                                rowCount={searchResults.length}
                                rowHeight={165}
                                rowRenderer={rowRenderer}
                                overscanRowCount={5}
                                style={{ scrollbarWidth: 'none' }}
                            />
                        )}
                    </AutoSizer>
                </ClassListWrapper>
            </Sidebar>
            <DroppableCalendar
                events={events}
                activeCourses={Array.from(activeCourseMap.values())}
                handleRemoveCourse={handleRemoveCourse}
            />
        </CalendarContainer>
    );
};

export const CalendarContainer = styled.div`
    display: flex;
    height: 92%;
    width: 85%;
    top: 8%;
    background-color: #f5f5f5;
    position: fixed;
    overflow: hidden;
    min-width: 1024px;
    @media (max-width: 1200px) {
        width: 95%;
    }
`;

export const Sidebar = styled.div`
    width: 300px;
    min-width: 250px;
    height: calc(100vh - 70px);
    margin-right: 20px;
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    overflow-y: hidden;
    display: flex;
    flex-direction: column;

    & * {
        overflow: hidden; /* Ensure children don't force overflow */
    }

    /* Hide scrollbar for WebKit browsers */
    &::-webkit-scrollbar {
        width: 0;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    .ant-input-affix-wrapper {
        position: sticky;
        top: 0;
        z-index: 1;
        background: white;
        margin-bottom: 20px;
    }
`;

export const CalendarGrid = styled.div`
    flex: 1;
    display: grid;
    height: calc(100vh - 70px);
    grid-template-columns: 80px repeat(7, minmax(150px, 1fr)); // Update minimum column width
    grid-auto-rows: 70px;
    background-color: white;
    border-radius: 8px;
    overflow-y: scroll;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    min-width: 700px;
`;

export const HeaderCell = styled.div`
    background-color: #4a90e2;
    color: white;
    font-weight: bold;
    padding: 24px;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 3;
`;

export const HeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 3;
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    background-color: #4a90e2;
`;

export const TimeCell = styled.div`
    background-color: #f8f9fa;
    padding: 4px 8px;
    text-align: right;
    border-bottom: 1px solid #e8e8e8;
    font-size: 12px;
    position: sticky;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    white-space: nowrap;
`;

export const CalendarCell = styled.div`
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    z-index: 0;
`;

export const EventBlock = styled.div<{ color: string; height: number }>`
    background-color: ${props => `${props.color}33`};
    border-left: 3px solid ${props => props.color};
    color: #333;
    padding: 4px;
    border-radius: 4px;
    font-size: 11px;
    position: absolute;
    left: 2px;
    right: 2px;
    height: ${props => `${props.height}px`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 1;
`;

export const AddableCourseCard = styled.div<{ color: string }>`
    background-color: white;
    border-left: 4px solid ${props => props.color};
    border-right: 1.3px solid #e8e8e8;
    border-bottom: 1.3px solid #e8e8e8;
    border-top: 1.3px solid #e8e8e8;
    padding: 12px;
    margin-bottom: 12px;
    height: 90%;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

export const RemoveButton = styled(Button)`
    position: absolute;
    top: 2px;
    right: 2px;
    padding: 0;
    min-width: 20px;
    height: 20px;
    font-size: 10px;
    z-index: 2;
`;

const ClassListWrapper = styled.div`
    height: calc(100% - 60px);
    overflow: hidden;
    &::-webkit-scrollbar {
        width: 0;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`;

// Export memoized component
export default React.memo(CourseCalendar);
