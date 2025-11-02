import type { Item } from "../../api";

export function dailyTotals(data: Item[], daysInMonth: number) {
  const dailyData = Array(daysInMonth).map(() => ({
      totalAmount: 0,
      totalExpense: 0,
      totalIncome: 0,
    }));
    data.forEach((item) => {
      const day = item.date.date() - 1;
      dailyData[day].totalAmount += item.amount;
      if (item.amount < 0) {
        dailyData[day].totalExpense += item.amount;
      } else {
        dailyData[day].totalIncome += item.amount;
      }
    });
    return dailyData;
}

export function fold<T>(array: T[], count: number) {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += count) {
    result.push(array.slice(i, i + count));
  }
  return result;
}

export function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}
