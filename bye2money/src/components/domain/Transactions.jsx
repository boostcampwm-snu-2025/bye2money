import { 
    Box, 
    Typography, 
    Paper } from "@mui/material";
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
    });

    return (
        <Box
            sx={{
                position: "absolute",
                top: "280px",
                width: "846px",
                boxSizing: "border-box"}}>
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

function DayTransactionsTable({ transactions }) {
    const dayTransactions = Object.entries(transactions);
    const dayTransactionsList = dayTransactions.map(([date, transaction]) => {
        return (
            <TransactionItem 
                key={transaction.id} 
                transaction={transaction}>
            </TransactionItem>
        );
    });
    
    return (
        <Box
            sx={{ 
                mt: 1,
                borderTop: '0.1px solid #000000',
                borderBottom: '0.1px solid #000000'}}>
            {dayTransactionsList}
        </Box>  
    );
}

function TransactionItem({ transaction }) {
    const isIncome = transaction.type === "income";
    const amountColor = isIncome ? "primary.main" : "error.main";
    const amountSign = isIncome ? "+" : "-";
    const categoryColor = {
        "생활": "#A7B9E9",
        "쇼핑/뷰티": "#D7CA6B",
        "의료/건강": "#BCDFD3",
        "식비": "#C5E0EB",
        "교통": "#7DB7BF",
        "문화/여가": "#BDA6E1",
        "미분류": "#F0B0D3",
        "월급": "#E39D5D",
        "용돈": "#AACD7E",
        "기타수입": "#A28878"
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "48px"}}>
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: categoryColor[transaction.category],
                    alignContent: "center"}}>
                <Typography
                    variant="body2" 
                    sx={{ textAlign: "center" }}> 
                    {transaction.category}
                </Typography>
            </Box>
            <Box
                sx={{ 
                    flex: 4,
                    alignContent: "center",
                    ml: "16px"}}>
                <Typography
                    variant="body2" 
                    sx={{ textAlign: "left" }}> 
                    {transaction.description}
                </Typography>
            </Box>
            <Box
                sx={{ 
                    flex: 3,
                    alignContent: "center",
                    ml: "16px"}}>
                <Typography
                    variant="body2" 
                    sx={{ textAlign: "left" }}> 
                    {transaction.paymentMethod}
                </Typography>
            </Box>
            <Box
                sx={{ 
                    flex: 1,
                    alignContent: "center",
                    mr: "16px"}}>
                <Typography 
                    variant="body2"
                    color={amountColor} 
                    sx={{ textAlign: "right" }}>
                    {amountSign} {Number(transaction.amount).toLocaleString()}원
                </Typography>
            </Box>
        </Box>
    );
}
