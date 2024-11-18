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
    grid-template-columns: 40px repeat(5, minmax(170px, 1fr));
    position: relative;
    padding: 50px 10px 10px;
    background-color: #f5f5f5;
    height: calc(100vh - 70px);
    grid-template-rows: auto repeat(17, 80px);
`;

const HeaderWrapper = styled.div`
    z-index: 3;
    display: grid;
    grid-template-columns: 40px repeat(5, minmax(170px, 1fr));
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
    border-top-left-radius: 15px;
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

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 40px repeat(5, minmax(170px, 1fr));
    position: relative;
    overflow: scroll;
    grid-column: 1 / -1;
    z-index: 0;
    height: 830%;
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`;

const TimeCell = styled.div`
    background-color: #fdfdfe;
    padding: 10px 5px;
    font-size: 0.75rem;
    display: flex;
    align-items: start;
    transform: translateY(-20px);
    height: 100%;
    width: 100%;
`;

const DayCell = styled.div`
    background-color: #fdfdfe;
    border-right: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    height: 80px;

    &:nth-child(6n) {
        border-right: none;
    }
`;

const DroppableCalendar = ({ events = [], onEventMove, onEventRemove }: Props ) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hours = Array.from({ length: 17 }, (_, i) => i + 8); // 8 AM to 6 PM

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
                {days.map((day) => (
                    <HeaderCell
                        key={day}
                        style={day === 'Fri' ?
                            { borderTopRightRadius: '15px' } :
                            { borderRight: '1.1px solid #e5e7eb' }
                        }
                    >
                        {day}
                    </HeaderCell>
                ))}
            </HeaderWrapper>
            <GridWrapper>
                {/* Time slots */}
                {hours.map((hour) => (
                    <React.Fragment key={hour}>
                        <TimeCell>
                            {formatTime(hour)}
                        </TimeCell>
                        {/* Day cells for this hour */}
                        {days.map((day) => (
                            <DayCell key={`${day}-${hour}`}>

                            </DayCell>
                        ))}
                    </React.Fragment>
                ))}
            </GridWrapper>
        </CalendarContainer>
    );
};

export default DroppableCalendar;