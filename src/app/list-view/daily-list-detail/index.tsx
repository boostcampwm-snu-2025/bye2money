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

interface Props {
  amount: number;
  category: Category;
  description: string;
  paymentMethod: string;
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

const CATEGORY_NAME_KR: Record<Category, string> = {
  allowance: "용돈",
  culture: "문화/여가",
  "etc-expense": "미분류",
  "etc-income": "기타 수입",
  food: "식비",
  health: "의료/건강",
  life: "생활",
  salary: "월급",
  shopping: "쇼핑/뷰티",
  transport: "교통",
};

function DailyListDetail({
  amount,
  category,
  description,
  paymentMethod,
}: Props) {
  return (
    <div className="w-full flex gap-[16px] pr-[16px]">
      <div
        className={`w-[92px] h-[56px] px-[8px] py-[4px] text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard] flex justify-center items-center ${CATEGORY_COLOR[category]}`}
      >
        {CATEGORY_NAME_KR[category]}
      </div>
      <div className="w-[400px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
        {description}
      </div>
      <div className="w-[104px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center">
        {paymentMethod}
      </div>
      <div
        className={`flex-1 text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] flex items-center justify-end ${
          amount > 0 ? "text-[#79B2CA]" : "text-[#C04646]"
        }`}
      >
        {amount.toLocaleString()}원
      </div>
    </div>
  );
}

export default DailyListDetail;
