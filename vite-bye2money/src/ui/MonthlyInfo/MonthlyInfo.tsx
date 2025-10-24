import styles from "./MonthlyInfo.module.css";
import type { MonthlyRecordGroup } from "../../types/types";
import { computeMonthlySummary, formatKRW } from "../../utils/utils";

import Button from "../../components/Button/Button";
import { CheckRounded } from "@mui/icons-material";

interface MonthlyInfoProps {
	monthly: MonthlyRecordGroup;
}

const MonthlyInfo = ({ monthly }: MonthlyInfoProps) => {
	const { count, income, expense } = computeMonthlySummary(monthly);

	return (
		<div className={styles.wrapper} role="region" aria-label="전체 내역 요약">
			<div className={styles.left}>전체 내역 {count}건</div>

			<div className={styles.right}>
				<div className={styles.rightBlock}>
					<span className={styles.checkBadgeWrapper}>
						<Button
							buttonType="contained"
							elementPattern="iconOnly"
							size="S"
							icon={<CheckRounded />}
							tone="default"
							aria-label="수입 합계"
						/>
					</span>
					<div className={styles.rightText}>
						수입 <span className={styles.value}>{formatKRW(income)}</span>
					</div>
				</div>
				<div className={styles.rightBlock}>
					<span className={styles.checkBadgeWrapper}>
						<Button
							buttonType="contained"
							elementPattern="iconOnly"
							size="S"
							icon={<CheckRounded />}
							tone="default"
							aria-label="지출 합계"
						/>
					</span>
					<div className={styles.rightText}>
						지출 <span className={styles.value}>{formatKRW(expense)}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MonthlyInfo;
