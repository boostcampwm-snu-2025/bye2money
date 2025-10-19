import { useCallback, useState } from 'react';
import type { YearMonth } from '../types/date';

export function formatDate(year: number, month: number, day: number): string {
  const mm = month.toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');
  return `${year}.${mm}.${dd}`;
}

export function getTodayYM(): YearMonth {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

export function calcPrevMonth(ym: YearMonth): YearMonth {
  if (ym.month === 1) return { year: ym.year - 1, month: 12 };
  return { year: ym.year, month: ym.month - 1 };
}

export function calcNextMonth(ym: YearMonth): YearMonth {
  if (ym.month === 12) return { year: ym.year + 1, month: 1 };
  return { year: ym.year, month: ym.month + 1 };
}

export function getMonthName(year: number, month: number, locale = 'en-US'): string {
  return new Date(year, month - 1).toLocaleString(locale, { month: 'long' });
}

export function useMonthNavigator(initial?: YearMonth) {
  const [ym, setYM] = useState<YearMonth>(initial ?? getTodayYM());

  const prev = useCallback(() => {
    setYM((cur) => calcPrevMonth(cur));
  }, []);

  const next = useCallback(() => {
    setYM((cur) => calcNextMonth(cur));
  }, []);

  return { year: ym.year, month: ym.month, prev, next };
}