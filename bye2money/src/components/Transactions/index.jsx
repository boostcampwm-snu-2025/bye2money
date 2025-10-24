import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";

import { TransactionsHeader } from "./TransactionsHeader.jsx";
import { TransactionsList } from "./TransactionsList";

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
            <TransactionsHeader
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
