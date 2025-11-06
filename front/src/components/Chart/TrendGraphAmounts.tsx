import type React from "react";
import { formatMoney } from "../../utils/utilFns";
interface TrendGraphAmountProps {
  recentSpendingsCategorySum: number[];
}

export const TrendGraphAmount: React.FC<TrendGraphAmountProps> = ({
  recentSpendingsCategorySum,
}) => {
  return recentSpendingsCategorySum.map((d, i) => (
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
  ));
};
