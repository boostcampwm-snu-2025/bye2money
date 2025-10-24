import { React } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CheckBoxFilter } from "./CheckBoxFilter";

export function TransactionsHeader({ transactions, numTransactions, expenseChecked, setExpenseChecked, incomeChecked, setIncomeChecked }) {
    const totalIncome = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    
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
