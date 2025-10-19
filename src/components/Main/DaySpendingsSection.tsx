import {
  useSpendingDetailStore,
  type DaySpendings,
  type SpendingDetail,
} from "../../store/useSpendingDetailStore.ts";
import { DateTime } from "luxon";
import { SpendingRow } from "../SpendingRow.tsx";

interface DaySpendingsSectionProps {
  year: number;
  month: number;
  day: number;
  spendings: SpendingDetail[];
  showExpenditures: boolean;
  showIncomes: boolean;
}
export const DaySpendingsSection: React.FC<DaySpendingsSectionProps> = ({
  year,
  number,
  month,
  day,
  spendings,
  showExpenditures,
  showIncomes,
}) => {
  const expenditureSum = spendings
    .filter((x) => x.isExpenditure)
    .map((x) => x.amount)
    .reduce((a, b) => a + b, 0);
  const incomeSum = spendings
    .filter((x) => !x.isExpenditure)
    .map((x) => x.amount)
    .reduce((a, b) => a + b, 0);

  const filter = [];
  if (showExpenditures) filter.push(true);
  if (showIncomes) filter.push(false);
  const validRows = spendings.filter((s) => filter.includes(s.isExpenditure));

  const dayKor = DateTime.fromISO(`${year}-${month}-${day}`).setLocale(
    "ko-KR",
  ).weekdayLong;

  const incomeSumFormatted = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  })
    .format(incomeSum)
    .replaceAll("₩", "");
  const expenditureSumFormatted = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  })
    .format(expenditureSum)
    .replaceAll("₩", "");

  return validRows.length ? (
    <div className="flex flex-col w-[846px] items-center pt-[70px] gap-[16px]">
      <div className="flex flex-row w-full h-[16px] justify-between">
        <h3 className="font-serif text-serif-sm">
          {month}월 {day}일 {dayKor}
        </h3>
        <h3 className="font-serif text-serif-sm">
          {incomeSum ? `수입 ${incomeSumFormatted}원  ` : ""}
          {expenditureSum ? `지출 ${expenditureSumFormatted}원` : ""}
        </h3>
      </div>
      <div className="flex flex-col w-[846px] overflow-hidden min-h-0 border-neutral-border-default border-[0.5px]">
        {spendings
          .filter((s) => filter.includes(s.isExpenditure))
          .map((s) => (
            <SpendingRow
              key={s.id}
              id={s.id}
              year={s.year}
              month={s.month}
              day={s.day}
              amount={s.amount}
              isExpenditure={s.isExpenditure}
              description={s.description}
              paymentMethod={s.paymentMethod}
              category={s.category}
            />
          ))}
      </div>
    </div>
  ) : (
    <></>
  );
};
