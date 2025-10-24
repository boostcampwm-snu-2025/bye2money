export enum HeaderToolIconType {
	Records = "records",
	Calendar = "calendar",
	Analytics = "analytics",
}

export type MoneyEntry = {
	date: string; // "YYYY-MM-DD"
	amount: number; // +: income (blue), -: expense (red)
};

export type CategoryTagTone =
	| "life" // 생활
	| "shopping_beauty" // 쇼핑/뷰티
	| "medical_health" // 의료/건강
	| "food" // 식비
	| "transportation" // 교통
	| "culture_leisure" // 문화/여가
	| "salary" // 월급
	| "other_income" // 기타 수입
	| "allowance" // 용돈
	| "unclassified"; // 미분류

/* Individual income/expense record */
export interface RecordItemData {
	id: string;
	date: string; // "YYYY-MM-DD"
	category: CategoryTagTone;
	title: string;
	payment: string;
	amount: number; // +: income, -: expense
	memo?: string;
	deletable?: boolean;
}

/* 하루치 기록 모음 */
export interface DailyRecordGroup {
	date: string;
	entries: RecordItemData[];
	totals: {
		income: number;
		expense: number;
	};
}

/* 한달치 기록 모음 */
export interface MonthlyRecordGroup {
	year: number;
	month: number;
	groups: DailyRecordGroup[];
	summary: {
		count: number;
		income: number;
		expense: number;
	};
}
