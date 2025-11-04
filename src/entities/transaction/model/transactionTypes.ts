import type { CategoryKey } from "../../category/model/categoryTypes";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: CategoryKey;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface DailyTransactionSummary {
  date: string;
  dayOfWeek: string;
  totalIncome: number;
  totalExpense: number;
  transactions: Transaction[];
}

export interface MonthlyTransactionData {
  year: number;
  month: number;
  totalCount: number;
  totalIncome: number;
  totalExpense: number;
  dailyGroups: DailyTransactionSummary[];
}
