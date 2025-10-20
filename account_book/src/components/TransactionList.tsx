import React from "react";
import type { Tx } from "../types";

type Props = { grouped: [string, { weekday: string; items: Tx[] }][] };

const TransactionList: React.FC<Props> = ({ grouped }) => {
  return (
    <main className="list">
      {grouped.map(([date, { weekday, items }]) => (
        <section key={date} className="day">
          <div className="day-head">
            <div className="day-date">{new Date(date).getMonth()+1}월 {new Date(date).getDate()}일</div>
            <div className="day-week">{weekday}</div>
          </div>

          {items.map(t => (
            <div key={t.id} className="row">
              <div className="cat">
                <div className="cat-main">{t.category}</div>
              </div>
              <div className="content">
                <div className="title">{t.content}</div>
              </div>
              <div className="account">{t.account ?? t.method}</div>
              <div className={`amount ${t.type === "expense" ? "neg" : "pos"}`}>
                {t.type === "expense" ? "-" : ""}{Math.abs(t.amount).toLocaleString("ko-KR")}원
              </div>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
};

export default TransactionList;
