"use client";

import React, {useState, useMemo, useCallback} from 'react';
import styled from 'styled-components';
import {Input, Button} from 'antd';
import {SearchOutlined, CloseOutlined} from '@ant-design/icons';
import {List, AutoSizer} from 'react-virtualized';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import DroppableCalendar from "@components/courses/droppable-calendar";
import {Class} from "@graphql/generated/graphql";
import AddableCourse from "@components/courses/addable-course";

export interface Event {
    id: string;
    title: string;
    day: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
};

export type Section = {
    id: string;
    professor: string;
    startTime: string;
    endTime: string;
    days: string[];
};

export type Course = {
    id: string;
    name: string;
    sections: Section[];
    color: string;
};

type Props = {
    events: Event[] | undefined;
    onEventMove: (event: Event) => void;
    onEventRemove?: (eventId: string) => void;
    courses: Class[];
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
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: move;
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
                                             onEventMove,
                                             courses,
                                             onEventRemove,
                                         }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value.toLowerCase().trim());
        }, 300),
        []
    );

    const transformCourse = useCallback((course: Class) => ({
        id: course.classCode,
        name: course.title,
        color: course.color || '#4A90E2',
        sections: [{
            id: course.id.toString(),
            professor: course.professor,
            startTime: course.startTime,
            endTime: course.endTime,
            days: course.dayOfWeek.split('')
        }]
    }), []);

    const rowRenderer = useCallback(({
                                         key,
                                         index,
                                         style
                                     }: {
        key: string;
        index: number;
        style: React.CSSProperties;
    }) => {
        const course = searchResults[index];
        const transformedCourse = transformCourse(course);

        return (
            <div key={key} style={style}>
                <AddableCourse
                    course={transformedCourse}
                    section={transformedCourse.sections[0]}
                />
            </div>
        );
    }, [searchResults, transformCourse]);

    return (
            <CalendarContainer>
                <Sidebar>
                    <Input
                        placeholder="Search courses"
                        prefix={<SearchOutlined/>}
                        onChange={(e) => debouncedSearch(e.target.value)}
                        style={{marginBottom: '20px'}}
                    />
                    <div style={{height: 'calc(100% - 60px)'}}>
                        <AutoSizer>
                            {({width, height}) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={searchResults.length}
                                    rowHeight={110}
                                    rowRenderer={rowRenderer}
                                    overscanRowCount={5}
                                />
                            )}
                        </AutoSizer>
                    </div>
                </Sidebar>
                <DroppableCalendar
                    events={events}
                    onEventMove={onEventMove}
                    onEventRemove={onEventRemove!}
                />
            </CalendarContainer>
    );
};

// Memoize the entire component
export default React.memo(CourseCalendar);
