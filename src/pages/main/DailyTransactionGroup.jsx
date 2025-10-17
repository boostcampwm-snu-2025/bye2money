import TransactionItem from "./TransactionItem";

const DailyTransactionGroup = ({ date, transactions, onEdit, onDelete }) => {
    const dailyIncome = transactions.reduce(
        (sum, tx) => (tx.amount > 0 ? sum + tx.amount : sum),
        0
    );
    const dailyExpense = transactions.reduce(
        (sum, tx) => (tx.amount < 0 ? sum + tx.amount : sum),
        0
    );

    return (
        <div className="my-4">
            {/* 일별 요약 */}
            <div className="flex justify-between items-center text-sm text-gray-500 p-2 bg-gray-100 rounded-t-lg">
                <span>
                    {new Date(date).toLocaleDateString("ko-KR", {
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                    })}
                </span>
                <div className="space-x-4">
                    {dailyIncome > 0 && (
                        <span>수입 {dailyIncome.toLocaleString()}원</span>
                    )}
                    {dailyExpense < 0 && (
                        <span>
                            지출 {Math.abs(dailyExpense).toLocaleString()}원
                        </span>
                    )}
                </div>
            </div>
            {/* 내역 리스트 */}
            <div>
                {transactions.map((tx) => (
                    <TransactionItem
                        key={tx.id}
                        transaction={tx}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default DailyTransactionGroup;
