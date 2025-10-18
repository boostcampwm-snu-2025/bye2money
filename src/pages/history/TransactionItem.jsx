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
            className="group flex justify-between items-center h-[60px] hover:bg-gray-50 transition-colors"
        >
            <div className="flex justify-center items-center w-[100px] h-full bg-[#9f9f9f] opacity-80">
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
