import type React from "react";
import type { SpendingDetail } from "../store/useSpendingDetailStore";
import { CategoryTag } from "./CategoryTag";
import { useSpendingEditStore } from "../store/useSpendingEditStore";

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
    <button
      onClick={fillUpEditBar}
      className="relative flex flex-row w-full h-[56px] hover:bg-white"
    >
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
    </button>
  );
};
