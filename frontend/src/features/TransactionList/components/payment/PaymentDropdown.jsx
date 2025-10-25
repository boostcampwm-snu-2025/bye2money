import { useState, useEffect } from "react";
import { useModal } from "../../../../shared/context/ModalContext";
import PaymentAddModal from "./PaymentAddModal";
import PaymentDeleteModal from "./PaymentDeleteModal";
import { ChevronDown } from "lucide-react";
import { getPayments, addPayment, deletePayment } from "../../../../shared/api/payments";
import { cleanupTransactions } from "../../../../shared/api/transactions";

export default function PaymentDropdown({ value, onSelect, refreshTransactions }) {
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [payments, setPayments] = useState([]);

  // 서버에서 데이터 불러오기
  useEffect(() => {
    getPayments()
      .then((data) => setPayments(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async (item) => {
    try {
      const added = await addPayment(item);
      setPayments((prev) => [...prev, added.name]); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await cleanupTransactions(item);
      await deletePayment(item);
      setPayments((prev) => prev.filter((p) => p !== item));
      refreshTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative inline-block">
      <div 
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <span className="font-sans font-semibold text-xs text-neutral-text-weak">
          {value || "선택하세요"}
        </span>
        <ChevronDown
          size={14}
          className={`ml-1 transition-transform duration-150 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="w-34 absolute top-full mt-5 bg-white translate-x-[-16px] border-[0.5px] border-t-0 flex divide-y flex-col items-center">
          {payments.map((p) => (
            <div 
              key={p}
              className="w-30 flex items-center justify-between gap-2 p-4"
            >
              <span
                className="font-sans font-light text-xs"
                onClick={() => {
                  onSelect(p);
                  setIsOpen(false);
                }}
              >
                {p}
              </span>
              <button
                type="button"
                onClick={() => {openModal(<PaymentDeleteModal value={p} onDelete={handleDelete} />);}}
                className="font-sans font-light text-xs text-red-500"
              >
                X
              </button>
            </div>
          ))}

          <button
            className="w-30 font-sans font-light text-xs text-left gap-2 p-4"
            type="button"
            onClick={() => {
              setIsOpen(false);
              openModal(<PaymentAddModal onAdd={handleAdd} />);
            }}
          >
            추가하기
          </button>
        </div>
      )}
    </div>
  );
}