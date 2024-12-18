import {
    Course,
} from "@components/courses/calendar";
import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {convertScheduleDays} from "@utilities/helpers";
import {getRandomLightColor} from "@components/courses/addable-course";
import {eventSection} from "@app/course/page";

type Props = {
    events: eventSection[] | undefined;
    activeCourses: Course[];
    handleRemoveCourse: (courseId: string, sectionId?: string) => void;
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
    margin-bottom: 10px;
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
    width: 19%;
    z-index: 1;
    background-color: ${props => `${props.color}99`};
    border-top: 5.5px solid ${props => props.color};
`;

const EventTitle = styled.div`
    color: #4B5563;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const EventTime = styled.div`
    color: #6B7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

const DroppableCalendar = ({ events = [], activeCourses, handleRemoveCourse }: Props ) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hours = Array.from({ length: 17 }, (_, i) => i + 8); // 8 AM to 6 PM

    const calculateEventPosition = (event: eventSection) => {
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

    const renderEvent = (event: eventSection, dayIndex: number) => {
        const { top, height } = calculateEventPosition(event);
        const minHeight = 80;
        const scaleFactor = Math.min(Math.max(height / minHeight, 0.7), 1.3);

        const baseTitleSize = 14;
        const baseTimeSize = 12;
        const baseProfessorSize = 11;

        return (
            <EventCard
                key={event.id}
                color={'#4ef442'}
                style={{
                    top: `${top}px`,
                    height: `${height}px`,
                }}
            >
                <CloseOutlined
                    style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                    }}
                    onClick={() => handleRemoveCourse(event.id, undefined)}
                />
                <EventTitle style={{
                    fontSize: `${(baseTitleSize * scaleFactor) > 14 ? 14 : (baseTitleSize * scaleFactor)}px`,
                    marginBottom: `${4 * scaleFactor}px`
                }}>
                    {event.name}
                </EventTitle>
                <EventTime>
                    <div style={{
                        fontSize: `${(baseTimeSize * scaleFactor) > 12 ? 12 : (baseTimeSize * scaleFactor)}px`
                    }}>
                        {`${event.startTime} - ${event.endTime}`}
                    </div>
                    <div style={{
                        fontSize: `${(baseProfessorSize * scaleFactor) > 12 ? 12 : (baseProfessorSize * scaleFactor)}px`,
                        marginTop: `${2 * scaleFactor}px`
                    }}>
                        {event.professor}
                    </div>
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
                                {activeCourses
                                    .flatMap(event => {
                                        const eventDays = convertScheduleDays(event.section.day);
                                        return eventDays.map(fullDay => ({
                                            id: event.id,
                                            name: event.name,
                                            color: event.color,
                                            startTime: event.section.startTime,
                                            endTime: event.section.endTime,
                                            professor: event.section.professor,
                                            day: fullDay
                                        }));
                                    })
                                    .filter(event => {
                                        return event.day === day &&
                                            parseInt(event.startTime.split(':')[0]) === hour;
                                    })
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