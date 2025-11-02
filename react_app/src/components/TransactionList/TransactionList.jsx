import { useEffect, useState, useMemo } from "react";
import "./TransactionList.css";
import "./TransactionItem.css";

const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    return days[date.getDay()];
};

const getCategoryColor = (category) => {
  const map = {
    "문화/여가": "#f5e1ff",
    "교통": "#d8f1ff",
    "식비": "#fff5d6",
    "쇼핑": "#ffe6e6",
    "기타": "#e9e9e9",
  };
  return map[category] || "#f0f0f0";
};



export default function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [showIncome, setShowIncome] = useState(true);
    const [showExpense, setShowExpense] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/transactions/getTransactionList");
                const data = await res.json();
                setTransactions(data);
            } catch (err) {
                console.error("Failed to fetch transactions:", err);
            }
        };
        fetchData();
    }, []);

    const grouped = useMemo(() => {
        return transactions.reduce((acc, tx) => {
            if (!acc[tx.date]) acc[tx.date] = [];
            acc[tx.date].push(tx);
            return acc;
        }, {});
    }, [transactions]);

    const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

    const filteredTransactions = useMemo(() => {
        return sortedDates.map((date) => {
            const txs = grouped[date].filter(
                (tx) =>
                    (showIncome && tx.type === "income") ||
                    (showExpense && tx.type === "expense")
            );
            return [date, txs];
        });
    }, [grouped, sortedDates, showIncome, showExpense]);

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="transaction-list">
            <div className="summary-bar">
                <div className="checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            checked={showIncome}
                            onChange={() => setShowIncome(!showIncome)}
                        />
                        수입 {totalIncome.toLocaleString()}원
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={showExpense}
                            onChange={() => setShowExpense(!showExpense)}
                        />
                        지출 {totalExpense.toLocaleString()}원
                    </label>
                </div>
            </div>

            {filteredTransactions.map(([date, txs]) =>
                txs.length === 0 ? null : (
                    <div key={date} className="date-section">
                        <div className="date-header">
                            <span className="date-text">
                                {date} {getWeekday(date)}
                            </span>
                            <span className="day-total">
                                <span className="income-total">
                                    수입{" "}
                                    {txs
                                        .filter((t) => t.type === "income")
                                        .reduce((s, t) => s + t.amount, 0)
                                        .toLocaleString()}
                                    원
                                </span>
                                <span className="expense-total">
                                    지출{" "}
                                    {txs
                                        .filter((t) => t.type === "expense")
                                        .reduce((s, t) => s + t.amount, 0)
                                        .toLocaleString()}
                                    원
                                </span>
                            </span>
                        </div>

                        <div className="transaction-day-group">
                            {txs.map((tx, idx) => (
                                <div
                                    key={tx.id}
                                    className={`transaction-row ${idx === 0 ? "first" : idx === txs.length - 1 ? "last" : ""
                                        }`}
                                >
                                    <div
                                        className="tx-category"
                                        style={{ backgroundColor: getCategoryColor(tx.category) }}
                                    >
                                        {tx.category}
                                    </div>
                                    <div className="tx-desc">{tx.description || "설명 없음"}</div>
                                    <div className="tx-payment">{tx.paymentMethod}</div>
                                    <div
                                        className={`tx-amount ${tx.type === "expense" ? "expense" : "income"
                                            }`}
                                    >
                                        {tx.type === "expense" ? "−" : "+"}
                                        {tx.amount.toLocaleString()}원
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )
            )}
        </div>
    );
}
