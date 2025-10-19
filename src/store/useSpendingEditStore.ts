import { create } from "zustand";
import type { Category } from "../components/CategoryTag";
import { DateTime } from "luxon";

interface SpendingEditStore {
  id: string | undefined;
  date: string;
  isExpenditure: boolean;
  amount: number;
  amountStr: string;
  description: string;
  category: Category | undefined;
  paymentMethod: string | undefined;
  newPaymentMethod: string;
  isComplete: boolean;
  setId: (id: string | undefined) => void;
  setDate: (date: string) => void;
  setIsExpenditure: (isExpenditure: boolean) => void;
  setAmount: (amount: number) => void;
  setAmountStr: (amountStr: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: Category | undefined) => void;
  setPaymentMethod: (paymentMethod: string | undefined) => void;
  setNewPaymentMethod: (newPaymentMethod: string) => void;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleIsExpenditure: () => void;
  clearValues: () => void;
  updateIsComplete: () => void;
}

export const useSpendingEditStore = create<SpendingEditStore>((set, get) => ({
  id: undefined,
  date: DateTime.now().toISODate()!,
  isExpenditure: true,
  amount: 0,
  amountStr: "0",
  description: "",
  category: undefined,
  paymentMethod: undefined,
  newPaymentMethod: "",
  isComplete: false,

  setId: (id) => set({ id }),
  setDate: (date) => {
    set({ date });
    get().updateIsComplete();
  },
  setIsExpenditure: (isExpenditure) => set({ isExpenditure }),
  setAmount: (amount) => {
    set({ amount });
    get().updateIsComplete();
  },
  setAmountStr: (amountStr) => set({ amountStr }),
  setDescription: (description) => {
    set({ description: description.slice(0.32) });
    get().updateIsComplete();
  },
  setCategory: (category) => {
    set({ category });
    get().updateIsComplete();
  },
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setNewPaymentMethod: (newPaymentMethod) => set({ newPaymentMethod }),

  handleAmountChange: (e) => {
    const numericInput = e.target.value.replaceAll(/[^\d]/g, "");
    const numericVal = parseInt(numericInput, 10) || 0;
    const formattedAmount = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    })
      .format(numericVal)
      .replaceAll("₩", "");
    set({ amount: numericVal, amountStr: formattedAmount });
    get().updateIsComplete();
  },
  toggleIsExpenditure: () => {
    set((state) => ({
      isExpenditure: !state.isExpenditure,
      category: undefined,
    }));
  },
  clearValues: () => {
    set({
      id: undefined,
      date: DateTime.now().toISODate()!,
      isExpenditure: true,
      amount: 0,
      amountStr: "0",
      description: "",
      paymentMethod: undefined,
      category: undefined,
      isComplete: false,
    });
  },

  updateIsComplete: () => {
    const state = get();
    const isComplete =
      !!state.date &&
      state.amount > 0 &&
      !!state.description.length &&
      !!state.category;
    set({ isComplete });
  },
}));
