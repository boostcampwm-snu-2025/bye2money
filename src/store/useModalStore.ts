import { create } from "zustand";

interface ModalState {
  methodAppendModalOpened: boolean;
  methodRemoveModalOpened: boolean;
  methodToRemove: string;

  openMethodAppendModal: () => void;
  closeMethodAppendModal: () => void;
  toggleMethodAppendModal: () => void;

  openMethodRemoveModal: (method: string) => void;
  closeMethodRemoveModal: () => void;
  toggleMethodRemoveModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  methodAppendModalOpened: false,
  methodRemoveModalOpened: false,
  methodToRemove: "",

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
