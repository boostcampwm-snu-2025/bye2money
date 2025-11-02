import { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "./AppContext";

const StatsContext = createContext(null);

export function StatsContextProvider({ children }) {
    const { year, month } = useAppContext();
    const yearMonth = `${year}-${month}`;
    
    const [expenses, setExpenses] = useState([]);
    const fetchTransactions = async () => {
        const res = await fetch(`http://localhost:3001/api/transactions/${yearMonth}`);
        const data = await res.json();
        setExpenses(data.transactions.filter(transaction => transaction.type === "expense"));
    };
    
    const totalExpense = expenses
        .reduce((sum, transaction) => (sum + transaction.amount), 0);
    
    const expenseByCategory = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = []
        }
        acc[expense.category].push(expense);
        return acc;
    }, {})

    function calculateExpenseStats() {
        const expenseStats = []
        Object.keys(expenseByCategory).forEach(category => {
            const categoryExpenses = expenseByCategory[category]
            const categoryTotalExpense = categoryExpenses.reduce((sum, expense) => (sum + Number(expense.amount)), 0);
            const percentage = totalExpense === 0 ? 0 : Math.floor((categoryTotalExpense / totalExpense) * 100)

            expenseStats.push({
                category: category,
                percentage: percentage,
                categoryTotalExpense: categoryTotalExpense,
                categoryExpenses: categoryExpenses
            })
        })

        const sortedExpenseStats = expenseStats.sort((a, b) => b.percentage - a.percentage);
        return sortedExpenseStats;
    }
    
    const expenseStats = calculateExpenseStats();

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

    function showDetails() {
        
    }

    useEffect(() => {    
        fetchTransactions();
    });

    const statsContextValue = {
        expenses, setExpenses,
        totalExpense,
        expenseStats,
        categoryColor,
        showDetails
    };

    return (
        <StatsContext.Provider value={statsContextValue}>
            {children}
        </StatsContext.Provider>
    )
}

export const useStatsContext = () => {
    const context = useContext(StatsContext);
    if (context === null) {
        throw new Error("No Stats Context");
    }
    return context;
}
