import { create } from "zustand";
import { DateTime } from "luxon";

interface DateState {
  selectedDate: DateTime;
  setSelectedDate: (date: DateTime) => void;
  setNextMonth: () => void;
  setPrevMonth: () => void;
  resetToCurrentMonth: () => void;
  getFormattedDate: () => string;
  getYear: () => number;
  getMonth: () => number;
  getMonthEng: () => string;
}

export const useDateStore = create<DateState>((set, get) => ({
  selectedDate: DateTime.now().setLocale("en"),

  setSelectedDate: (date) => set({ selectedDate: date }),

  setNextMonth: () =>
    set((state) => ({
      selectedDate: state.selectedDate.plus({ months: 1 }),
    })),

  setPrevMonth: () =>
    set((state) => ({
      selectedDate: state.selectedDate.minus({ months: 1 }),
    })),

  resetToCurrentMonth: () =>
    set({ selectedDate: DateTime.now().setLocale("en") }),

  getFormattedDate: () => get().selectedDate.toFormat("MMMM yyyy"),
  getYear: () => get().selectedDate.year,
  getMonth: () => get().selectedDate.month,
  getMonthEng: () => get().selectedDate.monthLong,
}));
