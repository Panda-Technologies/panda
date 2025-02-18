"use client";

import React, {useState, useMemo, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {Input, Button, message} from 'antd';
import {FilterOutlined, SearchOutlined} from '@ant-design/icons';
import {List, AutoSizer} from 'react-virtualized';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import DroppableCalendar from "@components/courses/droppable-calendar";
import {Class, ClassSchedule} from "@graphql/generated/graphql";
import AddableCourse, {flattenedCourse} from "@components/courses/addable-course";
import {eventSection} from "@app/course/page";
import {convertScheduleDays, convertTimeToMinutes, processDays} from "@utilities/helpers";
import CalendarHeader from "@components/courses/header";
import CourseFilterPopover from "@components/courses/search-filter";

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

export type courseFilter = {
    dayOfWeek?: string[];
    startTime?: string;
    endTime?: string;
    rating?: number;
    credits?: number;
    time?: any;
}

type Props = {
    events: eventSection[] | undefined;
    activeSchedule?: ClassSchedule;
    scheduleLoading?: boolean;
    courses: Class[];
    handleEventAdd: (eventId: string, eventSectionId: string) => void;
    handleEventRemove: (eventId: string, eventSectionId: string) => void;
    handleOpenNewScheduleModal: () => void;
    handleActiveScheduleReset: () => void;
    setActiveSchedule: (schedule: ClassSchedule) => void;
    scheduleList: ClassSchedule[];
    cacheActiveSchedule: (scheduleId: number) => void;
};

// Fuse.js options for search
const fuseOptions = {
    keys: [
        {name: 'classCode', weight: 2},
        {name: 'title', weight: 1},
        {name: 'searchString', weight: 1},
        {name: 'professors', weight: 1},
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
                                             scheduleLoading,
                                             handleEventAdd,
                                             handleEventRemove,
                                             handleOpenNewScheduleModal,
                                             handleActiveScheduleReset,
                                             scheduleList,
                                             setActiveSchedule,
                                             cacheActiveSchedule,
                                         }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [courseFilter, setCourseFilter] = useState<courseFilter | null>(null);
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [activeCourseMap, setActiveCourseMap] = useState<Map<CourseKey, Course>>(new Map());

    // Helper function to create unique course key
    const createCourseKey = (courseId: string, sectionId: string): CourseKey =>
        `${courseId}-${sectionId}`;

    const checkScheduleConflict = useCallback((course: Course) => {
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
    }, [activeCourseMap]);

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

    useEffect(() => {
        setSearchTerm('');
    }, []);

    // Course management handlers
    const onAddCourse = useCallback((course: flattenedCourse, section: Section) => {
        const courseKey = createCourseKey(course.id, section.id);
        const prevMap = new Map(activeCourseMap);

        if (checkScheduleConflict({id: course.id, name: course.name, color: course.color, section})) {
            message.error('Course schedule conflict', 1);
            return;
        }

        if (activeCourseMap.has(courseKey)) {
            message.error('Course section already added', 1);
            return;
        }

        const courseToAdd: Course = {
            id: course.id,
            name: course.name,
            color: course.color,
            section: section
        };

        try {
            setActiveCourseMap(map => {
                const newMap = new Map(map);
                newMap.set(courseKey, courseToAdd);
                return newMap;
            });
            handleEventAdd(course.id, section.id);
            message.success('Course added successfully', 1);
        } catch (e) {
            setActiveCourseMap(prevMap);
            message.error(`Error adding course: ${e instanceof Error ? e.message : 'Please try again later'}`, 2);
        }
    }, [activeCourseMap, checkScheduleConflict, handleEventAdd]);

    const onRemoveCourse = useCallback(async (courseId: string, sectionId?: string) => {
        const courseKey = courseId && sectionId ? createCourseKey(courseId, sectionId) : (() => {
            let foundCourseKey = '';
            activeCourseMap.forEach((_, key) => {
                if (key.includes(courseId)) {
                    foundCourseKey = key;
                }
            });
            return foundCourseKey;
        })();

        if (!courseKey || !activeCourseMap.has(courseKey)) {
            message.error('Course section not found', 1);
            return;
        }

        const course = activeCourseMap.get(courseKey);
        const prevMap = new Map(activeCourseMap);

        try {
            setActiveCourseMap(map => {
                const newMap = new Map(map);
                newMap.delete(courseKey);
                return newMap;
            });
            handleEventRemove(course!.id, course!.section.id);

            message.success('Course removed successfully', 1);
        } catch (e) {
            setActiveCourseMap(prevMap);
            message.error(`Error removing course: ${e instanceof Error ? e.message : 'Please try again later'}`, 2);
        }
    }, [activeCourseMap, handleEventRemove]);

    const onResetCourse = useCallback(() => {
        const currentSchedule = activeSchedule;
        const prevCoursesMap = activeCourseMap;
        console.log('Resetting schedule:', currentSchedule);
        console.log('Resetting courses:', activeCourseMap);
        if (!currentSchedule || activeCourseMap.size === 0) {
            message.error('No courses to reset', 1);
            return;
        }
        try {
            setActiveCourseMap(new Map());
            activeSchedule!.entries = [];
            handleActiveScheduleReset();

            message.success('Schedule reset successfully', 1);
        } catch (e) {
            setActiveCourseMap(prevCoursesMap);
            activeSchedule!.entries = currentSchedule.entries;
            message.error('Error resetting schedule. Please try again later');
        }
    }, [activeSchedule, activeCourseMap, handleActiveScheduleReset]);

    const onLoadSchedule = useCallback((scheduleId: number) => {
        const schedule = scheduleList.find(schedule => schedule.id === scheduleId);
        if (!schedule || !schedule.title || !schedule.semesterId) {
            message.error('Error loading schedule', 1);
            return;
        }
        setActiveSchedule(schedule);
        cacheActiveSchedule(scheduleId);
    }, [scheduleList, setActiveSchedule]);

    const checkCourseAdded = useCallback((course: flattenedCourse, section: Section) => {
        const courseKey = createCourseKey(course.id, section.id);
        return activeCourseMap.has(courseKey);
    }, [activeCourseMap]);

    const onCloseFilter = () => {
        if (filterOpen) {
            setFilterOpen(false);
        }
    }

    const applyFilter = (filter?: courseFilter) => {
        if (!filter) {
            setCourseFilter(null);
            console.log("course removed" + courseFilter);
        }
        const newCourseFilter = {
            dayOfWeek: filter?.dayOfWeek ?? undefined,
            startTime: filter?.startTime ?? undefined,
            endTime: filter?.endTime ?? undefined,
            rating: filter?.rating ?? undefined,
            credits: filter?.credits ?? undefined,
            time: filter?.time ?? undefined
        }
        setCourseFilter(newCourseFilter);
        console.log(newCourseFilter);
    }

    const fuse = useMemo(() => {
        const searchData = courses.flatMap(course =>
            course.sections?.map(section => ({
                ...course,
                section: section,
                searchString: `${course.title.toLowerCase()} ${course.classCode.toLowerCase()}`,
                sectionStartTime: convertTimeToMinutes(section?.startTime || ''),
                sectionEndTime: convertTimeToMinutes(section?.endTime || ''),
                sectionDay: section?.dayOfWeek,
                professor: section?.professor.toLowerCase()
            })) || []
        );
        return new Fuse(searchData, fuseOptions);
    }, [courses]);

    const searchResults = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        if (term === '') {
            return courses.flatMap(course =>
                course.sections?.map(section => ({
                    ...course,
                    section: section,
                    searchString: `${course.title.toLowerCase()} ${course.classCode.toLowerCase()}`,
                    sectionStartTime: convertTimeToMinutes(section?.startTime || ''),
                    sectionEndTime: convertTimeToMinutes(section?.endTime || ''),
                    sectionDay: section?.dayOfWeek,
                    professor: section?.professor.toLowerCase()
                })) || []
            );
        }

        const results = fuse.search(term)
            .filter(result => {
                if ((result.score || 1) >= 0.4) return false;
                if (!courseFilter) return true;

                const item = result.item;
                const filterStartTime = courseFilter.time?.[0] ?
                    convertTimeToMinutes(courseFilter.time[0].format('HH:mm')) : null;
                const filterEndTime = courseFilter.time?.[1] ?
                    convertTimeToMinutes(courseFilter.time[1].format('HH:mm')) : null;

                return (
                    (!courseFilter.dayOfWeek || item.sectionDay === processDays(courseFilter.dayOfWeek)) &&
                    (!filterStartTime || item.sectionStartTime >= filterStartTime) &&
                    (!filterEndTime || item.sectionEndTime <= filterEndTime) &&
                    (!courseFilter.rating || item.rateMyProfessorRating >= courseFilter.rating) &&
                    (!courseFilter.credits || item.credits === courseFilter.credits)
                );
            })
            .map(result => result.item);

        return results.slice(0, 100);
    }, [fuse, searchTerm, courseFilter]);

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
        const {course, section} = flattenedResults[index];

        return (
            <div key={key} style={style}>
                <AddableCourse
                    key={`${course.id}-${section.id}`}
                    course={course}
                    section={section}
                    handleAddCourse={onAddCourse}
                    checkCourseAdded={checkCourseAdded}
                    handleRemoveCourse={onRemoveCourse}
                />
            </div>
        );
    }, [flattenedResults, onAddCourse, onRemoveCourse, checkCourseAdded]);

    return (
        <CalendarContainer>
            <Sidebar>
                <Input
                    placeholder="Search courses"
                    prefix={<SearchOutlined/>}
                    onChange={(e) => debouncedSearch(e.target.value)}
                    style={{marginBottom: '20px'}}
                    suffix={
                        <FilterOutlined
                            className="filter-button"
                            style={{cursor: 'pointer'}}
                            onClick={(e) => {
                                e.stopPropagation();
                                setFilterOpen(!filterOpen);
                            }}
                        />
                    }
                />
                <CourseFilterPopover open={filterOpen} onFilterChange={applyFilter} onClose={onCloseFilter}/>
                <ClassListWrapper>
                    <AutoSizer>
                        {({width, height}) => (
                            <List
                                width={width - 5}
                                height={height}
                                rowCount={searchResults.length}
                                rowHeight={165}
                                rowRenderer={rowRenderer}
                                overscanRowCount={5}
                                style={{scrollbarWidth: 'none'}}
                            />
                        )}
                    </AutoSizer>
                </ClassListWrapper>
            </Sidebar>
            <CalendarWrapper>
                <CalendarHeader
                    activeSchedule={activeSchedule}
                    handleNewSchedule={handleOpenNewScheduleModal}
                    handleResetSchedule={onResetCourse}
                    scheduleList={scheduleList}
                    handleLoadSchedule={onLoadSchedule}
                /><DroppableCalendarWrapper>
                <DroppableCalendar
                    events={events}
                    activeCourses={Array.from(activeCourseMap.values())}
                    handleRemoveCourse={onRemoveCourse}
                />
            </DroppableCalendarWrapper>
            </CalendarWrapper>
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
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

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

export const CalendarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    top: -10%;
    position: relative;
    gap: -20px;
`;

export const DroppableCalendarWrapper = styled.div`
    margin-top: -65px;
    position: relative;
    z-index: 0;
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
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

// Export memoized component
export default React.memo(CourseCalendar);
