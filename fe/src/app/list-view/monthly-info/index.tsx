import CheckBox from "~/assets/icons/checkbox.svg";
import UncheckBox from "~/assets/icons/uncheckbox.svg";

interface Props {
  filter: {
    expense: boolean;
    income: boolean;
    onExpenseFilterChange?: (checked: boolean) => void;
    onIncomeFilterChange?: (checked: boolean) => void;
  };
  totalCount: number;
  totalExpense: number;
  totalIncome: number;
}

function MonthlyInfo({ filter, totalCount, totalExpense, totalIncome }: Props) {
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
        <label className="flex gap-[4px] items-center">
          <input
            checked={filter.income}
            className="appearance-none w-[16px] h-[16px] hidden"
            name="income-filter"
            onChange={(e) => {
              filter.onIncomeFilterChange?.(e.target.checked);
            }}
            type="checkbox"
          />
          {filter.income ? (
            <img alt="Checked" className="w-[16px] h-[16px]" src={CheckBox} />
          ) : (
            <img
              alt="Unchecked"
              className="w-[16px] h-[16px]"
              src={UncheckBox}
            />
          )}
          <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
            수입 {totalIncome.toLocaleString()}원
          </span>
        </label>
        <label className="flex gap-[4px] items-center">
          <input
            checked={filter.expense}
            className="appearance-none w-[16px] h-[16px] hidden"
            name="expense-filter"
            onChange={(e) => {
              filter.onExpenseFilterChange?.(e.target.checked);
            }}
            type="checkbox"
          />
          {filter.expense ? (
            <img alt="Checked" className="w-[16px] h-[16px]" src={CheckBox} />
          ) : (
            <img
              alt="Unchecked"
              className="w-[16px] h-[16px]"
              src={UncheckBox}
            />
          )}
          <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
            지출 {totalExpense.toLocaleString()}원
          </span>
        </label>
      </div>
    </div>
  );
}

export default MonthlyInfo;
