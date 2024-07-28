"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlignLeftOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd";

import { Accordion } from "@/components/accordion";
import { DescriptionForm } from "@/components/form/description";
import { DescriptionHeader } from "@/components/form/header";
import { DueDateForm } from "@/components/form/due-date";
import { DueDateHeader } from "@/components/form/header";
import { StageForm } from "@/components/form/stage";
import { TitleForm } from "@/components/form/title";
import { ClassesForm } from "@/components/form/classes";
import { UsersHeader } from "@/components/form/header";

// Dummy data for a task
const dummyTask = {
  id: "1",
  title: "Sample Task",
  description: "This is a sample task description.",
  dueDate: "2023-12-31",
  classes: { code: "CS101", color: "#ff4d4f" },
  stage: "In Progress"
};

const TasksEditPage = ({ params }: { params: { id: string } }) => {
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const [task, setTask] = useState(dummyTask);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real application, you would fetch the task data here
    // For now, we're just using the dummy data
    setTask({ ...dummyTask, id: params.id });
  }, [params.id]);

  const handleClose = () => {
    setIsModalVisible(false);
    router.push("/tasks");
  };

  const handleDelete = () => {
    // In a real application, you would delete the task here
    console.log("Deleting task:", task.id);
    handleClose();
  };

  const handleSave = (updatedData: Partial<typeof task>) => {
    setTask(prevTask => ({ ...prevTask, ...updatedData }));
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleClose}
      title={<TitleForm initialValues={{ title: task.title }} isLoading={false} onSave={(values) => handleSave({ title: values.title })} />}
      width={586}
      footer={
        <Button type="link" danger onClick={handleDelete}>
          Delete card
        </Button>
      }
    >
      <StageForm 
        isLoading={false} 
        initialValues={{ stageId: task.stage, completed: false }}
        onSave={(values) => handleSave({ stage: values.stageId })}
      />

      <Accordion
        accordionKey="description"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DescriptionHeader description={task.description} />}
        isLoading={false}
        icon={<AlignLeftOutlined />}
        label="Description"
      >
        <DescriptionForm
          initialValues={{ description: task.description }}
          cancelForm={() => setActiveKey(undefined)}
          onSave={(values) => handleSave({ description: values.description })}
        />
      </Accordion>

      <Accordion
        accordionKey="due-date"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DueDateHeader dueData={task.dueDate} />}
        isLoading={false}
        icon={<FieldTimeOutlined />}
        label="Due date"
      >
        <DueDateForm
          initialValues={{ dueDate: task.dueDate }}
          cancelForm={() => setActiveKey(undefined)}
          onSave={(values) => handleSave({ dueDate: values.dueDate })}
        />
      </Accordion>

      <Accordion
        accordionKey="classes"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<UsersHeader users={task.classes} />}
        isLoading={false}
        icon={<UsergroupAddOutlined />}
        label="Classes"
      >
        <ClassesForm
          initialValues={{
            classId: {
              code: task.classes.code,
              color: task.classes.color,
            }
          }}
          cancelForm={() => setActiveKey(undefined)}
          onSave={(values) => handleSave({ classes: values.classId })}
        />
      </Accordion>
    </Modal>
  );
};

export default TasksEditPage;