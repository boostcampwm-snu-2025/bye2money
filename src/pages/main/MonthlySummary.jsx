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
        <div className="flex justify-between items-center p-4 bg-white border-b sticky top-0">
            <button onClick={() => onFilterChange("all")}>
                전체 내역 {totalCount}건
            </button>
            <div className="flex items-center space-x-2">
                <span>총수입 {totalIncome.toLocaleString()}원</span>
                <CircleButton
                    isActive={filter === "income"}
                    onClick={() => onFilterChange("income")}
                    imageUrl={"/statsLogo.png"}
                    activeColor="rgba(255,255,255,1)"
                    inactiveColor="rgba(140,140,140,1)"
                />
                <span>총지출 {Math.abs(totalExpense).toLocaleString()}원</span>
                <CircleButton
                    isActive={filter === "expense"}
                    onClick={() => onFilterChange("expense")}
                    imageUrl={"/statsLogo.png"}
                    activeColor="rgba(255,255,255,1)"
                    inactiveColor="rgba(140,140,140,1)"
                />
            </div>
        </div>
    );
};

export default MonthlySummary;
