import { CheckBox } from "../../../shared/ui/CheckBox/CheckBox";
import { formatAmount } from "../../../shared/lib/amountUtils";
import { useTransactionFilter } from "../model/useTransactionFilter";

interface TransactionFilterBarProps {
  totalCount: number;
  totalIncome: number;
  totalExpense: number;
}

export const TransactionFilterBar = ({
  totalCount,
  totalIncome,
  totalExpense,
}: TransactionFilterBarProps) => {
  const { showIncome, showExpense, toggleIncome, toggleExpense } =
    useTransactionFilter();

  return (
    <div className="flex items-center justify-between">
      <span className="text-light-12">전체 내역 {totalCount}건</span>
      <div className="flex gap-3">
        <CheckBox
          checked={showIncome}
          label={`수입 ${formatAmount(totalIncome)}원`}
          onChange={toggleIncome}
        />
        <CheckBox
          checked={showExpense}
          label={`지출 ${formatAmount(totalExpense)}원`}
          onChange={toggleExpense}
        />
      </div>
    </div>
  );
};
