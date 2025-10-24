import { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";

const TransactionsContext = createContext(null);

export function TransactionsContextProvider({ children }) {
    const { year, month } = useAppContext();
    const [transactions, setTransactions] = useState([]);
    const [numTransactions, setNumTransactions] = useState(0);
    const [expenseChecked, setExpenseChecked] = useState(true);
    const [incomeChecked, setIncomeChecked] = useState(true);

    const fetchTransactions = async () => {
        const yearMonth = `${year}-${month}`;
        const res = await fetch(`http://localhost:3001/api/transactions/${yearMonth}`);
        const data = await res.json();
        setTransactions(data.transactions);
        setNumTransactions(data.total);
    };
    
    useEffect(() => {    
        fetchTransactions();
    });

    const transactionsContextValue = {
        transactions, setTransactions,
        numTransactions, setNumTransactions,
        expenseChecked, setExpenseChecked,
        incomeChecked, setIncomeChecked
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