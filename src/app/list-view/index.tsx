import type { Dayjs } from "dayjs";

import CheckBox from "~/assets/icons/checkbox.svg";
import UncheckBox from "~/assets/icons/uncheckbox.svg";

// TODO: group by date, calculation을 서버에서 할 지, 클라이언트에서 할 지 결정 필요
const data: {
  amount: number
  category: "allowance" | "culture" | "etc" | "food" | "health" | "life" | "salary" | "shopping" | "transport"
  date: Dayjs
  description: string
  id: number
  paymentMethod: string
}[] = [];

function ListView() {
  return (
    <div className="w-[846px] flex flex-col gap-[40px]">
      <div className="flex justify-between">
        <div className="flex gap-[8px]">
          <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
            전체 내역
          </span>
          <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
            {data.length}개
          </span>
        </div>
        <div className="flex gap-[12px]">
          <div className="flex gap-[4px] items-center">
            <img alt="Checked" className="w-[16px] h-[16px]" src={CheckBox}/>
            <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
              수입 {data.filter((item) => item.amount > 0).reduce((acc, item) => acc + item.amount, 0).toLocaleString()}원
            </span>
          </div>
          <div className="flex gap-[4px] items-center">
            <img alt="Unchecked" className="w-[16px] h-[16px]" src={UncheckBox}/>
            <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
              지출 {data.filter((item) => item.amount < 0).reduce((acc, item) => acc + item.amount, 0).toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {data.map((item) => (
        <div key={item.id}>
          <span>{item.date.format("YYYY-MM-DD")}</span>
          <span>{item.description}</span>
          <span>{item.amount.toLocaleString()}원</span>
        </div>
      ))}
    </div>
  )
}

export default ListView
