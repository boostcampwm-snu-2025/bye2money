import React from "react";
import CircleButton from "../../../components/CircleButton";
import { Transaction } from "../../../store/globalType";

interface MonthlySummaryProps {
    transactions: Transaction[];
    filter: {
        income: boolean;
        expense: boolean;
    };
    onFilterChange: (filterType: "income" | "expense") => void;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({
    transactions,
    filter,
    onFilterChange,
}) => {
    const totalCount = transactions.length;
    const totalIncome = transactions.reduce(
        (sum, tx) => (tx.amount > 0 ? sum + tx.amount : sum),
        0
    );
    const totalExpense = transactions.reduce(
        (sum, tx) => (tx.amount < 0 ? sum + tx.amount : sum),
        0
    );

    return (
        <div className="flex justify-between items-center bg-white text-xl">
            <span>전체 내역 {totalCount}건</span>

            <div className="flex items-center">
                <div className="flex items-center space-x-2 w-[160px] justify-end">
                    <span>총수입 {totalIncome.toLocaleString()}원</span>
                    <CircleButton
                        size="s"
                        isActive={filter.income}
                        onClick={() => onFilterChange("income")}
                        imageUrl={"/images/checkLogo.png"}
                        activeClass="bg-black"
                        inactiveClass="bg-gray-400"
                    />
                </div>
                <div className="flex items-center space-x-2 w-[160px] justify-end">
                    <span>
                        총지출 {Math.abs(totalExpense).toLocaleString()}원
                    </span>
                    <CircleButton
                        size="s"
                        isActive={filter.expense}
                        onClick={() => onFilterChange("expense")}
                        imageUrl={"/images/checkLogo.png"}
                        activeClass="bg-black"
                        inactiveClass="bg-gray-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default MonthlySummary;
