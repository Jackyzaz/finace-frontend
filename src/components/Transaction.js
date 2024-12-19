import { Divider, Spin } from "antd";
import TransactionList from "./TransactionList";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../App.css";
import AddTransaction from "./AddTransaction";

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

  return (
    <Spin spinning={isLoading}>
      <h3>จํานวนเงินปัจจุบัน {amount} บาท</h3>
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
