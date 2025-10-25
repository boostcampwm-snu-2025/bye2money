import { createContext, useState, useContext } from "react";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [view, setView] = useState("list");
    const appContextValue = {
        year, setYear,
        month, setMonth,
        view, setView
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
