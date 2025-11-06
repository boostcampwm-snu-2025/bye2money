import InputDate from "./InputDate";
import SignToggleButton from "./SignToggleButton";
import Amount from "../../../components/Amount";
import InputContent from "./InputContent";
import Payment from "./Payment";
import ActionModal from "../../../components/ActionModal";
import Category from "./Category";
import CircleButton from "../../../components/CircleButton";
import {
    INITIAL_PAYMENT_METHODS,
    CATEGORY_EXPENSES,
    CATEGORY_INCOMES,
} from "../../../assets/constants";
import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addTransaction,
    updateTransaction,
} from "../../../store/transactionsSlice";
import { Transaction } from "../../../store/globalType";
import { RootState, AppDispatch } from "../../../store/store";

interface OptionType {
    id: number | string;
    name: string;
}

// Reducer 상태 타입
interface FormState {
    date: string;
    isPlus: boolean;
    amount: string;
    content: string;
    selectedMethod: OptionType | null;
    selectedCategory: OptionType | null;
}

// Reducer 액션 타입
type FormAction =
    | {
          type: "SET_FIELD";
          field: keyof FormState;
          value: FormState[keyof FormState];
      }
    | { type: "TOGGLE_SIGN" }
    | { type: "LOAD_TRANSACTION"; payload: Transaction }
    | { type: "RESET_FORM" };

// 모달 상태 타입
interface ModalState {
    isOpen: boolean;
    type: "add" | "delete" | null;
    data: OptionType | null;
}

// 상수 Map
const paymentMethodsMap: Map<string, OptionType> = new Map(
    INITIAL_PAYMENT_METHODS.map((m) => [m.name, m])
);
const categoryIncomesMap: Map<string, OptionType> = new Map(
    CATEGORY_INCOMES.map((c) => [c.name, c])
);
const categoryExpensesMap: Map<string, OptionType> = new Map(
    CATEGORY_EXPENSES.map((c) => [c.name, c])
);

// 폼의 초기 상태
const initialFormState = {
    date: new Date().toISOString().slice(0, 10),
    isPlus: true,
    amount: "",
    content: "",
    selectedMethod: null,
    selectedCategory: null,
};
// 폼 상태 변경 로직
function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        // 폼 필드 1개 변경
        case "SET_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };
        // 수입/지출 토글 (카테고리 초기화)
        case "TOGGLE_SIGN":
            return {
                ...state,
                isPlus: !state.isPlus,
                selectedCategory: null, // 부호가 바뀌면 카테고리 목록이 바뀌므로 리셋
            };
        // 수정할 데이터 불러오기
        case "LOAD_TRANSACTION":
            const tx = action.payload;
            const txAmount = tx.amount;
            return {
                date: tx.date.split("T")[0],
                isPlus: txAmount > 0,
                amount: Math.abs(txAmount).toString(),
                content: tx.content,
                selectedMethod: paymentMethodsMap.get(tx.paymentMethod) || null,
                selectedCategory:
                    (txAmount > 0
                        ? categoryIncomesMap
                        : categoryExpensesMap
                    ).get(tx.category) || null,
            };
        // 폼 초기화
        case "RESET_FORM":
            return initialFormState;
        default:
            return state;
    }
}

