import type { Tx } from "./types";

export function currency(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

export function monthLabel(d = new Date("2023-08-01")) {
  return `${d.getFullYear()}년  ${d.toLocaleString("ko-KR", { month: "long" })}`;
}

export function calcTotals(txs: Tx[]) {
  const income = txs.filter(s => s.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = txs.filter(s => s.type === "expense").reduce((a, b) => a + Math.abs(b.amount), 0);
  return { income, expense };
}

export function groupByDate(txs: Tx[]) {
  const map = new Map<string, { weekday: string; items: Tx[] }>();
  for (const t of txs) {
    if (!map.has(t.date)) map.set(t.date, { weekday: t.weekday, items: [] });
    map.get(t.date)!.items.push(t);
  }
  return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
}
