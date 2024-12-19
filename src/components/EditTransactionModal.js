import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

export default function EditTransactionModal({ isVisible, onClose, onSave, initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        action_datetime: initialValues.action_datetime ? initialValues.action_datetime : "",
      });
    }
  }, [initialValues, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Edit Transaction"
      open={isVisible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSave}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="action_datetime"
          label="DateTime"
          rules={[{ required: true, message: "Please select the date and time" }]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item name="type" label="ชนิด" rules={[{ required: true }]}>
          <Select
            allowClear
            style={{ width: "100px" }}
            options={[
              {
                value: "income",
                label: "รายรับ",
              },
              {
                value: "expense",
                label: "รายจ่าย",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Please enter the amount" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
