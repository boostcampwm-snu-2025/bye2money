import { useCalendarContext } from "@/contexts/CalendarContext";
import { Box } from "@mui/material";
import { CalendarWeek } from "./CalendarWeek";

export function CalendarBody() {
    const { calendarWeeks } = useCalendarContext();

    const weekItems = calendarWeeks.map((calendarWeek, week) => {
        return (
            <CalendarWeek
                sx={{
                    width: "846px",
                    height: "120px"}}
                key={week}
                weeklyStats={calendarWeek}>
            </CalendarWeek>
        )
    })

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "846px",
                border: "0.5px solid black"}}>
            {weekItems}
        </Box>
    )
}