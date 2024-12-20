import { Col, Divider, Row, Spin } from "antd";
import TransactionList from "./TransactionList";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../App.css";
import AddTransaction from "./AddTransaction";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function Transaction(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [amount, setAmount] = useState(0);
  const URL_TXACTIONS = `/api/txactions`;
  const URL_TXACTIONS_FILTER = `/api/txactions?filters[creator][id][$eq]=${props.user.id}`;
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

  const addTransaction = async (item) => {
    try {
      setIsLoading(true);
      const params = {
        action_datetime: new Date(),
        type: item.type,
        note: item.note,
        amount: item.amount,
        creator: props.user.id,
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

  const handleRowUpdate = async (item) => {
    try {
      setIsLoading(true);
      const params = {
        action_datetime: item.action_datetime,
        type: item.type,
        note: item.note,
        amount: item.amount,
        creator: props.user.id,
      };
      await axios.put(`${URL_TXACTIONS}/${item.id}`, { data: params });
      fetchItems();
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
  }, [URL_TXACTIONS_FILTER]);

  useEffect(() => {
    if (props.user && props.user.jwt) {
      axios.defaults.headers.common["Authorization"] = `bearer ${props.user.jwt}`;
      fetchItems();
    }
  }, [props.user, fetchItems]);

  useEffect(() => {
    try {
      setIsLoading(true);
      setAmount(
        transactionData.reduce(
          (sum, transaction) =>
            transaction.type === "income" ? (sum += transaction.amount) : (sum -= transaction.amount),
          0
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [transactionData]);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const income = transactionData
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactionData
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const data = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [expenses, income],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Spin spinning={isLoading}>
      <Row
        justify="space-between"
        style={{
          width: "100%",
          paddingRight: "25vh",
          marginTop: "5vh",
        }}
      >
        <Col>
          <h1 style={{ fontSize: "8vh" }}>Dashboard: {props.user.username}</h1>
          <h2 style={{ fontSize: "4vh" }}>
            <span>จํานวนเงินปัจจุบัน </span> <a> {amount} </a> <span> บาท </span>
          </h2>
        </Col>
        <Col>
          <div style={{ width: "40vh" }}>
            <Pie data={data} />
          </div>
        </Col>
      </Row>
      <AddTransaction onItemAdded={addTransaction} />
      <Divider>บันทึก รายรับ - รายจ่าย</Divider>
      <TransactionList
        data={transactionData}
        onNoteChanged={handleNoteChanged}
        onRowDelete={handleRowDelete}
        onRowUpdate={handleRowUpdate}
      />
    </Spin>
  );
}
