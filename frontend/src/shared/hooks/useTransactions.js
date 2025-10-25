// 이런 커스텀 hook을 만들긴 했는데, 굳이 쓸 정도로 복잡하지 않은 것 같아서 일단 패스했습니다.

import { useState, useEffect } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../api";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState(null);

  // fetch
  const refresh = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  // CRUD
  const handleAdd = async (item) => {
    const newItem = await addTransaction(item);
    setTransactions((prev) => [...prev, newItem]);
  };

  const handleEdit = async (item) => {
    const updated = await updateTransaction(item);
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setSelected(null);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    transactions,
    selected,
    setSelected,
    handleAdd,
    handleEdit,
    handleDelete,
    refresh,
  };
}