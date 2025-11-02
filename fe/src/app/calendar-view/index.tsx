import { useQuery } from "@tanstack/react-query";
import { type Dayjs } from "dayjs";

import { readTransactions } from "~/api/transactions";

import { dailyTotals, fold, range } from "./helper";

interface Props {
  date: Dayjs;
}

function CalendarView({ date }: Props) {
  const daysInMonth = date.daysInMonth();
  const start = -date.day();
  const end = daysInMonth + (7 - ((daysInMonth + start) % 7));
  const month = date.month() + 1;
  const year = date.year();

  const query = useQuery({
    queryFn: async ({ signal }) => readTransactions(month, year, signal),
    queryKey: ["transactions", { month, year }],
    select: (data) => ({
      dailyData: dailyTotals(data, daysInMonth),
      monthlyData: {
        totalAmount: data.reduce((acc, item) => acc + item.amount, 0),
        totalExpense: data
          .filter((item) => item.amount < 0)
          .reduce((acc, item) => acc - item.amount, 0),
        totalIncome: data
          .filter((item) => item.amount > 0)
          .reduce((acc, item) => acc + item.amount, 0),
      },
    }),
  });

  if (query.status !== "success") return null;

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
                            {query.data.dailyData[
                              i
                            ].totalIncome.toLocaleString()}
                            원
                          </div>
                        )}
                        {query.data.dailyData[i].totalExpense !== 0 && (
                          <div className="text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] text-[#C04646]">
                            {query.data.dailyData[
                              i
                            ].totalExpense.toLocaleString()}
                            원
                          </div>
                        )}
                        {query.data.dailyData[i].totalAmount !== 0 && (
                          <div className="text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard]">
                            {query.data.dailyData[
                              i
                            ].totalAmount.toLocaleString()}
                            원
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
            {query.data.monthlyData.totalIncome.toLocaleString()}원
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총 지출
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {query.data.monthlyData.totalExpense.toLocaleString()}원
          </span>
        </div>
        <div className="flex gap-[8px]">
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총합
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {query.data.monthlyData.totalAmount.toLocaleString()}원
          </span>
        </div>
      </div>
    </>
  );
}

export default CalendarView;
