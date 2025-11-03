import React, { useState, useEffect } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import {
  getTransactionsByMonth,
  addTransaction as postTransaction,
  updateTransaction as patchTransaction,
  deleteTransaction as removeTransaction,
} from "@/api";

export const TransactionProvider = ({ children }) => {
  /* ------------------------------
   * transaction 관련 전역 핵심 상태
     ------------------------------*/
  //전체 거래 내역
  const [transactions, setTransactions] = useState([]);
  //사용자가 수정 중인 특정 거래
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  //현재 보고 있는 달(Header에서 월 변경 시 사용)
  const [currentDate, setCurrentDate] = useState(new Date());

  /* ------------------------------
    * Header에서 월 변경 시
    ------------------------------*/
  //useEffect로 currentDate 변경 감지하여 해당 월의 거래 내역 불러오기
  //fetchTransactions: 해당 월의 거래 내역 불러오는 함수
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

  /* ------------------------------
    * 거래 추가/수정/삭제 함수
    ------------------------------*/

  //거래 추가
  const addTransaction = async (tx) => {
    await postTransaction(tx);
    await fetchTransactions();
  };

  //거래 수정
  const updateTransaction = async (id, data) => {
    await patchTransaction(id, data);
    await fetchTransactions();
  };

  //거래 삭제
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
