import React from "react"; 
import { useStatsContext } from "@/contexts/StatsContext.jsx";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Box } from "@mui/material";

export function DonutGraph() {
    const { expenseStats, categoryColor } = useStatsContext();

    if (!expenseStats || expenseStats.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                width: "422px",
                height: "473px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0}}>
            <PieChart width={254} height={254}>
                <Tooltip 
                    formatter={(value) => `${value.toLocaleString("ko-KR")}원`}/>
                <Pie    
                    data={expenseStats}
                    dataKey="categoryTotalExpense"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}>
                    {expenseStats.map(categoryStats => (
                        <Cell 
                            key={categoryStats.category} 
                            fill={categoryColor[categoryStats.category]}>
                        </Cell>
                    ))}
                </Pie>
            </PieChart>
        </Box>
    )
}
