import { create } from "zustand";

const NAV_STATE = {
  MAIN: "main",
  CALENDAR: "calendar",
  CHART: "chart",
} as const;
export type NavState = (typeof NAV_STATE)[keyof typeof NAV_STATE];
interface RouteStore {
  currentRoute: NavState;
  navigate: (newRoute: NavState) => void;
}

export const useRouteStore = create<RouteStore>((set, get) => ({
  currentRoute: "main",
  navigate: (newRoute) => set({ currentRoute: newRoute }),
}));
