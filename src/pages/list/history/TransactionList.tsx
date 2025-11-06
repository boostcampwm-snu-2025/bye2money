import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setEditing } from "../../../store/transactionsSlice";
import { useDate } from "../../layout/Layout";
import MonthlySummary from "./MonthlySummary";
import DailyTransactionGroup from "./DailyTransactionGroup";
import { Transaction } from "../../../store/globalType";
import { RootState } from "../../../store/store";

// Props 타입 정의
interface TransactionListProps {
    onDelete: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ onDelete }) => {
    const { items: allTransactions, filter } = useSelector(
        (state: RootState) => state.transactions
    );
    const dispatch = useDispatch();
    const { currentDate } = useDate();

    // 전체 transactions을 Header의 '월'로 필터링
    const monthlyTransactions: Transaction[] = useMemo(() => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // 0-11 기반 월

        return allTransactions.filter((tx: Transaction) => {
            const txDate = new Date(tx.date); // 👈 KST로 통일
            return (
                txDate.getFullYear() === currentYear &&
                txDate.getMonth() === currentMonth
            );
        });
    }, [allTransactions, currentDate]);

    // filtering transactions by total income/expense
    const filteredTransactions = useMemo(() => {
        const { income, expense } = filter;

        if (income && expense) {
            return monthlyTransactions; // 둘 다 켜져 있는 경우
        }
        if (income) {
            return monthlyTransactions.filter((tx) => tx.amount > 0); // 수입만 켜져 있는 경우
        }
        if (expense) {
            return monthlyTransactions.filter((tx) => tx.amount < 0); // 지출만 켜져 있는 경우
        }

        return []; // 둘 다 꺼져 있는 경우
    }, [monthlyTransactions, filter]);

    // filteredTransactions 기준으로 날짜 별 그룹
    const groupedTransactions: { [dateKey: string]: Transaction[] } =
        useMemo(() => {
            return filteredTransactions.reduce(
                (groups: { [dateKey: string]: Transaction[] }, tx) => {
                    const date = tx.date.split("T")[0];
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(tx);
                    return groups;
                },
                {}
            );
        }, [filteredTransactions]);

    const sortedDates = Object.keys(groupedTransactions).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    return (
        <section className="mt-12 w-[900px] mx-auto">
            <MonthlySummary
                transactions={monthlyTransactions} // MonthlySummary에는 월 별 리스트 전달
                filter={filter}
                onFilterChange={(filterType) => dispatch(setFilter(filterType))}
            />
            {/* 내역은 필터링된 sortedDates 사용 */}
            {sortedDates.map((date) => (
                <DailyTransactionGroup
                    key={date}
                    date={date}
                    transactions={groupedTransactions[date]}
                    onEdit={(tx) => dispatch(setEditing(tx))}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
};

export default TransactionList;
