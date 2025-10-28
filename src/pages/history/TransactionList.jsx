import MonthlySummary from "./MonthlySummary";
import DailyTransactionGroup from "./DailyTransactionGroup";

const TransactionList = ({
    transactions,
    onEdit,
    onDelete,
    filter,
    onFilterChange,
}) => {
    // 데이터를 날짜별로 그룹
    const groupedTransactions = transactions.reduce((groups, tx) => {
        const date = tx.date.split("T")[0]; // 날짜 부분만 추출
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(tx);
        return groups;
    }, {});

    // 날짜를 최신순으로 정렬
    const sortedDates = Object.keys(groupedTransactions).sort(
        (a, b) => new Date(b) - new Date(a)
    );

    return (
        <section className="mt-12 w-[900px] mx-auto">
            <MonthlySummary
                transactions={transactions}
                filter={filter}
                onFilterChange={onFilterChange}
            />
            {sortedDates.map((date) => (
                <DailyTransactionGroup
                    key={date}
                    date={date}
                    transactions={groupedTransactions[date]}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
};

export default TransactionList;
