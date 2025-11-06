interface YearMonth {
  year: number;
  month: number;
}
interface TrendGraphMonthsProps {
  recentsYearMonths: YearMonth[];
}
export const TrendGraphMonths: React.FC<TrendGraphMonthsProps> = ({
  recentsYearMonths,
}) => {
  return recentsYearMonths.map(({ month }) => (
    <h5 className="grid text-center h-[16px] w-[24px] text-sans-semibold-md font-sans font-semibold">
      {month}
    </h5>
  ));
};
