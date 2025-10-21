import { create } from "zustand";
import { persist } from "zustand/middleware";
import { startOfMonth, endOfMonth, isWithinInterval, compareDesc } from "date-fns";

const defaultCategories = {
  expense: ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"],
  income: ["월급", "용돈", "기타수입"],
};
const initialPayments = ["현금", "카드", "계좌이체"];

export const useLedgerStore = create(
  persist(
    (set, get) => ({
      currentMonth: new Date(),
      records: [],
      categories: defaultCategories,
      payments: initialPayments,

      setMonth: (d) => set({ currentMonth: d }),

      addRecord: (rec) =>
        set((s) => ({
          records: [{ ...rec, id: crypto.randomUUID(), createdAt: Date.now() }, ...s.records],
        })),
      updateRecord: (id, patch) =>
        set((s) => ({ records: s.records.map(r => (r.id === id ? { ...r, ...patch } : r)) })),
      removeRecord: (id) => set((s) => ({ records: s.records.filter(r => r.id !== id) })),

      addPayment: (name) => set((s) => ({ payments: [...new Set([...s.payments, name.trim()])] })),
      removePayment: (name) =>
        set((s) => {
          const cleaned = s.records.map(r => (r.payment === name ? { ...r, payment: "" } : r));
          return { payments: s.payments.filter(p => p !== name), records: cleaned };
        }),

      monthRecords: () => {
        const { currentMonth, records } = get();
        const from = startOfMonth(currentMonth);
        const to = endOfMonth(currentMonth);
        return records
          .filter(r => isWithinInterval(new Date(r.date), { start: from, end: to }))
          .sort((a, b) => {
            const d = compareDesc(new Date(a.date), new Date(b.date));
            return d !== 0 ? d : compareDesc(a.createdAt, b.createdAt);
          });
      },
    }),
    {
      name: "ledger-store",
      partialize: (s) => ({ records: s.records, categories: s.categories, payments: s.payments }),
    }
  )
);
