"use client";

import React, { useRef } from 'react';
import { ScheduleComponent, Day, Week, Inject, ViewsDirective, ViewDirective, EventRenderedArgs } from '@syncfusion/ej2-react-schedule';
import { Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { extend } from '@syncfusion/ej2-base';
import { useOne } from '@refinedev/core';
import { GET_CLASS_SCHEDULES_QUERY } from '@graphql/queries';

interface CalendarProps {
  width?: string;
  height?: string;
  title?: string;
  credits?: number;
  userId?: string;
}

interface ClassSchedule {
  id: string;
  entries: {
    id: string;
    class: {
      id: string;
      classCode: string;
      title: string;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      color: string;
      professor: string;
    };
  }[];
}

const cardStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  background: 'linear-gradient(to bottom right, #ffffff, #f0f4f8)',
  border: 'none',
  display: 'flex',
  flexDirection: 'column' as const
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid #e8e8e8'
};

const iconStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#4285F4'
};

const titleStyle: React.CSSProperties = {
  marginLeft: '12px',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#333'
};

const creditsStyle: React.CSSProperties = {
  marginLeft: 'auto',
  fontSize: '15px',
  color: '#505050'
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  minHeight: 0,
  position: 'relative' as const,
  overflow: 'hidden'
};

const Calendar: React.FC<CalendarProps> = ({ width, height, title, credits, userId }) => {
  const scheduleObj = useRef<ScheduleComponent>(null);

  const getScheduleInstance = (): ScheduleComponent | null => {
    return scheduleObj.current;
  };

  const { data, isLoading } = useOne<ClassSchedule>({
    resource: 'classSchedules',
    meta: {
      gqlQuery: GET_CLASS_SCHEDULES_QUERY,
      variables: { userId: userId }
    }
  });

  const mapDayOfWeek = (day: string): number => {
    const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return days.indexOf(day);
  };

  const classEvents = data?.data?.entries.map((entry) => ({
    Id: entry.id,
    Subject: `${entry.class.classCode} - ${entry.class.title}`,
    StartTime: new Date(2024, 2, 18 + mapDayOfWeek(entry.class.dayOfWeek),
                        parseInt(entry.class.startTime.split(':')[0]),
                        parseInt(entry.class.startTime.split(':')[1])),
    EndTime: new Date(2024, 2, 18 + mapDayOfWeek(entry.class.dayOfWeek),
                      parseInt(entry.class.endTime.split(':')[0]),
                      parseInt(entry.class.endTime.split(':')[1])),
    RecurrenceRule: `FREQ=WEEKLY;BYDAY=${entry.class.dayOfWeek}`,
    CategoryColor: entry.class.color || '#4285F4',
  })) || [];

  const eventData: Record<string, any>[] = extend([], classEvents, {}, true) as Record<string, any>[];

  const onEventRendered = (args: EventRenderedArgs): void => {
    const categoryColor: string = args.data.CategoryColor as string;

    if (!args.element || !categoryColor) {
      console.warn("Event rendered without proper data or element");
      return;
    }

    const scheduleInstance = getScheduleInstance();
    if (scheduleInstance?.currentView === 'Agenda') {
      // Update styles for Agenda view
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      // Update styles for other views
      Object.assign(args.element.style, {
        backgroundColor: categoryColor,
        color: '#333333',
        borderRadius: '4px',
        fontSize: '12px',
        padding: '2px 4px',
      });
    }
  };


  return (
      <Card style={cardStyle} bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={headerStyle}>
          <CalendarOutlined style={iconStyle} />
          <span style={titleStyle}>{title}</span>
          <span style={creditsStyle}>{credits} credits</span>
        </div>
        <div style={contentStyle}>
          <ScheduleComponent
              style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}
              height='100%'
              width='100%'
              selectedDate={new Date(2024, 2, 18)}
              ref={scheduleObj}
              eventSettings={{ dataSource: eventData }}
              eventRendered={onEventRendered}
              readonly={true}
              timeScale={{ enable: true, interval: 60, slotCount: 2 }}
              startHour='08:00'
              endHour='24:00'
          >
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' isSelected={true} />
            </ViewsDirective>
            <Inject services={[Day, Week]} />
          </ScheduleComponent>
        </div>
      </Card>
  );
};

export default Calendar;