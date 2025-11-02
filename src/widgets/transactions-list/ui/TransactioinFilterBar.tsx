import { CheckBox } from "../../../shared/ui/CheckBox/CheckBox";
import { formatAmount } from "../../../features/add-transaction/lib/amountUtils";

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
  return (
    <div className="flex items-center justify-between">
      <span className="text-light-12">전체 내역 {totalCount}건</span>
      <div className="flex gap-3">
        <CheckBox
          checked={false}
          label={`수입 ${formatAmount(totalIncome)}원`}
          onChange={() => {}}
        />
        <CheckBox
          checked={false}
          label={`지출 ${formatAmount(totalExpense)}원`}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
