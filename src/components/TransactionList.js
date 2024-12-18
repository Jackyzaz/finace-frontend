import { BugOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Space, Table, Tag } from "antd";
import dayjs from "dayjs";

export default function TransactionList(props) {
  const columns = [
    {
      title: "DateTime",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm")
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "income" ? "green" : "red"}>
          {type === "income" ? "รายรับ" : "รายจ่าย"}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action", key: "action", render: (_, record) => (
        <Space size="middle">
          
          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => props.onRowDelete(record.id)}
          >
            <Button danger 
              type="primary" 
              shape="circle" 
              icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button 
            type="primary" 
            shape="circle" 
            icon={<BugOutlined/>} 
            onClick={() => {
              Modal.info({
                title: "Debug",
                content: JSON.stringify(record)
              })
            }}/>
        </Space>
      ), 
    },
  ];

  return (
    <>
      <Table dataSource={props.data} columns={columns} />
    </>
  );
}
