import React, { useRef } from 'react';
import { ScheduleComponent, Day, Week, Inject, ViewsDirective, ViewDirective, EventRenderedArgs } from '@syncfusion/ej2-react-schedule';
import { Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { FaWalking } from 'react-icons/fa';
import { extend } from '@syncfusion/ej2-base';

const Calendar = () => {
  const scheduleObj = useRef<ScheduleComponent>(null);

  const dataSource = {classEvents: [
    { Id: 1, Subject: 'BUSI 407-001', StartTime: new Date(2024, 2, 18, 8, 30), EndTime: new Date(2024, 2, 18, 10, 0), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH', CategoryColor: '#FFB6C1' }, // Light Pink
    { Id: 2, Subject: 'COMP 110-001', StartTime: new Date(2024, 2, 18, 10, 0), EndTime: new Date(2024, 2, 18, 11, 30), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR', CategoryColor: '#90EE90' }, // Light Green
    { Id: 3, Subject: 'ECON 325-001', StartTime: new Date(2024, 2, 18, 11, 0), EndTime: new Date(2024, 2, 18, 12, 0), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,TH', CategoryColor: '#FFFFE0' }, // Light Yellow
    { Id: 4, Subject: 'MATH 233-002', StartTime: new Date(2024, 2, 18, 12, 0), EndTime: new Date(2024, 2, 18, 13, 30), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR', CategoryColor: '#FFE4B5' }, // Moccasin
    { Id: 5, Subject: 'HIST 128-006', StartTime: new Date(2024, 2, 18, 14, 0), EndTime: new Date(2024, 2, 18, 15, 30), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE', CategoryColor: '#DDA0DD' }, // Plum
    { Id: 6, Subject: 'ECON 327-003', StartTime: new Date(2024, 2, 18, 14, 0), EndTime: new Date(2024, 2, 18, 15, 0), RecurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,TH', CategoryColor: '#ADD8E6' }, // Light Blue
  ]};

  const data: Record<string, any>[] = extend([], dataSource.classEvents, {}, true) as Record<string, any>[];

  const randomWalkingTime = Math.floor(Math.random() * (30 - 5 + 1) + 5);

  const onEventRendered = (args: EventRenderedArgs): void => {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (scheduleObj.current?.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
      args.element.style.color = '#333333';
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '800px' }}>
      <Card
        style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CalendarOutlined />
            <span style={{ marginLeft: "0.7rem", fontWeight: 'bold' }}>Spring 2024</span>
            <span style={{ marginLeft: "auto", fontSize: '0.9em', color: '#666' }}>12 credits</span>
          </div>
        }
        bodyStyle={{ padding: 0 }}
      >
        <ScheduleComponent 
          height='500px'
          width='100%'
          selectedDate={new Date(2024, 2, 18)}
          ref={scheduleObj}
          eventSettings={{ 
            dataSource: data,
          }}
          eventRendered={onEventRendered}
          readonly={true}
          timeScale={{ enable: true, interval: 60, slotCount: 2 }}
          startHour='08:00'
          endHour='17:00'
          cssClass={"schedule-cell-customization"}
        >
          <ViewsDirective>
            <ViewDirective option='Day' />
            <ViewDirective option='Week' isSelected={true} />
          </ViewsDirective>
          <Inject services={[Day, Week]} />
        </ScheduleComponent>
      </Card>
    </div>
  );
}

export default Calendar;