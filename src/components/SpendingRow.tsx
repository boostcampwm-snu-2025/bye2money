import type React from "react";
import {
  useSpendingDetailStore,
  type SpendingDetail,
} from "../store/useSpendingDetailStore";
import { CategoryTag } from "./CategoryTag";
import { useSpendingEditStore } from "../store/useSpendingEditStore";
import ClosedIcon from "../assets/icons/closed.svg?react";
import { Button } from "./Button";
import { useModalStore } from "../store/useModalStore";

export const SpendingRow: React.FC<SpendingDetail> = ({
  id,
  amount,
  description,
  isExpenditure,
  year,
  month,
  day,
  category,
  paymentMethod,
}) => {
  const {
    setId,
    setDate,
    setDescription,
    setAmount,
    setAmountStr,
    setCategory,
    setPaymentMethod,
    setIsExpenditure,
  } = useSpendingEditStore();
  const { openSpendingRemoveModal } = useModalStore();
  const fillUpEditBar = () => {
    setId(id);
    setDate(`${year}-${month}-${day}`);
    setDescription(description);
    setAmount(amount);
    setDescription(description);
    setCategory(category);
    setPaymentMethod(paymentMethod);
    setIsExpenditure(isExpenditure);
    const formattedAmount = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    })
      .format(amount)
      .replaceAll("₩", "");
    setAmountStr(formattedAmount);
  };
  const { removeSpending } = useSpendingDetailStore();
  const formatWon = (isExpenditure: boolean, num: number) => {
    const prefix = isExpenditure ? "-" : "";
    const formatted = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    })
      .format(num)
      .replaceAll("₩", "");
    return prefix + formatted + "원";
  };
  const amountStyleClasses = isExpenditure
    ? "h-[24px] w-[186px] font-light font-sans text-sans-light-md text-end text-brand-text-expense"
    : "h-[24px] w-[186px] font-light font-sans text-sans-light-md text-end text-brand-text-income";
  return (
    <div
      onClick={fillUpEditBar}
      className="relative flex flex-row min-w-[919px] shrink-0 h-[56px] hover:bg-white hover:-translate-x-[73px] transition-transform duration-300"
    >
      <div className="flex w-[846px] min-w-[846px] shrink-0">
        <CategoryTag category={category} />{" "}
        <div className="flex flex-row items-center gap-[16px] px-[16px]">
          <h3 className="h-[24px] w-[400px] font-light font-sans text-sans-light-md">
            {description}
          </h3>
          <h3 className="h-[24px] w-[104px] font-light font-sans text-sans-light-md">
            {paymentMethod ?? " "}
          </h3>
          <h3 className={amountStyleClasses}>
            {formatWon(isExpenditure, amount)}
          </h3>
        </div>
      </div>
      <div className="grid w-[73px] h-full place-items-center">
        <Button
          label={"삭제"}
          onClick={(e) => {
            e.stopPropagation();
            openSpendingRemoveModal(id);
          }}
          variant="sm"
          icon={ClosedIcon}
        />
      </div>
    </div>
  );
};
