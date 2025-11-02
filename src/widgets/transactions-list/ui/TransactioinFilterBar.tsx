import { CheckBox } from "../../../shared/ui/CheckBox/CheckBox";

export const TransactionFilterBar = () => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-light-12">전체 내역 13건</span>
      <div className="flex gap-3">
        <CheckBox checked={false} label="수입 10,000원" onChange={() => {}} />
        <CheckBox checked={false} label="지출 10,000원" onChange={() => {}} />
      </div>
    </div>
  );
};
