import { useQuery } from "@tanstack/react-query";
import { getMonthlyTransactions } from "../../../entities/transaction";

export const useMonthlyTransactions = (year: number, month: number) => {
  return useQuery({
    queryKey: ["transactions", year, month],
    queryFn: () => getMonthlyTransactions(year, month),
  });
};
