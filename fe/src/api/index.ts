import type { Dayjs } from "dayjs";

import dayjs from "dayjs";

const baseUrl = {
  development: 'http://localhost:3001',
  production: '',
}[import.meta.env.MODE] || '';

export type Category = ExpenseCategory | IncomeCategory;

export type Item = {
  amount: number;
  category: Category;
  date: Dayjs;
  description: string;
  id: number;
  paymentMethod: string;
};

type ExpenseCategory =
  | "교통"
  | "문화/여가"
  | "미분류"
  | "생활"
  | "쇼핑/뷰티"
  | "식비"
  | "의료/건강";

type IncomeCategory = "기타 수입" | "용돈" | "월급";

type RawItem = {
  amount: number;
  category: Category;
  date: string;
  description: string;
  id: number;
  paymentMethod: string;
};

export async function createTransaction(transaction: Omit<Item, "id">, signal?: AbortSignal | null) {
  const response = await fetch(`${baseUrl}/api/transactions`, {
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    signal,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as RawItem;
  return { ...data, date: dayjs(data.date) };
}

export async function deleteTransaction(id: number, signal?: AbortSignal | null) {
  const response = await fetch(`${baseUrl}/api/transactions/${id}`, {
    method: "DELETE",
    signal,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function readTransactions(date: Dayjs, signal?: AbortSignal | null) {
  const response = await fetch(
    `${baseUrl}/api/transactions?month=${date.month() + 1}&year=${date.year()}`,
    { signal },
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as RawItem[];
  return data.map((item) => ({ ...item, date: dayjs(item.date) }));
}

export async function updateTransaction(id: number, updates: Partial<Omit<Item, "id">>, signal?: AbortSignal | null) {
  const response = await fetch(`${baseUrl}/api/transactions/${id}`, {
    body: JSON.stringify(updates),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    signal,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as RawItem;
  return { ...data, date: dayjs(data.date) };
}
