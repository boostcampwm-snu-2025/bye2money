import { useQueryState, parseAsStringLiteral } from "nuqs";

const VIEW_OPTIONS = ["doc", "calendar", "chart"] as const;
export type ViewType = (typeof VIEW_OPTIONS)[number];

export const useViewState = () => {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(VIEW_OPTIONS).withDefault("doc"),
  );

  return { view: view as ViewType, setView };
};
