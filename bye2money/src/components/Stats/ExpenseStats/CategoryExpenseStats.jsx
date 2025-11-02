import { useStatsContext } from "@/contexts/StatsContext"
import { Box, Typography } from "@mui/material";

export function CategoryExpenseStats({ stats }) {
    const { categoryColor } = useStatsContext();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "280px",
                height: "56px",
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#EEEEEE"
                }}}
                onClick={() => showDetails(category)}>
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: categoryColor[stats.category],
                    alignContent: "center"}}>
                <Typography
                    variant="body2" 
                    sx={{ textAlign: "center" }}> 
                    {stats.category}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    alignContent: "center",
                    ml: "16px"}}>
                <Typography
                    variant="body2"
                    sx={{ textAlign: "left" }}> 
                    {Number(stats.percentage)}%
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end", 
                    pr: "12px",
                    }}>
                <Typography
                    variant="body2"
                    sx={{ textAlign: "right" }}>
                    {Number(stats.categoryTotalExpense).toLocaleString()}원
                </Typography>
            </Box>
        </Box>
    )
}