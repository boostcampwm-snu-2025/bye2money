import React, { useCallback, useMemo } from "react";
import Amount from "../../../components/Amount";
import cn from "classnames";
import { categoryStyleMap, DEFAULT_STYLE } from "../../../assets/constants";
import { Transaction } from "../../../store/globalType";

interface TransactionItemProps {
    transaction: Transaction;
    onEdit: (transaction: Transaction) => void;
    onDelete: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
    transaction,
    onEdit,
    onDelete,
}) => {
    const handleDeleteClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            onDelete(transaction);
        },
        [onDelete, transaction]
    );

    const { bgClass } = useMemo(() => {
        return categoryStyleMap.get(transaction.category) || DEFAULT_STYLE;
    }, [transaction.category]);

    return (
        <div
            onClick={() => onEdit(transaction)}
            className="group flex justify-between items-center h-[60px] hover:bg-gray-50 transition-colors"
        >
            <div
                className={cn(
                    "flex justify-center items-center w-[100px] h-full",
                    bgClass
                )}
            >
                <div className="text-xl">{transaction.category}</div>
            </div>

            <div className="w-[500px] pl-4 text-xl text-black">
                {transaction.content}
            </div>

            <span className="w-[100px] text-xl text-black">
                {transaction.paymentMethod}
            </span>

            <div className="w-[160px] flex items-center justify-end space-x-4">
                <div className="text-xl text-right">
                    <Amount value={transaction.amount} readOnly={true} />
                    <span>원</span>
                </div>

                <div className="hidden group-hover:flex px-2">
                    <button
                        onClick={handleDeleteClick}
                        className="text-xl text-gray-400 hover:text-black"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
