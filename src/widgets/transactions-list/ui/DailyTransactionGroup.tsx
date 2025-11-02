import { TransactionItem } from "./TransactionItem";

export const DailyTransactionGroup = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-serif text-serif-14">8월 13일 일요일</span>
        <div className="flex gap-2">
          <span className="font-serif text-serif-14">수입 2,000원</span>
          <span className="font-serif text-serif-14">지출 10,000원</span>
        </div>
      </div>
      <div className="border-y border-neutral-border">
        <TransactionItem />
        <TransactionItem />
      </div>
    </div>
  );
};
