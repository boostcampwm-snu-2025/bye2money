import { React } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CheckBoxFilter } from "./CheckBoxFilter";
import { useTransactionsContext } from "@/contexts/TransactionsContext";

export function TransactionsHeader() {
    const { 
        numTransactions, 
        expenseChecked, setExpenseChecked, 
        incomeChecked, setIncomeChecked,
        totalExpense, totalIncome
    } = useTransactionsContext();
    
    return (
        <Box
            sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                height: "32px",
            }}>  
            <Typography variant="body1" fontWeight="bold">전체 내역 {numTransactions}건</Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: "24px"
                }}>
                <CheckBoxFilter
                    isChecked={incomeChecked}
                    setIsChecked={setIncomeChecked}>
                    <Typography variant="body2">
                        수입 {Number(totalIncome).toLocaleString("ko-KR")}원
                    </Typography>
                </CheckBoxFilter>
                <CheckBoxFilter
                    isChecked={expenseChecked}
                    setIsChecked={setExpenseChecked}>
                    <Typography variant="body2">
                        지출 {Number(totalExpense).toLocaleString("ko-KR")}원
                    </Typography>
                </CheckBoxFilter>
            </Box>
        </Box>
    )
}
