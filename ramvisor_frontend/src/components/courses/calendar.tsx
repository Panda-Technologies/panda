"use client";

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

interface Event {
  id: number | undefined;
  title: string | undefined;
  day: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  color: string | undefined;
  professor: string | undefined;
};

type Section = {
  id: string;
  professor: string;
  startTime: string;
  endTime: string;
  days: string[];
};

type Course = {
  id: string;
  name: string;
  sections: Section[];
  color: string;
};

type Props = {
  events: Event[] | undefined;
  onEventMove: (event: Event) => void;
  onEventRemove?: (eventId: string) => void;
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

const CalendarContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 300px;
  height: calc(100vh - 40px);
  margin-right: 20px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
`;

const CalendarGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  grid-auto-rows: 60px;
  background-color: white;
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const HeaderCell = styled.div`
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  padding: 12px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const TimeCell = styled.div`
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

const CalendarCell = styled.div`
  border-right: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
`;

const EventBlock = styled.div<{ color: string; height: number }>`
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

const DraggableCourseCard = styled.div<{ color: string }>`
  background-color: white;
  border-left: 4px solid ${props => props.color};
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: move;
`;

const RemoveButton = styled(Button)`
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
  onEventRemove = () => {} 
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

  const DraggableCourse: React.FC<{ course: Course; section: Section }> = ({ course, section }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'course',
      item: { course, section },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <DraggableCourseCard ref={drag} color={course.color} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div style={{ fontWeight: 'bold' }}>{course.id} - {course.name}</div>
        <div>{section.id} - {section.professor}</div>
        <div>{section.days.join(', ')} {section.startTime} - {section.endTime}</div>
      </DraggableCourseCard>
    );
  };

  const DroppableCalendar = () => {
    const [, drop] = useDrop(() => ({
      accept: 'course',
      drop: (item: { course: Course; section: Section }, monitor) => {
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          const calendarRect = document.getElementById('calendar-grid')?.getBoundingClientRect();
          if (calendarRect) {
            const x = clientOffset.x - calendarRect.left;
            const y = clientOffset.y - calendarRect.top;
            const dayIndex = Math.floor(((x - 80) / (calendarRect.width - 80)) * 5);
            const hourIndex = Math.floor((y / 60)) - 1; // Subtract 1 for header row
            
            if (dayIndex >= 0 && dayIndex < 5 && hourIndex >= 0 && hourIndex < 11) {
              const day = days[dayIndex];
              const time = `${hourIndex + 8}:00`;
              
              const newEvent: Event = {
                id: `${item.course.id}-${day}-${time}`,
                title: item.course.name,
                day,
                startTime: item.section.startTime,
                endTime: item.section.endTime,
                color: item.course.color,
                professor: item.section.professor,
              };
              onEventMove(newEvent);
            }
          }
        }
      },
    }));

    const calculateEventPosition = (event: Event, cellStartHour: number) => {
      const startHour = parseInt(event.startTime.split(':')[0]);
      const startMinute = parseInt(event.startTime.split(':')[1]);
      const endHour = parseInt(event.endTime.split(':')[0]);
      const endMinute = parseInt(event.endTime.split(':')[1]);
      
      const top = Math.max(0, (startHour - cellStartHour) * 60 + startMinute);
      const height = Math.min(60, (endHour - startHour) * 60 + (endMinute - startMinute) - Math.max(0, (cellStartHour - startHour) * 60));
      
      return { top, height };
    };

    const formatTime = (hour: number) => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:00 ${period}`;
    };

    return (
      <CalendarGrid ref={drop} id="calendar-grid">
        <TimeCell style={{ backgroundColor: '#4a90e2' }}></TimeCell>
        {days.map(day => <HeaderCell key={day}>{day}</HeaderCell>)}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <TimeCell>{formatTime(hour)}</TimeCell>
            {days.map(day => (
              <CalendarCell key={`${day}-${hour}`}>
                {events
                  .filter(event => event.day === day &&
                    parseInt(event.startTime.split(':')[0]) < hour + 1 &&
                    parseInt(event.endTime.split(':')[0]) > hour)
                  .map(event => {
                    const { top, height } = calculateEventPosition(event, hour);
                    return (
                      <EventBlock 
                        key={event.id} 
                        color={event.color} 
                        height={height}
                        style={{ top: `${top}px` }}
                      >
                        <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                        <div>{event.startTime} - {event.endTime}</div>
                        <div>{event.professor}</div>
                        <RemoveButton 
                          type="text" 
                          icon={<CloseOutlined />} 
                          onClick={() => onEventRemove(event.id)}
                        />
                      </EventBlock>
                    );
                  })}
              </CalendarCell>
            ))}
          </React.Fragment>
        ))}
      </CalendarGrid>
    );
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
        <DroppableCalendar />
      </CalendarContainer>
    </DndProvider>
  );
};

export default CourseCalendar;
