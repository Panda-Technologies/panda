"use client";

import React, { useState, useMemo } from 'react'
import { DragEndEvent } from '@dnd-kit/core'
import KanbanColumnSkeleton from '@skeleton/kanban'
import ProjectCardSkeleton from '@skeleton/project-card' 
import { KanbanAddCardButton } from '@/components/tasks/kanban/add-card-button'
import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board'
import ProjectCard, { ProjectCardMemo } from '@/components/tasks/kanban/card'
import KanbanColumn from '@/components/tasks/kanban/column'
import KanbanItem from '@/components/tasks/kanban/item'

interface Task {
  id: string;
  title: string;
  stageId: string | null;
  dueDate: string;
  classes: { code: string; color: string };
  updatedAt: string;
}

interface Stage {
  id: string;
  title: string;
  createdAt: string;
}

const customData: { stages: Stage[]; tasks: Task[] } = {
  stages: [
    { id: '1', title: 'NOT STARTED', createdAt: '2024-01-01' },
    { id: '2', title: 'IN PROGRESS', createdAt: '2024-01-02' },
    { id: '4', title: 'DONE', createdAt: '2024-01-04' },
  ],
  tasks: [
    { id: '1', title: 'Task 1', stageId: '1', dueDate: '2024-02-01', classes: { code: 'P1', color: '#ff4d4f' }, updatedAt: '2024-01-15' },
    { id: '2', title: 'Task 2', stageId: '2', dueDate: '2024-02-15', classes: { code: 'P2', color: '#faad14' }, updatedAt: '2024-01-16' },
    { id: '3', title: 'Task 3', stageId: '3', dueDate: '2024-03-01', classes: { code: 'P3', color: '#52c41a' }, updatedAt: '2024-01-17' },
  ],
};

const List = ({ children }: React.PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>(customData.tasks);
  const [stages] = useState<Stage[]>(customData.stages);

  const taskStages = useMemo(() => {
    const unassignedStage = tasks.filter((task) => task.stageId === null);

    const columns = stages.map((stage) => ({
      ...stage,
      tasks: tasks.filter((task) => task.stageId === stage.id)
    }));

    return {
      unassignedStage,
      columns
    }
  }, [tasks, stages]);

  const handleAddCard = (args: { stageId: string }) => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      title: `New Task ${tasks.length + 1}`,
      stageId: args.stageId === 'unassigned' ? null : args.stageId,
      dueDate: new Date().toISOString().split('T')[0],
      classes: { code: 'P3', color: '#52c41a' },
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    if (active.id !== over.id) {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, stageId: overId === 'unassigned' ? null : overId }
          : task
      ));
    }
  };

  return (
    <div style={{ maxHeight: '50px' }}>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          {taskStages.columns.map((column) => (
            <KanbanColumn 
              key={column.id} 
              id={column.id} 
              title={column.title} 
              count={column.tasks.length} 
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              {column.tasks.map((task) => (
                <KanbanItem key={task.id} id={task.id} data={{ ...task, stageId: task.stageId }}>
                  <ProjectCardMemo {...task} />
                </KanbanItem>
              ))}
              {!column.tasks.length && (
                <KanbanAddCardButton onClick={() => handleAddCard({ stageId: column.id })} />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </div>
  )
}

export default List

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  )
}