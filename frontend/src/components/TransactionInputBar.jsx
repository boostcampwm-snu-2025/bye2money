import { useState, useEffect } from "react";
import { Check, MinusIcon, PlusIcon } from "lucide-react";
import PaymentDropdown from "./PaymentDropdown";
import { CATEGORIES } from "../constants/categories";

export default function TransactionInputBar({ onAdd, onEdit, selected }) {
  const [date, setDate] = useState("2025-10-19");
  const [amount, setAmount] = useState(0);
  const [content, setContent] = useState("");
  const [payment, setPayment] = useState("");
  const [category, setCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);

  // 선택된 항목이 있으면 채워넣기
  useEffect(() => {
    if (selected) {
      setDate(selected.date);
      setAmount(Math.abs(selected.amount));
      setContent(selected.content);
      setPayment(selected.payment);
      setCategory(selected.category);
      setIsExpense(selected.amount < 0); // 음수면 지출
    }
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 스펙에는 없지만, 간단한 예외 처리
    if (!amount || !content || !payment || !category) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const newTransaction = {
      id: selected?.id || Date.now(), // length로 하는 id는 중복 가능성이 있어서, GPT가 추천해줌
      date,
      amount: isExpense ? -Math.abs(amount) : Math.abs(amount),
      content,
      payment,
      category,
    };

    if (selected) onEdit(newTransaction);
    else onAdd(newTransaction);
    
    // 입력 후 초기화
    setAmount(0);
    setContent("");
    setPayment("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[894px] h-[76px] mt-[176px] border-[0.5px] bg-white flex items-center justify-center">
        <div className="flex items-center divide-x">
          <div className="flex flex-col gap-1 px-4">
            <label className="w-22 font-sans font-light text-xs">일자</label>
            {/* 사실 이 date 입력 부분은 헤더에서 넘어가는 거고, 여기서는 표시만 되는 것 같은데, 일단 이렇게 구현*/}
            <input
              className="font-sans font-semibold text-xs"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 px-4">
            <label className="font-sans font-light text-xs">금액</label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsExpense((prev) => !prev)}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-100"
              >
                {isExpense ? (
                  <MinusIcon size={16}/>
                ) : (
                  <PlusIcon size={16}/>
                )}
              </button>
              <input
                className="w-33 text-right font-sans font-semibold text-xs text-neutral-text-weak"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <span>원</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-4">
            <div className="flex items-center justify-between gap-2">
              <label className="w-40 font-sans font-light text-xs">내용</label>
              <span className="w-8 text-right font-sans font-light text-xs text-neutral-text-weak">{content.length}/32</span>
            </div>
            <input
                className="w-full font-sans font-semibold text-xs text-neutral-text-weak"
                type="text"
                placeholder="입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
          </div>

          <div className="flex flex-col gap-1 px-4">
            <label className="w-26 font-sans font-light text-xs">결제수단</label>
            <PaymentDropdown value={payment} onSelect={setPayment} />
          </div>
          
          <div className="flex flex-col gap-1 px-4">
            <label className="w-26 font-sans font-light text-xs">분류</label>
            <select
              className="font-sans font-semibold text-xs text-neutral-text-weak"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>선택하세요</option>
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
        >
          <Check size={20} />
        </button>
      </div>
    </form>
  );
}
