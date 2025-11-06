import type React from "react";

interface TrendGraphPointsProps {
  recentSpendingsCategorySum: number[];
}
export const TrendGraphPoints: React.FC<TrendGraphPointsProps> = ({
  recentSpendingsCategorySum,
}) => {
  return recentSpendingsCategorySum.map((d, i) => (
    <div
      key={i}
      style={{
        top: `${(1 - d / (Math.max(...recentSpendingsCategorySum) * 1.1)) * 297 - 4}px`,
        left: `${(i * 750) / 11 - 4}px`,
      }}
      className="absolute grid bg-black w-[8px] h-[8px] rounded-full"
    ></div>
  ));
};
