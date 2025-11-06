import { useEffect, useMemo, useState } from "react";
import { useDateStore } from "../store/useDateStore.ts";
import {
  useSpendingDetailStore,
  type DaySpendings,
  type SpendingDetail,
} from "../store/useSpendingDetailStore.ts";
import { DaySpendingsSection } from "../components/DaySpendingsSection.tsx";
import { CheckBox } from "../components/CheckBox.tsx";
import { EditBar } from "../components/Main/EditBar.tsx";
import { groupSpendingsByDay } from "../utils/utilFns.ts";

export const MainPage = () => {
  const { getPaymentMethods, addPaymentMethod, getSpendingsByMonth } =
    useSpendingDetailStore();
  const { getYear, getMonth } = useDateStore();
  const year = getYear();
  const month = getMonth();
  const [includeExpenditures, setIncludeExpenditures] = useState<boolean>(true);
  const [includeIncomes, setIncludeIncomes] = useState<boolean>(true);
  const spendings = getSpendingsByMonth(year, month);
  const spendingsByDay = useMemo(
    () => groupSpendingsByDay(spendings),
    [spendings],
  );

  return (
    <div
      className="relative flex flex-col w-layout min-h-[700px] bg-neutral-surface-weak
    items-center gap-[34px]"
    >
      <div className="absolute top-0 flex flex-row w-layout h-[40px] bg-colorchip-80"></div>
      <EditBar />
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
          <div className="flex flex-row gap-[12px]">
            <CheckBox
              value={includeIncomes}
              onClick={() => {
                setIncludeIncomes(!includeIncomes);
              }}
              label={"수입" + ""}
            />
            <CheckBox
              value={includeExpenditures}
              onClick={() => {
                setIncludeExpenditures(!includeExpenditures);
              }}
              label={"지출" + ""}
            />
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
