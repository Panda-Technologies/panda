import {useDrop} from "react-dnd";
import {
    CalendarCell,
    CalendarGrid,
    Course,
    EventBlock,
    HeaderCell, RemoveButton,
    Section,
    TimeCell,
    Event
} from "@components/courses/calendar";
import React from "react";
import {CloseOutlined} from "@ant-design/icons";

type Props = {
    events: Event[];
    onEventMove: (event: Event) => void;
    onEventRemove: (eventId: number) => void;
}

const DroppableCalendar = ({ events, onEventMove, onEventRemove }: Props ) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

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
        const startHour = parseInt(event.startTime?.split(':')[0] || '0');
        const startMinute = parseInt(event.startTime?.split(':')[1] || '0');
        const endHour = parseInt(event.endTime?.split(':')[0] || '0');
        const endMinute = parseInt(event.endTime?.split(':')[1] || '0');

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
                                    parseInt(event.startTime?.split(':')[0] || '0') < hour + 1 &&
                                    parseInt(event.endTime?.split(':')[0] || '0') > hour)
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
                                                onClick={() => onEventRemove(event?.id || 0)}
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

export default DroppableCalendar;