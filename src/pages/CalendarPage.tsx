import { useMemo } from "react";
import { Calendar } from "../components/Calendar/Calender";
import { useDateStore } from "../store/useDateStore";
import { useSpendingDetailStore } from "../store/useSpendingDetailStore";
import {
  formatMoney,
  getExpendituresSum,
  getIncomesSum,
  groupSpendingsByDay,
} from "../utils/utilFns";

export const CalendarPage = () => {
  const { getSpendingsByMonth } = useSpendingDetailStore();
  const { getYear, getMonth } = useDateStore();
  const year = getYear();
  const month = getMonth();
  const spendings = getSpendingsByMonth(year, month);
  const expendituresSum = useMemo(
    () => getExpendituresSum(spendings),
    [spendings],
  );
  const incomesSum = useMemo(() => getIncomesSum(spendings), [spendings]);
  const total = (expendituresSum ?? 0) * -1 + (incomesSum ?? 0);

  return (
    <div className="relative flex flex-col w-layout min-h-[700px] gap-[24px] items-center font-serif text-serif-sm">
      <div className="absolute top-0 flex flex-row w-layout h-[40px] bg-colorchip-80 z-0"></div>
      <Calendar />
      <div className="flex flex-row w-[846px] h-[16px] justify-between">
        <div className="flex flex-row w-[236px] h-[16px] justify-between">
          <div className="flex flex-row w-[114px] justify-between">
            <h4>총 수입</h4>
            <h4>{formatMoney(false, incomesSum ?? 0)}원</h4>
          </div>
          <div className="flex flex-row w-[114px] justify-between">
            <h4>총 지출</h4>
            <h4>{formatMoney(false, expendituresSum ?? 0)}원</h4>
          </div>
        </div>
        <div className="flex flex-row justify-between w-[102px] h-[16px]">
          <h4>총합</h4>
          <h4>{formatMoney(false, total ?? 0)}원</h4>
        </div>
      </div>
    </div>
  );
};
