import { useCalendarContext } from "@/contexts/CalendarContent";
import { Box, Typography } from "@mui/material";

export function CalendarFooter() {
    const { 
        totalIncome, 
        totalExpense,
        totalSum
    } = useCalendarContext();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "846px",
                height: "16px",
                justifyContent: "space-between"}}>
            <Box
                sx={{
                    display: "flex",
                    gap: "24px"}}>
                <Typography variant="body1" fontWeight="bold">
                    총 수입 {Number(totalIncome).toLocaleString("ko-KR")}원
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    총 지출 {Number(totalExpense).toLocaleString("ko-KR")}원
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1" fontWeight="bold">
                    총합 {Number(totalSum).toLocaleString("ko-KR")}원
                </Typography>
            </Box>
        </Box>
    )
}