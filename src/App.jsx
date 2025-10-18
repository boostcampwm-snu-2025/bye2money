import Header from "./pages/header/Header";
import SectionForm from "./pages/form/SectionForm";
import TransactionList from "./pages/main/TransactionList";
import { useState, useMemo } from "react";

// 임시 데이터
const MOCK_TRANSACTIONS = [
    {
        id: 1,
        date: "2025-08-14T10:00:00Z",
        category: "문화/여가",
        content: "스트리밍 서비스 정기 결제",
        paymentMethod: "현대카드",
        amount: -10900,
    },
    {
        id: 2,
        date: "2025-08-14T12:30:00Z",
        category: "교통",
        content: "후불 교통비 결제",
        paymentMethod: "현대카드",
        amount: -45340,
    },
    {
        id: 3,
        date: "2025-08-13T18:00:00Z",
        category: "미분류",
        content: "온라인 세미나 신청",
        paymentMethod: "현대카드",
        amount: -10000,
    },
    {
        id: 4,
        date: "2025-08-10T14:00:00Z",
        category: "식비",
        content: "잔치국수와 김밥",
        paymentMethod: "현대카드",
        amount: -9500,
    },
    {
        id: 5,
        date: "2025-08-10T09:00:00Z",
        category: "월급",
        content: "8월 급여",
        paymentMethod: "현금",
        amount: 2010580,
    },
];

const App = () => {
    // States shared Header and main
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState("list");
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    // State for saving edited transaction data (if null, 'input mode')
    const [editingTransaction, setEditingTransaction] = useState(null);
    // State for filtering expense/income ('all', 'income', 'expense')
    const [filter, setFilter] = useState("all");

    const handleSaveTransaction = (newTransactionData) => {
        if (editingTransaction) {
            // 수정 모드: 기존 id를 사용하여 배열에서 해당 항목을 업데이트
            setTransactions(
                transactions.map((tx) =>
                    tx.id === editingTransaction.id
                        ? { ...tx, ...newTransactionData }
                        : tx
                )
            );
        } else {
            // 입력 모드: 새 id를 부여하여 배열에 추가
            setTransactions([
                ...transactions,
                { ...newTransactionData, id: Date.now() },
            ]);
        }
        setEditingTransaction(null); // 폼을 '입력 모드'로 초기화
    };

    const handleEdit = (transactionToEdit) => {
        setEditingTransaction(transactionToEdit);
    };

    const handleDelete = (transactionToDelete) => {
        if (window.confirm("정말로 이 내역을 삭제하시겠습니까?")) {
            setTransactions(
                transactions.filter((tx) => tx.id !== transactionToDelete.id)
            );
        }
    };

    const filteredTransactions = useMemo(() => {
        if (filter === "all") return transactions;
        if (filter === "income")
            return transactions.filter((tx) => tx.amount > 0);
        if (filter === "expense")
            return transactions.filter((tx) => tx.amount < 0);
        return transactions;
    }, [transactions, filter]);

    return (
        <>
            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <main className="relative mx-auto">
                <div className="-mt-16 z-10 relative">
                    <SectionForm
                        onSave={handleSaveTransaction}
                        editingTransaction={editingTransaction}
                    />
                </div>
                <TransactionList
                    transactions={filteredTransactions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    filter={filter}
                    onFilterChange={setFilter}
                />
            </main>
        </>
    );
};

export default App;
