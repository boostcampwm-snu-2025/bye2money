import { useQueryStates, parseAsInteger } from "nuqs";

export const useDateState = () => {
  const [{ year, month }, setDate] = useQueryStates(
    {
      year: parseAsInteger.withDefault(new Date().getFullYear()),
      month: parseAsInteger.withDefault(new Date().getMonth() + 1),
    },
    {
      history: "push",
    },
  );

  const goToPreviousMonth = () => {
    if (month === 1) {
      setDate({ month: 12, year: year - 1 });
    } else {
      setDate({ month: month - 1 });
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      setDate({ month: 1, year: year + 1 });
    } else {
      setDate({ month: month + 1 });
    }
  };

  return {
    year,
    month,
    goToPreviousMonth,
    goToNextMonth,
  };
};
