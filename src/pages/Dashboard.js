import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import "../App.css";
import TransactionList from "../components/TransactionList";
import AddItem from "../components/AddItem";
import axios from "axios";
import { Button, Divider, Spin, Typography } from "antd";

// axios.defaults.baseURL =
//   process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_TXACTIONS = "/api/txactions";

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
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
  };

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
        creator: user.username,
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
  const [transactionData, setTransactionData] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (user && user.jwt) {
      axios.defaults.headers.common["Authorization"] = `bearer ${user.jwt}`;
      fetchItems();
    }
  }, [user]);

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
