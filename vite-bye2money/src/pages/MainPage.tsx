import "../styles/App.css";

import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";

import { HeaderToolIconType } from "../types/types";

import Header from "../ui/Header/Header";

// records
import InputBar from "../ui/InputBar/InputBar";
import MonthlyInfo from "../ui/MonthlyInfo/MonthlyInfo";
import RecordList from "../ui/RecordList/RecordList";

import { fetchRecords } from "../utils/api/recordDataApi";
import { toMonthlyGroup } from "../utils/utils";

// calendar
import Calendar from "../ui/Calendar/Calendar";
import type { MoneyEntry } from "../types/types";
import { toCalendarEntries } from "../utils/utils";
import CalendarCaption from "../ui/CalendarCaption/CalendarCaption";

import { toISODate } from "../utils/utils";

function MainPage() {
	const now = new Date();
	const [year, setYear] = useState<number>(now.getFullYear());
	const [month, setMonth] = useState<number>(now.getMonth() + 1);

	const [currentTab, setCurrentTab] = useState<HeaderToolIconType>(
		HeaderToolIconType.Records
	);

	const [records, setRecords] = useState<any[]>([]); // FIXME: specify type

	const load = async () => {
		try {
			const data = await fetchRecords();
			setRecords(data);
		} catch {}
	};

	useEffect(() => {
		load();
	}, []);

	const todayDateISO = useMemo(() => {
		return toISODate(now.getFullYear(), now.getMonth() + 1, now.getDate());
	}, []);

	const monthly = useMemo(
		() => toMonthlyGroup(records, year, month),
		[records, year, month]
	);
	const calendarEntries: MoneyEntry[] = useMemo(
		() => toCalendarEntries(records, year, month),
		[records, year, month]
	);

	const mainPageStyles = {
		container: {
			position: "absolute" as const,
			top: 0,
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		} satisfies CSSProperties,
		inputBarWrapper: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			width: "100%",
			alignItems: "center",
			marginTop: "8px",
		} satisfies CSSProperties,
		recordListWrapper: {
			marginTop: "40px",
			width: "846px",
		} satisfies CSSProperties,
		calendarWrapper: {
			position: "absolute" as const,
			top: "176px",
			width: "100%",
		} satisfies CSSProperties,
	};

	return (
		<div style={mainPageStyles.container}>
			<Header
				brand={"Wise Wallet"}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
				year={year}
				month={month}
				onChangeMonth={(newYear, newMonth) => {
					setYear(newYear);
					setMonth(newMonth);
				}}
			/>
			{currentTab === "records" && (
				<>
					<div style={mainPageStyles.inputBarWrapper}>
						<InputBar date={todayDateISO} amount={0} />
					</div>
					<div style={mainPageStyles.recordListWrapper}>
						<MonthlyInfo monthly={monthly} />
						{monthly.groups.map((g) => (
							<RecordList key={g.date} group={g} />
						))}
					</div>
				</>
			)}
			{currentTab === "calendar" && (
				<div style={mainPageStyles.calendarWrapper}>
					<Calendar
						year={year}
						month={month}
						entries={calendarEntries}
						selectedDate={todayDateISO}
					/>
					<CalendarCaption monthly={monthly} />
				</div>
			)}
			{currentTab === "analytics" && <div>Analytics tab pressed</div>}
		</div>
	);
}

export default MainPage;
