import { DateTime } from "luxon";
import { useDateStore } from "../../store/useDateStore";
import { useSpendingDetailStore } from "../../store/useSpendingDetailStore";
import { DayBlock, type DayBlockProps } from "./DayBlock";
import { useMemo } from "react";
import {
  getExpendituresSum,
  getIncomesSum,
  groupSpendingsByDay,
} from "../../utils/utilFns";

export const Calendar = () => {
  const { getYear, getMonth } = useDateStore();
  const { getSpendingsByMonth } = useSpendingDetailStore();

  const year = getYear();
  const month = getMonth();

  const spendings = getSpendingsByMonth(year, month);
  const spendingsByDay = useMemo(
    () => groupSpendingsByDay(spendings),
    [spendings],
  );

  const { year: currYear, month: currMonth, day: currDay } = DateTime.now();

  const currMonthFirstDay = DateTime.fromObject({ year, month, day: 1 });
  const currMonthLastDay = currMonthFirstDay.endOf("month").day;

  const prefixQty = currMonthFirstDay.weekday % 7;
  const suffixQty = (7 - ((currMonthLastDay + prefixQty) % 7)) % 7;

  const blocksProps: (DayBlockProps | undefined)[] = [];
  Array.from({ length: prefixQty }).forEach((_x) =>
    blocksProps.push(undefined),
  );
  Array.from({ length: currMonthLastDay }).forEach((_x, i) =>
    blocksProps.push({
      day: i + 1,
      year,
      month,
      isToday: i + 1 === currDay && year === currYear && month === currMonth,
      spendings: [],
    }),
  );
  Array.from({ length: suffixQty }).forEach((x) => blocksProps.push(undefined));
  spendingsByDay.forEach(
    (s) => (blocksProps[s.day - 1 + prefixQty].spendings = s.spendings),
  );
  const koreanWeekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weeks: (DayBlockProps | undefined)[][] = [];
  Array.from({ length: blocksProps.length / 7 }).forEach((_x, i) => {
    weeks.push(blocksProps.slice(i * 7, i * 7 + 7));
  });

  return (
    <div className="flex flex-col w-[845px] border-neutral-border-default border-[0.5px] divide-y-[0.5px] divide-neutral-border-default z-10">
      <div className="flex flex-row w-[844px] divide-neutral-border-default divide-x-[0.5px]">
        {koreanWeekdays.map((x) => (
          <div
            key={x}
            className="grid w-1/7 h-[48px] place-items-center bg-white"
          >
            {x}
          </div>
        ))}
      </div>
      {weeks.map((w, w_i) => (
        <div
          key={w_i}
          className="flex flex-row w-[844px] h-[120px] divide-x-[0.5px] divide-neutral-border-default"
        >
          {w.map((b, i) => (
            <DayBlock
              key={i}
              year={b?.year}
              month={b?.month}
              day={b?.day}
              spendings={b?.spendings}
              isToday={b?.isToday}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
