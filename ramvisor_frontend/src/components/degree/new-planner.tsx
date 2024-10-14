import { CREATE_DEGREE_PLANNER_MUTATION } from "@graphql/mutations";
import { useModalForm } from "@refinedev/antd";
import { Form, Input, Modal } from "antd";
import React from "react";

type NewPlannerModalProps = {
  onClose: () => void;
  userId: String;
  degreeId: number;
};

const NewPlannerModal: React.FC<NewPlannerModalProps> = ({
  onClose,
  userId,
  degreeId,
}) => {
  const { formProps, modalProps, close } = useModalForm({
    action: "create",
    defaultVisible: true,
    meta: {
      gqlMutation: CREATE_DEGREE_PLANNER_MUTATION,
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        onClose();
      }}
      title="Create new planner"
      width={256}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps?.onFinish?.({
            ...values,
            userId: userId,
            degreeId: degreeId,
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
      </Form>
    </Modal>
  );
};

export default NewPlannerModal;
