import { createContext, useContext, useMemo, useState } from 'react';
import { monthLabel } from '../utils/formatDate';

const Ctx = createContext(null);

export function MonthProvider({ children }) {
  const now = new Date();
  const [yearMonth, setYearMonth] = useState({ year: now.getFullYear(), month: now.getMonth() + 1 });

  const value = useMemo(() => {
    const prevMonth = () => {
      const d = new Date(yearMonth.year, yearMonth.month - 2, 1);
      setYearMonth({ year: d.getFullYear(), month: d.getMonth() + 1 });
    };
    const nextMonth = () => {
      const d = new Date(yearMonth.year, yearMonth.month, 1);
      setYearMonth({ year: d.getFullYear(), month: d.getMonth() + 1 });
    };
    return { yearMonth, label: monthLabel(yearMonth.year, yearMonth.month), prevMonth, nextMonth };
  }, [yearMonth]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useMonth = () => useContext(Ctx);
