import { CalendarContextProvider } from "@/contexts/CalendarContent";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarBody } from "./CalendarBody";
import { CalendarFooter } from "./CalendarFooter";

export function Calendar() {
    return (
        <CalendarContextProvider>
            <CalendarHeader/>
            <CalendarBody/>
            <CalendarFooter/>
        </CalendarContextProvider>
    )
}