const SectionForm: React.FC = () => {
    // global state
    const editingTransaction = useSelector(
        (state: RootState) => state.transactions.editingTransaction
    );
    const dispatch = useDispatch<AppDispatch>(); // Redux dispatch

    // form state
    const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

    // modal state
    const [paymentMethods, setPaymentMethods] = useState<OptionType[]>(
        INITIAL_PAYMENT_METHODS
    );
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        type: null,
        data: null,
    });
    const [newMethodName, setNewMethodName] = useState("");

    useEffect(() => {
        if (editingTransaction) {
            // "수정 모드"
            dispatchForm({
                type: "LOAD_TRANSACTION",
                payload: editingTransaction,
            });
        } else {
            // "입력 모드"
            dispatchForm({ type: "RESET_FORM" });
        }
    }, [editingTransaction]);

    const handleConfirm = () => {
        if (modalState.type === "add" && newMethodName.trim()) {
            const newMethod = { id: Date.now(), name: newMethodName.trim() };
            setPaymentMethods((current) => [...current, newMethod]);
        }
        if (modalState.type === "delete" && modalState.data) {
            setPaymentMethods((current) =>
                current.filter((m) => m.id !== modalState.data!.id)
            );
            if (formState.selectedMethod?.id === modalState.data?.id) {
                dispatchForm({
                    type: "SET_FIELD",
                    field: "selectedMethod",
                    value: null,
                });
            }
        }
        closeModal();
    };
    const openAddModal = () =>
        setModalState({ isOpen: true, type: "add", data: null });
    const openDeleteModal = (methodToDelete: OptionType) =>
        setModalState({ isOpen: true, type: "delete", data: methodToDelete });
    const closeModal = () => {
        setModalState({ isOpen: false, type: null, data: null });
        setNewMethodName("");
    };

    const isFormValid: boolean =
        formState.amount.trim() !== "" &&
        formState.content.trim() !== "" &&
        formState.selectedMethod !== null &&
        formState.selectedCategory !== null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isFormValid) return;

        const transactionData = {
            date: formState.date,
            amount: formState.isPlus
                ? Number(formState.amount)
                : -Number(formState.amount),
            content: formState.content,
            paymentMethod: formState.selectedMethod!.name,
            category: formState.selectedCategory!.name,
        };

        if (editingTransaction) {
            dispatch(
                updateTransaction({
                    ...transactionData,
                    id: editingTransaction.id,
                })
            );
            // 'update' 후에는 useEffect가 editingTransaction(null)을 감지하고 'RESET_FORM'을 호출
        } else {
            dispatch(addTransaction({ ...transactionData, id: Date.now() }));
            // 'add' 후에는 수동으로 폼 리셋
            dispatchForm({ type: "RESET_FORM" });
        }
    };

    // Rendering
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white flex divide-x divide-black items-center w-[960px] h-[100px] px-[12px] border border-black mx-auto"
            >
                <div className="flex items-center pr-4 w-[140px] h-[60px]">
                    <InputDate
                        value={formState.date}
                        onChange={(newDate) =>
                            dispatchForm({
                                type: "SET_FIELD",
                                field: "date",
                                value: newDate,
                            })
                        }
                    />
                </div>

                <div className="flex items-center px-4 w-[240px] h-[60px]">
                    <SignToggleButton
                        isPlus={formState.isPlus}
                        onChange={() => dispatchForm({ type: "TOGGLE_SIGN" })}
                    />

                    <div className="flex items-center ml-2">
                        <Amount
                            value={formState.amount}
                            onChange={(newAmount) =>
                                dispatchForm({
                                    type: "SET_FIELD",
                                    field: "amount",
                                    value: newAmount,
                                })
                            }
                            readOnly={false}
                        />
                        <span className="text-xl text-black ml-1"> 원</span>
                    </div>
                </div>

                <div className="flex items-center px-4 w-[200px] h-[60px]">
                    <InputContent
                        value={formState.content}
                        onChange={(newContent) =>
                            dispatchForm({
                                type: "SET_FIELD",
                                field: "content",
                                value: newContent,
                            })
                        }
                    />
                </div>

                <div className="flex items-center px-4 w-[160px] h-[60px]">
                    <Payment
                        options={paymentMethods}
                        selectedOption={formState.selectedMethod}
                        onSelect={(newMethod) =>
                            dispatchForm({
                                type: "SET_FIELD",
                                field: "selectedMethod",
                                value: newMethod,
                            })
                        }
                        onAdd={openAddModal}
                        onDelete={openDeleteModal}
                    />
                </div>
                <div className="flex items-center px-4 w-[160px] h-[60px]">
                    <Category
                        options={
                            formState.isPlus
                                ? CATEGORY_INCOMES
                                : CATEGORY_EXPENSES
                        }
                        selectedOption={formState.selectedCategory}
                        onSelect={(newCategory) =>
                            dispatchForm({
                                type: "SET_FIELD",
                                field: "selectedCategory",
                                value: newCategory,
                            })
                        }
                    />
                </div>
                <div className="flex items-center pl-4 w-auto h-[60px]">
                    <CircleButton
                        isActive={isFormValid} // 유효성 검사 결과에 따라 활성화 상태 전달
                        activeClass="bg-black"
                        inactiveClass="bg-gray-400"
                        imageUrl={"/images/checkLogo.png"}
                        type="submit"
                    />
                </div>
            </form>
            {modalState.isOpen && (
                <ActionModal
                    title={
                        modalState.type === "add"
                            ? "추가하실 결제 수단을 입력해주세요."
                            : "해당 결제 수단을 삭제하시겠습니까?"
                    }
                    confirmText={modalState.type === "add" ? "추가" : "삭제"}
                    onConfirm={handleConfirm}
                    onClose={closeModal}
                >
                    {modalState.type === "add" && (
                        <input
                            type="text"
                            value={newMethodName}
                            onChange={(e) => setNewMethodName(e.target.value)}
                            placeholder="예: 네이버페이"
                            className="border p-2 rounded w-full mt-2"
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
