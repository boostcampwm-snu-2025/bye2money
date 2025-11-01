import { createContext, useState, useContext } from "react";

const CalendarContext = createContext(null);

export function CalendarContextProvider({ children }) {
    const calendarContextValue = {
    };

    return (
        <CalendarContext.Provider value={calendarContextValue}>
            {children}
        </CalendarContext.Provider>
    )
}

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (context === null) {
        throw new Error("No Calendar Context");
    }
    return context;
}
