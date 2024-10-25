"use client";

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import DraggableCourse from "@components/courses/draggable-course";
import DroppableCalendar from "@components/courses/droppable-calendar";

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
  events: Event[];
  onEventMove: (event: Event) => void;
  onEventRemove?: (eventId: string) => void ;
};

export const CalendarContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 300px;
  height: calc(100vh - 40px);
  margin-right: 20px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
`;

export const CalendarGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  grid-auto-rows: 60px;
  background-color: white;
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const HeaderCell = styled.div`
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  padding: 12px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 2;
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

export const DraggableCourseCard = styled.div<{ color: string }>`
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

const CourseCalendar: React.FC<Props> = ({ 
  events, 
  onEventMove, 
  onEventRemove
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);

  const courses: Course[] = [
    {
      id: 'COMP101',
      name: 'Introduction to Programming',
      color: '#4a90e2',
      sections: [
        {
          id: 'COMP101-001',
          professor: 'Dr. Smith',
          startTime: '10:00',
          endTime: '11:15',
          days: ['Monday', 'Wednesday'],
        },
        {
          id: 'COMP101-002',
          professor: 'Dr. Johnson',
          startTime: '14:00',
          endTime: '15:15',
          days: ['Tuesday', 'Thursday'],
        },
      ],
    },
    {
      id: 'MATH201',
      name: 'Calculus I',
      color: '#f5a623',
      sections: [
        {
          id: 'MATH201-001',
          professor: 'Dr. Brown',
          startTime: '09:00',
          endTime: '09:50',
          days: ['Monday', 'Wednesday', 'Friday'],
        },
        {
          id: 'MATH201-002',
          professor: 'Dr. Davis',
          startTime: '11:00',
          endTime: '12:15',
          days: ['Tuesday', 'Thursday'],
        },
      ],
    },
  ];

  const handleSearch = (value: string) => {
    const term = value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      setSearchResults(
        courses.filter(
          (course) =>
            course.id.toLowerCase().includes(term) ||
            course.name.toLowerCase().includes(term)
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CalendarContainer>
        <Sidebar>
          <Input
            placeholder="Search courses"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          {searchResults.map((course) =>
            course.sections.map((section) => (
              <DraggableCourse key={section.id} course={course} section={section} />
            ))
          )}
        </Sidebar>
        <DroppableCalendar events={events} onEventMove={onEventMove} onEventRemove={onEventRemove!}/>
      </CalendarContainer>
    </DndProvider>
  );
};

export default CourseCalendar;
