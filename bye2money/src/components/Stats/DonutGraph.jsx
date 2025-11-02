import { useStatsContext } from "@/contexts/StatsContext";
import { PieChart } from "@mui/icons-material";

export function DonutGraph() {
    const { expenseStats } = useStatsContext();
    
    return (
        <PieChart
            sx={{
                width: "422px",
                height: "473px"
            }}>

        </PieChart>
    )
}