import { Button, Form, Select, Input, InputNumber } from "antd";
export default function AddItem(props) {
  return (
    <Form layout="inline" onFinish={props.onItemAdded}>
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
      <Form.Item name="amount" label="จํานวนเงิน" rules={[{ required: true }]}>
        <InputNumber placeholder="จํานวนเงิน" />
      </Form.Item>
      <Form.Item name="note" label="หมายเหตุ" rules={[{ required: true }]}>
        <Input placeholder="Note" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
