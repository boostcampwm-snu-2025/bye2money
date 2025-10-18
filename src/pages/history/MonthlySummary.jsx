import CircleButton from "@/components/CircleButton";

const MonthlySummary = ({ transactions, filter, onFilterChange }) => {
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
            <button onClick={() => onFilterChange("all")}>
                전체 내역 {totalCount}건
            </button>
            <div className="flex items-center">
                <div className="flex items-center space-x-2 w-[160px] justify-end">
                    <span>총수입 {totalIncome.toLocaleString()}원</span>
                    <CircleButton
                        size="s"
                        isActive={filter === "income"}
                        onClick={() => onFilterChange("income")}
                        imageUrl={"/checkLogo.png"}
                        activeColor="rgba(0,0,0,1)"
                        inactiveColor="rgba(140,140,140,0.6)"
                    />
                </div>
                <div className="flex items-center space-x-2 w-[160px] justify-end">
                    <span>
                        총지출 {Math.abs(totalExpense).toLocaleString()}원
                    </span>
                    <CircleButton
                        size="s"
                        isActive={filter === "expense"}
                        onClick={() => onFilterChange("expense")}
                        imageUrl={"/checkLogo.png"}
                        activeColor="rgba(0,0,0,1)"
                        inactiveColor="rgba(140,140,140,0.6)"
                    />
                </div>
            </div>
        </div>
    );
};

export default MonthlySummary;
