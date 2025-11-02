import { DailyTransactionGroup } from "./DailyTransactionGroup";
import { TransactionFilterBar } from "./TransactioinFilterBar";

export const TransactionListView = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-3/5 flex-col gap-10">
        <TransactionFilterBar />
        <DailyTransactionGroup />
        <DailyTransactionGroup />
        <DailyTransactionGroup />
        <DailyTransactionGroup />
        <DailyTransactionGroup />
      </div>
    </div>
  );
};
