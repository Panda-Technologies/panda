import React, { useState, useEffect } from "react";
import { Form, Skeleton } from "antd";
import { Text } from "../text";

const TitleInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const onTitleChange = (newTitle: string) => {
    onChange?.(newTitle);
  };

  return (
    <Text
      editable={{
        onChange: onTitleChange,
      }}
      style={{ width: "98%" }}
    >
      {value}
    </Text>
  );
};

type Props = {
  initialValues: {
    title?: string;
  };
  isLoading?: boolean;
  onSave: (values: { title: string }) => void;
};

export const TitleForm = ({ initialValues, isLoading, onSave }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleValuesChange = (_: any, allValues: { title: string }) => {
    onSave(allValues);
  };

  if (isLoading) {
    return (
      <Skeleton.Input
        size="small"
        style={{ width: "95%", height: "22px" }}
        block
      />
    );
  }

  return (
    <Form 
      form={form}
      initialValues={initialValues}
      onValuesChange={handleValuesChange}
    >
      <Form.Item noStyle name="title">
        <TitleInput />
      </Form.Item>
    </Form>
  );
};