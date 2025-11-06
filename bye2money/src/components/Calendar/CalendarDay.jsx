import { Box, Typography } from "@mui/material";

export function CalendarDay({ dailyStats }) {
    
    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "0.5px solid black",
                padding: "8px",
                // opacity: dailyStats.isCurrentMonth ? 1 : 0.4,
                backgroundColor: dailyStats.isToday ? "#F1F4F8" : "#FFFFFF"}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"}}>
                {dailyStats.dayTotalIncome > 0 && (
                    <Typography 
                        sx={{
                            color: "#79B2CA",
                            fontSize: "14px"
                        }}>
                        {Number(dailyStats.dayTotalIncome).toLocaleString("ko-KR")}
                    </Typography>
                )}
                {dailyStats.dayTotalExpense > 0 && (
                    <Typography 
                        sx={{
                            color: "#C04646",
                            fontSize: "14px"
                        }}>
                        -{Number(dailyStats.dayTotalExpense).toLocaleString("ko-KR")}
                    </Typography>
                )}
                {dailyStats.dayTotalSum !== 0 && (
                    <Typography 
                        fontSize="14px"
                        sx={{
                            opacity: (dailyStats.dayTotalIncome > 0 || dailyStats.dayTotalExpense > 0) ? 1 : 0 
                        }}>
                        {Number(dailyStats.dayTotalSum).toLocaleString("ko-KR")}
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end"
                }}>
                <Typography variant="body2">
                    {dailyStats.date}
                </Typography>
            </Box>
        </Box>
    )
}

