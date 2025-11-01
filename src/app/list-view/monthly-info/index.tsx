import CheckBox from "~/assets/icons/checkbox.svg";
import UncheckBox from "~/assets/icons/uncheckbox.svg";

interface Props {
  totalCount: number;
  totalExpense: number;
  totalIncome: number;
}

function MonthlyInfo({ totalCount, totalExpense, totalIncome }: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-[8px]">
        <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
          전체 내역
        </span>
        <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
          {totalCount}개
        </span>
      </div>
      <div className="flex gap-[12px]">
        <div className="flex gap-[4px] items-center">
          <img alt="Checked" className="w-[16px] h-[16px]" src={CheckBox} />
          <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
            수입 {totalIncome.toLocaleString()}원
          </span>
        </div>
        <div className="flex gap-[4px] items-center">
          <img alt="Unchecked" className="w-[16px] h-[16px]" src={UncheckBox} />
          <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
            지출 {totalExpense.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}

export default MonthlyInfo;
