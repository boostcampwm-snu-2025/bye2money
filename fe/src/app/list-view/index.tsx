import type { Dayjs } from "dayjs";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { readTransactions } from "~/api/transactions";

import DailyInfo from "./daily-info";
import DailyListDetail from "./daily-list-detail";
import { filter, groupByDate } from "./helper";
import InputBar from "./input-bar";
import MonthlyInfo from "./monthly-info";

interface Props {
  date: Dayjs;
}

const DEFAULT_FILTER = {
  expense: true,
  income: true,
};

const useFilter = () => {
  const [expenseFilter, setExpenseFilter] = useState(DEFAULT_FILTER.expense);
  const [incomeFilter, setIncomeFilter] = useState(DEFAULT_FILTER.income);

  return {
    expenseFilter,
    incomeFilter,
    onExpenseFilterChange: setExpenseFilter,
    onIncomeFilterChange: setIncomeFilter,
  };
};

function ListView({ date }: Props) {
  const {
    expenseFilter,
    incomeFilter,
    onExpenseFilterChange,
    onIncomeFilterChange,
  } = useFilter();

  const month = date.month() + 1;
  const year = date.year();

  const query = useQuery({
    queryFn: async ({ signal }) => readTransactions(month, year, signal),
    queryKey: ["transactions", { month, year }],
    select: (data) => {
      return {
        filteredData: data.filter((item) =>
          filter(item, expenseFilter, incomeFilter)
        ),
        totalExpense: data
          .filter((item) => item.amount < 0)
          .reduce((acc, item) => acc - item.amount, 0),
        totalIncome: data
          .filter((item) => item.amount > 0)
          .reduce((acc, item) => acc + item.amount, 0),
      };
    },
  });

  if (query.status !== "success") return null;

  return (
    <>
      <InputBar />
      <div className="w-[846px] flex flex-col gap-[40px]">
        <MonthlyInfo
          filter={{
            expense: expenseFilter,
            income: incomeFilter,
            onExpenseFilterChange: onExpenseFilterChange,
            onIncomeFilterChange: onIncomeFilterChange,
          }}
          totalCount={query.data.filteredData.length}
          totalExpense={query.data.totalExpense}
          totalIncome={query.data.totalIncome}
        />

        {groupByDate(query.data.filteredData).map((item) => (
          <div
            className="w-[846px] space-y-[16px]"
            key={item.date.format("YYYY-MM-DD")}
          >
            <DailyInfo
              dailyExpense={item.dailyExpense}
              dailyIncome={item.dailyIncome}
              date={item.date}
            />
            <div className="w-full border-y-[0.5px]">
              {item.data.map((item) => (
                <DailyListDetail
                  amount={item.amount}
                  category={item.category}
                  description={item.description}
                  key={item.id}
                  paymentMethod={item.paymentMethod}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListView;
