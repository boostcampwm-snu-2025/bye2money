import type { MonthlyRecordGroup, CategoryTagTone } from "../../types/types";
import { CATEGORY_TAG_LABELS } from "../../components/CategoryTag/const";
import { CATEGORY_COLORS } from "./const";

export type ExpenseSlice = {
	key: CategoryTagTone;
	label: string;
	amount: number;
	percent: number;
	color: string;
};

export const getMonthlyExpenseBreakdown = (
	monthly: MonthlyRecordGroup
): {
	totalExpense: number;
	slices: ExpenseSlice[];
} => {
	const sums = new Map<CategoryTagTone, number>();

	for (const g of monthly.groups) {
		for (const r of g.entries) {
			if (r.amount < 0) {
				const key = r.category as CategoryTagTone;
				const acc = sums.get(key) ?? 0;
				sums.set(key, acc + Math.abs(r.amount));
			}
		}
	}

	const totalExpense = [...sums.values()].reduce((s, v) => s + v, 0);

	const slices: ExpenseSlice[] = [...sums.entries()].map(([key, amount]) => ({
		key,
		label: CATEGORY_TAG_LABELS[key],
		amount,
		percent: totalExpense ? (amount / totalExpense) * 100 : 0,
		color: CATEGORY_COLORS[key],
	}));

	slices.sort((a, b) => b.amount - a.amount);
	return { totalExpense, slices };
};
