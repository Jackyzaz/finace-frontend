import { useAuth } from "../context/useAuth";
import { useEffect, useState, useCallback } from "react";
import "../App.css";
import TransactionList from "../components/TransactionList";
import AddItem from "../components/AddItem";
import axios from "axios";
import { Button, Divider, Spin, Typography } from "antd";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [amount, setAmount] = useState(0);

  const URL_TXACTIONS = `/api/txactions`;
  const URL_TXACTIONS_FILTER = `/api/txactions?filters[creator][id][$eq]=${user.id}`;

  const handleLogout = () => {
    try {
      setIsLoading(true);
      logout();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS_FILTER);
      setTransactionData(
        response.data.data.map((row) => ({
          id: row.id,
          key: row.id,
          ...row.attributes,
        }))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [URL_TXACTIONS]);

  const handleNoteChanged = (id, note) => {
    setTransactionData(
      transactionData.map((transaction) => {
        transaction.note = transaction.id === id ? note : transaction.note;
        return transaction;
      })
    );
  };

  const handleRowDelete = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${URL_TXACTIONS}/${id}`);
      fetchItems();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item) => {
    try {
      setIsLoading(true);
      const params = {
        action_datetime: new Date(),
        type: item.type,
        note: item.note,
        amount: item.amount,
        creator: user.id,
      };
      const response = await axios.post(URL_TXACTIONS, { data: params });
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        {
          id: id,
          key: id,
          ...attributes,
        },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.jwt) {
      axios.defaults.headers.common["Authorization"] = `bearer ${user.jwt}`;
      fetchItems();
    }
  }, [user, fetchItems]); // Add 'fetchItems' as a dependency

  useEffect(() => {
    setAmount(
      transactionData.reduce(
        (sum, transaction) =>
          transaction.type === "income" ? (sum += transaction.amount) : (sum -= transaction.amount),
        0
      )
    );
  }, [transactionData]);

  return (
    <>
      <div className="container">
        <h1>This is Dashboard</h1>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
        <Typography.Title>จํานวนเงินปัจจุบัน {amount} บาท</Typography.Title>
        <AddItem onItemAdded={addItem} />
        <Divider>บันทึก รายรับ - รายจ่าย</Divider>
        <Spin spinning={isLoading}>
          <TransactionList data={transactionData} onNoteChanged={handleNoteChanged} onRowDelete={handleRowDelete} />
        </Spin>
      </div>
    </>
  );
}
