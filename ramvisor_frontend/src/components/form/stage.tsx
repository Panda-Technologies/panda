import React from 'react';
import { FlagOutlined } from "@ant-design/icons";
import { Checkbox, Form, Select, Space } from "antd";
import AccordionHeaderSkeleton from "@skeleton/accordion-header";

type Props = {
  isLoading?: boolean;
  initialValues?: {
    stageId?: number | null;
    completed?: boolean;
  };
  onSave: (values: { stageId: string | null; completed: boolean }) => void;
};

// Mock data for stages
const stages = [
  { id: '1', title: 'TODO' },
  { id: '2', title: 'IN PROGRESS' },
  { id: '3', title: 'IN REVIEW' },
  { id: '4', title: 'DONE' },
];

export const StageForm = ({ isLoading, initialValues, onSave }: Props) => {
  const [form] = Form.useForm();

  const handleValuesChange = (changedValues: any, allValues: any) => {
    onSave(allValues);
  };

  if (isLoading) return <AccordionHeaderSkeleton />;

  return (
    <div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
      <Form
        form={form}
        layout="inline"
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space size={5}>
          <FlagOutlined />
          <Form.Item
            noStyle
            name="stageId"
          >
            <Select
              popupMatchSelectWidth={false}
              options={[
                ...stages.map(stage => ({ label: stage.title, value: stage.id })),
                { label: "Unassigned", value: null },
              ]}
              bordered={false}
              showSearch={false}
              placeholder="Select a stage"
              size="small"
            />
          </Form.Item>
        </Space>
        <Form.Item noStyle name="completed" valuePropName="checked">
          <Checkbox>Mark as complete</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};