import React from "react";
import MainIcon from "../../assets/icons/doc.svg?react";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import ChartIcon from "../../assets/icons/chart.svg?react";
import ChevronLeftIcon from "../../assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg?react";
import { NavBtn } from "./NavBtn";
import { useDateStore } from "../../store/useDateStore";
import { useRouteStore } from "../../store/useRouteStore";
import type { NavState } from "../../store/useRouteStore";

const getIcon = (navState: NavState): React.FC => {
  const navIconMap: Record<NavState, React.FC> = {
    main: MainIcon,
    calendar: CalendarIcon,
    chart: ChartIcon,
  };
  return navIconMap[navState];
};

export const Header: React.FC = () => {
  const routes: NavState[] = ["main", "calendar", "chart"];
  const { currentRoute, navigate } = useRouteStore();
  const {
    selectedDate,
    setNextMonth,
    setPrevMonth,
    getYear,
    getMonth,
    getMonthEng,
  } = useDateStore();
  const navBtns = routes.map((r) => {
    return (
      <NavBtn
        key={r}
        onClick={navigate}
        state={r}
        currentState={currentRoute}
        icon={getIcon(r)}
      />
    );
  });
  return (
    <header className="flex flex-row relative w-layout h-[176px] items-start justify-center pt-[40px] bg-colorchip-80">
      <div className="flex flex-row w-[846px] h-[112px] justify-between items-center">
        <button
          onClick={() => navigate("main")}
          className="flex flex-row gap-[4px] h-[32px] w-[132px]"
        >
          <h1 className="font-serif text-serif-md">Wise</h1>
          <h1 className="font-serif text-serif-md">Wallet</h1>
        </button>
        <div className="flex flex-row w-[232px] h-[112px] items-center justify-between">
          <button onClick={setPrevMonth}>
            <ChevronLeftIcon width="32px" height="32px" />
          </button>
          <div className="flex flex-col justify-between gap-[4px] items-center">
            <h1 className="font-sans text-sans-light-md h-[24px]">
              {getYear()}
            </h1>
            <h1 className="font-serif text-serif-lg h-[56px]">{getMonth()}</h1>
            <h1 className="font-sans text-sans-light-md h-[24px]">
              {getMonthEng()}
            </h1>
          </div>
          <button onClick={setNextMonth}>
            <ChevronRightIcon width="32px" height="32px" />
          </button>
        </div>
        <nav className="flex flex-row h-[40px] w-[132px] px-[4px] gap-[4px]">
          {navBtns}
        </nav>
      </div>
    </header>
  );
};
