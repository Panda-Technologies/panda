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
    padding: 70px 10px 10px;
    background-color: #f5f5f5;
    height: calc(100vh - 70px);
    grid-template-rows: auto repeat(17, 80px);
    min-width: 700px;
`;

const HeaderWrapper = styled.div`
    z-index: 3;
    display: grid;
    grid-template-columns: 40px repeat(5, minmax(170px, 1fr));
    position: sticky;
    top: 0;
    grid-column: 1 / -1;
    min-width: 700px;
`;
const TimeHeaderCell = styled.div`
    display: flex;
    justify-content: center;
    background-color: #dbe0f0;
    font-size: 0.3rem;
    border-top-left-radius: 15px;
    z-index: 1;
`
;

const HeaderCell = styled.div<{ isFirst?: boolean }>`
    display: flex;
    align-items: center;
    padding: 20px 30px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 550;
    justify-content: center;
    background-color: #dbe0f0;
    text-transform: uppercase;
    font-size: 1rem;
    color: #6B7BA6;
    letter-spacing: 0.05em;
`
;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 40px repeat(5, minmax(170px, 1fr));
    position: relative;
    overflow-y: scroll;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow-x: hidden;
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
    font-size: 0.8rem;
    font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    color: #979eab;
    display: flex;
    align-items: start;
    transform: translateY(-21px);
    height: 124%;
    width: 100%;
`;

const EventCard = styled.div<{ color: string }>`
    position: absolute;
    padding: 8px;
    border-radius: 4px 4px 12px 12px;
    font-size: 14px;
    width: 18.6%;
    z-index: 1;
    background-color: ${props => `${props.color}99`};
    border-top: 5.5px solid ${props => props.color};
`;

const EventTitle = styled.div`
    color: #4B5563;
    font-weight: 500;
    margin-bottom: 4px;
`;

const EventTime = styled.div`
    color: #6B7280;
    font-size: 12px;
`;

const DayCell = styled.div`
    background-color: #fdfdfe;
    border-right: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    height: 80px;
    position: static;

    &:nth-child(6n) {
        border-right: none;
    }
`;

const HalfHourMarker = styled.div`
    position: absolute;
    width: calc(100% - 40px);
    left: 40px;
    border-bottom: 1px dotted #e5e7eb;
    opacity: 0.7;
    z-index: 0;
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

    const mockEvents = [
        {
            id: '1',
            title: 'Product Design Course',
            day: 'Tue',
            startTime: '09:30',
            endTime: '12:00',
            color: '#90EE90',
            professor: 'Dr. Smith'
        },
        {
            id: '2',
            title: 'Usability Testing',
            day: 'Thu',
            startTime: '09:00',
            endTime: '11:00',
            color: '#9370DB',
            professor: 'Dr. Johnson'
        },
        {
            id: '3',
            title: 'App Design',
            day: 'Thu',
            startTime: '13:00',
            endTime: '15:30',
            color: '#90EE90',
            professor: 'Dr. Williams'
        },
        {
            id: '4',
            title: 'Frontend Development',
            day: 'Fri',
            startTime: '10:00',
            endTime: '13:00',
            color: '#87CEEB',
            professor: 'Dr. Brown'
        }
    ];



    const calculateEventPosition = (event: Event) => {
        const startHour = parseInt(event.startTime.split(':')[0]);
        const startMinute = parseInt(event.startTime.split(':')[1]);
        const endHour = parseInt(event.endTime.split(':')[0]);
        const endMinute = parseInt(event.endTime.split(':')[1]);

        const cellStartHour = 8;

        const top = Math.max(0, (startHour - cellStartHour) * 80 + (startMinute / 60) * 80);
        const height = ((endHour - startHour) * 80) + ((endMinute - startMinute) / 60) * 80;

        return { top, height };
    };

    const formatTime = (hour: number) => {
        const period = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour % 12 || 12;
        if (displayHour == 8 && period == 'am') {
            return null;
        }
        if (hour == 24) {
            return '12am';
        }
        return `${displayHour}${period}`;
    };

    const renderEvent = (event: Event, dayIndex: number) => {
        const { top, height } = calculateEventPosition(event);
        return (
            <EventCard
                key={event.id}
                color={event.color}
                style={{
                    top: `${top}px`,
                    height: `${height}px`,
                }}
            >
                <EventTitle>{event.title}</EventTitle>
                <EventTime>
                    {`${event.startTime} - ${event.endTime}`}
                    <div style={{ fontSize: '11px', marginTop: '2px' }}>{event.professor}</div>
                </EventTime>
            </EventCard>
        );
    };

    return (
        <CalendarContainer>
            <HeaderWrapper>
                <TimeHeaderCell></TimeHeaderCell>
                {days.map((day) => (
                    <HeaderCell
                        key={day}
                        style={day === 'Fri' ?
                            { borderTopRightRadius: '15px' } : { borderTopRightRadius: '0px' }
                        }
                    >
                        {day}
                    </HeaderCell>
                ))}
            </HeaderWrapper>
            <GridWrapper>
                {hours.map((hour) => (
                    <React.Fragment key={hour}>
                        <TimeCell>
                            {formatTime(hour)}
                        </TimeCell>
                        {days.map((day, dayIndex) => (
                            <DayCell key={`${day}-${hour}`}>
                                {mockEvents
                                    .filter(event =>
                                        event.day === day &&
                                        parseInt(event.startTime.split(':')[0]) === hour
                                    )
                                    .map(event => renderEvent(event, dayIndex))}
                            </DayCell>
                        ))}
                    </React.Fragment>
                ))}
                {hours.map((hour) => (
                    <HalfHourMarker
                        key={`marker-${hour}`}
                        style={{
                            top: `${(hour - 8) * 80 + 20}px`
                        }}
                    />
                ))}
                {hours.map((hour) => (
                    <HalfHourMarker
                        key={`marker-${hour}`}
                        style={{
                            top: `${(hour - 8) * 80 + 40}px`
                        }}
                    />
                ))}
                {hours.map((hour) => (
                    <HalfHourMarker
                        key={`marker-${hour}`}
                        style={{
                            top: `${(hour - 8) * 80 + 60}px`
                        }}
                    />
                ))}
            </GridWrapper>
        </CalendarContainer>
    );
};

export default DroppableCalendar;