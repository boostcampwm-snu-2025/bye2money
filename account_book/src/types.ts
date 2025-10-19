export type Method = "현금" | "신용카드" | "체크카드";
export type Category = "문화/여가" | "교통" | "식비";
export const CATEGORY_OPTIONS: Category[] = ["문화/여가", "교통", "식비"];
export type IOType = "income" | "expense";

export type Tx = {
  id: string;
  date: string;
  weekday: string;
  category: string;
  content: string;
  method: Method;
  account?: string;
  amount: number;
  type: IOType;
};
