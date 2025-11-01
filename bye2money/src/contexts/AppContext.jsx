import { createContext, useState, useContext } from "react";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [view, setView] = useState("list");

    const monthChangeHandler = (newMonth) => {
    if (newMonth > 12) {
      setYear(year + 1);
      setMonth(newMonth - 12);
    } else if (newMonth <= 0) {
      setYear(year - 1);
      setMonth(newMonth + 12);
    } else {
      setMonth(newMonth);
    }
  };

    const viewChangeHandler = (event, nextView) => {
        if (nextView !== null) {
        setView(nextView);
        }
    };

    const appContextValue = {
        year, setYear,
        month, setMonth,
        view, setView,
        monthChangeHandler,
        viewChangeHandler
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("No App Context");
    }
    return context;
}
