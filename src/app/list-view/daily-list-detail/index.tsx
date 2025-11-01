import type { Dayjs } from "dayjs";

type Category =
  | "allowance"
  | "culture"
  | "etc-expense"
  | "etc-income"
  | "food"
  | "health"
  | "life"
  | "salary"
  | "shopping"
  | "transport";

type Item = {
  amount: number;
  category: Category;
  date: Dayjs;
  description: string;
  // id는 생성한 시간 순으로 부여됩니다.
  id: number;
  paymentMethod: string;
};

interface Props {
  item: Item;
}

const CATEGORY_COLOR: Record<Category, string> = {
  allowance: "bg-[#AACD7E]",
  culture: "bg-[#BDA6E1]",
  "etc-expense": "bg-[#F0B0D3]",
  "etc-income": "bg-[##A28878]",
  food: "bg-[#C5E0EB]",
  health: "bg-[#BCDFD3]",
  life: "bg-[#A7B9E9]",
  salary: "bg-[#E39D5D]",
  shopping: "bg-[#D7CA6B]",
  transport: "bg-[#7DB7BF]",
};

function DailyListDetail({ item }: Props) {
  return (
  <div className="w-full flex gap-[16px] pr-[16px]">
    <div
      className={`w-[92px] h-[56px] px-[8px] py-[4px] text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard] flex justify-center items-center ${
        CATEGORY_COLOR[item.category]
      }`}
    >
      {/* TODO: key를 한국어로 변환 */}
      {item.category}
    </div>
    <div className="w-[400px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
      {item.description}
    </div>
    <div className="w-[104px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
      {item.paymentMethod}
    </div>
    <div
      className={`flex-1 text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center justify-end ${
        item.amount > 0 ? "text-[#79B2CA]" : "text-[#C04646]"
      }`}
    >
      {item.amount.toLocaleString()}원
    </div>
  </div>
  );
}

export default DailyListDetail;
