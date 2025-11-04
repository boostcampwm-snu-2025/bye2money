import { useQueryStates, parseAsBoolean } from "nuqs";

export const useTransactionFilter = () => {
  const [filter, setFilter] = useQueryStates(
    {
      showIncome: parseAsBoolean.withDefault(true),
      showExpense: parseAsBoolean.withDefault(true),
    },
    {
      history: "push",
    },
  );

  const toggleIncome = () => {
    setFilter({ showIncome: !filter.showIncome });
  };

  const toggleExpense = () => {
    setFilter({ showExpense: !filter.showExpense });
  };

  return {
    showIncome: filter.showIncome,
    showExpense: filter.showExpense,
    toggleIncome,
    toggleExpense,
  };
};
