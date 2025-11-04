import { http, HttpResponse } from "msw";
import type { MonthlyTransactionData } from "../../entities/transaction/model/transactionTypes";
import transactionsData from "../data/transactions.json";

const typedTransactionsData = transactionsData as Record<
  string,
  MonthlyTransactionData
>;

const createEmptyResponse = (
  year: number,
  month: number,
): MonthlyTransactionData => ({
  year,
  month,
  totalCount: 0,
  totalIncome: 0,
  totalExpense: 0,
  dailyGroups: [],
});

const isValidMonthKey = (key: string): boolean => {
  return key in typedTransactionsData;
};

export const transactionHandlers = [
  http.get("/api/transactions", ({ request }) => {
    const url = new URL(request.url);
    const yearParam = url.searchParams.get("year");
    const monthParam = url.searchParams.get("month");

    if (!yearParam || !monthParam) {
      return HttpResponse.json(createEmptyResponse(0, 0));
    }

    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10);
    const key = `${year}-${month}`;

    if (isValidMonthKey(key)) {
      return HttpResponse.json(typedTransactionsData[key]);
    }

    return HttpResponse.json(createEmptyResponse(year, month));
  }),
];
