import React from 'react';
import { Button, DatePicker, Form, Space } from "antd";
import dayjs from "dayjs";

type Props = {
  initialValues: {
    dueDate?: string;
  };
  cancelForm: () => void;
  onSave: (values: { dueDate: string | null }) => void;
};

export const DueDateForm = ({ initialValues, cancelForm, onSave }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { dueDate: dayjs.Dayjs | null }) => {
    onSave({
      dueDate: values.dueDate ? values.dueDate.format() : null
    });
    cancelForm();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Form 
        form={form}
        initialValues={{
          dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : undefined
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          noStyle
          name="dueDate"
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            showTime={{
              showSecond: false,
              format: "HH:mm",
            }}
            style={{ backgroundColor: "#fff" }}
          />
        </Form.Item>
      </Form>
      <Space>
        <Button type="default" onClick={cancelForm}>
          Cancel
        </Button>
        <Button type="primary" onClick={() => form.submit()}>
          Save
        </Button>
      </Space>
    </div>
  );
};