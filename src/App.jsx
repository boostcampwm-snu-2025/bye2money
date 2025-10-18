import Header from "./pages/header/Header";
import SectionForm from "./pages/form/SectionForm";
import ActionModal from "@/components/ActionModal";
import Amount from "@/components/Amount";
import TransactionList from "./pages/history/TransactionList";
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
        paymentMethod: "신용카드",
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
    // State for delete modal
    const [deleteModalState, setDeleteModalState] = useState({
        isOpen: false,
        data: null,
    });

    const handleSaveTransaction = (newTransactionData) => {
        if (editingTransaction) {
            // 수정 모드: 기존 id를 사용하여 배열에서 해당 항목을 업데이트
            setTransactions(
                transactions.map((tx) =>
                    tx.id === editingTransaction.id
                        ? { ...tx, ...newTransactionData, id: tx.id }
                        : tx
                )
            );
        } else {
            // 입력 모드: 새 id를 부여하여 배열에 추가
            const newTx = { ...newTransactionData, id: Date.now() };
            setTransactions([...transactions, newTx]);
            console.log("Added Transaction:", newTx);
        }
        setEditingTransaction(null); // 폼을 '입력 모드'로 초기화
    };

    const handleEdit = (transactionToEdit) => {
        setEditingTransaction(transactionToEdit);
    };

    // 내역 삭제 관련 함수
    const openDeleteConfirmationModal = (transactionToDelete) => {
        setDeleteModalState({ isOpen: true, data: transactionToDelete });
    };
    const closeDeleteConfirmationModal = () => {
        setDeleteModalState({ isOpen: false, data: null });
    };
    const handleConfirmDelete = () => {
        if (deleteModalState.data) {
            setTransactions(
                transactions.filter((tx) => tx.id !== deleteModalState.data.id)
            );
            console.log("Deleted Transaction ID:", deleteModalState.data.id);
            // 만약 삭제한 항목이 수정 중인 항목이었다면 수정 모드 취소
            if (editingTransaction?.id === deleteModalState.data.id) {
                setEditingTransaction(null);
            }
        }
        closeDeleteConfirmationModal();
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
                        key={editingTransaction ? editingTransaction.id : "new"}
                        onSave={handleSaveTransaction}
                        editingTransaction={editingTransaction}
                    />
                </div>
                <TransactionList
                    transactions={filteredTransactions}
                    onEdit={handleEdit}
                    onDelete={openDeleteConfirmationModal}
                    filter={filter}
                    onFilterChange={setFilter}
                />
                {deleteModalState.isOpen && (
                    <ActionModal
                        size="l"
                        title="해당 내역을 삭제하시겠습니까?"
                        confirmText="삭제"
                        onConfirm={handleConfirmDelete}
                        onClose={closeDeleteConfirmationModal}
                    >
                        <div className="space-y-1 text-lg text-gray-600">
                            <p>
                                <strong>카테고리:</strong>{" "}
                                {deleteModalState.data?.category} (
                                {deleteModalState.data?.amount > 0
                                    ? "수입"
                                    : "지출"}
                                )
                            </p>
                            <p>
                                <strong>내용:</strong>{" "}
                                {deleteModalState.data?.content}
                            </p>
                            <p>
                                <strong>결제수단:</strong>{" "}
                                {deleteModalState.data?.paymentMethod}
                            </p>
                            <p>
                                <strong>금액:</strong>{" "}
                                <Amount
                                    value={deleteModalState.data?.amount || 0}
                                    readOnly={true}
                                />{" "}
                                원
                            </p>
                        </div>
                    </ActionModal>
                )}
            </main>
        </>
    );
};

export default App;
