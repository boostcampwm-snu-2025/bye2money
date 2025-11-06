import { useMemo } from "react";
import { useSpendingDetailStore } from "../../store/useSpendingDetailStore";
import { useDateStore } from "../../store/useDateStore";
import { DateTime } from "luxon";
import type { Category } from "../../types/types";
import { getLabel } from "../../utils/typeHelpers";
import { TrendGraphMonths } from "./TrendGraphMonths";
import { TrendGraphAmount } from "./TrendGraphAmounts";
import { TrendGraphPoints } from "./TrendGraphPoints";
import { TrendGraphLines } from "./TrendGraphLines";

interface CategorySpendingTrendProps {
  selectedCategory: Category;
}
export const CategorySpendingTrend: React.FC<CategorySpendingTrendProps> = ({
  selectedCategory,
}) => {
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
  return (
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
        <TrendGraphLines
          recentSpendingsCategorySum={recentSpendingsCategorySum}
        />
        <TrendGraphPoints
          recentSpendingsCategorySum={recentSpendingsCategorySum}
        />
        <TrendGraphAmount
          recentSpendingsCategorySum={recentSpendingsCategorySum}
        />
      </div>
      <div className="flex flex-row w-[774px] -mx-[12px] justify-between">
        <TrendGraphMonths recentsYearMonths={recentsYearMonths} />
      </div>
    </div>
  );
};
