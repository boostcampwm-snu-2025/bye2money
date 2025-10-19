import { createContext, useContext, useMemo, useState } from 'react';
import { monthLabel } from '../utils/formatDate';

const Ctx = createContext(null);

export function MonthProvider({ children }) {
  const now = new Date();
  const [month, setMonth] = useState({ year: now.getFullYear(), month: now.getMonth() + 1 });

  const value = useMemo(() => {
    const prevMonth = () => {
      const d = new Date(month.year, month.month - 2, 1);
      setMonth({ year: d.getFullYear(), month: d.getMonth() + 1 });
    };
    const nextMonth = () => {
      const d = new Date(month.year, month.month, 1);
      setMonth({ year: d.getFullYear(), month: d.getMonth() + 1 });
    };
    return { month, label: monthLabel(month.year, month.month), prevMonth, nextMonth };
  }, [month]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useMonth = () => useContext(Ctx);
