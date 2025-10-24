import { useMemo } from "react";
import styles from "./Calendar.module.css";
import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	isSameMonth,
	isSameDay,
	format,
	parseISO,
} from "date-fns";

import type { MoneyEntry } from "../../types/types";

import { WEEK_LABELS } from "./const";

export interface CalendarProps {
	year: number;
	month: number; // 1~12
	entries: MoneyEntry[];
	selectedDate: string; // "YYYY-MM-DD"
}

const formatKRW = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

const Calendar = ({
	year,
	month,
	entries = [],
	selectedDate,
}: CalendarProps) => {
	const monthDate = useMemo(() => new Date(year, month - 1, 1), [year, month]);
	const selected = useMemo(() => parseISO(selectedDate), [selectedDate]);

	const { weeks } = useMemo(() => {
		const monthStart = startOfMonth(monthDate);
		const monthEnd = endOfMonth(monthDate);
		const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Starts with Sunday
		const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

		const rows: Date[][] = [];
		let cur = gridStart;
		while (cur <= gridEnd) {
			const w: Date[] = [];
			for (let i = 0; i < 7; i++) {
				w.push(cur);
				cur = addDays(cur, 1);
			}
			rows.push(w);
		}
		return { weeks: rows };
	}, [monthDate]);

	const entryMap = useMemo(() => {
		const m: Record<string, number[]> = {};
		for (const e of entries) {
			(m[e.date] ??= []).push(e.amount);
		}
		return m;
	}, [entries]);

	return (
		<div className={styles.calendar}>
			<div className={styles.weekHeader} role="row">
				{WEEK_LABELS.map((label, i) => (
					<div
						key={label}
						className={styles.weekHeaderCell}
						role="columnheader"
						aria-label={label}
					>
						{label}
					</div>
				))}
			</div>

			<div className={styles.grid} role="grid">
				{weeks.map((week, wi) =>
					week.map((day, di) => {
						const ymd = format(day, "yyyy-MM-dd");
						const amounts = entryMap[ymd] ?? [];
						const outMonth = !isSameMonth(day, monthDate);
						const isSel = selected && isSameDay(day, selected);

						return (
							<div
								key={`${wi}-${di}`}
								className={`${styles.cell} ${outMonth ? styles.outMonth : ""} ${
									isSel ? styles.selected : ""
								}`}
								role="gridcell"
								aria-selected={!!isSel}
								aria-hidden={outMonth || undefined}
								data-outmonth={outMonth}
							>
								{!outMonth && (
									<>
										<div className={styles.amountList}>
											{amounts.slice(0, 4).map((amt, i) => (
												<div
													key={i}
													className={`${styles.amount} ${
														amt < 0
															? styles.expense
															: amt > 0
															? styles.income
															: ""
													}`}
													title={`${amt < 0 ? "-" : ""}${formatKRW(
														Math.abs(amt)
													)}`}
												>
													{amt < 0 ? "-" : ""}
													{formatKRW(Math.abs(amt))}
												</div>
											))}
										</div>

										<div className={styles.dayNumber}>{format(day, "d")}</div>
									</>
								)}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Calendar;
