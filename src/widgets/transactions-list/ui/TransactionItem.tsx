import { CategoryBadge } from "../../../entities/category/ui/categoryBadge";

export const TransactionItem = () => {
  return (
    <div className="grid grid-cols-[auto_1fr_120px_160px] items-center gap-4">
      <CategoryBadge category="food" />
      <p className="text-light-14">잔치국수와 김밥</p>
      <p className="text-light-14">현대카드</p>
      <p className="text-right text-light-14">-10,000원</p>
    </div>
  );
};
