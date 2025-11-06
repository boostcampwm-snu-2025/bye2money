import SectionForm from "./form/SectionForm";
import TransactionList from "./history/TransactionList";
import ActionModal from "../../components/ActionModal";
import Amount from "../../components/Amount";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../store/transactionsSlice";
import { Transaction } from "../../store/globalType";
import { AppDispatch } from "../../store/store";

interface DeleteModalState {
    isOpen: boolean;
    data: Transaction | null; // data가 Transaction 객체 또는 null
}

const ListPage: React.FC = () => {
    const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
        isOpen: false,
        data: null, // data가 삭제할 transaction 객체
    });

    const dispatch = useDispatch<AppDispatch>();

    const openDeleteConfirmationModal = (transactionToDelete: Transaction) => {
        setDeleteModalState({ isOpen: true, data: transactionToDelete });
    };

    const closeDeleteConfirmationModal = () => {
        setDeleteModalState({ isOpen: false, data: null });
    };

    const handleConfirmDelete = () => {
        if (deleteModalState.data) {
            // Redux Store에 삭제 요청
            dispatch(deleteTransaction(deleteModalState.data.id));
        }
        closeDeleteConfirmationModal();
    };

    return (
        <>
            <div className="-mt-16 z-10 relative">
                <SectionForm />
            </div>
            <TransactionList onDelete={openDeleteConfirmationModal} />
            {deleteModalState.isOpen && (
                <ActionModal
                    size="l"
                    title="해당 내역을 삭제하시겠습니까?"
                    confirmText="삭제"
                    onConfirm={handleConfirmDelete}
                    onClose={closeDeleteConfirmationModal}
                >
                    {deleteModalState.data && (
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
                    )}
                </ActionModal>
            )}
        </>
    );
};

export default ListPage;
