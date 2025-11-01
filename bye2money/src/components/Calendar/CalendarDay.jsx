import { Box, Typography } from "@mui/material";

export function CalendarDay({ dailyStats }) {
    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                border: "0.5px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: dailyStats.isCurrentMonth ? 1 : 0}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"}}>
                <Box
                    sx={{ justifyContent: "left" }}>
                    <Typography>
                        {Number(dailyStats.dayTotalIncome).toLocaleString("ko-KR")}원
                    </Typography>
                    <Typography>
                        {Number(dailyStats.dayTotalExpense).toLocaleString("ko-KR")}원
                    </Typography>
                    <Typography>
                        {Number(dailyStats.dayTotalSum).toLocaleString("ko-KR")}원
                    </Typography>
                </Box>
                <Box
                    sx={{ justifyContent: "right" }}>
                    <Typography sx={{alignContent: "right"}}>
                        {dailyStats.date}
                    </Typography>
                </Box>
                
            </Box>
        </Box>
    )
}