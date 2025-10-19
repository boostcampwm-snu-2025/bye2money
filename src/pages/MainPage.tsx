import { useEffect, useMemo, useState } from "react";
import { useDateStore } from "../store/useDateStore.ts";
import {
  useSpendingDetailStore,
  type DaySpendings,
  type SpendingDetail,
} from "../store/useSpendingDetailStore.ts";
import { DaySpendingsSection } from "../components/DaySpendingsSection.tsx";

const groupSpendingsByDay = (spendings: SpendingDetail[]): DaySpendings[] => {
  if (!spendings.length) return [];
  const { year, month } = spendings[0];
  const days = [...new Set(spendings.map((s) => s.day))];
  days.sort((a, b) => b - a);
  const daysIdx = new Map();
  const res: DaySpendings[] = [];
  days.forEach((day, i) => {
    daysIdx.set(day, i);
    const daySpendings: DaySpendings = {
      year,
      month,
      day,
      spendings: [],
    };
    res.push(daySpendings);
  });
  spendings.forEach((s) => {
    res[daysIdx.get(s.day)].spendings.push(s);
  });
  return res;
};
export const MainPage = () => {
  const { getPaymentMethods, addPaymentMethod, getSpendingsByMonth } =
    useSpendingDetailStore();
  const { getYear, getMonth } = useDateStore();
  const year = getYear();
  const month = getMonth();
  const spendings = getSpendingsByMonth(year, month);
  const [includeExpenditures, setIncludeExpenditures] = useState<boolean>(true);
  const [includeIncomes, setIncludeIncomes] = useState<boolean>(true);
  const spendingsByDay = useMemo(
    () => groupSpendingsByDay(spendings),
    [spendings],
  );

  return (
    <div
      className="flex flex-col w-layout min-h-[700px] bg-neutral-surface-weak
    items-center pt-[70px]"
    >
      <div className="flex flex-col w-[846px]">
        <div className="flex flex-row w-full h-[24px] justify-between">
          <div className="flex flex-row w-[68px] justify-between">
            <h3 className="font-sans font-ligth text-sans-light-sm">
              전체 내역
            </h3>
            <h3 className="font-sans font-ligth text-sans-light-sm">
              {spendings.length}건
            </h3>
          </div>
        </div>
      </div>
      {spendingsByDay.map((x) => (
        <DaySpendingsSection
          key={`${x.year}-${x.month}-${x.day}`}
          year={x.year}
          month={x.month}
          day={x.day}
          spendings={x.spendings}
          showIncomes={includeIncomes}
          showExpenditures={includeExpenditures}
        />
      ))}
    </div>
  );
};
