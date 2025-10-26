import { create } from "zustand";
import { nanoid } from "nanoid";
import { sample } from "../api/mockData";
import type { SpendingDetail } from "../types/types";

interface SpendingDetailStore {
  spendingDetails: SpendingDetail[];
  paymentMethods: string[];
  addSpending: (payment: Omit<SpendingDetail, "id">) => void;
  removeSpending: (id: string) => void;
  updateSpending: (id: string, updates: Partial<SpendingDetail>) => void;
  getSpendingsByMonth: (year: number, month: number) => SpendingDetail[];
  getSpendingDetails: () => SpendingDetail[];
  getPaymentMethods: () => string[];
  addPaymentMethod: (newMethod: string) => void;
  removePaymentMethod: (method: string) => void;
}

export const useSpendingDetailStore = create<SpendingDetailStore>(
  (set, get) => ({
    spendingDetails: sample,
    paymentMethods: [
      ...new Set(
        sample.filter((s) => s.paymentMethod).map((s) => s.paymentMethod),
      ),
    ],
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
