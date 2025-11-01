import { Icon } from "../../../shared/ui/Icon/Icon";
import { getMonthName } from "../lib/monthNames";
import { useDateState } from "../model/useDateState";

export const DateSelector = () => {
  const { year, month, goToPreviousMonth, goToNextMonth } = useDateState();

  return (
    <div className="flex gap-6">
      <button type="button" aria-label="이전 달" onClick={goToPreviousMonth}>
        <Icon name="chevron-left" size={32} />
      </button>
      <time
        dateTime={`${year}-${month}`}
        className="flex w-[120px] flex-col items-center gap-1"
      >
        <span className="text-light-14">{year}</span>
        <span className="font-serif text-serif-48">{month}</span>
        <span className="text-light-14">{getMonthName(month)}</span>
      </time>
      <button type="button" aria-label="다음 달" onClick={goToNextMonth}>
        <Icon name="chevron-right" size={32} />
      </button>
    </div>
  );
};
