import { useState } from "react";
import TransactionSummaryBar from "./TransactionSummaryBar";
import TransactionList from "./TransactionList";

export default function TransactionContainer({ transactions, onSelect, onDelete, selected }) {
  const [filters, setFilters] = useState({
    income: true,
    expense: true,
  });
  
  // 데이터 가공
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalCount = transactions.length;

  const handleFilterChange = (type) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredTransactions = transactions.filter((t) => {
    if (t.amount > 0 && !filters.income) return false;
    if (t.amount < 0 && !filters.expense) return false;
    return true;
  });

  return (
    <section className="w-[846px] gap-8 mt-8 flex flex-col items-center">
      <TransactionSummaryBar
        totalCount={totalCount}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <TransactionList
        transactions={filteredTransactions}
        onSelect={onSelect}
        onDelete={onDelete}
        selected={selected}
      />
    </section>
  );
}