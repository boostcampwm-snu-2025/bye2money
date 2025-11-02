import { Box, Paper, Typography } from "@mui/material";
import { CategoryExpenseStats } from "./CategoryExpenseStats";
import { useStatsContext } from "@/contexts/StatsContext";

export function ExpenseStatsBody() {
    const { expenseStats } = useStatsContext();

    const categoryExpenseStats = expenseStats.map(stats => {
        return (
            <CategoryExpenseStats
                key={stats.category}
                stats={stats}>
            </CategoryExpenseStats>
        )
    })

    return (
        categoryExpenseStats.length === 0 ?
        <Paper sx={{ textAlign: "center" }}>
            <Typography color="text.secondary">표시할 내역이 없습니다.</Typography>
        </Paper>
        :
        <Box
        sx={{
            borderTop: '0.1px solid #000000',
            borderBottom: '0.1px solid #000000'}}>
            {categoryExpenseStats}
        </Box>
    )
}