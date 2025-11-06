import type { Transaction } from './contexts/TransactionContext';

// Local helper function
const getTodayParts = () => {
    const today = new Date();

    const year = String(today.getFullYear());
    // getMonth()는 0부터 시작(0=1월, 11=12월)하므로 +1
    const month = String(today.getMonth() + 1).padStart(2, "0");
    // 1~9일을 '01', '02' 등으로 만들기 위해 padStart 사용
    const day = String(today.getDate()).padStart(2, "0");

    const monthName = today.toLocaleDateString('en-US', { month: 'long' });
    // const monthNameShort = today.toLocaleDateString('en-US', { month: 'short' });

    return { year, month, day, monthName };
};

// Exported Functions
export const getTodayDateString = (): string => {
    const { year, month, day } = getTodayParts();
    return `${year}-${month}-${day}`;
};

export const getTodayYear = (): string => {
    return getTodayParts().year;
};

export const getTodayMonth = (): string => {
    return getTodayParts().month;
};

export const getTodayMonthName = (): string => {
    return getTodayParts().monthName;
};
// export const getTodayMonthNameShort = (): string => {
//     return getTodayParts().monthNameShort;
// };

// Helper function to compare two transactions for equality
export const areTransactionsEqual = (t1: Transaction, t2: Transaction): boolean => {
    return t1.date === t2.date &&
           t1.amount === t2.amount &&
           t1.content === t2.content &&
           t1.paymentMethod === t2.paymentMethod &&
           t1.category === t2.category &&
           t1.type === t2.type;
};