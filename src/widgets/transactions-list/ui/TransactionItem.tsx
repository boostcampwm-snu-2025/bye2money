import { CategoryBadge } from "../../../entities/category/ui/categoryBadge";
import { formatAmount } from "../../../features/add-transaction/lib/amountUtils";
import type { Transaction } from "../../../entities/transaction/model/transactionTypes";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isIncome = transaction.type === "income";
  const amountDisplay = isIncome
    ? `+${formatAmount(transaction.amount)}원`
    : `-${formatAmount(transaction.amount)}원`;

  const amountColorClass = isIncome
    ? "text-brand-text-income"
    : "text-brand-text-expense";

  return (
    <div className="grid grid-cols-[auto_1fr_120px_160px] items-center gap-4">
      <CategoryBadge category={transaction.category} />
      <p className="text-light-14">{transaction.description}</p>
      <p className="text-light-14">{transaction.paymentMethod}</p>
      <p className={`text-right text-light-14 ${amountColorClass}`}>
        {amountDisplay}
      </p>
    </div>
  );
};
