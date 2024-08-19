'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { useList, useOne, useCreate, useUpdate, useDelete } from "@refinedev/core";
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
  classes: {
    code: string;
    color: string;
  };
  description?: string;
}

interface Stage {
  id: string;
  title: string;
}

const stages: Stage[] = [
  { id: '1', title: 'NOT STARTED' },
  { id: '2', title: 'IN PROGRESS' },
  { id: '3', title: 'DONE' },
];

const TasksPage: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data: userData, isLoading: userLoading } = useOne({
    resource: "users",
    id: 1,
    liveMode: "off",
  });

  const { data: tasksData, isLoading: tasksLoading } = useList<Task>({
    resource: "tasks",
    filters: [{ field: "userId", operator: "eq", value: "1" }],
    liveMode: "off",
  });

  const { mutate: createTask } = useCreate();
  const { mutate: updateTask } = useUpdate();
  const { mutate: deleteTask } = useDelete();

  const tasks = useMemo(() => tasksData?.data || [], [tasksData]);

  const taskStages = useMemo(() => {
    if (!Array.isArray(tasks)) {
      console.error('Tasks is not an array:', tasks);
      return [];
    }
    return stages.map((stage) => ({
      ...stage,
      tasks: tasks.filter((task) => task && task.stageId === stage.id)
    }));
  }, [tasks]);

  const handleAddCard = useCallback((stageId: string) => {
    createTask({
      resource: "tasks",
      values: {
        title: `New Task`,
        stageId,
        userId: "1",
        dueDate: new Date().toISOString(),
        classes: { code: 'DEFAULT', color: '#000000' },
        description: '',
      },
    });
  }, [createTask]);

  const handleOnDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStageId = over.id as string;

    if (active.id !== over.id) {
      updateTask({
        resource: "tasks",
        id: taskId,
        values: { stageId: newStageId },
      });
    }
  }, [updateTask]);

  const handleTaskClick = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleTaskSave = useCallback((updatedTask: Task) => {
    updateTask({
      resource: "tasks",
      id: updatedTask.id,
      values: updatedTask,
    });
    setEditingTask(null);
  }, [updateTask]);

  const handleTaskDelete = useCallback((taskId: string) => {
    deleteTask({
      resource: "tasks",
      id: taskId,
    });
    setEditingTask(null);
  }, [deleteTask]);

  if (userLoading || tasksLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(taskStages) || taskStages.length === 0) {
    return <div>Error: Unable to load tasks. Please try again later.</div>;
  }

  return (
    <div style={{ maxHeight: '50px' }}>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          {taskStages.map((column) => (
            <KanbanColumn 
              key={column.id} 
              id={column.id} 
              title={column.title} 
              count={column.tasks.length} 
              onAddClick={() => handleAddCard(column.id)}
            >
              {column.tasks.map((task) => (
                <KanbanItem key={task.id} id={task.id} data={task}>
                  <ProjectCardMemo 
                    {...task} 
                    onClick={() => handleTaskClick(task)} 
                  />
                </KanbanItem>
              ))}
              {column.tasks.length === 0 && (
                <KanbanAddCardButton onClick={() => handleAddCard(column.id)} />
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

export default TasksPage;