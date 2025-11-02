import type { Category } from "~/api/transactions";

import Closed from "~/assets/icons/closed.svg";
import { cn } from "~/lib/utils";

interface Props {
  amount: number;
  category: Category;
  description: string;
  onClick?: () => void;
  paymentMethod: string;
}

const CATEGORY_COLOR: Record<Category, string> = {
  교통: "bg-[#7DB7BF]",
  "기타 수입": "bg-[##A28878]",
  "문화/여가": "bg-[#BDA6E1]",
  미분류: "bg-[#F0B0D3]",
  생활: "bg-[#A7B9E9]",
  "쇼핑/뷰티": "bg-[#D7CA6B]",
  식비: "bg-[#C5E0EB]",
  용돈: "bg-[#AACD7E]",
  월급: "bg-[#E39D5D]",
  "의료/건강": "bg-[#BCDFD3]",
};

function DailyListDetail({
  amount,
  category,
  description,
  onClick,
  paymentMethod,
}: Props) {
  return (
    <div
      className="group w-full flex gap-[16px] pr-[16px] hover:bg-[#F1F4F8]"
      onClick={onClick}
    >
      <div
        className={cn(
          "w-[92px] h-[56px] px-[8px] py-[4px] text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard] flex justify-center items-center",
          CATEGORY_COLOR[category]
        )}
      >
        {category}
      </div>
      <div className="w-[400px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
        {description}
      </div>
      <div className="w-[104px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
        {paymentMethod}
      </div>
      <div
        className={cn(
          "flex-1 text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center justify-end",
          amount > 0 ? "text-[#79B2CA]" : "text-[#C04646]"
        )}
      >
        {amount.toLocaleString()}원
      </div>
      <button className="hidden group-hover:flex text-[12px] leading-[16px] tracking-normal font-semibold font-[Pretendard] text-[#E93B5A] items-center gap-[4px]">
        <img
          alt="closed"
          className="w-[16px] h-[16px] p-[4px] rounded-[20px] bg-[#E93B5A]"
          src={Closed}
        />
        삭제
      </button>
    </div>
  );
}

export default DailyListDetail;
