import type { Dayjs } from "dayjs";

import dayjs from "dayjs";
import { useState } from "react";

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
  // id는 생성한 시간 순으로 부여됩니다.
  id: number;
  paymentMethod: string;
};

const data: Item[] = [
  {
    amount: -10_900,
    category: "culture",
    date: dayjs("2025-08-14"),
    description: "스트리밍 서비스 정기 결제",
    id: 13,
    paymentMethod: "현대카드",
  },
  {
    amount: -45_340,
    category: "transport",
    date: dayjs("2025-08-14"),
    description: "후불 교통비 결제",
    id: 12,
    paymentMethod: "현대카드",
  },
  {
    amount: -10_000,
    category: "etc-expense",
    date: dayjs("2025-08-13"),
    description: "온라인 세미나 신청",
    id: 11,
    paymentMethod: "현대카드",
  },
  {
    amount: -9_500,
    category: "food",
    date: dayjs("2025-08-10"),
    description: "잔치국수와 김밥",
    id: 10,
    paymentMethod: "현대카드",
  },
  {
    amount: 2_010_580,
    category: "salary",
    date: dayjs("2025-08-10"),
    description: "8월 급여",
    id: 9,
    paymentMethod: "현금",
  },
  {
    amount: -19_140,
    category: "food",
    date: dayjs("2025-08-09"),
    description: "두유 4개",
    id: 8,
    paymentMethod: "현대카드",
  },
  {
    amount: -500_000,
    category: "life",
    date: dayjs("2025-08-09"),
    description: "8월 월세",
    id: 7,
    paymentMethod: "현대카드",
  },
  {
    amount: -56_000,
    category: "shopping",
    date: dayjs("2025-08-07"),
    description: "여름 의류",
    id: 6,
    paymentMethod: "현대카드",
  },
  {
    amount: -9_900,
    category: "culture",
    date: dayjs("2025-08-07"),
    description: "영화 스트리밍",
    id: 5,
    paymentMethod: "현대카드",
  },
  {
    amount: -200,
    category: "etc-expense",
    date: dayjs("2025-08-04"),
    description: "출력소(컬러인쇄)",
    id: 4,
    paymentMethod: "현금",
  },
  {
    amount: -6_500,
    category: "food",
    date: dayjs("2025-08-04"),
    description: "토마토소스 오므라이스",
    id: 3,
    paymentMethod: "현대카드",
  },
  {
    amount: -125_300,
    category: "health",
    date: dayjs("2025-08-04"),
    description: "체육관 수강 등록",
    id: 2,
    paymentMethod: "현대카드",
  },
  {
    amount: -5_400,
    category: "food",
    date: dayjs("2025-08-03"),
    description: "커피",
    id: 1,
    paymentMethod: "현대카드",
  },
];

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

const CATEGORY_COLOR: Record<Category, string> = {
  allowance: "bg-[#AACD7E]",
  culture: "bg-[#BDA6E1]",
  "etc-expense": "bg-[#F0B0D3]",
  "etc-income": "bg-[##A28878]",
  food: "bg-[#C5E0EB]",
  health: "bg-[#BCDFD3]",
  life: "bg-[#A7B9E9]",
  salary: "bg-[#E39D5D]",
  shopping: "bg-[#D7CA6B]",
  transport: "bg-[#7DB7BF]",
};

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

function ListView() {
  const {
    expenseFilter,
    incomeFilter,
    onExpenseFilterChange,
    onIncomeFilterChange,
  } = useFilter();
  const filteredData = data.filter((item) =>
    filter(item, expenseFilter, incomeFilter)
  );

  const totalIncome = data
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = data
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc - item.amount, 0);

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
            <div className="w-full flex justify-between">
              <div className="flex gap-[8px]">
                <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
                  {item.date.format("M월 D일")}
                </span>
                <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
                  {/* dayjs vs date */}
                  {item.date.locale("ko").format("dddd")}
                </span>
              </div>
              <div className="flex gap-[8px]">
                {item.dailyIncome > 0 && (
                  <>
                    <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
                      수입
                    </span>
                    <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
                      {item.dailyIncome.toLocaleString()}원
                    </span>
                  </>
                )}
                {item.dailyExpense > 0 && (
                  <>
                    <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
                      지출
                    </span>
                    <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
                      {item.dailyExpense.toLocaleString()}원
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="w-full border-y-[0.5px]">
              {item.data.map((item) => (
                <div className="w-full flex gap-[16px] pr-[16px]" key={item.id}>
                  <div
                    className={`w-[92px] h-[56px] px-[8px] py-[4px] text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard] flex justify-center items-center ${
                      CATEGORY_COLOR[item.category]
                    }`}
                  >
                    {/* TODO: key를 한국어로 변환 */}
                    {item.category}
                  </div>
                  <div className="w-[400px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
                    {item.description}
                  </div>
                  <div className="w-[104px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
                    {item.paymentMethod}
                  </div>
                  <div
                    className={`flex-1 text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center justify-end ${
                      item.amount > 0 ? "text-[#79B2CA]" : "text-[#C04646]"
                    }`}
                  >
                    {item.amount.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListView;
