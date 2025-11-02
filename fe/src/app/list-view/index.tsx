import type { Dayjs } from "dayjs";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

import DailyInfo from "./daily-info";
import DailyListDetail from "./daily-list-detail";
import InputBar from "./input-bar";
import MonthlyInfo from "./monthly-info";

type Category = ExpenseCategory | IncomeCategory;
type ExpenseCategory = "교통"
  | "문화/여가"
  | "미분류"
  | "생활"
  | "쇼핑/뷰티"
  | "식비"
  | "의료/건강";
type IncomeCategory = "기타 수입" | "용돈" | "월급";

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
  const {
    expenseFilter,
    incomeFilter,
    onExpenseFilterChange,
    onIncomeFilterChange,
  } = useFilter();

  const query = useQuery({
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `http://localhost:3001/api/transactions?month=${
          date.month() + 1
        }&year=${date.year()}`,
        { signal }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = (await response.json()) as RawItem[];
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

  if (query.data === undefined)
    return null;

  const filteredData = query.data.filteredData;
  const totalIncome = query.data.totalIncome;
  const totalExpense = query.data.totalExpense;

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
