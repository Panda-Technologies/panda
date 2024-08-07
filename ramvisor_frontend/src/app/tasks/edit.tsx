"use client";

import React, { useState } from "react";
import { Modal, Button } from "antd";
import {
  AlignLeftOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { Accordion } from "@/components/accordion";
import { DescriptionForm } from "@/components/form/description";
import { DescriptionHeader } from "@/components/form/header";
import { DueDateForm } from "@/components/form/due-date";
import { DueDateHeader } from "@/components/form/header";
import { StageForm } from "@/components/form/stage";
import { TitleForm } from "@/components/form/title";
import { ClassesForm } from "@/components/form/classes";
import { ClassesHeader } from "@/components/form/header";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  classes: { code: string; color: string };
  stage: string;
}

interface TasksEditModalProps {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TasksEditModal: React.FC<TasksEditModalProps> = ({ task, onClose, onSave, onDelete }) => {
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleSave = (updatedData: Partial<Task>) => {
    const newTask = { ...editedTask, ...updatedData };
    setEditedTask(newTask);
    onSave(newTask);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Modal
      open={true}
      onCancel={onClose}
      title={<TitleForm initialValues={{ title: editedTask.title }} isLoading={false} onSave={(values) => handleSave({ title: values.title })} />}
      width={586}
      footer={
        <Button type="link" danger onClick={handleDelete}>
          Delete card
        </Button>
      }
    >
      <StageForm 
        isLoading={false} 
        initialValues={{ stageId: editedTask.stage, completed: false }}
        onSave={(values) => handleSave({ stage: values.stageId })}
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
          initialValues={{ dueDate: editedTask.dueDate }}
          cancelForm={() => setActiveKey(undefined)}
          onSave={(values) => handleSave({ dueDate: values.dueDate })}
        />
      </Accordion>

      <Accordion
        accordionKey="classes"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<ClassesHeader users={editedTask.classes} />}
        isLoading={false}
        icon={<UsergroupAddOutlined />}
        label="Classes"
      >
        <ClassesForm
          initialValues={{
            classId: {
              code: editedTask.classes.code,
              color: editedTask.classes.color,
            }
          }}
          cancelForm={() => setActiveKey(undefined)}
          onSave={(values) => handleSave({ classes: values.classId })}
        />
      </Accordion>
    </Modal>
  );
};

export default TasksEditModal;