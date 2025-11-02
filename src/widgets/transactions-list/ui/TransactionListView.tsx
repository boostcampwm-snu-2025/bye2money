import { useQueryStates, parseAsInteger } from "nuqs";
import { DailyTransactionGroup } from "./DailyTransactionGroup";
import { TransactionFilterBar } from "./TransactioinFilterBar";
import { useMonthlyTransactions } from "../model/useMonthlyTransactions";
import type { DailyTransactionSummary } from "../../../entities/transaction/model/transactionTypes";

export const TransactionListView = () => {
  const [{ year, month }] = useQueryStates({
    year: parseAsInteger.withDefault(new Date().getFullYear()),
    month: parseAsInteger.withDefault(new Date().getMonth() + 1),
  });

  const { data } = useMonthlyTransactions(year, month);

  return (
    <div className="flex w-full justify-center py-20">
      <div className="flex w-3/5 flex-col gap-10">
        <TransactionFilterBar
          totalCount={data?.totalCount ?? 0}
          totalIncome={data?.totalIncome ?? 0}
          totalExpense={data?.totalExpense ?? 0}
        />
        {data?.dailyGroups.map((group: DailyTransactionSummary) => (
          <DailyTransactionGroup key={group.date} group={group} />
        ))}
      </div>
    </div>
  );
};
