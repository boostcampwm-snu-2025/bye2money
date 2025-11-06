export type Method = "현금" | "신용카드" | "체크카드";

// Add a few income categories
export type Category =
  | "문화/여가"
  | "교통"
  | "식비"
  | "미분류"
  | "월급"
  | "기타수입";

export const CATEGORY_OPTIONS: Category[] = [
  "문화/여가",
  "교통",
  "식비",
  "미분류",
  "월급",       // income
  "기타수입",    // income
];

export type IOType = "income" | "expense";

export type Tx = {
  id: string;
  date: string;
  weekday: string;
  category: Category | string;
  content: string;
  method: Method;
  account?: string;
  amount: number;
  type: IOType;
};
