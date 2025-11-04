import type { MonthlyTransactionData } from "../model/transactionTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMonthlyTransactions = async (
  year: number,
  month: number,
): Promise<MonthlyTransactionData> => {
  const response = await fetch(
    `${API_BASE_URL}/transactions?year=${year}&month=${month}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch monthly transactions");
  }

  return response.json();
};
