import React from "react";
import cn from "classnames";
import Amount from "../../components/Amount";
import { Summary } from "./CalendarPage";

interface CalendarDayProps {
    day: number;
    summary?: Summary; // summary는 undefined일 수 있음
    isToday: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, summary, isToday }) => {
    return (
        <div
            className={cn(
                "h-[140px] p-2",
                { "bg-gray-300": isToday } // 오늘 날짜 하이라이트
            )}
        >
            <span className="text-lg">{day}</span>
            {summary && (
                <div className="flex flex-col items-end text-xl mt-0.5 space-y-1">
                    {summary.income > 0 && <Amount value={summary.income} />}
                    {summary.expense < 0 && <Amount value={summary.expense} />}

                    {summary.total !== 0 && (
                        <div className="border-t border-black w-full text-right mt-0.5 pt-1">
                            <Amount
                                value={summary.total}
                                colorVariant="neutral"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CalendarDay;
