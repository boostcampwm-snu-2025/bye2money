import { React } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { DayTransactionsTable } from "./DayTransactionList";

export function TransactionsList({ transactions, incomeChecked, expenseChecked }) {
    const filteredTransactions = transactions.filter(transaction => {
        if (!incomeChecked && !expenseChecked) return false;
        if (incomeChecked && !expenseChecked) return transaction.type === "income";
        if (!incomeChecked && expenseChecked) return transaction.type === "expense";
        return true;
    });

    const groupedByDate = filteredTransactions.reduce((groups, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {groups[date] = []}
        groups[date].push(transaction);
        return groups;
    }, {});

    const dayTransactions = Object.entries(groupedByDate);
    const transactionsList = dayTransactions.map(([date, transactions]) => {
        const dateString = (date) => {
            const dayofWeekTable = { 0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토" };
            const parsedDate = date.split(".");
            const month = parsedDate[1];
            const day = parsedDate[2];
            const dayOfWeek = dayofWeekTable[new Date(date).getDay()];
            const result = `${month}월 ${day}일 ${dayOfWeek}요일`;
            return result;
        }

        const dayTotalIncome = transactions
            .filter(transaction => transaction.type === "income")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const dayTotalExpense = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        return (
            dayTransactions.length === 0 ?
                <Paper sx={{ textAlign: "center" }}>
                    <Typography color="text.secondary">표시할 내역이 없습니다.</Typography>
                </Paper>
                :
                <Box 
                    key={date} 
                    sx={{ marginBottom: 2 }}>
                    <Box
                        sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center",
                            height: "32px"}}>  
                        <Typography variant="body1" fontWeight="bold">{dateString(date)}</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "24px"}}>
                            <Typography variant="body1" fontWeight="bold">
                                수입 {Number(dayTotalIncome).toLocaleString("ko-KR")}원
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                지출 {Number(dayTotalExpense).toLocaleString("ko-KR")}원
                            </Typography>
                        </Box>
                    </Box>
                    <DayTransactionsTable transactions={transactions}/>
                </Box> 
        )
    })
    
    return (
        <Box sx={{ mt: 2 }}>
            {transactionsList}
        </Box>
    );
}
