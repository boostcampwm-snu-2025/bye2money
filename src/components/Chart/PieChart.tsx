import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDateStore } from "../../store/useDateStore";
import { useSpendingDetailStore } from "../../store/useSpendingDetailStore";
import { CategoryTag } from "../CategoryTag";
import {
  analyzeExpendituressByCategory,
  formatMoney,
} from "../../utils/utilFns";
import type { Category, CategorySpending } from "../../types/types";
import { getBfColorRaw } from "../../utils/typeHelpers";

interface PieChartProps {
  currentCategory: Category | undefined;
  setCategory: (category: Category) => void;
}
export const PieChart: React.FC<PieChartProps> = ({
  currentCategory,
  setCategory,
}) => {
  const cnvsRef = useRef<HTMLCanvasElement>(undefined);

  const { getSpendingsByMonth } = useSpendingDetailStore();
  const { getYear, getMonth } = useDateStore();
  const year = getYear();
  const month = getMonth();
  const spendings = getSpendingsByMonth(year, month);

  const categoryInfo: CategorySpending[] = useMemo(
    () => analyzeExpendituressByCategory(spendings),
    [spendings],
  );
  const aggTotal = categoryInfo.map((x) => x.total).reduce((a, b) => a + b, 0);

  const renderPieChart = (info: CategorySpending[]) => {
    const cnvs = cnvsRef.current;
    const ctx = cnvs!.getContext("2d")!;

    ctx.clearRect(0, 0, 508, 508);
    const cR = Math.PI * 2;
    const sR = Math.PI / -2;
    ctx.moveTo(127, 127);
    let radianAccum = sR;
    info.forEach(({ category, total }) => {
      ctx.fillStyle = getBfColorRaw(category);
      console.log(ctx.fillStyle);
      ctx.beginPath();
      ctx.moveTo(254, 254);
      const rad = (cR * total) / aggTotal;
      ctx.arc(254, 254, 254, radianAccum, radianAccum + rad);
      ctx.closePath();
      ctx.fill();
      radianAccum += rad;
    });
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(254, 254);
    ctx.arc(254, 254, 170, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    renderPieChart(categoryInfo);
  }, [categoryInfo]);

  return (
    <div className="flex flex-row w-[846px] h-[517px] py-[22px] px-[32px] gap-[32px] bg-brand-surface-default z-20 border-[1px] border-neutral-border-default">
      <div className="grid place-items-center w-[422px] h-[473px]">
        <canvas
          ref={cnvsRef}
          width="508"
          height="508"
          className="w-[254px] h-[254px]"
        />
      </div>
      <div className="flex flex-col w-[328px] h-[473px] p-[24px] gap-[16.5px]">
        <div className="flex flex-row justify-between h-[16px] w-[280px] font-serif text-serif-sm">
          <h4>이번 달 지출 금액</h4>
          <h4>{formatMoney(false, aggTotal)}원</h4>
        </div>
        <div className="flex flex-col max-h-[393px] w-[280px] border-neutral-text-default border-b-[0.5px] border-t-[0.5px]">
          {categoryInfo.map((c) => (
            <div
              key={c.category}
              onClick={() => setCategory(c.category)}
              className={
                c.category === currentCategory
                  ? "focused-category-row"
                  : "category-row"
              }
            >
              <CategoryTag category={c.category} />
              <div className="flex flex-row w-[188px] h-[56px] items-center justify-between p-[16px] text-sans-light-md font-light font-sans">
                <h6>{Math.round((c.total / aggTotal) * 100)}%</h6>
                <h6>{formatMoney(false, c.total)}원</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
