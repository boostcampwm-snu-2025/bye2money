import type { Dayjs } from "dayjs";

import Calender from "/icons/calendar.svg";
import Chart from "/icons/chart.svg";
import ChevronLeft from "/icons/chevron-left.svg";
import ChevronRight from "/icons/chevron-right.svg";
import Doc from "/icons/doc.svg";

interface Props {
  currentTab: "Analytics" | "Calendar" | "List"
  date: Dayjs
  onNextMonth?: () => void
  onPrevMonth?: () => void
  onTabChange?: (tab: "Analytics" | "Calendar" | "List") => void
}

// TODO: font family 적용

function Header({ currentTab, date, onNextMonth, onPrevMonth, onTabChange }: Props) {
  return (
    <header className="flex justify-between w-[846px] items-center bg-[#73A4D0]">
      <h1 className="flex gap-[4px] w-[132px]">
        <span className="text-[24px] leading-1.5 tracking-normal font-normal">Wise</span>
        <span className="text-[24px] leading-1.5 tracking-normal font-normal">Wallet</span>
      </h1>
      <div className="flex gap-[24px] items-center">
        <img alt="Previous Month" className="w-[32px] h-[32px]" onClick={onPrevMonth} src={ChevronLeft}/>
        <div className="flex flex-col gap-[4px] items-center">
          <span className="w-[120px] text-[14px] leading-[24px] tracking-normal font-light text-center">{date.format("YYYY")}</span>
          <span className="text-[48px] leading-[56px] tracking-normal font-normal">{date.format("M")}</span>
          <span className="w-[120px] text-[14px] leading-[24px] tracking-normal font-light text-center">{date.format("MMMM")}</span>
        </div>
        <img alt="Next Month" className="w-[32px] h-[32px]" onClick={onNextMonth} src={ChevronRight}/>
      </div>
      <div className="flex justify-end w-[132px] gap-[4px]">
        <span className={"w-[40px] h-[40px] p-[8px] rounded-[22px]" + (currentTab === "List" ? " bg-[#FFFFFF]" : "")} onClick={() => onTabChange?.("List")}>
          <img alt="List" className="w-[24px] h-[24px]" src={Doc}/>
        </span>
        <span className={"w-[40px] h-[40px] p-[8px] rounded-[22px]" + (currentTab === "Calendar" ? " bg-[#FFFFFF]" : "")} onClick={() => onTabChange?.("Calendar")}>
          <img alt="Calender" className="w-[24px] h-[24px]" src={Calender}/>
        </span>
        <span className={"w-[40px] h-[40px] p-[8px] rounded-[22px]" + (currentTab === "Analytics" ? " bg-[#FFFFFF]" : "")} onClick={() => onTabChange?.("Analytics")}>
          <img alt="Analytics" className="w-[24px] h-[24px]" src={Chart}/>
        </span>
      </div>
    </header>
  );
}

export default Header
