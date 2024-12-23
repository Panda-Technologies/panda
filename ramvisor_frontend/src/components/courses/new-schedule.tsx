import { CREATE_CLASS_SCHEDULE_MUTATION } from "@graphql/mutations";
import {Form, Input, message, Modal, Select} from "antd";
import React, { useState } from "react";
import { ClassSchedule, ClassScheduleEntry } from "@graphql/generated/graphql";
import { useMutation } from "@apollo/client";

type NewScheduleModalProps = {
    onClose: () => void;
    onFinish: (newSchedule: ClassSchedule) => void;
    semesterId: string;
    semesters?: Array<{
        id: string;
    }>;
    isVisible: boolean;
};

const NewScheduleModal: React.FC<NewScheduleModalProps> = ({
                                                               onClose,
                                                               semesterId,
                                                               semesters = [],
                                                               onFinish,
                                                               isVisible,
                                                           }) => {
    const [form] = Form.useForm();

    const [createSchedule, { loading }] = useMutation(CREATE_CLASS_SCHEDULE_MUTATION, {
        onCompleted: (data) => {
            const createdSchedule = data?.createClassSchedule;
            if (createdSchedule) {
                onFinish(createdSchedule as ClassSchedule);
                message.success('Schedule successfully created', 0.5);
                onClose();
            } else {
                console.error('Created schedule data is missing from the response');
            }
        },
        onError: (error) => {
            console.log('Failed to create schedule', error);
            message.error('Failed to create schedule');
            throw new Error("Failed to create schedule");
        }
    });

    const handleSubmit = async (values: any) => {
        await createSchedule({
            variables: {
                input: {
                    title: values.title,
                    semesterId: values.semesterId,
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
            title="Create new schedule"
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
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter a title" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Semester"
                    name="semesterId"
                    initialValue={semesterId}
                    rules={[{ required: true, message: "Please select a semester" }]}
                >
                    <Select>
                        {semesters.map((semester) => (
                            <Select.Option key={semester.id} value={semester.id}>
                                {semester.id}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewScheduleModal;