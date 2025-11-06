import React from "react";
import { WEEKDAY_NAMES } from "../../assets/constants";

const CalendarHeader: React.FC = () => {
    return (
        <div className="grid grid-cols-7 divide-x divide-black border-b border-black">
            {WEEKDAY_NAMES.map((day) => (
                <div key={day} className="text-center py-2">
                    {day}
                </div>
            ))}
        </div>
    );
};

export default CalendarHeader;
