import Amount from "@/components/Amount";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    const handleDeleteClick = (event) => {
        // 클릭 이벤트가 부모 div의 onEdit으로 전파되는 것을 막음
        event.stopPropagation();
        onDelete(transaction);
    };

    return (
        <div
            onClick={() => onEdit(transaction)}
            className="group flex justify-between items-center p-3 border-b hover:bg-gray-50 transition-colors"
        >
            <div className="bg-gray-400">{transaction.category}</div>

            <div>{transaction.paymentMethod}</div>

            <div className="w-28 text-right font-semibold">
                <Amount value={transaction.amount} readOnly={true} />
                <span>원</span>
            </div>

            <span className="w-24 text-sm text-gray-500">
                {transaction.paymentMethod}
            </span>

            <div className="hidden group-hover:flex space-x-2">
                <button
                    onClick={handleDeleteClick}
                    className="text-xs text-gray-400 hover:text-gray-700"
                >
                    삭제
                </button>
            </div>
        </div>
    );
};

export default TransactionItem;
