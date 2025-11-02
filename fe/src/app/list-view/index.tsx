import type { Dayjs } from "dayjs";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

import DailyInfo from "./daily-info";
import DailyListDetail from "./daily-list-detail";
import InputBar from "./input-bar";
import MonthlyInfo from "./monthly-info";

// TODO: group by date, calculation을 서버에서 할 지, 클라이언트에서 할 지 결정 필요
type Category =
  | "allowance"
  | "culture"
  | "etc-expense"
  | "etc-income"
  | "food"
  | "health"
  | "life"
  | "salary"
  | "shopping"
  | "transport";

type Item = {
  amount: number;
  category: Category;
  date: Dayjs;
  description: string;
  id: number;
  paymentMethod: string;
};

interface Props {
  date: Dayjs;
}

type RawItem = {
  amount: number;
  category: Category;
  date: string;
  description: string;
  id: number;
  paymentMethod: string;
};

function filter(item: Item, expense: boolean, income: boolean) {
  if (item.amount > 0 && !income) {
    return false;
  }
  if (item.amount < 0 && !expense) {
    return false;
  }
  return true;
}

function groupByDate(data: Item[]) {
  return Object.values(
    data.reduce((acc, item) => {
      const dateKey = item.date.format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = {
          dailyExpense: 0,
          dailyIncome: 0,
          data: [],
          date: item.date,
        };
      }
      acc[dateKey].data.push(item);
      if (item.amount > 0) {
        acc[dateKey].dailyIncome += item.amount;
      } else {
        acc[dateKey].dailyExpense -= item.amount;
      }
      return acc;
    }, {} as Record<string, { dailyExpense: number; dailyIncome: number; data: Item[]; date: Dayjs }>)
  );
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
  const query = useQuery({
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3001/api/transactions?month=${
          date.month() + 1
        }&year=${date.year()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json() as RawItem[];
      return data.map((item) => ({ ...item, date: dayjs(item.date) }));
    },
    queryKey: ["transactions", date.month(), date.year()],
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

  const {
    expenseFilter,
    incomeFilter,
    onExpenseFilterChange,
    onIncomeFilterChange,
  } = useFilter();
  const filteredData = query.data?.filteredData || [];

  const totalIncome = query.data?.totalIncome || 0;
  const totalExpense = query.data?.totalExpense || 0;

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
          totalCount={filteredData.length}
          totalExpense={totalExpense}
          totalIncome={totalIncome}
        />

        {groupByDate(filteredData).map((item) => (
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
