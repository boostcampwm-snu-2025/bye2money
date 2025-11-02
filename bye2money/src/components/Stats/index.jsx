import { StatsContextProvider } from "@/contexts/StatsContext";
import { DonutGraph } from "./DonutGraph";
import { ExpenseStats } from "./ExpenseStats";
import { Box } from "@mui/material";

export function Stats() {
    return (
        <StatsContextProvider>
            <Box
                sx={{
                    position: "absolute",
                    top: "180px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "846px",
                    height: "517px",
                    gap: "8px",
                    padding: "16px",
                    border: "0.5px solid black",
                    backgroundColor: "#FFFFFF"}}>
                <DonutGraph/>
                <ExpenseStats/>  
            </Box>
        </StatsContextProvider>
    )
}