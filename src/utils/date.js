 import { format, addMonths, subMonths } from "date-fns";
 export const toYMD = (d) => format(d, "yyyy-MM-dd");
 export const toYM  = (d) => format(d, "yyyy-MM");
 export const parseYMD = (s) => {
   if (!s) return new Date(NaN);
   const [y, m, d] = s.split("-").map(Number);
   return new Date(y, (m || 1) - 1, d || 1);
 };
export const startOfMonthISO = (d) => format(new Date(d), "yyyy-MM-01");

export const fmtYM = (d) => format(new Date(d), "yyyy.MM");
export const nextMonth = (d) => addMonths(new Date(d), 1);
export const prevMonth = (d) => subMonths(new Date(d), 1);
export const weekdayKr = (ymd) => ["일","월","화","수","목","금","토"][parseYMD(ymd).getDay()];
