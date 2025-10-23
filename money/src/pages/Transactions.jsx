import { useMemo } from "react";
import { useYearMonth } from "../context/YearMonthContext.jsx";
import { sameYM } from "../lib/date.js";

// 데모 데이터
const MOCK = [
  { id: 1, date: "2023-08-14", title: "스트리밍 정기결제", amount: -10900 },
  { id: 2, date: "2023-08-14", title: "후불 교통비", amount: -45340 },
  { id: 3, date: "2023-09-01", title: "월급", amount: 2010580 },
];

export default function Transactions() {
  const { ym } = useYearMonth();
  const list = useMemo(() => MOCK.filter((tx) => sameYM(tx.date, ym)), [ym]);

  const income = list.filter(x => x.amount > 0).reduce((s, x) => s + x.amount, 0);
  const expense = list.filter(x => x.amount < 0).reduce((s, x) => s + x.amount, 0);

  return (
    <section className="container">
      <main className="page">
        <div className="stat-line">
          수입 <strong className="mono">{income.toLocaleString()}</strong>원 /
          &nbsp;지출 <strong className="mono">{Math.abs(expense).toLocaleString()}</strong>원 /
          &nbsp;총 {list.length}건
        </div>

        <ul className="card-list">
          {list.map((tx) => (
            <li key={tx.id} className="card">
              <span>{tx.title}</span>
              <span className={"amount mono " + (tx.amount < 0 ? "neg" : "pos")}>
                {tx.amount.toLocaleString()}원
              </span>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
