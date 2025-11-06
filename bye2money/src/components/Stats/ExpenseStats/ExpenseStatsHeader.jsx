import { useStatsContext } from "@/contexts/StatsContext";
import { Box, Typography } from "@mui/material";

export function ExpenseStatsHeader() {
    const { 
        totalExpense,
    } = useStatsContext();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "280px",
                height: "16px",
                justifyContent: "space-between"}}>
            <Box>
                <Typography variant="body1">
                    이번 달 지출 금액
                </Typography>
            </Box><Box
                sx={{
                    display: "flex",
                    gap: "24px"}}>
                <Typography variant="body1">
                    총 지출 {Number(totalExpense).toLocaleString("ko-KR")}원
                </Typography>
            </Box>
            
        </Box>
    )
}