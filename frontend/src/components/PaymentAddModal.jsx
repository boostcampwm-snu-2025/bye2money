import { useState } from "react";
import { useModal } from "../context/ModalContext";

export default function PaymentAddModal({ onAdd }) {
  const { closeModal } = useModal();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    closeModal();
    onAdd(value.trim());
  };

  return (
    <div className="w-96 bg-white">
      <div className="w-full h-36 p-8 flex flex-col gap-4 border-[0.5px]">
        <p className="font-sans font-light text-base">추가하실 결제 수단을 입력해주세요.</p>
        <input
          className="w-80 h-10 px-4 bg-gray-50 rounded-md font-sans font-semibold text-xs text-neutral-text-weak"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="placeholder"
        />
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
          추가
        </button>
      </div>
    </div>
  );
}