import React from "react";
import type { Method, Category } from "../types";
import { CATEGORY_OPTIONS } from "../types";

type Props = {
  methodOpen: boolean;
  setMethodOpen: React.Dispatch<React.SetStateAction<boolean>>;
  method?: Method;
  setMethod: (m: Method) => void;
  categoryOpen: boolean;
  setCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category?: Category;
  setCategory: (c: Category) => void;

  amount: string;
  setAmount: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  onAdd: () => void;
};

const SummaryCard: React.FC<Props> = ({
  methodOpen,
  setMethodOpen,
  method,
  setMethod,
  categoryOpen,
  setCategoryOpen,
  category,
  setCategory,
  amount,
  setAmount,
  content,
  setContent,
  onAdd,
}) => {
  return (
    <section className="summary-card">
      <div className="field">
        <div className="label">일자</div>
        <div className="value">오늘</div>
      </div>

      <div className="divider" />

      <div className="field">
        <div className="label">금액</div>
        <input
          className="value input"
          placeholder="예: 12000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric"
        />
      </div>

      <div className="divider" />

      <div className="field grow">
        <div className="label">내용</div>
        <input
          className="value input"
          placeholder="예: 점심 식사"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="divider" />

      <div className="field dropdown">
        <div className="label">결제수단</div>
        <button className="dropdown-btn" onClick={() => setMethodOpen(v => !v)}>
          {method ?? "선택하세요"} <span className="chev">▾</span>
        </button>
        {methodOpen && (
          <div className="menu">
            {(["현금","신용카드","체크카드"] as Method[]).map(m => (
              <button
                key={m}
                className="menu-item"
                onClick={() => { setMethod(m); setMethodOpen(false); }}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="divider" />

      <div className="field dropdown">
        <div className="label">분류</div>
        <button className="dropdown-btn" onClick={() => setCategoryOpen(v => !v)}>
          {category ?? "선택하세요"} <span className="chev">▾</span>
        </button>
        {categoryOpen && (
          <div className="menu">
            {CATEGORY_OPTIONS.map(c => (
              <button
                key={c}
                className="menu-item"
                onClick={() => { setCategory(c); setCategoryOpen(false); }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="pill ok" onClick={onAdd}>저장</button>
    </section>
  );
};

export default SummaryCard;
