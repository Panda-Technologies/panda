"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalForm } from "@refinedev/antd";
import { Form, Input, Modal, DatePicker, Select } from "antd";
import { CREATE_TASK_MUTATION } from "@/graphql/mutations";

const TasksCreatePage = () => {
  const router = useRouter();
  const [stageId, setStageId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stageIdParam = params.get('stageId');
    setStageId(stageIdParam ? parseInt(stageIdParam, 10) : null);
  }, []);

  const { formProps, modalProps, close } = useModalForm({
    action: "create",
    defaultVisible: true,
    meta: {
      gqlMutation: CREATE_TASK_MUTATION,
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        router.push("/tasks");
      }}
      title="Add new card"
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps?.onFinish?.({
            ...values,
            stageId: stageId || 1, // Default to 1 if stageId is null
          });
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select a due date" }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Class Code"
          name="classCode"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stage"
          name="stageId"
          initialValue={stageId}
          rules={[{ required: true, message: "Please select a stage" }]}
        >
          <Select onSelect={(value) => {
            setStageId(value as number);
          }}>
            <Select.Option value={1}>NOT STARTED</Select.Option>
            <Select.Option value={2}>IN PROGRESS</Select.Option>
            <Select.Option value={3}>DONE</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TasksCreatePage;