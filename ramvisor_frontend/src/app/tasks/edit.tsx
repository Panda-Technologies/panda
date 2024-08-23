'use client';

import React, { useState, useCallback } from "react";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
import { AlignLeftOutlined, FieldTimeOutlined, BookOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

import { Accordion } from "@/components/accordion";
import { DescriptionForm } from "@/components/form/description";
import { DescriptionHeader } from "@/components/form/header";
import { DueDateForm } from "@/components/form/due-date";
import { DueDateHeader } from "@/components/form/header";
import { StageForm } from "@/components/form/stage";
import { TitleForm } from "@/components/form/title";
import { getClassColor } from "@/utilities/helpers";

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  classCode: string;
  classes?: { code: string; color: string };
  stageId: number;
}

export interface TasksEditModalProps {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TasksEditModal: React.FC<TasksEditModalProps> = ({ task, onClose, onSave, onDelete }) => {
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleSave = useCallback((updatedData: Partial<Task>) => {
    const newTask = { 
      ...editedTask, 
      ...updatedData,
      id: editedTask.id,
      stageId: typeof updatedData.stageId === 'number' ? updatedData.stageId : editedTask.stageId,
      classes: {
        code: updatedData.classCode || editedTask.classCode,
        color: getClassColor(updatedData.classCode || editedTask.classCode)
      }
    };
    setEditedTask(newTask);
    onSave(newTask);
  }, [editedTask, onSave]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [onDelete, task.id]);

  return (
    <Modal
      open={true}
      onCancel={onClose}
      title={<TitleForm initialValues={{ title: editedTask.title }} isLoading={false} onSave={(values) => handleSave({ title: values.title })} />}
      width={586}
      footer={
        <Button type="link" danger onClick={handleDelete}>
          Delete task
        </Button>
      }
    >
      <Form layout="vertical">
        <StageForm 
          isLoading={false} 
          initialValues={{ stageId: editedTask.stageId, completed: false }}
          onSave={(values) => handleSave({ stageId: Number(values.stageId) })}
        />

        <Accordion
          accordionKey="description"
          activeKey={activeKey}
          setActive={setActiveKey}
          fallback={<DescriptionHeader description={editedTask.description || ''} />}
          isLoading={false}
          icon={<AlignLeftOutlined />}
          label="Description"
        >
          <DescriptionForm
            initialValues={{ description: editedTask.description || '' }}
            cancelForm={() => setActiveKey(undefined)}
            onSave={(values) => handleSave({ description: values.description })}
          />
        </Accordion>

        <Accordion
          accordionKey="due-date"
          activeKey={activeKey}
          setActive={setActiveKey}
          fallback={<DueDateHeader dueData={editedTask.dueDate} />}
          isLoading={false}
          icon={<FieldTimeOutlined />}
          label="Due date"
        >
          <DueDateForm
            initialValues={{ dueDate: dayjs(editedTask.dueDate).toString() }}
            cancelForm={() => setActiveKey(undefined)}
            onSave={(values) => handleSave({ dueDate: values.dueDate?.toString() })}
          />
        </Accordion>

        <Accordion
          accordionKey="class-code"
          activeKey={activeKey}
          setActive={setActiveKey}
          fallback={<div>{editedTask.classCode}</div>}
          isLoading={false}
          icon={<BookOutlined />}
          label="Class Code"
        >
          <Form.Item name="classCode" initialValue={editedTask.classCode}>
            <Input 
              onBlur={(e) => handleSave({ classCode: e.target.value })}
            />
          </Form.Item>
        </Accordion>
      </Form>
    </Modal>
  );
};

export default TasksEditModal;