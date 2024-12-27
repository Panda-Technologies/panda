"use client";

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DragEndEvent } from '@dnd-kit/core';
import { useGetIdentity, useCustom, useUpdate, useDelete } from "@refinedev/core";
import { KanbanAddCardButton } from '@/components/tasks/kanban/add-card-button';
import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board';
import { ProjectCardMemo } from '@/components/tasks/kanban/card';
import KanbanColumn from '@/components/tasks/kanban/column';
import KanbanItem from '@/components/tasks/kanban/item';
import TasksEditModal from './edit';
import { GET_TASKS_QUERY, GET_USER_QUERY } from '@/graphql/queries';
import { UPDATE_TASK_MUTATION, DELETE_TASK_MUTATION } from '@/graphql/mutations';
import { getClassColor } from '@/utilities/helpers';
import {message} from "antd";

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  classCode: string;
  classes?: { code: string; color: React.CSSProperties };
  stageId: number;
}

interface Stage {
  id: number;
  title: string;
  tasks: Task[];
}

const initialStages: Stage[] = [
  { id: 1, title: 'NOT STARTED', tasks: [] },
  { id: 2, title: 'IN PROGRESS', tasks: [] },
  { id: 3, title: 'DONE', tasks: [] },
];


const TasksPage: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const pendingTasksRef = useRef<Set<number>>(new Set());
  const router = useRouter();

  const { data: tasksData, isLoading: tasksLoading, refetch: refetchTasks } = useCustom<{ getTasks: Task[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_TASKS_QUERY,
    }
  });

  const { mutate: updateTask } = useUpdate();
  const { mutate: deleteTask } = useDelete();

  const memoizedTasks = useMemo(() => tasksData?.data?.getTasks || [], [tasksData?.data?.getTasks]);

  useEffect(() => {
    console.log('Memo Tasks:', memoizedTasks);
    const processedTasks = memoizedTasks.map(task => ({
      ...task,
      stageId: task.stageId || 1,
      classes: task.classes
      // classes: task.classes || { code: task.classCode, color: 'blue' }, // Remove the second part of || after data
    }));
    const newTasks = processedTasks.filter(task => !pendingTasksRef.current.has(task.id));
    console.log('New Tasks:', newTasks);
    setStages(prevStages => {
      const updatedStages = prevStages.map(stage => {
        const stageTasks = [
          ...stage.tasks.filter(task => pendingTasksRef.current.has(task.id)),
          ...newTasks.filter(task => task.stageId === stage.id)
        ];
        console.log(`Stage ${stage.id} tasks:`, stageTasks);
        return {
          ...stage,
          tasks: stageTasks
        };
      });
      console.log('Updated Stages:', updatedStages);
      return updatedStages;
    });
  }, [memoizedTasks]);

  const handleAddCard = useCallback((stageId: number) => {
    router.push(`/tasks/new?stageId=${stageId}`);
  }, [router]);

  const handleOnDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as number;
    const newStageId = over.id as number;

    if (active.id !== over.id) {
      pendingTasksRef.current.add(taskId);
      setStages(prevStages => {
        const updatedStages = prevStages.map(stage => ({
          ...stage,
          tasks: stage.tasks.filter(task => task.id !== taskId)
        }));
        const targetStage = updatedStages.find(stage => stage.id === newStageId);
        if (targetStage) {
          const movedTask = prevStages.flatMap(stage => stage.tasks).find(task => task.id === taskId);
          if (movedTask) {
            targetStage.tasks.push({ ...movedTask, stageId: newStageId });
          }
        }
        return updatedStages;
      });

      updateTask(
        {
          resource: "tasks",
          id: taskId,
          values: { 
            id: taskId,
            stageId: newStageId 
          },
          meta: {
            gqlMutation: UPDATE_TASK_MUTATION
          }
        },
        {
          onSuccess: () => {
            message.success('Task updated successfully', 0.5);
            pendingTasksRef.current.delete(taskId);
          },
          onError: (error) => {
            console.error('Error updating task:', error);
            pendingTasksRef.current.delete(taskId);
            refetchTasks();
          }
        }
      );
    }
  }, [updateTask, refetchTasks]);

  const handleTaskClick = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleTaskSave = useCallback((updatedTask: Task) => {
    updateTask(
      {
        resource: "tasks",
        id: updatedTask.id,
        values: {
          id: updatedTask.id,
          title: updatedTask.title,
          dueDate: updatedTask.dueDate,
          stageId: updatedTask.stageId,
          classCode: updatedTask.classCode,
          description: updatedTask.description,
        },
        meta: {
          gqlMutation: UPDATE_TASK_MUTATION
        }
      },
      {
        onSuccess: () => {
          setStages(prevStages => {
            const newStages = prevStages.map(stage => ({
              ...stage,
              tasks: stage.tasks.filter(task => task.id !== updatedTask.id),
            }));

            const targetStage = newStages.find(stage => stage.id === updatedTask.stageId);
            if (targetStage) {
              targetStage.tasks.push(updatedTask);
            }

            return newStages;
          });

          message.success("Task updated successfully", 0.5);
        },
        onError: (error) => {
          console.error("Error updating task:", error);
        }
      }
    );
  }, [updateTask]);

  const handleTaskDelete = useCallback((taskId: number) => {
    deleteTask(
      {
        resource: "tasks",
        id: taskId,
        values: { id: taskId, },
        meta: {
          gqlMutation: DELETE_TASK_MUTATION
        }
      },
      {
        onSuccess: () => {
          setStages(prevStages => 
            prevStages.map(stage => ({
              ...stage,
              tasks: stage.tasks.filter(task => task.id !== taskId)
            }))
          );
          message.success('Task deleted successfully', 0.5);
          setEditingTask(null);
        },
        onError: (error) => {
          console.error('Error deleting task:', error);
        }
      }
    );
  }, [deleteTask]);

  const handleDeleteSuccess = useCallback((taskId: number) => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        tasks: stage.tasks.filter(task => task.id !== taskId)
      }))
    );
    message.success('Task deleted successfully', 0.5);
    setEditingTask(null);
  }, []);

  // if (!userId || tasksLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div style={{ maxHeight: 'calc(100vh - 85px)', overflow: 'hidden' }}>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          {stages.map((stage) => (
            <KanbanColumn 
              key={stage.id} 
              id={stage.id} 
              title={stage.title} 
              count={stage.tasks.length} 
              onAddClick={() => handleAddCard(stage.id)}
            >
              {stage.tasks.map((task) => (
                <KanbanItem key={task.id} id={task.id} data={task}>
                  <ProjectCardMemo 
                    {...task} 
                    onClick={() => handleTaskClick(task)} 
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </KanbanItem>
              ))}
              {stage.tasks.length === 0 && (
                <KanbanAddCardButton onClick={() => handleAddCard(stage.id)} />
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
