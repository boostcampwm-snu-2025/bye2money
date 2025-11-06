import React, { useEffect, useMemo, useState } from "react";
import type { Method, Category, Tx } from "./types";
import { calcTotals, groupByDate } from "./utils";
import { fetchTxs, addTx } from "./api";
import TopBar from "./components/TopBar";
import SummaryCard from "./components/SummaryCard";
import Totals from "./components/Totals";
import TransactionList from "./components/TransactionList";

const App: React.FC = () => {
  const [txs, setTxs] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  // dropdown states
  const [methodOpen, setMethodOpen] = useState(false);
  const [method, setMethod] = useState<Method | undefined>(undefined);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  // inputs
  const [amount, setAmount] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await fetchTxs();
      setTxs(data);
      setLoading(false);
    })();
  }, []);

  const totals = useMemo(() => calcTotals(txs), [txs]);
  const grouped = useMemo(() => groupByDate(txs), [txs]);

  const handleAdd = async () => {
    if (!amount || !content) return;
    const tx = await addTx({
      amount: Number(amount),
      content,
      method,
      category,
    });
    // refresh list (simplest: re-fetch)
    const data = await fetchTxs();
    setTxs(data);

    // reset inputs
    setAmount("");
    setContent("");
  };

  return (
    <div className="page">
      <TopBar />
      <SummaryCard
        methodOpen={methodOpen}
        setMethodOpen={setMethodOpen}
        method={method}
        setMethod={setMethod}
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        category={category}
        setCategory={setCategory}
        amount={amount}
        setAmount={setAmount}
        content={content}
        setContent={setContent}
        onAdd={handleAdd}
      />
      {loading ? (
        <div style={{ padding: 16 }}>불러오는 중…</div>
      ) : (
        <>
          <Totals income={totals.income} expense={totals.expense} />
          <TransactionList grouped={grouped} />
        </>
      )}
    </div>
  );
};

export default App;
