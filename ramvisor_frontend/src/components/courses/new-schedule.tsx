import { CREATE_CLASS_SCHEDULE_MUTATION } from "@graphql/mutations";
import { useModalForm } from "@refinedev/antd";
import { Form, Input, Modal } from "antd";
import React from "react";

type NewPlannerModalProps = {
    onClose: () => void;
    semesterId: string;
};

const NewPlannerModal: React.FC<NewPlannerModalProps> = ({
                                                             onClose,
                                                             semesterId,
                                                         }) => {
    const { formProps, modalProps, close } = useModalForm({
        action: "create",
        defaultVisible: true,
        meta: {
            gqlMutation: CREATE_CLASS_SCHEDULE_MUTATION,
        },
    });

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                onClose();
            }}
            title="Create new schedule"
            width={256}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps?.onFinish?.({
                        ...values,
                        semesterId: semesterId,
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
