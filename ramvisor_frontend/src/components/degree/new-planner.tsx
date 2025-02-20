import { CREATE_DEGREE_PLANNER_MUTATION } from "@graphql/mutations";
import { Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { Degree, DegreePlanner } from "@graphql/generated/graphql";
import { useMutation } from "@apollo/client";

type NewPlannerModalProps = {
  onClose: () => void;
  onFinish: (newPlanner: DegreePlanner) => void;
  degrees: Degree[];
  isVisible: boolean;
};

const NewPlannerModal: React.FC<NewPlannerModalProps> = ({
                                                           onClose,
                                                           degrees,
                                                           onFinish,
                                                           isVisible,
                                                         }) => {
  const [form] = Form.useForm();

  const [createPlanner, { loading }] = useMutation(CREATE_DEGREE_PLANNER_MUTATION, {
    onCompleted: (data) => {
      const createdPlanner = data?.createDegreePlanner;
      if (createdPlanner) {
        onFinish(createdPlanner as DegreePlanner);
        message.success('Planner successfully created', 0.5);
        onClose();
      } else {
        console.error('Created planner data is missing from the response');
      }
    },
    onError: (error) => {
      console.log('Failed to create planner', error);
      message.error('Failed to create planner');
      throw new Error("Failed to create planner");
    }
  });

  const handleSubmit = async (values: any) => {
    await createPlanner({
      variables: {
        input: {
          title: values.title,
          degreeId: values.degreeId,
        }
      }
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
      <Modal
          open={isVisible}
          onCancel={handleCancel}
          title="Create new planner"
          width={256}
          okText="Create"
          confirmLoading={loading}
          onOk={() => form.submit()}
      >
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
        >
          <Form.Item
              label="Select Degree"
              name="degreeId"
              rules={[{ required: true, message: "Please select a degree" }]}
          >
            <Select>
              {degrees.map((degree) => (
                  <Select.Option key={degree.id} value={degree.id}>
                    {degree.name}
                  </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default NewPlannerModal;