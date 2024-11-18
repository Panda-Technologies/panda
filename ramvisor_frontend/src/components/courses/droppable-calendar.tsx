import {
    Event,
} from "@components/courses/calendar";
import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import styled from "styled-components";

type Props = {
    events: Event[] | undefined;
    onEventMove: (event: Event) => void;
    onEventRemove: (eventId: string) => void;
}

const CalendarContainer = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 40px repeat(5, 1fr);
    position: relative;
    padding: 50px 10px 10px;
    background-color: #f5f5f5;
    height: calc(100vh - 70px);
    grid-template-rows: auto repeat(11, 80px);
`;

const HeaderWrapper = styled.div`
    z-index: 3;
    display: grid;
    grid-template-columns: 50px repeat(5, 1fr);
    position: sticky;
    top: 0;
    grid-column: 1 / -1;
`
;
const TimeHeaderCell = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f7f9ff;
    font-size: 0.3rem;
    z-index: 1;
`
;

const HeaderCell = styled.div<{ isFirst?: boolean }>`
    display: flex;
    align-items: center;
    padding: 35px 30px;
    font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    justify-content: center;
    background-color: #f7f9ff;
    text-transform: uppercase;
    font-size: 1rem;
    color: #979eab;
    letter-spacing: 0.05em;
`
;

const TimeCell = styled.div`
    display: flex;
    background-color: #fdfdfe;
    left: 0;
    grid-column: 1;
    z-index: 0;
    position: relative;
    padding: 0 8px;
    font-size: 0.75rem;
    `
;

const DroppableCalendar = ({ events = [], onEventMove, onEventRemove }: Props ) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

    // const [, drop] = useDrop(() => ({
    //     accept: 'course',
    //     drop: (item: { course: Course; section: Section }, monitor) => {
    //         const clientOffset = monitor.getClientOffset();
    //         if (clientOffset) {
    //             const calendarRect = document.getElementById('calendar-grid')?.getBoundingClientRect();
    //             if (calendarRect) {
    //                 const x = clientOffset.x - calendarRect.left;
    //                 const y = clientOffset.y - calendarRect.top;
    //                 const dayIndex = Math.floor(((x - 80) / (calendarRect.width - 80)) * 5);
    //                 const hourIndex = Math.floor((y / 60)) - 1; // Subtract 1 for header row
    //
    //                 if (dayIndex >= 0 && dayIndex < 5 && hourIndex >= 0 && hourIndex < 11) {
    //                     const day = days[dayIndex];
    //                     const time = `${hourIndex + 8}:00`;
    //
    //                     const newEvent: Event = {
    //                         id: `${item.course.id}-${day}-${time}`,
    //                         title: item.course.name,
    //                         day,
    //                         startTime: item.section.startTime,
    //                         endTime: item.section.endTime,
    //                         color: item.course.color,
    //                         professor: item.section.professor,
    //                     };
    //                     onEventMove(newEvent);
    //                 }
    //             }
    //         }
    //     },
    // }));



    const calculateEventPosition = (event: Event, cellStartHour: number) => {
        const startHour = parseInt(event.startTime?.split(':')[0] || '0');
        const startMinute = parseInt(event.startTime?.split(':')[1] || '0');
        const endHour = parseInt(event.endTime?.split(':')[0] || '0');
        const endMinute = parseInt(event.endTime?.split(':')[1] || '0');

        const top = Math.max(0, (startHour - cellStartHour) * 60 + startMinute);
        const height = Math.min(60, (endHour - startHour) * 60 + (endMinute - startMinute) - Math.max(0, (cellStartHour - startHour) * 60));

        return { top, height };
    };

    const formatTime = (hour: number) => {
        const period = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour % 12 || 12;
        return `${displayHour}${period}`;
    };

    return (
        <CalendarContainer>
            <HeaderWrapper>
                <TimeHeaderCell></TimeHeaderCell>
                {days.map((day) => {
                    if (day == 'Fri') {
                        return (
                            <HeaderCell key={day}>{day}</HeaderCell>
                        );
                    }
                    return (
                    <HeaderCell key={day} style={{ borderRight: '1px solid #e5e7eb' }}>{day}</HeaderCell>
                    );
                })}
            </HeaderWrapper>
            {hours.map((hour) => (
                <TimeCell key={hour}>
                    {formatTime(hour)}
                </TimeCell>
            ))}

        </CalendarContainer>
    );
};

export default DroppableCalendar;