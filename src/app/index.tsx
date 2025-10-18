import dayjs from "dayjs";
import { useState } from "react"

import Header from "./header";

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
}

const tabs = ["List", "Calendar", "Analytics"] as const;
type Tab = (typeof tabs)[number];
const initialTab: Tab = "List";

function App() {
  const { date, setNextMonth, setPrevMonth } = useMonthlyDate();
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <>
      <Header currentTab={tab} date={date} onNextMonth={setNextMonth} onPrevMonth={setPrevMonth} onTabChange={setTab}/>
      {/* <Tab /> */}
    </>
  )
}

export default App
