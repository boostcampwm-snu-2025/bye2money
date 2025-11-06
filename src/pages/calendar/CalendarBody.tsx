import React from "react";
import { useDate } from "../layout/Layout";
import CalendarDay from "./CalendarDay";
import { DailySummaryMap } from "./CalendarPage";

const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

interface CalendarBodyProps {
    dailySummaries: DailySummaryMap;
    today: Date;
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
    dailySummaries,
    today,
}) => {
    // Context에서 현재 날짜를 가져옴
    const { currentDate } = useDate();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0 = 1월, 11 = 12월

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = 일요일 ~ 6 = 토요일
    const daysInMonth = lastDayOfMonth.getDate();

    const calendarDays: React.ReactNode[] = [];

    // 1일이 시작하기 전의 빈 칸
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.push(
            <div key={`cal-empty-${i}`} className="h-[140px]"></div>
        );
    }

    // 실제 날짜
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        // const dateString = date.toISOString().split("T")[0];
        const yearStr = date.getFullYear();
        const monthStr = String(date.getMonth() + 1).padStart(2, "0");
        const dayStr = String(date.getDate()).padStart(2, "0");
        const dateString = `${yearStr}-${monthStr}-${dayStr}`;

        const summary = dailySummaries[dateString];
        const isToday = isSameDay(date, today);

        calendarDays.push(
            <CalendarDay
                key={`day-${day}`}
                day={day}
                summary={summary}
                isToday={isToday}
            />
        );
    }

    // 7*6이 될 때까지 빈 칸
    for (let i = 1 + startDayOfWeek + daysInMonth; i <= 42; i++) {
        calendarDays.push(
            <div key={`cal-empty-${i}`} className="h-[140px]"></div>
        );
    }

    return (
        <div className="grid grid-cols-7 grid-rows-6 divide-x divide-y divide-black">
            {calendarDays}
        </div>
    );
};

export default CalendarBody;
