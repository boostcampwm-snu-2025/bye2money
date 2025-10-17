import { useState } from "react";
import InputDate from "./InputDate";
import SignToggleButton from "./SignToggleButton";
import Amount from "@/components/Amount";
import InputContent from "./InputContent";
import Payment from "./Payment";
import ActionModal from "@/components/ActionModal";

const SectionForm = () => {
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
    // Rendering
    return (
        <>
            <form className="flex justify-between items-center space-x-4 w-[960px] h-32 p-4 border border-black mx-auto">
                <InputDate value={date} onChange={setDate} />
                <SignToggleButton isPlus={isPlus} onChange={setIsPlus} />

                <div className="flex items-center">
                    <Amount
                        value={amount}
                        onChange={setAmount}
                        readOnly={false}
                    />
                    <span className="text-xl text-gray-600"> 원</span>
                </div>

                <InputContent value={content} onChange={setContent} />

                <Payment
                    options={paymentMethods}
                    selectedOption={selectedMethod}
                    onSelect={setSelectedMethod}
                    onAdd={openAddModal}
                    onDelete={openDeleteModal}
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
