import type { Dayjs } from "dayjs";

interface Props {
  dailyExpense: number;
  dailyIncome: number;
  date: Dayjs;
}

function DailyInfo({ dailyExpense, dailyIncome, date }: Props) {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-[8px]">
        <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
          {date.format("M월 D일")}
        </span>
        <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
          {/* dayjs vs date */}
          {date.locale("ko").format("dddd")}
        </span>
      </div>
      <div className="flex gap-[8px]">
        {dailyIncome > 0 && (
          <>
            <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
              수입
            </span>
            <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
              {dailyIncome.toLocaleString()}원
            </span>
          </>
        )}
        {dailyExpense > 0 && (
          <>
            <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
              지출
            </span>
            <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
              {dailyExpense.toLocaleString()}원
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default DailyInfo;
