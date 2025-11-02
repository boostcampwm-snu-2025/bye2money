import React, { useMemo, useState } from "react";
import SelectWithModal from './SelectWithModal';
import type {Transaction} from '../types.ts';

const MAX_CONTENT = 32;

function formatMoney(n: number | null) {
  if (n === null) return "";
  return new Intl.NumberFormat("ko-KR").format(n);
}

function parseMoney(s: string): number | null {
  // 숫자만 남기고 파싱
  const digits = s.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

// Props 타입 정의
interface InputFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  // 날짜 state 추가
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  });

  const [isExpense, setIsExpense] = useState(true); // true=지출(−), false=수입(+)
  const [amount, setAmount] = useState<number | null>(null);

  const [content, setContent] = useState("");

  const [method, setMethod] = useState<string | null>(null);    // 결제수단
  const [category, setCategory] = useState<string | null>(null); // 분류

  const amountDisplay = useMemo(() => formatMoney(amount), [amount]);
  const sign = isExpense ? "−" : "+";

  // 등록 버튼 클릭 핸들러
  const handleSubmit = () => {
    // 입력값 검증
    if (amount === null || amount === 0) {
      alert('금액을 입력해주세요');
      return;
    }

    if (!content.trim()) {
      alert('내용을 입력해주세요');
      return;
    }

    if (!method) {
      alert('결제수단을 선택해주세요');
      return;
    }

    if (!category) {
      alert('분류를 선택해주세요');
      return;
    }

    // 새 거래 내역 생성
    const newTransaction: Omit<Transaction, 'id'> = {
      date,
      isExpense,
      amount,
      content: content.trim(),
      method,
      category,
    };

    // 부모 컴포넌트에 전달
    onSubmit(newTransaction);

    // 입력 필드 초기화
    setAmount(null);
    setContent('');
    setMethod(null);
    setCategory(null);
    // date와 isExpense는 유지 (사용자가 연속 입력 시 편리)
  };

  return (
    <main>
      <div className="w-11/12 max-w-7xl mx-auto -mt-16 px-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-end gap-6 py-6 divide-x divide-slate-200">
          <div className="flex-1 min-w-[180px] px-4">
            <p className="text-sm text-slate-500 mb-2">일자</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-b border-slate-300 focus:outline-none focus:border-slate-500 pb-2"
            />
          </div>

          {/* 금액 */}
          <div className="flex-[1.5] min-w-[220px] pr-8">
            <p className="text-sm text-slate-500 mb-2">금액</p>
            <div className="flex items-center gap-3 border-b border-slate-300 pb-2">
              {/* 부호 토글 */}
              <button
                type="button"
                onClick={() => setIsExpense((v) => !v)}
                className={`h-8 w-8 rounded-full border text-sm flex items-center justify-center cursor-pointer transition
                  ${isExpense ? "bg-slate-100 border-slate-300" : "bg-blue-50 border-blue-300 text-blue-600"}`}
                title={isExpense ? "지출로 입력" : "수입으로 입력"}
              >
                {sign}
              </button>

              {/* 숫자 입력(포맷 표시) */}
              <input
                inputMode="numeric"
                value={amountDisplay}
                onChange={(e) => setAmount(parseMoney(e.target.value))}
                placeholder="0"
                className="flex-1 bg-transparent focus:outline-none text-lg tracking-wide"
              />

              {/* 단위 */}
              <span className="text-slate-500 -mx-5">원</span>
            </div>
          </div>

          {/* 내용 */}
          <div className="flex-[2] min-w-[300px] pr-4">
            <div className="flex items-end justify-between">
              <p className="text-sm text-slate-500 mb-2">내용</p>
              <span className="text-xs text-slate-400 mb-2">
                {content.length}/{MAX_CONTENT}
              </span>
            </div>
            <input
              type="text"
              value={content}
              onChange={(e) =>
                setContent(e.target.value.slice(0, MAX_CONTENT))
              }
              placeholder="내역을 작성해주세요"
              className="w-full border-b border-slate-300 focus:outline-none focus:border-slate-500 pb-2"
            />
          </div>

          {/* 결제수단 */}
          <div className="flex-1 min-w-[120px] pr-10">
            <SelectWithModal
              label="결제수단"
              placeholder="선택하세요"
              initialOptions={["현금", "신용카드"]}
              value={method}
              onChange={(v) => setMethod(v || null)}
            />
          </div>

          {/* 분류 */}
          <div className="flex-1 min-w-[120px] pr-10">
            <SelectWithModal
              label="분류"
              placeholder="선택하세요"
              initialOptions={[
                "식비",
                "교통",
                "문화/여가",
                "쇼핑",
                "의료/건강",
                "기타",
              ]}
              value={category}
              onChange={(v) => setCategory(v || null)}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="icon-toggle-btn bg-gray-100 p-3 rounded-full hover:bg-gray-500 shrink-0 self-end"
          >
            <img src="/img/check_icon.png" className="h-6 w-6" alt="등록" />
          </button>
        </div>
      </div>
    </main>
  );
}