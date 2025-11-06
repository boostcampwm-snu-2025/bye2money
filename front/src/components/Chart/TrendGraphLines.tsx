import React, { useMemo } from "react";

interface TrendGraphLinesProps {
  recentSpendingsCategorySum: number[];
}
export const TrendGraphLines: React.FC<TrendGraphLinesProps> = ({
  recentSpendingsCategorySum,
}) => {
  const recentSpendingsLines = useMemo(
    () =>
      Array.from({ length: 6 }).map((_x, i) => {
        const startY =
          (1 -
            recentSpendingsCategorySum[i] /
              (Math.max(...recentSpendingsCategorySum) * 1.1)) *
          297;
        const startX = (i * 750) / 11;
        const endY =
          (1 -
            recentSpendingsCategorySum[i + 1] /
              (Math.max(...recentSpendingsCategorySum) * 1.1)) *
          297;
        const endX = ((i + 1) * 750) / 11;
        const length = Math.hypot(startX - endX, startY - endY);
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const rad = Math.atan2(deltaY, deltaX);
        return { top: startY, left: startX, length, rad };
      }),
    [recentSpendingsCategorySum],
  );
  return recentSpendingsLines.map(({ rad, length, top, left }) => (
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
  ));
};
