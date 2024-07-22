import React, { useRef } from 'react';
import { ScheduleComponent, Day, Week, Inject, ViewsDirective, ViewDirective, EventRenderedArgs } from '@syncfusion/ej2-react-schedule';
import { Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { extend } from '@syncfusion/ej2-base';

interface CalendarProps {
  width?: string;
  height?: string;
  title?: string;
  credits?: number;
}

const Calendar: React.FC<CalendarProps> = ({ width, height, title, credits }) => {
  const scheduleObj = useRef<ScheduleComponent>(null);

  const dataSource = {classEvents: [
    { Id: 1, Subject: 'BUSI 407-001', StartTime: new Date(2024, 2, 18, 8, 30), EndTime: new Date(2024, 2, 18, 10, 0), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH', CategoryColor: '#FFB6C1' },
    { Id: 2, Subject: 'COMP 110-001', StartTime: new Date(2024, 2, 18, 10, 0), EndTime: new Date(2024, 2, 18, 11, 30), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR', CategoryColor: '#90EE90' },
    { Id: 3, Subject: 'ECON 325-001', StartTime: new Date(2024, 2, 18, 11, 0), EndTime: new Date(2024, 2, 18, 12, 0), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,TH', CategoryColor: '#FFFFE0' },
    { Id: 4, Subject: 'MATH 233-002', StartTime: new Date(2024, 2, 18, 12, 0), EndTime: new Date(2024, 2, 18, 13, 30), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR', CategoryColor: '#FFE4B5' },
    { Id: 5, Subject: 'HIST 128-006', StartTime: new Date(2024, 2, 18, 14, 0), EndTime: new Date(2024, 2, 18, 15, 30), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE', CategoryColor: '#DDA0DD' },
    { Id: 6, Subject: 'ECON 327-003', StartTime: new Date(2024, 2, 18, 14, 0), EndTime: new Date(2024, 2, 18, 15, 0), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,TH', CategoryColor: '#ADD8E6' },
  ]};

  const data: Record<string, any>[] = extend([], dataSource.classEvents, {}, true) as Record<string, any>[];

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
          eventSettings={{ dataSource: data }}
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