import { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "./AppContext";

const CalendarContext = createContext(null);

export function CalendarContextProvider({ children }) {
    const { year, month } = useAppContext();
    const yearMonth = `${year}-${month}`;
    
    const [transactions, setTransactions] = useState([]);
    const fetchTransactions = async () => {
        const res = await fetch(`http://localhost:3001/api/transactions/${yearMonth}`);
        const data = await res.json();
        setTransactions(data.transactions);
    };

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstDayOfWeek = firstDay.getDay();
    const lastDayOfWeek = lastDay.getDay();
    
    function calculateDailyStats(currentDay) {
        const targetYear = currentDay.getFullYear();
        const targetMonth = currentDay.getMonth() + 1
        const targetDate = currentDay.getDate();
        const fullDate = `${targetYear}.${targetMonth}.${targetDate}`
        const dayTransactions = transactions.filter(transaction => transaction.date === fullDate)
        const dayTotalIncome = dayTransactions
            .filter(transaction => transaction.type === "income")
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        const dayTotalExpense = dayTransactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        const dayTotalSum = dayTotalIncome - dayTotalExpense;
        
        return {
            date: currentDay.getDate(),
            fullDate: fullDate, 
            isCurrentMonth: currentDay.getMonth() + 1 === month,
            isToday: (todayYear === targetYear) && (todayMonth === targetMonth) && (todayDate === targetDate),
            dayTotalIncome: dayTotalIncome, 
            dayTotalExpense: dayTotalExpense, 
            dayTotalSum: dayTotalSum
        }
    }
    
    function generateCalendarWeeks() {
        let calendarWeeks = [];
        let currentDay = new Date(year, month - 1, 1 - firstDayOfWeek); 
        for (let week = 0; week < 6; week++) {
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                if (dayOfWeek === 0) {
                    calendarWeeks.push([]);
                }
                calendarWeeks[week].push(calculateDailyStats(currentDay));
                currentDay.setDate(currentDay.getDate() + 1);
            }
            if (currentDay.getMonth() + 1 !== month) return calendarWeeks;
        }  
    } 

    const calendarWeeks = generateCalendarWeeks();

    const totalIncome = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const totalExpense = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalSum = totalIncome - totalExpense;

    useEffect(() => {    
        fetchTransactions();
    });

    const calendarContextValue = {
        transactions, setTransactions,
        calendarWeeks,
        totalIncome, totalExpense, totalSum,
        todayYear, todayMonth, todayDate
    };

    return (
        <CalendarContext.Provider value={calendarContextValue}>
            {children}
        </CalendarContext.Provider>
    )
}

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (context === null) {
        throw new Error("No Calendar Context");
    }
    return context;
}
