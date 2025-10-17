import InputDate from "./InputDate";
import SignToggleButton from "./SignToggleButton";
import Amount from "@/components/Amount";
import InputContent from "./InputContent";
import Payment from "./Payment";
import ActionModal from "@/components/ActionModal";
import Category from "./Category";
import CircleButton from "@/components/CircleButton";
import { useState, useEffect } from "react";

const SectionForm = ({ onSave, editingTransaction }) => {
    // For InputDate
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    // For SignToggleButton
    const [isPlus, setIsPlus] = useState(true);
    // For Amount
    const [amount, setAmount] = useState("");
    // For InputContent
    const [content, setContent] = useState("");
    // For Payment method
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, name: "현금" },
        { id: 2, name: "신용카드" },
    ]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    // For Payment modal
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        data: null,
    });
    const [newMethodName, setNewMethodName] = useState("");
    // For Category
    const categoryIncomes = [
        { id: 1, name: "월급" },
        { id: 2, name: "용돈" },
        { id: 3, name: "기타 수입" },
    ];
    const categoryExpenses = [
        { id: 1, name: "생활" },
        { id: 2, name: "식비" },
        { id: 3, name: "교통" },
        { id: 4, name: "쇼핑/뷰티" },
        { id: 5, name: "의료/건강" },
        { id: 6, name: "문화/여가" },
        { id: 7, name: "미분류" },
    ];
    const [selectedCategory, setSelectedCategory] = useState(null);
    // For Payment method function
    const handleConfirm = () => {
        if (modalState.type === "add" && newMethodName.trim()) {
            const newMethod = { id: Date.now(), name: newMethodName.trim() };
            setPaymentMethods((current) => [...current, newMethod]);
        }
        if (modalState.type === "delete" && modalState.data) {
            setPaymentMethods((current) =>
                current.filter((m) => m.id !== modalState.data.id)
            );
            if (selectedMethod?.id === modalState.data.id) {
                setSelectedMethod(null);
            }
        }
        closeModal();
    };
    // For Payment modal function
    const openAddModal = () => {
        setModalState({ isOpen: true, type: "add" });
    };
    const openDeleteModal = (methodToDelete) => {
        setModalState({ isOpen: true, type: "delete", data: methodToDelete });
    };
    const closeModal = () => {
        setModalState({ isOpen: false, type: null, data: null });
        setNewMethodName("");
    };
    // Validation
    const isFormValid =
        amount.trim() !== "" &&
        content.trim() !== "" &&
        selectedMethod !== null &&
        selectedCategory !== null;

    const handleSubmit = (event) => {
        event.preventDefault(); // form의 기본 제출 동작(새로고침)을 막기

        if (!isFormValid) {
            return;
        }

        const transactionData = {
            date,
            type: isPlus ? "income" : "expense",
            amount: isPlus ? Number(amount) : -Number(amount),
            content,
            paymentMethod: selectedMethod.name,
            category: selectedCategory.name,
        };

        onSave(transactionData);
    };
    // when editing mode
    useEffect(() => {
        if (editingTransaction) {
            setDate(editingTransaction.date.split("T")[0]);
            setIsPlus(editingTransaction.amount > 0);
            setAmount(Math.abs(editingTransaction.amount).toString());
            setContent(editingTransaction.content);
            setSelectedMethod(editingTransaction.paymentMethod);
            setSelectedCategory(editingTransaction.category);
        } else {
            setDate(new Date().toISOString().slice(0, 10));
            setIsPlus(true);
            setAmount("");
            setContent("");
            setSelectedMethod(null);
            setSelectedCategory(null);
        }
    }, [editingTransaction]);
    // Rendering
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex divide-x divide-black justify-between items-center space-x-4 w-[960px] h-32 p-4 border border-black mx-auto"
            >
                <InputDate value={date} onChange={setDate} />

                <div className="flex divide-x justify-between items-center">
                    <SignToggleButton isPlus={isPlus} onChange={setIsPlus} />

                    <div className="flex items-center">
                        <Amount
                            value={amount}
                            onChange={setAmount}
                            readOnly={false}
                        />
                        <span className="text-xl text-gray-600"> 원</span>
                    </div>
                </div>

                <InputContent value={content} onChange={setContent} />

                <Payment
                    options={paymentMethods}
                    selectedOption={selectedMethod}
                    onSelect={setSelectedMethod}
                    onAdd={openAddModal}
                    onDelete={openDeleteModal}
                />

                <Category
                    options={isPlus ? categoryIncomes : categoryExpenses}
                    selectedOption={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                <CircleButton
                    isActive={isFormValid} // 유효성 검사 결과에 따라 활성화 상태 전달
                    activeColor="rgba(0,0,0,1)"
                    inactiveColor="rgba(140,140,140,1)"
                    imageUrl={"/checkLogo.png"}
                    onClick={handleSubmit}
                />
            </form>
            {modalState.isOpen && (
                <ActionModal
                    title={
                        modalState.type === "add"
                            ? "추가하실 결제 수단을 입력해주세요."
                            : "해당 결제 수단을 삭제하시겠습니까?"
                    }
                    confirmText={modalState.type === "add" ? "저장" : "삭제"}
                    onConfirm={handleConfirm}
                    onClose={closeModal}
                >
                    {modalState.type === "add" && (
                        <input
                            type="text"
                            value={newMethodName}
                            onChange={(e) => setNewMethodName(e.target.value)}
                            placeholder="예: 네이버페이"
                            className="border p-2 rounded w-full"
                            autoFocus
                        />
                    )}
                    {modalState.type === "delete" && (
                        <p>
                            <strong>{modalState.data?.name}</strong>'
                        </p>
                    )}
                </ActionModal>
            )}
        </>
    );
};

export default SectionForm;
