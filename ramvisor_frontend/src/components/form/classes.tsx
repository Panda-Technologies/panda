import React from 'react';
import { Form, Select, Button, Space } from 'antd';

type Props = {
  initialValues: {
    classId: { code: string; color: string };
  };
  cancelForm: () => void;
  onSave: (values: { classId: string[] }) => void;
};

// Mock data for classes
const staticClasses = [
  { id: '1', code: 'CS101', color: '#ff4d4f' },
  { id: '2', code: 'MATH201', color: '#faad14' },
  { id: '3', code: 'ENG301', color: '#52c41a' },
];

export const ClassesForm = ({ initialValues, cancelForm, onSave }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { classId: string[] }) => {
    onSave(values);
    cancelForm();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <Form
        form={form}
        style={{ width: "100%" }}
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item name="classId">
          <Select
            className="kanban-users-form-select"
            dropdownStyle={{ padding: "0px" }}
            style={{ width: "100%" }}
            mode="multiple"
            options={staticClasses.map(cls => ({
              value: cls.id,
              label: cls.code,
            }))}
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