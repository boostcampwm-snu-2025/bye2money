import styles from "./RecordList.module.css";
import RecordItem from "./RecordItem";
import type { DailyRecordGroup } from "../../types/types";

export interface RecordListProps {
	group: DailyRecordGroup;
}

const RecordList = ({ group }: RecordListProps) => {
	const formattedDate = new Date(group.date).toLocaleDateString("ko-KR", {
		month: "long",
		day: "numeric",
		weekday: "long",
	});

	const income = group.totals.income || 0;
	const expense = group.totals.expense || 0;

	return (
		<div className={styles.group}>
			{/* Date header */}
			<div className={styles.header}>
				<span className={styles.date}>{formattedDate}</span>
				<div className={styles.totals}>
					{income > 0 && (
						<>
							<span className={styles.totalLabel}>수입</span>
							<span className={`${styles.totalValue} ${styles.income}`}>
								{income.toLocaleString()}원
							</span>
						</>
					)}
					{expense > 0 && (
						<>
							<span className={styles.totalLabel}>지출</span>
							<span className={`${styles.totalValue} ${styles.expense}`}>
								{expense.toLocaleString()}원
							</span>
						</>
					)}
				</div>
			</div>

			{/* Individual records */}
			<div className={styles.items}>
				{group.entries.map((entry) => (
					<RecordItem key={entry.id} item={entry} />
				))}
			</div>
		</div>
	);
};

export default RecordList;
