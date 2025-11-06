import React, { useMemo } from "react";

interface FooterTransaction {
    amount: number;
}

interface CalendarFooterProps {
    transactions: FooterTransaction[];
}

const CalendarFooter: React.FC<CalendarFooterProps> = ({ transactions }) => {
    const { totalIncome, totalExpense, netTotal } = useMemo(() => {
        let totalIncome = 0;
        let totalExpense = 0;
        transactions.forEach((tx: FooterTransaction) => {
            if (tx.amount > 0) totalIncome += tx.amount;
            else totalExpense += tx.amount;
        });
        return {
            totalIncome,
            totalExpense,
            netTotal: totalIncome + totalExpense,
        };
    }, [transactions]);

    return (
        <div className="flex justify-between items-center mb-4 text-xl text-black">
            <div className="flex items-center gap-8">
                <div className="py-4">
                    총 수입: <span>{totalIncome.toLocaleString()}</span>원
                </div>
                <div className="py-4">
                    총 지출:{" "}
                    <span>{Math.abs(totalExpense).toLocaleString()}</span>원
                </div>
            </div>
            <div className="py-4">
                총계: <span>{netTotal.toLocaleString()}</span>원
            </div>
        </div>
    );
};

export default CalendarFooter;
