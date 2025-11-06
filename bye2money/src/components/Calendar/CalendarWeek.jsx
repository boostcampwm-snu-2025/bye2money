import { Box } from "@mui/material";
import { CalendarDay } from "./CalendarDay";
import { Opacity, Visibility } from "@mui/icons-material";

export function CalendarWeek({ weeklyStats }) {
    const dayItems = weeklyStats.map(dailyStats => {
        return (
            <CalendarDay
                key={dailyStats.fullDate}
                dailyStats={dailyStats}>
            </CalendarDay>
        )
    })

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "846px",
                height: "120px",
                border: "0.5px solid black"}}>
            {dayItems}
        </Box>
    )
}