"use client";

import React, { useState } from 'react';
import CourseCalendar from '@components/courses/calendar'; 

type Event = {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
  professor: string;
};

const Page: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const handleEventMove = (newEvent: Event) => {
      setEvents(prevEvents => [...prevEvents, newEvent]);
    };
    
    const handleEventRemove = (eventId: string) => {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };
    
    return (
      <CourseCalendar 
        events={events} 
        onEventMove={handleEventMove} 
        onEventRemove={handleEventRemove}
      />
    );
}

export default Page;