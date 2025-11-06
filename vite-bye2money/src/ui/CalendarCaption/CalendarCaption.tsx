import styles from "./CalendarCaption.module.css";
import type { MonthlyRecordGroup } from "../../types/types";

import { computeMonthlySummary, formatKRW } from "../../utils/utils";

interface CalendarCaptionProps {
	monthly: MonthlyRecordGroup;
}

const CalendarCaption = ({ monthly }: CalendarCaptionProps) => {
	const { count, income, expense } = computeMonthlySummary(monthly);
	const total = income - expense;
	return (
		<>
			<div className={styles.wrapper}>
				<div>
					총 수입 {formatKRW(income)}원, 총 지출 {formatKRW(expense)}원
				</div>
				<div>총합 {formatKRW(total)}원</div>
			</div>
		</>
	);
};

export default CalendarCaption;
