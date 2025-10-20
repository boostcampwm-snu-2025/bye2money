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
}) => {
  return (
    <section className="summary-card">
      <div className="field">
        <div className="label">일자</div>
        <div className="value">2023. 08. 01</div>
      </div>
      <div className="divider" />
      <div className="field">
        <div className="label">금액</div>
        <div className="value bold">- <span className="unit">원</span></div>
      </div>
      <div className="divider" />
      <div className="field grow">
        <div className="label">내용</div>
        <div className="value">-</div>
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
      <button className="pill ok">✔</button>
    </section>
  );
};

export default SummaryCard;
