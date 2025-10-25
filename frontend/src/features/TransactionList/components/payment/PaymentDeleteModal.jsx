import { useModal } from "../../../../shared/context/ModalContext";

export default function PaymentDeleteModal({ value, onDelete }) {
  const { closeModal } = useModal();

  const handleSubmit = () => {
    closeModal();
    onDelete(value);
  };

  return (
    <div className="w-96 bg-white">
      <div className="w-full h-36 p-8 flex flex-col gap-4 border-[0.5px]">
        <p className="font-sans font-light text-base">해당 결제 수단을 삭제하시겠습니까?</p>
        <span className="w-80 h-10 px-4 font-sans font-semibold text-xs text-neutral-text-weak">
          {value}
        </span>
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
          삭제
        </button>
      </div>
    </div>
  );
}