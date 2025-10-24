import "../styles/App.css";

import { useState, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";

import { HeaderToolIconType } from "../types/types";

import Header from "../ui/Header/Header";

// records
import InputBar from "../ui/InputBar/InputBar";
import MonthlyInfo from "../ui/MonthlyInfo/MonthlyInfo";
import { MOCK_MONTHLY_GROUP } from "../ui/RecordList/mock_data";
import RecordList from "../ui/RecordList/RecordList";

import { fetchRecords } from "../utils/api/recordDataApi";
import { toMonthlyGroup, toCalendarEntries } from "../utils/utils";

// calendar
import Calendar from "../ui/Calendar/Calendar";
import type { MoneyEntry } from "../types/types";

import { toISODate } from "../utils/utils";

function MainPage() {
	const [year, setYear] = useState<number>(2025);
	const [month, setMonth] = useState<number>(10);

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

	const monthly = useMemo(
		() => toMonthlyGroup(records, year, month),
		[records, year, month]
	);
	const calendarEntries: MoneyEntry[] = useMemo(
		() => toCalendarEntries(records, year, month),
		[records, year, month]
	);

	const dataContent: MoneyEntry[] = [
		{ date: "2025-10-02", amount: -5400 },
		{ date: "2025-10-03", amount: -132000 },
		{ date: "2025-10-06", amount: -10000 },
		{ date: "2025-10-08", amount: -529140 },
		{ date: "2025-10-10", amount: 2010580 },
		{ date: "2025-10-10", amount: -9500 },
		{ date: "2025-10-14", amount: -56240 },
		{ date: "2025-10-17", amount: -34460 },
	]; // For calendar- FIXME: Hard-coded for now & use "useState" later

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
						<InputBar
							date={toISODate(2025, 10, 24)}
							amount={0}
							onSubmit={(v) => console.log("입력된 데이터:", v)}
						/>
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
						entries={dataContent}
						selectedDate="2025-10-17"
					/>
				</div>
			)}
			{currentTab === "analytics" && <div>Analytics tab pressed</div>}
		</div>
	);
}

export default MainPage;
