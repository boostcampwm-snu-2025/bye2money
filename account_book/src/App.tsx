import React, { useMemo, useState } from "react";
import rawTx from "./data/tx.sample.json";
import type { Method, Category, Tx } from "./types";
import { calcTotals, groupByDate } from "./utils";
import TopBar from "./components/TopBar";
import SummaryCard from "./components/SummaryCard";
import Totals from "./components/Totals";
import TransactionList from "./components/TransactionList";

const sample = rawTx as Tx[];

const App: React.FC = () => {
  const [methodOpen, setMethodOpen] = useState(false);
  const [method, setMethod] = useState<Method | undefined>(undefined);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const totals = useMemo(() => calcTotals(sample), []);
  const grouped = useMemo(() => groupByDate(sample), []);

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
      />
      <Totals income={totals.income} expense={totals.expense} />
      <TransactionList grouped={grouped} />
    </div>
  );
};

export default App;
