import React, { useState, useEffect } from "react";
import { TransactionContext } from "./TransactionContext.js";

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 거래 추가
  const addTransaction = (newTx) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  const changeMonth = (offset) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  useEffect(() => {
    console.log("현재 거래 목록:", transactions);
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        currentDate,
        setCurrentDate,
        changeMonth,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
