import { useModal } from "../../../../shared/context/ModalContext";

export default function TransactionDeleteModal({ transaction, onDelete }) {
  const { closeModal } = useModal();

  const handleSubmit = () => {
    closeModal();
    onDelete(transaction.id);
  };

  const isExpense = transaction.amount < 0;
  const rawAmount = Math.abs(transaction.amount).toLocaleString();

  return (
    <div className="w-96 bg-white">
      <div className="w-full h-56 p-8 flex flex-col gap-4 border-[0.5px]">
        <p className="font-sans font-light text-base">해당 내역을 삭제하시겠습니까?</p>
        <ul className="font-sans font-light text-sm text-neutral-text-weak flex flex-col gap-1 list-disc list-inside">
          <li>카테고리: {isExpense ? "지출" : "수입"} - {transaction.category}</li>
          <li>내용: {transaction.content}</li>
          <li>결제수단: {transaction.payment}</li>
          <li>금액: {rawAmount}원</li>
        </ul>
      </div>
      <div className="w-full h-14 grid grid-cols-2 font-sans font-semibold text-base">
        <button 
          className="w-full text-neutral-text-weak border-[0.5px]"
          onClick={closeModal}
        >
          취소
        </button>
        <button 
          className="w-full border-[0.5px]"
          onClick={handleSubmit}
        >
          <span className="text-danger-text-default">삭제</span>
        </button>
      </div>
    </div>
  );
}