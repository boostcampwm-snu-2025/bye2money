import { create } from "zustand";

interface ModalState {
  methodAppendModalOpened: boolean;
  methodRemoveModalOpened: boolean;
  methodToRemove: string;
  spendingToRemove: string;
  spendingRemoveModalOpened: boolean;

  openMethodAppendModal: () => void;
  closeMethodAppendModal: () => void;
  toggleMethodAppendModal: () => void;

  openMethodRemoveModal: (method: string) => void;
  closeMethodRemoveModal: () => void;
  toggleMethodRemoveModal: () => void;

  openSpendingRemoveModal: (id: string) => void;
  closeSpendingRemoveModal: () => void;
  toggleSpendingRemoveModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  methodAppendModalOpened: false,
  methodRemoveModalOpened: false,
  spendingRemoveModalOpened: false,
  spendingToRemove: "",
  methodToRemove: "",

  openSpendingRemoveModal: (id: string) =>
    set({ spendingToRemove: id, spendingRemoveModalOpened: true }),
  closeSpendingRemoveModal: () => set({ spendingRemoveModalOpened: false }),
  toggleSpendingRemoveModal: () =>
    set((state) => ({
      spendingRemoveModalOpened: !state.spendingRemoveModalOpened,
    })),

  openMethodAppendModal: () => set({ methodAppendModalOpened: true }),
  closeMethodAppendModal: () => set({ methodAppendModalOpened: false }),
  toggleMethodAppendModal: () =>
    set((state) => ({
      methodAppendModalOpened: !state.methodAppendModalOpened,
    })),

  openMethodRemoveModal: (method) =>
    set({ methodRemoveModalOpened: true, methodToRemove: method }),
  closeMethodRemoveModal: () => set({ methodRemoveModalOpened: false }),
  toggleMethodRemoveModal: () =>
    set((state) => ({
      methodRemoveModalOpened: !state.methodRemoveModalOpened,
    })),
}));
