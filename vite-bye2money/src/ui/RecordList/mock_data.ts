import type {
	RecordItemData,
	DailyRecordGroup,
	MonthlyRecordGroup,
} from "../../types/types";

export const MOCK_RECORD_ITEMS: RecordItemData[] = [
	{
		id: "r1",
		date: "2025-08-17",
		category: "life",
		title: "칫솔 6개 세트, 치약 3개 세트",
		payment: "비씨카드",
		amount: -36460,
	},
	{
		id: "r2",
		date: "2025-08-14",
		category: "culture_leisure",
		title: "스트리밍 서비스 정기 결제",
		payment: "현대카드",
		amount: -10900,
	},
	{
		id: "r3",
		date: "2025-08-14",
		category: "transportation",
		title: "후불 교통비 결제",
		payment: "현대카드",
		amount: -45340,
	},
	{
		id: "r4",
		date: "2025-08-13",
		category: "unclassified",
		title: "온라인 세미나 신청",
		payment: "현대카드",
		amount: -10000,
	},
	{
		id: "r5",
		date: "2025-08-10",
		category: "food",
		title: "잔치국수와 김밥",
		payment: "현대카드",
		amount: -9500,
	},
	{
		id: "r6",
		date: "2025-08-10",
		category: "salary",
		title: "8월 급여",
		payment: "현금",
		amount: 2010580,
	},
	{
		id: "r7",
		date: "2025-08-09",
		category: "food",
		title: "두유 4개",
		payment: "현대카드",
		amount: -19140,
	},
	{
		id: "r8",
		date: "2025-08-09",
		category: "life",
		title: "8월 월세",
		payment: "현대카드",
		amount: -500000,
	},
	{
		id: "r9",
		date: "2025-08-07",
		category: "shopping_beauty",
		title: "여름 의류",
		payment: "현대카드",
		amount: -56000,
	},
	{
		id: "r10",
		date: "2025-08-07",
		category: "culture_leisure",
		title: "영화 스트리밍",
		payment: "현대카드",
		amount: -9900,
	},
	{
		id: "r11",
		date: "2025-08-04",
		category: "unclassified",
		title: "출력소 (컬러 인쇄)",
		payment: "현금",
		amount: -200,
	},
	{
		id: "r12",
		date: "2025-08-04",
		category: "food",
		title: "토마토소스 오므라이스",
		payment: "현대카드",
		amount: -6500,
	},
	{
		id: "r13",
		date: "2025-08-04",
		category: "medical_health",
		title: "체육관 수강 등록",
		payment: "현대카드",
		amount: -125300,
	},
	{
		id: "r14",
		date: "2025-08-03",
		category: "food",
		title: "커피",
		payment: "현대카드",
		amount: -5400,
	},
];

export const MOCK_DAILY_GROUPS: DailyRecordGroup[] = [
	{
		date: "2025-08-17",
		entries: [MOCK_RECORD_ITEMS[0]],
		totals: { income: 0, expense: 36460 },
	},
	{
		date: "2025-08-14",
		entries: [MOCK_RECORD_ITEMS[1], MOCK_RECORD_ITEMS[2]],
		totals: { income: 0, expense: 56240 },
	},
	{
		date: "2025-08-13",
		entries: [MOCK_RECORD_ITEMS[3]],
		totals: { income: 0, expense: 10000 },
	},
	{
		date: "2025-08-10",
		entries: [MOCK_RECORD_ITEMS[4], MOCK_RECORD_ITEMS[5]],
		totals: { income: 2010580, expense: 9500 },
	},
	{
		date: "2025-08-09",
		entries: [MOCK_RECORD_ITEMS[6], MOCK_RECORD_ITEMS[7]],
		totals: { income: 0, expense: 519140 },
	},
	{
		date: "2025-08-07",
		entries: [MOCK_RECORD_ITEMS[8], MOCK_RECORD_ITEMS[9]],
		totals: { income: 0, expense: 65900 },
	},
	{
		date: "2025-08-04",
		entries: [
			MOCK_RECORD_ITEMS[10],
			MOCK_RECORD_ITEMS[11],
			MOCK_RECORD_ITEMS[12],
		],
		totals: { income: 0, expense: 132000 },
	},
	{
		date: "2025-08-03",
		entries: [MOCK_RECORD_ITEMS[13]],
		totals: { income: 0, expense: 5400 },
	},
];

export const MOCK_MONTHLY_GROUP: MonthlyRecordGroup = {
	year: 2025,
	month: 8,
	groups: MOCK_DAILY_GROUPS,
	summary: {
		count: MOCK_RECORD_ITEMS.length,
		income: 2010580,
		expense: 834640,
	},
};
