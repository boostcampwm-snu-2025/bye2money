import type { CategorySpending } from "../components/Chart/PieChart.tsx";
import {
  type DaySpendings,
  type SpendingDetail,
} from "../store/useSpendingDetailStore.ts";

export const groupSpendingsByDay = (
  spendings: SpendingDetail[],
): DaySpendings[] => {
  if (!spendings.length) return [];
  const { year, month } = spendings[0];
  const days = [...new Set(spendings.map((s) => s.day))];
  days.sort((a, b) => b - a);
  const daysIdx = new Map();
  const res: DaySpendings[] = [];
  days.forEach((day, i) => {
    daysIdx.set(day, i);
    const daySpendings: DaySpendings = {
      year,
      month,
      day,
      spendings: [],
    };
    res.push(daySpendings);
  });
  spendings.forEach((s) => {
    res[daysIdx.get(s.day)].spendings.push(s);
  });
  return res;
};

export const analyzeExpendituressByCategory = (
  spendings: SpendingDetail[],
): CategorySpending[] => {
  const expenditures = spendings.filter((s) => s.isExpenditure);
  const res = [];
  if (!expenditures) return res;
  const memo = {};
  expenditures.forEach((e) => {
    memo[e.category] = (memo[e.category] ?? 0) + e.amount;
  });
  Object.keys(memo).forEach((c) => {
    res.push({ category: c, total: memo[c] });
  });
  res.sort((a, b) => b.total - a.total);
  return res;
};

export const formatMoney = (isExpenditure: boolean, num: number) => {
  const prefix = isExpenditure ? "-" : "";
  const formatted = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  })
    .format(num)
    .replaceAll("₩", "");
  return prefix + formatted;
};

export const getExpendituresSum = (
  spendings: SpendingDetail[] | undefined,
): number | undefined =>
  spendings
    ?.filter((x) => x.isExpenditure)
    .map((x) => x.amount)
    .reduce((a, b) => a + b, 0);

export const getIncomesSum = (
  spendings: SpendingDetail[] | undefined,
): number | undefined =>
  spendings
    ?.filter((x) => !x.isExpenditure)
    .map((x) => x.amount)
    .reduce((a, b) => a + b, 0);
