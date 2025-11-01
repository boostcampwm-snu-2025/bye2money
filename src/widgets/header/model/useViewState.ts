import { useState } from "react";

export type ViewType = "doc" | "calendar" | "chart";

export const useViewState = () => {
  const [view, setView] = useState<ViewType>("doc");
  return { view, setView };
};
