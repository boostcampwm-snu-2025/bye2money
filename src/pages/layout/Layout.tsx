import React, { useState, useEffect, createContext, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../store/transactionsSlice";
import Header from "./Header";

interface DateContextType {
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const DateContext = createContext<DateContextType | null>(null);

export const useDate = (): DateContextType => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error("Cannot use date context outside of a DateProvider");
    }
    return context;
};

const Layout = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const location = useLocation(); // 현재 경로(URL)를 가져옴

    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as Function)(fetchTransactions());
    }, [dispatch]);

    const getViewMode = () => {
        if (location.pathname === "/calendar") return "calendar";
        if (location.pathname === "/stats") return "stats";
        return "list"; // 기본값
    };

    return (
        <DateContext.Provider value={{ currentDate, setCurrentDate }}>
            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                viewMode={getViewMode()}
            />
            <main className="relative mx-auto">
                <Outlet />
            </main>
        </DateContext.Provider>
    );
};

export default Layout;
