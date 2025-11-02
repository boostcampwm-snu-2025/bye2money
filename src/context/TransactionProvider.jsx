// src/context/TransactionProvider.jsx
import React, { useState, useEffect } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import {
  getTransactionsByMonth,
  addTransaction as postTransaction,
  updateTransaction as patchTransaction,
  deleteTransaction as removeTransaction,
} from "@/api";

export const TransactionProvider = ({ children }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchTransactions = async () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const data = await getTransactionsByMonth(year, month);
      setTransactions(data);
    } catch (err) {
      console.error("데이터 불러오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentDate]);

  const addTransaction = async (tx) => {
    await postTransaction(tx);
    await fetchTransactions();
  };

  const updateTransaction = async (id, data) => {
    await patchTransaction(id, data);
    await fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await removeTransaction(id);
    await fetchTransactions();
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        currentDate,
        setCurrentDate,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        selectedTransaction,
        setSelectedTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
