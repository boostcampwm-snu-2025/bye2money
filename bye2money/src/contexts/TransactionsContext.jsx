import { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";

const TransactionsContext = createContext(null);

export function TransactionsContextProvider({ children }) {
    const { year, month } = useAppContext();
    const yearMonth = `${year}-${month}`;
    const [transactions, setTransactions] = useState([]);
    const [numTransactions, setNumTransactions] = useState(0);
    const [expenseChecked, setExpenseChecked] = useState(true);
    const [incomeChecked, setIncomeChecked] = useState(true);
    const [onRemoval, setOnRemoval] = useState(false);
    const [removalTarget, setRemovalTarget] = useState(null);
    
    const totalIncome = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    useEffect(() => {    
        fetchTransactions();
    });

    const fetchTransactions = async () => {
        const res = await fetch(`http://localhost:3001/api/transactions/${yearMonth}`);
        const data = await res.json();
        setTransactions(data.transactions);
        setNumTransactions(data.total);
    };

    const removeHandler = (targetTransaction) => {
        setOnRemoval(true);
        setRemovalTarget(targetTransaction);
    }
    
    const requestDeleteTransaction = (targetTransaction) => {
        const url = `http://localhost:3001/api/transactions/${yearMonth}/${targetTransaction.id}`;
        fetch(url, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
    }

    const transactionsContextValue = {
        transactions, setTransactions,
        numTransactions, setNumTransactions,
        expenseChecked, setExpenseChecked,
        incomeChecked, setIncomeChecked,
        onRemoval, setOnRemoval,
        removalTarget, setRemovalTarget,
        removeHandler,
        requestDeleteTransaction,
        totalExpense, totalIncome
    };

    return (
        <TransactionsContext.Provider value={transactionsContextValue}>
            {children}
        </TransactionsContext.Provider>
    )
}

export const useTransactionsContext = () => {
    const context = useContext(TransactionsContext);
    if (context === null) {
        throw new Error("No Transactions Context");
    }
    return context;
}