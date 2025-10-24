import type {
	RecordItemData,
	DailyRecordGroup,
	MonthlyRecordGroup,
} from "../types/types";
import type { MoneyEntry } from "../types/types";

export const toISODate = (y: number, m: number, d: number) =>
	`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export const formatKRW = (n: number) => n.toLocaleString("ko-KR");

// MainPage의 전체내역 계산 용
export function computeMonthlySummary(monthly: MonthlyRecordGroup) {
	let income = 0;
	let expense = 0;
	let count = 0;

	for (const g of monthly.groups) {
		count += g.entries.length;
		for (const e of g.entries) {
			if (e.amount >= 0) income += e.amount;
			else expense += -e.amount; // 절대값 누적
		}
	}
	return { count, income, expense };
}

// Hanlding data fetched via API
const byYearMonth = (iso: string, y: number, m: number) =>
	iso.slice(0, 7) === `${y}-${String(m).padStart(2, "0")}`;

export function toMonthlyGroup(
	records: RecordItemData[],
	year: number,
	month: number
): MonthlyRecordGroup {
	const inMonth = records.filter((r) => byYearMonth(r.date, year, month));

	const byDate = new Map<string, RecordItemData[]>();
	for (const r of inMonth) {
		const arr = byDate.get(r.date) ?? [];
		arr.push(r);
		byDate.set(r.date, arr);
	}

	const groups: DailyRecordGroup[] = [...byDate.entries()]
		.sort(([a], [b]) => (a < b ? 1 : -1)) // 최신 날짜가 위로
		.map(([date, entries]) => {
			const income = entries
				.filter((e) => e.amount > 0)
				.reduce((s, e) => s + e.amount, 0);
			const expense = entries
				.filter((e) => e.amount < 0)
				.reduce((s, e) => s + Math.abs(e.amount), 0);
			return { date, entries, totals: { income, expense } };
		});

	const summaryIncome = groups.reduce((s, g) => s + g.totals.income, 0);
	const summaryExpense = groups.reduce((s, g) => s + g.totals.expense, 0);

	return {
		year,
		month,
		groups,
		summary: {
			count: inMonth.length,
			income: summaryIncome,
			expense: summaryExpense,
		},
	};
}

export function toCalendarEntries(
	records: RecordItemData[],
	year: number,
	month: number
): MoneyEntry[] {
	const sums = new Map<string, number>();
	for (const r of records) {
		if (!byYearMonth(r.date, year, month)) continue;
		sums.set(r.date, (sums.get(r.date) ?? 0) + r.amount);
	}
	return [...sums.entries()]
		.sort(([a], [b]) => (a < b ? -1 : 1))
		.map(([date, amount]) => ({ date, amount }));
}
