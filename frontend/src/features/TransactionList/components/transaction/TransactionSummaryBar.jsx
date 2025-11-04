import { CheckSquare } from "lucide-react";

export default function TransactionSummaryBar({
  totalCount,
  totalIncome,
  totalExpense,
  filters,
  onFilterChange,
}) {
  return (
    <div className="w-full flex justify-between items-center py-3">
      <div className="font-sans font-light text-xs text-neutral-text-default">
        전체 내역&nbsp;
        <span className="font-semibold">{totalCount}</span>건
      </div>

      <div className="flex gap-4 items-center text-xs font-light font-sans">
        <label
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => onFilterChange("income")}
        >
          <CheckSquare
            size={14}
            className={`${
              filters.income ? "text-neutral-text-default" : "text-neutral-text-weak"
            }`}
          />
          <span>
            수입&nbsp;
            <span className="font-semibold">
              {totalIncome.toLocaleString()}
            </span>
            원
          </span>
        </label>

        <label
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => onFilterChange("expense")}
        >
          <CheckSquare
            size={14}
            className={`${
              filters.expense ? "text-neutral-text-default" : "text-neutral-text-weak"
            }`}
          />
          <span>
            지출&nbsp;
            <span className="font-semibold">
              {totalExpense.toLocaleString()}
            </span>
            원
          </span>
        </label>
      </div>
    </div>
  );
}