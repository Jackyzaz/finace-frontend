import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import EditTransactionModal from "./EditTransactionModal";

export default function TransactionList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const showEditModal = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleModalSave = (updatedValues) => {
    const updatedRecord = { ...editingRecord, ...updatedValues };
    props.onRowUpdate(updatedRecord);
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const columns = [
    {
      title: "DateTime",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "income" ? "green" : "red"}>{type === "income" ? "รายรับ" : "รายจ่าย"}</Tag>
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => props.onRowDelete(record.id)}
            danger
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
          />

          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showEditModal(record)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={props.data} columns={columns} />

      <EditTransactionModal
        isVisible={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        initialValues={editingRecord}
      />
    </>
  );
}
