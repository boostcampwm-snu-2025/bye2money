import { TransactionItem } from "./TransactionItem";
import { formatAmount } from "../../../features/add-transaction/lib/amountUtils";
import type { DailyTransactionSummary } from "../../../entities/transaction/model/transactionTypes";

interface DailyTransactionGroupProps {
  group: DailyTransactionSummary;
}

export const DailyTransactionGroup = ({
  group,
}: DailyTransactionGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-serif text-serif-14">
          {group.date} {group.dayOfWeek}
        </span>
        <div className="flex gap-2">
          {group.totalIncome > 0 && (
            <span className="font-serif text-serif-14">
              수입 {formatAmount(group.totalIncome)}원
            </span>
          )}
          {group.totalExpense > 0 && (
            <span className="font-serif text-serif-14">
              지출 {formatAmount(group.totalExpense)}원
            </span>
          )}
        </div>
      </div>
      <div className="border-y border-neutral-border">
        {group.transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
