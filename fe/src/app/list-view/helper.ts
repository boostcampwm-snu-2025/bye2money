import type { Dayjs } from "dayjs";

import type { Item } from "~/api/transactions";

export function filter(item: Item, expense: boolean, income: boolean) {
  if (item.amount > 0 && !income) {
    return false;
  }
  if (item.amount < 0 && !expense) {
    return false;
  }
  return true;
}

export function groupByDate(data: Item[]) {
  return Object.values(
    data.reduce((acc, item) => {
      const dateKey = item.date.format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = {
          dailyExpense: 0,
          dailyIncome: 0,
          data: [],
          date: item.date,
        };
      }
      acc[dateKey].data.push(item);
      if (item.amount > 0) {
        acc[dateKey].dailyIncome += item.amount;
      } else {
        acc[dateKey].dailyExpense -= item.amount;
      }
      return acc;
    }, {} as Record<string, { dailyExpense: number; dailyIncome: number; data: Item[]; date: Dayjs }>)
  );
}
