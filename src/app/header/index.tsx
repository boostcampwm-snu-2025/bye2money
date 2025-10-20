import type { Dayjs } from "dayjs";

import Calender from "~/assets/icons/calendar.svg";
import Chart from "~/assets/icons/chart.svg";
import ChevronLeft from "~/assets/icons/chevron-left.svg";
import ChevronRight from "~/assets/icons/chevron-right.svg";
import Doc from "~/assets/icons/doc.svg";

interface Props {
  currentTab: "Analytics" | "Calendar" | "List";
  date: Dayjs;
  onNextMonth?: () => void;
  onPrevMonth?: () => void;
  onTabChange?: (tab: "Analytics" | "Calendar" | "List") => void;
}

function Header({
  currentTab,
  date,
  onNextMonth,
  onPrevMonth,
  onTabChange,
}: Props) {
  return (
    <header className="flex justify-between w-[846px] items-center">
      <h1 className="flex gap-[4px] w-[132px]">
        <span className="text-[24px] leading-1.5 tracking-normal font-normal font-[ChosunNM]">
          Wise
        </span>
        <span className="text-[24px] leading-1.5 tracking-normal font-normal font-[ChosunNM]">
          Wallet
        </span>
      </h1>
      <div className="flex gap-[24px] items-center">
        <img
          alt="Previous Month"
          className="w-[32px] h-[32px]"
          onClick={onPrevMonth}
          src={ChevronLeft}
        />
        <div className="flex flex-col gap-[4px] items-center">
          <span className="w-[120px] text-[14px] leading-[24px] tracking-normal font-light text-center font-[Pretendard]">
            {date.format("YYYY")}
          </span>
          <span className="text-[48px] leading-[56px] tracking-normal font-normal font-[ChosunNM]">
            {date.format("M")}
          </span>
          <span className="w-[120px] text-[14px] leading-[24px] tracking-normal font-light text-center font-[Pretendard]">
            {date.format("MMMM")}
          </span>
        </div>
        <img
          alt="Next Month"
          className="w-[32px] h-[32px]"
          onClick={onNextMonth}
          src={ChevronRight}
        />
      </div>
      <nav>
        <li className="w-[132px] flex justify-end gap-[4px]">
          <ul
            className={
              "w-[40px] h-[40px] p-[8px] rounded-[22px]" +
              (currentTab === "List" ? " bg-[#FFFFFF]" : "")
            }
            onClick={() => onTabChange?.("List")}
          >
            <img alt="List" className="w-[24px] h-[24px]" src={Doc} />
          </ul>
          <ul
            className={
              "w-[40px] h-[40px] p-[8px] rounded-[22px]" +
              (currentTab === "Calendar" ? " bg-[#FFFFFF]" : "")
            }
            onClick={() => onTabChange?.("Calendar")}
          >
            <img alt="Calender" className="w-[24px] h-[24px]" src={Calender} />
          </ul>
          <ul
            className={
              "w-[40px] h-[40px] p-[8px] rounded-[22px]" +
              (currentTab === "Analytics" ? " bg-[#FFFFFF]" : "")
            }
            onClick={() => onTabChange?.("Analytics")}
          >
            <img alt="Analytics" className="w-[24px] h-[24px]" src={Chart} />
          </ul>
        </li>
      </nav>
    </header>
  );
}

export default Header;
