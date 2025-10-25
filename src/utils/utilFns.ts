import type { CategorySpending } from "../components/Chart/PieChart.tsx";
import type { DaySpendings, SpendingDetail } from "../types/types.ts";

/**
 * 지출 내역을 일(day)별로 그룹화합니다.
 * @param spendings - 일별로 그룹화할 전체 지출 항목 배열
 * @returns 년/월/일별로 묶인 지출 내역 목록 (최근 일이 앞으로 정렬)
 */
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

/**
 * 지출 내역을 카테고리별로 분석하여 총액을 집계합니다.
 * @param spendings - 분석할 전체 지출 항목 배열
 * @returns 카테고리별 지출 총액 배열 (지출액이 높은 순으로 정렬)
 */
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

/**
 * 금액을 한국 통화 형식으로 포맷팅합니다.
 * @param isExpenditure - 지출 여부 (true일 경우 '-' 접두사 추가)
 * @param num - 포맷팅할 금액
 * @returns 포맷팅된 금액 문자열 (예: "-1,000", "50,000")
 */
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

/**
 * 전체 지출 항목에서 지출만 필터하여 합을 계산합니다.
 * @param spendings - 계산할 지출 항목 배열 (undefined 가능)
 * @returns 지출 총액 (입력이 undefined인 경우 undefined 반환)
 */
export const getExpendituresSum = (
  spendings: SpendingDetail[] | undefined,
): number | undefined =>
  spendings
    ?.filter((x) => x.isExpenditure)
    .map((x) => x.amount)
    .reduce((a, b) => a + b, 0);

/**
 * 전체 지출 항목에서 수입만 필터하여 합을 계산합니다.
 * @param spendings - 계산할 지출 항목 배열 (undefined 가능)
 * @returns 수입 총액 (입력이 undefined인 경우 undefined 반환)
 */
export const getIncomesSum = (
  spendings: SpendingDetail[] | undefined,
): number | undefined =>
  spendings
    ?.filter((x) => !x.isExpenditure)
    .map((x) => x.amount)
    .reduce((a, b) => a + b, 0);
