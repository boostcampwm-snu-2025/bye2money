import {
  useSpendingDetailStore,
  type SpendingDetail,
} from "../../store/useSpendingDetailStore";
import {
  formatMoney,
  getExpendituresSum,
  getIncomesSum,
} from "../../utils/utilFns";

export interface DayBlockProps {
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
  spendings: SpendingDetail[] | undefined;
  isToday: boolean | undefined;
}
export const DayBlock: React.FC<DayBlockProps> = ({
  year,
  month,
  day,
  spendings,
  isToday,
}) => {
  const isBlank = typeof day !== "number";

  const expendituresSum = getExpendituresSum(spendings);
  const incomesSum = getIncomesSum(spendings);
  const total =
    expendituresSum || incomesSum
      ? (expendituresSum ?? 0) * -1 + (incomesSum ?? 0)
      : undefined;

  const blockStyle =
    (isToday ?? false)
      ? "flex flex-col-reverse justify-between bg-neutral-surface-point w-[120.86px] h-[120px] py-[8px] pl-[8.86px] pr-[8px] border-[0.5px] border-neutral-border-default"
      : "flex flex-col-reverse justify-between bg-neutral-surface-default w-[120.86px] h-[120px] py-[8px] pl-[8.86px] pr-[8px] border-[0.5px] border-neutral-border-default";

  return (
    <div className={blockStyle}>
      {!isBlank && (
        <div className="flex flex-row-reverse w-[104px] h-[16px] font-serif text-serif-sm">
          {day}
        </div>
      )}
      {!isBlank && spendings && spendings.length ? (
        <div className="flex flex-col">
          {incomesSum ? (
            <h3 className="h-[24px] w-[104px] font-light font-sans text-sans-light-md text-brand-text-income">
              {formatMoney(false, incomesSum)}
            </h3>
          ) : (
            <></>
          )}
          {expendituresSum ? (
            <h3 className="h-[24px] w-[104px] font-light font-sans text-sans-light-md text-brand-text-expense">
              {formatMoney(true, expendituresSum)}
            </h3>
          ) : (
            <></>
          )}
          {total && (
            <h3 className="h-[24px] w-[104px] font-light font-sans text-sans-light-md text-neutral-text-default">
              {formatMoney(false, total)}
            </h3>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
