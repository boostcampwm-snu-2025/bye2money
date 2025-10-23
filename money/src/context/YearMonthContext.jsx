import { createContext, useContext, useState } from "react";

const YearMonthContext = createContext(null);

export function YearMonthProvider({ children }) {
  const now = new Date();
  const [ym, setYm] = useState({ year: now.getFullYear(), month: now.getMonth() + 1 });
  return (
    <YearMonthContext.Provider value={{ ym, setYm }}>
      {children}
    </YearMonthContext.Provider>
  );
}

export function useYearMonth() {
  const ctx = useContext(YearMonthContext);
  if (!ctx) throw new Error("useYearMonth must be used within YearMonthProvider");
  return ctx;
}
