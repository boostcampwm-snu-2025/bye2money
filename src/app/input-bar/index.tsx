import { useForm } from "@tanstack/react-form";
import dayjs from "dayjs";
import z from "zod";

import Check from "~/assets/icons/check.svg";
import Minus from "~/assets/icons/minus.svg";
import Plus from "~/assets/icons/plus.svg";

import Division from "./division";

const MAX_DESCRIPTION_LENGTH = 32;

function InputBar() {
  const form = useForm({
    defaultValues: {
      amount: 0,
      category: "",
      date: new Date(),
      description: "",
      paymentMethod: "",
      sign: "expenses" as "expenses" | "income",
    },
    onSubmit: (values) => {
      console.log(values.value);  
    },
    validators: {
      onChange: z.object({
        amount: z.number(),
        category: z.string(),
        date: z.date(),
        description: z.string().max(MAX_DESCRIPTION_LENGTH),
        paymentMethod: z.string(),
        sign: z.enum(["expenses", "income"]),
      })
    },
  });

  return (
    <form
      className="flex justify-between w-[894px] h-[76px] border-[0.5px] px-[24px] py-[16px] bg-[#FFFFFF]"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit().catch(console.error);
      }}
    >
      <label className="w-[88px] flex flex-col gap-[4px]">
        <span className="w-full text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
          일자
        </span>
        <form.Field
          children={(field) => (
            <input
              className="w-full h-[16px] text-[12px] leading-[16px] tracking-normal font-semibold font-[Pretendard]"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(new Date(e.target.value))}
              type="date"
              value={dayjs(field.state.value).format("YYYY-MM-DD")}
            />
          )}
          name="date"
        />
      </label>
      <Division />
      <label className="w-[134px] flex flex-col gap-[4px]">
        <span className="w-full text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
          금액
        </span>
        <div className="w-full flex gap-[8px]">
          <form.Field
            children={(field) => (
              <div>
                <input
                  checked={field.state.value === "income"}
                  className="appearance-none w-[16px] h-[16px] hidden"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.checked ? "income" : "expenses")}
                  type="checkbox"
                />
                {field.state.value === "expenses" ? (
                  <img alt="Minus" className="w-[16px] h-[16px]" src={Minus} />
                ) : field.state.value === "income" ? (
                  <img alt="Plus" className="w-[16px] h-[16px]" src={Plus} />
                ) : null}
              </div>
            )}
            name="sign"
          />
          <form.Field
            children={(field) => (
              <input
                className="w-[88px] h-full text-[12px] leading-[16px] tracking-normal font-semibold font-[Pretendard] text-right placeholder:text-[#777D84]"
                inputMode="numeric"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const output = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
                  field.handleChange(isNaN(output) ? 0 : output);
                }}
                placeholder="0"
                type="text"
                value={field.state.value === 0 ? "" : field.state.value.toLocaleString()}
              />
            )}
            name="amount"
          />
          {/* TODO: 높이가 24px입니다. 16px로 수정해야 합니다. */}
          <span className="w-[16px] h-[16px] text-[14px] leading-[24px] tracking-normal font-light font-[Pretendard] align-middle text-right">
            원
          </span>
        </div>
      </label>
      <Division />
      <label className="w-[160px] flex flex-col gap-[4px]">
        <div className="w-full flex gap-[4px]">
          <span className="text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard] break-keep">
            내용
          </span>
          <span className="w-full text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard] text-right text-[#777D84]">
            <form.Subscribe
              selector={state => state.values.description.length}
            >
              {length => `${length}/${MAX_DESCRIPTION_LENGTH}`}
            </form.Subscribe>
          </span>
        </div>
        <form.Field
          children={(field) => (
            <input
              className="w-full text-[12px] leading-[16px] tracking-normal font-semibold font-[Pretendard] placeholder:text-[#777D84]"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="입력하세요"
              type="text"
              value={field.state.value}
            />
          )}
          name="description"
        />
      </label>
      <Division />
      <label className="w-[104px] flex flex-col gap-[4px]">
        <span className="w-full text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
          결제수단
        </span>
        <div className="leading-[16px] relative after:content-[''] after:bg-[url(~/assets/icons/chevron-down.svg)] after:bg-contain after:bg-no-repeat after:w-[16px] after:h-[16px] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none">
          <select
            className="w-full text-[12px] leading-[16px] tracking-normal font-semibold font-[Pretendard] appearance-none"
            name="paymentMethod"
          >
            {/* TODO: 색상 적용 안 됩니다. */}
            <option
              className="text-[#777D84]"
              disabled
              hidden
              selected
              value=""
            >
              선택하세요
            </option>
            {/* TODO: 추가 삭제 기능 구현해야 합니다. */}
            <option value="card">신용카드</option>
            <option value="bank">계좌이체</option>
            <option value="kakao">카카오페이</option>
          </select>
        </div>
      </label>
      <Division />
      <label className="w-[104px] flex flex-col gap-[4px]">
        <span className="w-full text-[12px] leading-[24px] tracking-normal font-light font-[Pretendard]">
          분류
        </span>
        {/* TODO: 높이가 24px입니다. 16px로 수정해야 합니다. */}
        <div className="leading-[16px] relative after:content-[''] after:bg-[url(~/assets/icons/chevron-down.svg)] after:bg-contain after:bg-no-repeat after:w-[16px] after:h-[16px] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none">
          <select
            className="w-full text-[12px] leading-[16px] tracking-normal font-semibold font-[Pretendard] appearance-none"
            name="category"
          >
            {/* TODO: 값에 따라 구분해야 합니다. */}
            <option value="life">생활</option>
            <option value="food">식비</option>
            <option value="transport">교통</option>
            <option value="shopping">쇼핑/뷰티</option>
            <option value="health">의료/건강</option>
            <option value="culture">문화/여가</option>
            <option value="etc">미분류</option>

            <option value="salary">월급</option>
            <option value="allowance">용돈</option>
            <option value="etc">기타 수입</option>
          </select>
        </div>
      </label>
      <button type="submit">
        <div className="w-[40px] h-[40px] p-[8px] rounded-[20px] bg-[#000000]">
          <img alt="Submit" className="w-[24px] h-[24px]" src={Check} />
        </div>
      </button>
    </form>
  );
}

export default InputBar;
