import { useState } from "react";
import MainPageHeader from "../components/MainPageHeader";
import TransactionContainer from "../components/TransactionContainer";
import TransactionInputBar from "../components/TransactionInputBar.jsx";
import Background from "../components/Background.jsx";

export default function MainPage() {
  // 전체 가계부 항목 컨트롤
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [selected, setSelected] = useState(null);

  const updateStorage = (list) =>
    localStorage.setItem("transactions", JSON.stringify(list));

  // 항목 추가
  const handleAdd = (item) => {
    setTransactions((prev) => {
      const next = [...prev, { id: Date.now(), ...item }];
      updateStorage(next);
      return next;
    });
  };

  // 항목 수정
  const handleEdit = (updatedItem) => {
    setTransactions((prev) => {
      const next = prev.map((t) => (t.id === updatedItem.id ? updatedItem : t));
      updateStorage(next);
      return next;
    });
    setSelected(null);
  };

  // 항목 삭제
  const handleDelete = (id) => {
    setTransactions((prev) => {
      const next = prev.filter((t) => t.id !== id);
      updateStorage(next);
      return next;
    });
  };

  return (
    <div>
      <Background />
      <div className="relative w-[1440px] mx-auto flex flex-col items-center">
        <MainPageHeader />  
        <TransactionInputBar
          onAdd={handleAdd}
          onEdit={handleEdit}
          selected={selected}
        />
        <main>
          <TransactionContainer
            transactions={transactions}
            onSelect={setSelected}
            onDelete={handleDelete}
            selected={selected}
          />
        </main>
      </div>
    </div>
  );
}