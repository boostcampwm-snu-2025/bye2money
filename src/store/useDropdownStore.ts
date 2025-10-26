import { create } from "zustand";

interface DropdownState {
  categoryDropdownOpened: boolean;
  methodDropdownOpened: boolean;

  openCategoryDropdown: () => void;
  closeCategoryDropdown: () => void;
  toggleCategoryDropdown: () => void;

  openMethodDropdown: () => void;
  closeMethodDropdown: () => void;
  toggleMethodDropdown: () => void;
}

export const useDropdownStore = create<DropdownState>((set, get) => ({
  categoryDropdownOpened: false,
  methodDropdownOpened: false,

  openCategoryDropdown: () => set({ categoryDropdownOpened: true }),
  closeCategoryDropdown: () => set({ categoryDropdownOpened: false }),
  toggleCategoryDropdown: () =>
    set((state) => ({ categoryDropdownOpened: !state.categoryDropdownOpened })),

  openMethodDropdown: () => set({ methodDropdownOpened: true }),
  closeMethodDropdown: () => set({ methodDropdownOpened: false }),
  toggleMethodDropdown: () =>
    set((state) => ({ methodDropdownOpened: !state.methodDropdownOpened })),
}));
