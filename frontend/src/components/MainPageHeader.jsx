import { ChevronLeft, ChevronRight, FileText, Calendar, BarChart2 } from "lucide-react";

export default function Header() {
  return (
    <header>
      <div className="w-[846px] flex justify-between absolute top-8 left-[297px]">
        <div className="w-[132px] gap-[4px] flex justify-start items-center">
          <h1 className="font-serif font-normal text-[24px]">
            Wise Wallet
          </h1>
        </div>

        <div className="w-[240px] flex flex-row justify-center items-center gap-6">
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col items-center gap-1">
            <p className="font-sans font-light text-[14px]">2025</p>
            <p className="inline-block leading-none font-sans font-semibold text-[48px]">10</p>
            <p className="font-sans font-light text-[14px]">October</p>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="w-[132px] flex flex-row justify-end items-center gap-3">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            <FileText size={24} />
          </button>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            <Calendar size={24} />
          </button>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            <BarChart2 size={24} />
          </button>
        </div>

      </div>
    </header>
  );
}