import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./PieChartBoard.module.css";

import type { MonthlyRecordGroup } from "../../types/types";
import { getMonthlyExpenseBreakdown } from "./calculate";
import { formatKRW, formatPercent } from "../../utils/utils";
import CategoryTag from "../../components/CategoryTag/CategoryTag";
import { CATEGORY_COLORS_ORDERED } from "./const";

type Props = {
	monthly: MonthlyRecordGroup;
};

const PieChartBoard = ({ monthly }: Props) => {
	const { totalExpense, slices } = getMonthlyExpenseBreakdown(monthly);
	const title = "이번 달 지출 금액";

	const data = slices.map((s) => ({
		name: s.label,
		value: s.amount,
		color: s.color,
	}));

	return (
		<div className={styles.wrapper}>
			<div className={styles.chartBox}>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							innerRadius={"50%"}
							outerRadius={"80%"}
							stroke="transparent"
							isAnimationActive={false}
						>
							{data.map((d, i) => (
								<Cell
									key={i}
									fill={
										d.color ??
										CATEGORY_COLORS_ORDERED[i % CATEGORY_COLORS_ORDERED.length]
									}
								/>
							))}
						</Pie>
						<Tooltip
							formatter={(value: any, _name, payload: any) => [
								formatKRW(Number(value)),
								payload?.payload?.name,
							]}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className={styles.legendBox}>
				<div className={styles.header}>
					<span className={styles.title}>{title}</span>
					<span className={styles.total}>{formatKRW(totalExpense)}원</span>
				</div>

				<ul className={styles.legendList}>
					{slices.map((s) => (
						<li key={s.key} className={styles.row}>
							<span className={styles.tagCell}>
								<CategoryTag tone={s.key}>{s.label}</CategoryTag>
							</span>
							<div className={styles.amountBox}>
								<span className={styles.percent}>
									{formatPercent(s.percent)}
								</span>
								<span className={styles.amount}>{formatKRW(s.amount)}원</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PieChartBoard;
