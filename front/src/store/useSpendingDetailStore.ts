import { create } from "zustand";
import { nanoid } from "nanoid";
import { sample } from "../api/mockData";
import type { SpendingDetail } from "../types/types";
import {
  deleteSpendingUrl,
  fetchSpendingsUrl,
  putSpendingsUrl,
} from "../utils/urls";

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
  fetchSpendings: () => Promise<void>;
}

export const useSpendingDetailStore = create<SpendingDetailStore>(
  (set, get) => ({
    spendingDetails: [],
    paymentMethods: [],
    getSpendingDetails: () => get().spendingDetails,
    getPaymentMethods: () => get().paymentMethods,
    addPaymentMethod: (newMethod) =>
      set((state) => ({
        paymentMethods: [...new Set([...state.paymentMethods, newMethod])],
      })),
    removePaymentMethod: (method) =>
      set((state) => {
        const alteredIds = state.spendingDetails.filter(
          (x) => x.paymentMethod === method,
        );
        const putDto = alteredIds.map((x) => ({
          ...x,
          paymentMethod: undefined,
        }));
        fetch(putSpendingsUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(putDto),
        });
        return {
          paymentMethods: state.paymentMethods
            .filter((m) => m !== method)
            .filter((m) => m),

          spendingDetails: state.spendingDetails.map((x) =>
            x.paymentMethod === method ? { ...x, paymentMethod: undefined } : x,
          ),
        };
      }),
    getSpendingsByMonth: (year, month) =>
      get().spendingDetails.filter((s) => s.year === year && s.month === month),
    addSpending: (spending) =>
      set((state) => {
        const newSpending = {
          ...spending,
          id: nanoid(),
        };
        fetch(putSpendingsUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([newSpending]),
        });

        return {
          spendingDetails: [...state.spendingDetails, newSpending],
        };
      }),
    removeSpending: (id) =>
      set((state) => {
        fetch(deleteSpendingUrl + id, {
          method: "DELETE",
        });
        return {
          spendingDetails: state.spendingDetails.filter((p) => p.id !== id),
        };
      }),
    updateSpending: (id, updates) =>
      set((state) => ({
        spendingDetails: state.spendingDetails.map((s) =>
          s.id === id ? { ...s, ...updates } : s,
        ),
      })),
    fetchSpendings: async () => {
      const spendingsFetchRes = await fetch(fetchSpendingsUrl);
      const spendings = await spendingsFetchRes.json();
      set({
        spendingDetails: spendings,
        paymentMethods: [
          ...new Set(
            spendings
              .filter((s) => s.paymentMethod)
              .map((s) => s.paymentMethod),
          ),
        ],
      });

      return;
    },
  }),
);
