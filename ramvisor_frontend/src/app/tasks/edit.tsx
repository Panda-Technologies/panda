'use client';

import React, { useState } from "react";
import { Modal, Button } from "antd";
import {
  AlignLeftOutlined,
  FieldTimeOutlined,
  BookOutlined,
} from "@ant-design/icons";

import { Accordion } from "@/components/accordion";
import { DescriptionForm } from "@/components/form/description";
import { DescriptionHeader } from "@/components/form/header";
import { DueDateForm } from "@/components/form/due-date";
import { DueDateHeader } from "@/components/form/header";
import { StageForm } from "@/components/form/stage";
import { TitleForm } from "@/components/form/title";
import { ClassesForm } from "@components/form/classes";
import { ClassesHeader } from "@/components/form/header";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  classes: { code: string; color: string };
  stageId: string | null;
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
        initialValues={{ stageId: editedTask.stageId, completed: false }}
        onSave={(values) => handleSave({ stageId: values.stageId })}
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
          onSave={(values) => handleSave({ dueDate: values.dueDate || editedTask.dueDate })}
        />
      </Accordion>

      <Accordion
        accordionKey="class-code"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<ClassesHeader classCodes={[editedTask.classes]} />}
        isLoading={false}
        icon={<BookOutlined />}
        label="Class Code"
      >
        <ClassesForm
          initialValues={{
            classId: editedTask.classes
          }}
          cancelForm={() => setActiveKey(undefined)}
          onSave={(values) => {
            const newClasses = Array.isArray(values.classId) 
              ? values.classId[0] 
              : values.classId;
            
            if (typeof newClasses === 'object' && 'code' in newClasses && 'color' in newClasses) {
              handleSave({ classes: newClasses });
            } else {
              console.error('Invalid classes data:', newClasses);
            }
          }}
        />
      </Accordion>
    </Modal>
  );
};

export default TasksEditModal;