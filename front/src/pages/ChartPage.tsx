import { useMemo, useState } from "react";
import { PieChart } from "../components/Chart/PieChart";
import { DaySpendingsSection } from "../components/DaySpendingsSection";
import { useSpendingDetailStore } from "../store/useSpendingDetailStore";
import { useDateStore } from "../store/useDateStore";
import { groupSpendingsByDay } from "../utils/utilFns";
import type { Category } from "../types/types";
import { CategorySpendingTrend } from "../components/Chart/CategorySpendingTrend";

export const ChartPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { getSpendingsByMonth } = useSpendingDetailStore();
  const { getYear, getMonth } = useDateStore();
  const year = getYear();
  const month = getMonth();
  const spendings = getSpendingsByMonth(year, month);
  const spendingsByDayByCategory = useMemo(
    () =>
      groupSpendingsByDay(
        spendings.filter((s) => s.category === selectedCategory),
      ),
    [spendings, selectedCategory],
  );

  return (
    <div className="relative flex flex-col w-layout min-h-[700px] items-center gap-[40px]">
      <div className="absolute top-0 flex flex-row w-layout h-[40px] bg-colorchip-80"></div>
      <PieChart
        currentCategory={selectedCategory}
        setCategory={setSelectedCategory}
      />
      {selectedCategory && (
        <>
          <CategorySpendingTrend selectedCategory={selectedCategory} />
          {spendingsByDayByCategory.map((s) => (
            <DaySpendingsSection
              key={`${s.year}-${s.month}-${s.day}`}
              day={s.day}
              year={s.year}
              month={s.month}
              spendings={s.spendings}
              showIncomes={false}
              showExpenditures={true}
            />
          ))}
        </>
      )}
    </div>
  );
};
