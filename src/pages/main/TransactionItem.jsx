import Amount from "@/components/Amount";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    return (
        <div className="group flex justify-between items-center p-3 border-b hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-6">
                <span className="w-24 text-sm text-gray-500">
                    {transaction.paymentMethod}
                </span>

                <div className="w-28 text-right font-semibold">
                    <Amount value={transaction.amount} readOnly={true} />
                    <span>원</span>
                </div>

                <div className="hidden group-hover:flex space-x-2">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="text-xs text-gray-400 hover:text-gray-700"
                    >
                        수정
                    </button>
                    <button
                        onClick={() => onDelete(transaction)}
                        className="text-xs text-gray-400 hover:text-gray-700"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
