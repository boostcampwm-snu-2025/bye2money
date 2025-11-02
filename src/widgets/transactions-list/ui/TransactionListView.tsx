import { useMemo } from "react";
import { useQueryStates, parseAsInteger } from "nuqs";
import { DailyTransactionGroup } from "./DailyTransactionGroup";
import { TransactionFilterBar } from "./TransactioinFilterBar";
import { useMonthlyTransactions } from "../model/useMonthlyTransactions";
import { useTransactionFilter } from "../model/useTransactionFilter";
import type { DailyTransactionSummary } from "../../../entities/transaction";

export const TransactionListView = () => {
  const [{ year, month }] = useQueryStates({
    year: parseAsInteger.withDefault(new Date().getFullYear()),
    month: parseAsInteger.withDefault(new Date().getMonth() + 1),
  });

  const { data } = useMonthlyTransactions(year, month);
  const { showIncome, showExpense } = useTransactionFilter();

  const filteredDailyGroups = useMemo(() => {
    if (!data) return [];

    return data.dailyGroups
      .map((group) => {
        const filteredTransactions = group.transactions.filter(
          (transaction) => {
            if (transaction.type === "income" && !showIncome) return false;
            if (transaction.type === "expense" && !showExpense) return false;
            return true;
          },
        );

        const filteredTotalIncome = filteredTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);

        const filteredTotalExpense = filteredTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          ...group,
          transactions: filteredTransactions,
          totalIncome: filteredTotalIncome,
          totalExpense: filteredTotalExpense,
        };
      })
      .filter((group) => group.transactions.length > 0);
  }, [data, showIncome, showExpense]);

  return (
    <div className="flex w-full justify-center py-20">
      <div className="flex w-3/5 flex-col gap-10">
        <TransactionFilterBar
          totalCount={data?.totalCount ?? 0}
          totalIncome={data?.totalIncome ?? 0}
          totalExpense={data?.totalExpense ?? 0}
        />
        {filteredDailyGroups.map((group: DailyTransactionSummary) => (
          <DailyTransactionGroup key={group.date} group={group} />
        ))}
      </div>
    </div>
  );
};
