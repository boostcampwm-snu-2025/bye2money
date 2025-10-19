import { create } from "zustand";
import type { Category } from "../components/CategoryTag";
import { nanoid } from "nanoid";

const SPENDINGS_FILTER = {
  ALL: "all",
  EXPENDITURE_ONLY: "expenditureOnly",
  INCOME_ONLY: "incomeOnly",
};
export type SpendingsFilter =
  (typeof SPENDINGS_FILTER)[keyof typeof SPENDINGS_FILTER];
const getFilter = (
  filter: SpendingsFilter,
): ((x: SpendingsFilter) => boolean) => {
  const filters: Record<SpendingsFilter, (x: SpendingDetail) => boolean> = {
    all: (x) => true,
    expenditureOnly: (x) => x.isExpenditure,
    incomeOnly: (x) => !x.isExpenditure,
  };
  return filters[filter];
};
export interface SpendingDetail {
  id: string;
  year: number;
  month: number;
  day: number;
  description: string;
  amount: number;
  isExpenditure: boolean;
  paymentMethod: string | undefined;
  category: Category;
}
export interface DaySpendings {
  year: number;
  month: number;
  day: number;
  spendings: SpendingDetail[];
}

interface SpendingDetailStore {
  spendingDetails: SpendingDetail[];
  paymentMethods: string[];
  addSpending: (payment: Omit<SpendingDetail, "id">) => void;
  removeSpending: (id: string) => void;
  updateSpending: (id: string, updates: Partial<SpendingDetail>) => void;
  getSpendingsByMonth: (year: number, month: number) => SpendingDetail[];
  querySpendings: (
    year: number,
    month: number,
    filter: SpendingsFilter,
  ) => DaySpendings[];
  // getSpendingsByDate: (
  //   year: number,
  //   month: number,
  //   day: number,
  // ) => SpendingDetail[];
  getSpendingDetails: () => SpendingDetail[];
  getPaymentMethods: () => string[];
  addPaymentMethod: (newMethod: string) => void;
  removePaymentMethod: (method: string) => void;
  // getTotalByMonth: (
  //   year: number,
  //   month: number,
  //   isExpenditure: boolean,
  // ) => number;
  // getSpendingsByCategory: (category: Category) => SpendingDetail[];
}
const sample = [
  {
    id: nanoid(),
    year: 2025,
    month: 10,
    day: 19,
    description: "aiowefjsd",
    amount: 500000,
    isExpenditure: false,
    paymentMethod: "용돈",
    category: "allowance",
  },
  {
    id: nanoid(),
    year: 2025,
    month: 10,
    day: 19,
    description: "aiowefjsd",
    amount: 50000,
    isExpenditure: true,
    paymentMethod: "현금",
    category: "food",
  },
  {
    id: nanoid(),
    year: 2025,
    month: 10,
    day: 19,
    description: "aiowefjsd",
    amount: 50000,
    isExpenditure: true,
    paymentMethod: "현금ffd",
    category: "food",
  },
  {
    id: nanoid(),
    year: 2025,
    month: 10,
    day: 19,
    description: "aiowefjsd",
    amount: 50000,
    isExpenditure: true,
    paymentMethod: "현금",
    category: "food",
  },
];
export const useSpendingDetailStore = create<SpendingDetailStore>(
  (set, get) => ({
    spendingDetails: sample,
    paymentMethods: [
      ...new Set(
        sample.filter((s) => s.paymentMethod).map((s) => s.paymentMethod),
      ),
    ],
    querySpendings: (year, month, filter) => {
      const res = get()
        .getSpendingsByMonth(year, month)
        .filter(getFilter(filter));
      return res;
    },
    getSpendingDetails: () => get().spendingDetails,
    getPaymentMethods: () => get().paymentMethods,
    addPaymentMethod: (newMethod) =>
      set((state) => ({
        paymentMethods: [...new Set([...state.paymentMethods, newMethod])],
      })),
    removePaymentMethod: (method) =>
      set((state) => ({
        paymentMethods: state.paymentMethods
          .filter((m) => m !== method)
          .filter((m) => m),

        spendingDetails: state.spendingDetails.map((x) =>
          x.paymentMethod === method ? { ...x, paymentMethod: undefined } : x,
        ),
      })),
    getSpendingsByMonth: (year, month) =>
      get().spendingDetails.filter((s) => s.year === year && s.month === month),
    addSpending: (spending) =>
      set((state) => ({
        spendingDetails: [
          ...state.spendingDetails,
          {
            ...spending,
            id: nanoid(),
          },
        ],
      })),
    removeSpending: (id) =>
      set((state) => ({
        spendingDetails: state.spendingDetails.filter((p) => p.id !== id),
      })),
    updateSpending: (id, updates) =>
      set((state) => ({
        spendingDetails: state.spendingDetails.map((s) =>
          s.id === id ? { ...s, ...updates } : s,
        ),
      })),
  }),
);
