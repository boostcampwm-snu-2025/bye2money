import { Box } from "@mui/material";
import { ExpenseStatsHeader } from "./ExpenseStatsHeader";
import { ExpenseStatsBody } from "./ExpenseStasBody";

export function ExpenseStats() {
    return (
        <Box
            sx={{
                width: "328px",
                height: "473px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "16px",
                padding: "16px"
            }}>
            <ExpenseStatsHeader/>
            <ExpenseStatsBody/>
        </Box>
    )
}