import React, { useRef } from 'react';
import { ScheduleComponent, Day, Week, Inject, ViewsDirective, ViewDirective, EventRenderedArgs } from '@syncfusion/ej2-react-schedule';
import { Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { extend } from '@syncfusion/ej2-base';
import { useOne } from '@refinedev/core';
import { GET_CLASS_SCHEDULES_QUERY } from '../../graphql/queries';

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

const Calendar: React.FC<CalendarProps> = ({ width, height, title, credits, userId }) => {
  const scheduleObj = useRef<ScheduleComponent>(null);

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
      return;
    }
    if (scheduleObj.current?.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
      args.element.style.color = '#333333';
      args.element.style.borderRadius = '4px';
      args.element.style.fontSize = '12px';
      args.element.style.padding = '2px 4px';
    }
  }

  return (
    <Card
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        background: 'linear-gradient(to bottom right, #ffffff, #f0f4f8)',
        border: 'none',
        height: '100%',
        width: '40%',
        left: '60%',
        top: '-4%'
      }}
      bodyStyle={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: '1px solid #e8e8e8',
      }}>
        <CalendarOutlined style={{ fontSize: '24px', color: '#4285F4' }} />
        <span style={{ marginLeft: "12px", fontWeight: 'bold', fontSize: '18px', color: '#333' }}>{title}</span>
        <span style={{ marginLeft: "auto", fontSize: '15px', color: '#505050' }}>{credits} credits</span>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ScheduleComponent 
          height='100%'
          width='100%'
          selectedDate={new Date(2024, 2, 18)}
          ref={scheduleObj}
          eventSettings={{ dataSource: eventData }}
          eventRendered={onEventRendered}
          readonly={true}
          timeScale={{ enable: true, interval: 60, slotCount: 2 }}
          startHour='08:00'
          endHour='17:00'
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
}

export default Calendar;