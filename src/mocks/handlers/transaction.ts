import { http, HttpResponse } from "msw";
import transactionData from "../data/transaction.json";

export const transactionHandlers = [
  http.get("/api/transactions", ({ request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");

    if (year && month) {
      const requestedYear = parseInt(year);
      const requestedMonth = parseInt(month);

      if (
        transactionData.year === requestedYear &&
        transactionData.month === requestedMonth
      ) {
        return HttpResponse.json(transactionData);
      }

      return HttpResponse.json({
        year: requestedYear,
        month: requestedMonth,
        totalCount: 0,
        totalIncome: 0,
        totalExpense: 0,
        dailyGroups: [],
      });
    }

    return HttpResponse.json(transactionData);
  }),
];
