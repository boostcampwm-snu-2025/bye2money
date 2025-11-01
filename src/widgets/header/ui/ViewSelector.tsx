import { Icon } from "../../../shared/ui/Icon/Icon";
import { useViewState } from "../model/useViewState";

export const ViewSelector = () => {
  const { view, setView } = useViewState();

  return (
    <div className="flex h-fit gap-1">
      <button
        aria-label="내역 탭"
        aria-selected={view === "doc"}
        type="button"
        onClick={() => setView("doc")}
        className={`rounded-full p-2 transition-colors ${view === "doc" ? "bg-white" : "bg-transparent"} `}
      >
        <Icon name="doc" />
      </button>
      <button
        aria-label="달력 탭"
        aria-selected={view === "calendar"}
        type="button"
        onClick={() => setView("calendar")}
        className={`rounded-full p-2 transition-colors ${view === "calendar" ? "bg-white" : "bg-transparent"} `}
      >
        <Icon name="calendar" />
      </button>
      <button
        aria-label="차트 탭"
        aria-selected={view === "chart"}
        type="button"
        onClick={() => setView("chart")}
        className={`rounded-full p-2 transition-colors ${view === "chart" ? "bg-white" : "bg-transparent"} `}
      >
        <Icon name="chart" />
      </button>
    </div>
  );
};
