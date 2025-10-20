import { useMemo, useState } from "react";
import { PieChart } from "../components/Chart/PieChart";
import { getLabel, type Category } from "../components/CategoryTag";
import { DaySpendingsSection } from "../components/DaySpendingsSection";
import { useSpendingDetailStore } from "../store/useSpendingDetailStore";
import { useDateStore } from "../store/useDateStore";
import { formatMoney, groupSpendingsByDay } from "../utils/utilFns";
import { DateTime } from "luxon";

export const ChartPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const { getSpendingsByMonth } = useSpendingDetailStore();
  const { getYear, getMonth } = useDateStore();
  const year = getYear();
  const month = getMonth();
  const spendings = getSpendingsByMonth(year, month);
  const recentsOffset = DateTime.fromObject({ year, month, day: 1 }).minus({
    month: 6,
  });
  const recentsYearMonths = Array.from({ length: 12 }).map((_x, i) => {
    const offset = recentsOffset.plus({ month: i });
    return {
      year: offset.year,
      month: offset.month,
    };
  });
  const recentData = recentsYearMonths.map(({ year, month }) => {
    return getSpendingsByMonth(year, month);
  });
  const spendingsByDayByCategory = useMemo(
    () =>
      groupSpendingsByDay(
        spendings.filter((s) => s.category === selectedCategory),
      ),
    [spendings, selectedCategory],
  );
  const recentSpendingsCategorySum = useMemo(
    () =>
      recentData.map((rD) =>
        rD
          .filter((r) => r.category === selectedCategory)
          .map((r) => r.amount)
          .reduce((a, b) => a + b, 0),
      ),
    [spendings, selectedCategory],
  );
  const recentSpendingsLines = useMemo(() =>
    Array.from({ length: 6 }).map((_x, i) => {
      const sY =
        (1 -
          recentSpendingsCategorySum[i] /
          (Math.max(...recentSpendingsCategorySum) * 1.1)) *
        297;
      const sX = (i * 750) / 11;
      const eY =
        (1 -
          recentSpendingsCategorySum[i + 1] /
          (Math.max(...recentSpendingsCategorySum) * 1.1)) *
        297;
      const eX = ((i + 1) * 750) / 11;
      const length = Math.hypot(sX - eX, sY - eY);
      const dX = eX - sX;
      const dY = eY - sY;
      const rad = Math.atan2(dY, dX);
      return { top: sY, left: sX, length, rad };
    }),
  );

  return (
    <div className="relative flex flex-col w-layout min-h-[700px] items-center gap-[40px]">
      <div className="absolute top-0 flex flex-row w-layout h-[40px] bg-colorchip-80"></div>
      <PieChart
        currentCategory={selectedCategory}
        setCategory={setSelectedCategory}
      />
      {selectedCategory ? (
        <div className="flex flex-col w-[848px] h-[450px] border-[1px] border-neutral-border-default py-[32px] px-[40px] gap-[9px] bg-neutral-surface-default">
          <h3 className="h-[32px] font-light font-sans text-sans-light-lg">
            {getLabel(selectedCategory)} 카테고리 소비 추이
          </h3>
          <div className="relative grid w-[750px] h-[297px]">
            <div
              className="absolute inset-0 h-full w-full 
    bg-[linear-gradient(to_right,#F1F4F8_1px,transparent_1px),linear-gradient(to_bottom,#F1F4F8_1px,transparent_1px)] 
    bg-[size:4.545%_9.09%]"
            ></div>
            {recentSpendingsLines.map(({ rad, length, top, left }) => (
              <hr
                style={{
                  transformOrigin: "top left",
                  width: `${length}px`,
                  top: `${top}px`,
                  left: `${left}px`,
                  transform: `rotate(${rad}rad)`,
                }}
                className="absolute"
              />
            ))}
            {recentSpendingsCategorySum.map((d, i) => (
              <div
                key={i}
                style={{
                  top: `${(1 - d / (Math.max(...recentSpendingsCategorySum) * 1.1)) * 297 - 4}px`,
                  left: `${(i * 750) / 11 - 4}px`,
                }}
                className="absolute grid bg-black w-[8px] h-[8px] rounded-full"
              ></div>
            ))}
            {recentSpendingsCategorySum.map((d, i) => (
              <h5
                key={i}
                style={{
                  top: `${(1 - d / (Math.max(...recentSpendingsCategorySum) * 1.1)) * 297 - 30}px`,
                  left: `${(i * 750) / 11}px`,
                }}
                className="absolute text-sans-light-sm font-light font-sans"
              >
                {formatMoney(false, d)}
              </h5>
            ))}
          </div>
          <div className="flex flex-row w-[774px] -mx-[12px] justify-between">
            {recentsYearMonths.map(({ year, month }) => (
              <h5 className="grid text-center h-[16px] w-[24px] text-sans-semibold-md font-sans font-semibold">
                {month}
              </h5>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {selectedCategory ? (
        spendingsByDayByCategory.map((s, i) => (
          <DaySpendingsSection
            key={i}
            day={s.day}
            year={s.year}
            month={s.month}
            spendings={s.spendings}
            showIncomes={false}
            showExpenditures={true}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
