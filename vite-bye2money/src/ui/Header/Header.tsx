import { useState, useEffect, useCallback } from "react";
import styles from "./Header.module.css";

import {
	DescriptionOutlined,
	CalendarMonthOutlined,
	BarChartOutlined,
} from "@mui/icons-material";

import { HeaderToolIconType } from "../../types/types";

import { MONTHS } from "./const";
import { stepMonth } from "./monthNav";

export interface HeaderProps {
	brand?: string;
	currentTab: HeaderToolIconType;
	setCurrentTab: (newTab: HeaderToolIconType) => void;
	year: number;
	month: number; // 1~12
	onChangeMonth: (year: number, month: number) => void;
}

const Header = ({
	brand,
	currentTab,
	setCurrentTab,
	year,
	month,
	onChangeMonth,
}: HeaderProps) => {
	const [currentYear, setCurrentYear] = useState<number>(year);
	const [currentMonth, setCurrentMonth] = useState<number>(month);
	const [currentLabel, setCurrentLabel] = useState<string>(
		MONTHS[month - 1].label
	);

	useEffect(() => {
		setCurrentYear(year);
		setCurrentMonth(month);
		setCurrentLabel(MONTHS[month - 1].label);
	}, [year, month]);

	const handlePrev = useCallback(() => {
		// Go to previous month
		const {
			year: newYear,
			month: newMonth,
			label: newLabel,
		} = stepMonth(currentYear, currentMonth, -1);
		setCurrentYear(newYear);
		setCurrentMonth(newMonth);
		setCurrentLabel(newLabel);
		onChangeMonth(newYear, newMonth);
	}, [currentYear, currentMonth, onChangeMonth]);

	const handleNext = useCallback(() => {
		// Go to next month
		const {
			year: newYear,
			month: newMonth,
			label: newLabel,
		} = stepMonth(currentYear, currentMonth, 1);
		setCurrentYear(newYear);
		setCurrentMonth(newMonth);
		setCurrentLabel(newLabel);
		onChangeMonth(newYear, newMonth);
	}, [currentYear, currentMonth, onChangeMonth]);

	return (
		<header className={styles.appbar}>
			<div className={styles.appbarInner}>
				<div className={styles.brand}>{brand}</div>

				<div className={styles.monthNav}>
					<div
						className={styles.monthNavArrow}
						role="button"
						aria-label="previous month"
						tabIndex={0}
						onClick={handlePrev}
					>
						{"<"}
					</div>

					<div className={styles.monthDisplay}>
						<div className={styles.year}>{currentYear}</div>
						<div className={styles.monthNum}>{currentMonth}</div>
						<div className={styles.monthLabel}>{currentLabel}</div>
					</div>

					<div
						className={styles.monthNavArrow}
						role="button"
						aria-label="next month"
						tabIndex={0}
						onClick={handleNext}
					>
						{">"}
					</div>
				</div>

				<div className={styles.tools}>
					<button
						className={styles.tool}
						aria-label="records"
						aria-pressed={currentTab === "records"}
						data-active={currentTab === "records"}
						onClick={() => setCurrentTab(HeaderToolIconType.Records)}
					>
						<DescriptionOutlined className={styles.icon} />
					</button>
					<button
						className={styles.tool}
						aria-label="calendar"
						aria-pressed={currentTab === "calendar"}
						data-active={currentTab === "calendar"}
						onClick={() => setCurrentTab(HeaderToolIconType.Calendar)}
					>
						<CalendarMonthOutlined className={styles.icon} />
					</button>
					<button
						className={styles.tool}
						aria-label="analytics"
						aria-pressed={currentTab === "analytics"}
						data-active={currentTab === "analytics"}
						onClick={() => setCurrentTab(HeaderToolIconType.Analytics)}
					>
						<BarChartOutlined className={styles.icon} />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
