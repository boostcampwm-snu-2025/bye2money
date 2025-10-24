import styles from "./RecordItem.module.css";
import CategoryTag from "../../components/CategoryTag/CategoryTag";
import { CATEGORY_TAG_LABELS } from "../../components/CategoryTag/const";
import type { RecordItemData } from "../../types/types";

export interface RecordItemProps {
	item: RecordItemData;
}

const RecordItem = ({ item }: RecordItemProps) => {
	const isExpense = item.amount < 0;
	const formattedAmount = `${
		isExpense ? "" : "+"
	}${item.amount.toLocaleString()}원`;

	return (
		<div className={styles.row}>
			<div className={styles.left}>
				<CategoryTag tone={item.category}>
					{CATEGORY_TAG_LABELS[item.category]}
				</CategoryTag>
			</div>

			<div className={styles.center}>
				<div className={styles.title}>{item.title}</div>
				{item.memo && <div className={styles.memo}>{item.memo}</div>}
			</div>

			<div className={styles.right}>
				<div className={styles.payment}>{item.payment}</div>
				<div
					className={`${styles.amount} ${
						isExpense ? styles.expense : styles.income
					}`}
				>
					{formattedAmount}
				</div>
			</div>
		</div>
	);
};

export default RecordItem;
