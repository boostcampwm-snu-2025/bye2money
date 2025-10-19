import { 
    Box, 
    Typography, 
    Paper, 
    IconButton, 
    Divider, 
    Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";

export function Transactions({ year, month }) { 
    const [yearMonth, setYearMonth] = useState(`${year}-${month}`)
    const [transactions, setTransactions] = useState([]);
    const [numTransactions, setNumTransactions] = useState(0);
    const [expenseChecked, setExpenseChecked] = useState(true);
    const [incomeChecked, setIncomeChecked] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch(`http://localhost:3001/api/transactions/${yearMonth}`);
            const data = await res.json();
            setTransactions(data.transactions);
            setNumTransactions(data.total);
        };
        fetchTransactions();
    }, [yearMonth]);

    return (
        <Box
            sx={{
                position: "absolute",
                top: "280px",
                width: "846px",
                margin: "24px auto 0 auto",
                boxSizing: "border-box",
            }}>
            <TransactionsListHeader
                transactions={transactions}
                numTransactions={numTransactions}
                expenseChecked={expenseChecked}
                setExpenseChecked={setExpenseChecked}
                incomeChecked={incomeChecked}
                setIncomeChecked={setIncomeChecked}/>
            <TransactionsList 
                transactions={transactions} 
                incomeChecked={incomeChecked} 
                expenseChecked={expenseChecked}/>
        </Box>
    )
}

function TransactionsListHeader({ transactions, numTransactions, expenseChecked, setExpenseChecked, incomeChecked, setIncomeChecked }) {
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
                padding: "16px 8px",
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

function CheckBoxFilter({ isChecked, setIsChecked, children }) {
    return (
        <Box
            sx={{ 
                display: "flex", 
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"}}
            onClick={() => setIsChecked(!isChecked)}>
            <Box
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",    
                    width: "20px",
                    height: "20px",
                    backgroundColor: `rgba(0, 0, 0, ${isChecked ? 1.0 : 0.4})`,
                    borderRadius: "4px"}}>
                <CheckIcon sx={{ fontSize: "small", color: "white" }}/>
            </Box>
            {children}
        </Box>
    )
}

function TransactionsList({ transactions, incomeChecked, expenseChecked }) {
    
    return (
        <Box>
            <Paper>
            </Paper>
        </Box>
    );
}