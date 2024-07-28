import React from 'react';
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Space } from "antd";

type Props = {
  initialValues: {
    description?: string;
  };
  cancelForm: () => void;
  onSave: (values: { description: string }) => void;
};

export const DescriptionForm = ({ initialValues, cancelForm, onSave }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { description: string }) => {
    onSave(values);
    cancelForm();
  };

  return (
    <>
      <Form 
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item name="description" noStyle>
          <MDEditor preview="edit" data-color-mode="light" height={250} />
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginTop: "12px",
        }}
      >
        <Space>
          <Button type="default" onClick={cancelForm}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </Space>
      </div>
    </>
  );
};