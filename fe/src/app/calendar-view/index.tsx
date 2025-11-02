import { useQuery } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";

type Category = ExpenseCategory | IncomeCategory;
type ExpenseCategory =
  | "교통"
  | "문화/여가"
  | "미분류"
  | "생활"
  | "쇼핑/뷰티"
  | "식비"
  | "의료/건강";
type IncomeCategory = "기타 수입" | "용돈" | "월급";

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

function CalendarView({ date }: Props) {
  const day = date.day();
  const daysInMonth = date.daysInMonth();
  const start = -day;
  const end = daysInMonth + (7 - ((daysInMonth + day) % 7));

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
      const dailyData = Array(daysInMonth).fill(0).map(() => ({
        totalAmount: 0,
        totalExpense: 0,
        totalIncome: 0,
      })) as {
        totalAmount: number;
        totalExpense: number;
        totalIncome: number;
      }[];
      data.forEach((item) => {
        const day = item.date.date() - 1;
        dailyData[day].totalAmount += item.amount;
        if (item.amount < 0) {
          dailyData[day].totalExpense += item.amount;
        } else {
          dailyData[day].totalIncome += item.amount;
        }
      });
      return {
        dailyData,
        monthlyData: {
          totalAmount: data.reduce((acc, item) => acc + item.amount, 0),
          totalExpense: data
            .filter((item) => item.amount < 0)
            .reduce((acc, item) => acc - item.amount, 0),
          totalIncome: data
            .filter((item) => item.amount > 0)
            .reduce((acc, item) => acc + item.amount, 0),
        }
      };
    },
  });

  if (query.status !== 'success') return null;

  return (
    <>
      <table className="w-[846px] bg-[#FFFFFF] table-fixed">
        <thead className="h-[48px]">
          <tr>
            <th className="border-[0.5px]">일</th>
            <th className="border-[0.5px]">월</th>
            <th className="border-[0.5px]">화</th>
            <th className="border-[0.5px]">수</th>
            <th className="border-[0.5px]">목</th>
            <th className="border-[0.5px]">금</th>
            <th className="border-[0.5px]">토</th>
          </tr>
        </thead>
        <tbody>
          {fold(range(start, end), 7).map((dates) => (
            <tr key={dates.join(".")}>
              {dates.map((i) => (
                <td className="border-[0.5px] h-[120px]" key={i}>
                  {i < 0 || i >= daysInMonth ? null : (
                    <div className="h-full p-[8px] flex flex-col justify-between">
                      <div>
                        {query.data.dailyData[i].totalIncome !== 0 && (
                          <div className="text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] text-[#79B2CA]">
                            {query.data.dailyData[i].totalIncome.toLocaleString()}원
                          </div>
                        )}
                        {query.data.dailyData[i].totalExpense !== 0 && (
                          <div className="text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] text-[#C04646]">
                            {query.data.dailyData[i].totalExpense.toLocaleString()}원
                          </div>
                        )}
                        {query.data.dailyData[i].totalAmount !== 0 && (
                          <div className="text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard]">
                            {query.data.dailyData[i].totalAmount.toLocaleString()}원
                          </div>
                        )}
                      </div>
                      <div className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM] text-right">
                        {i + 1}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-[846px] flex justify-between">
        <div className="flex gap-[8px]">
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총 수입
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {/* TODO */}
            {query.data.monthlyData.totalIncome.toLocaleString()}원
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총 지출
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {/* TODO */}
            {query.data.monthlyData.totalExpense.toLocaleString()}원
          </span>
        </div>
        <div className="flex gap-[8px]">
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총합
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {/* TODO */}
            {query.data.monthlyData.totalAmount.toLocaleString()}원
          </span>
        </div>
      </div>
    </>
  );
}

function fold<T>(array: T[], count: number) {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += count) {
    result.push(array.slice(i, i + count));
  }
  return result;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

export default CalendarView;
