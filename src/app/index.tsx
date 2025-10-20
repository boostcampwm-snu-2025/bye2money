import dayjs from "dayjs";
import { useState } from "react";

import Header from "./header";
import InputBar from "./input-bar";
import ListView from "./list-view";

const initialDate = dayjs().startOf("month");

const useMonthlyDate = () => {
  const [date, setDate] = useState(initialDate);

  const setNextMonth = () => {
    setDate((prev) => prev.add(1, "month"));
  };

  const setPrevMonth = () => {
    setDate((prev) => prev.subtract(1, "month"));
  };

  return { date, setNextMonth, setPrevMonth };
};

type Tab = "Analytics" | "Calendar" | "List";
const initialTab: Tab = "List";

function App() {
  const { date, setNextMonth, setPrevMonth } = useMonthlyDate();
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div className="flex flex-col items-center w-full h-full pt-[40px] gap-[24px]">
      <div className="absolute top-0 w-full h-[216px] bg-[#73A4D0] z-[-1]"></div>
      <Header
        currentTab={tab}
        date={date}
        onNextMonth={setNextMonth}
        onPrevMonth={setPrevMonth}
        onTabChange={setTab}
      />
      {tab === "List" ? (
        <>
          <InputBar />
          <ListView />
        </>
      ) : tab === "Calendar" ? (
        <div>Calendar View - to be implemented</div>
      ) : tab === "Analytics" ? (
        <div>Analytics View - to be implemented</div>
      ) : null}
    </div>
  );
}

export default App;
