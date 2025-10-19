import type React from "react";
import { useSpendingDetailStore } from "../../store/useSpendingDetailStore";
import { useSpendingEditStore } from "../../store/useSpendingEditStore";
import { useDropdownStore } from "../../store/useDropdownStore";
import { useModalStore } from "../../store/useModalStore";
import CloseIcon from "../../assets/icons/closed.svg?react";

interface PaymentMethodSelectChip {
  method: string;
}
export const PaymentMethodSelectChip: React.FC<PaymentMethodSelectChip> = ({
  method,
}) => {
  const { removePaymentMethod } = useSpendingDetailStore();
  const { setPaymentMethod } = useSpendingEditStore();
  const { closeMethodDropdown } = useDropdownStore();
  const {
    methodRemoveModalOpened,
    openMethodRemoveModal,
    closeMethodRemoveModal,
  } = useModalStore();

  return (
    <button
      className="flex flex-row items-center h-[56px] w-[152px] px-[24px] justify-between"
      onClick={() => {
        setPaymentMethod(method);
        closeMethodDropdown();
      }}
    >
      {method}
      <button
        onClick={(e) => {
          e.stopPropagation();
          openMethodRemoveModal(method);
        }}
      >
        <CloseIcon width="24px" height="24px" className="text-red-700" />
      </button>
    </button>
  );
};
