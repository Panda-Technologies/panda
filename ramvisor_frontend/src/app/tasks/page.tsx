"use client";

import React, { useState, useMemo } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import KanbanColumnSkeleton from '@skeleton/kanban';
import ProjectCardSkeleton from '@skeleton/project-card';
import { KanbanAddCardButton } from '@/components/tasks/kanban/add-card-button';
import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board';
import { ProjectCardMemo } from '@/components/tasks/kanban/card';
import KanbanColumn from '@/components/tasks/kanban/column';
import KanbanItem from '@/components/tasks/kanban/item';
import TasksEditModal from './edit';

interface Task {
  id: string;
  title: string;
  stageId: string | null;
  dueDate: string;
  classes: { code: string; color: string };
  updatedAt: string;
  description?: string;
}

interface Stage {
  id: string;
  title: string;
  createdAt: string;
}

const customData: { stages: Stage[]; tasks: Task[] } = {
  stages: [
    { id: '1', title: 'NOT STARTED', createdAt: '2024-07-21' },
    { id: '2', title: 'IN PROGRESS', createdAt: '2024-07-22' },
    { id: '3', title: 'DONE', createdAt: '2024-07-23' },
  ],
  tasks: [
    { id: '1', title: 'Biology Lab Report', stageId: '1', dueDate: '2024-07-25', classes: { code: 'BIOL101', color: '#ff4d4f' }, updatedAt: '2024-07-15', description: 'Complete the lab report for last weeks experiment.' },
    { id: '2', title: 'History Essay', stageId: '2', dueDate: '2024-07-28', classes: { code: 'HIST102', color: '#faad14' }, updatedAt: '2024-07-16', description: 'Write a 5-page essay on the Industrial Revolution.' },
    { id: '3', title: 'Calculus Homework', stageId: '3', dueDate: '2024-08-05', classes: { code: 'MATH231', color: '#52c41a' }, updatedAt: '2024-07-17', description: 'Complete problems 1-20 in Chapter 4.' },
    { id: '4', title: 'Chemistry Quiz Preparation', stageId: '1', dueDate: '2024-07-30', classes: { code: 'CHEM101', color: '#1890ff' }, updatedAt: '2024-07-18', description: 'Review chapters 5-7 for upcoming quiz.' },
    { id: '5', title: 'English Literature Reading', stageId: '2', dueDate: '2024-07-23', classes: { code: 'ENGL105', color: '#2f54eb' }, updatedAt: '2024-07-19', description: 'Read "To Kill a Mockingbird" chapters 1-5.' },
  ],
};

const List: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(customData.tasks);
  const [stages] = useState<Stage[]>(customData.stages);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
  };
 
  const handleTaskSave = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setEditingTask(null);
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
                  <ProjectCardMemo {...task} onClick={() => handleTaskClick(task)} />
                </KanbanItem>
              ))}
              {!column.tasks.length && (
                <KanbanAddCardButton onClick={() => handleAddCard({ stageId: column.id })} />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {editingTask && (
        <TasksEditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleTaskSave}
          onDelete={handleTaskDelete}
        />
      )}
    </div>
  );
};

export default List;

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
};