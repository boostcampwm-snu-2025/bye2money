export function addMonth({ year, month }, delta) {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

export function ymLabel({ year, month }) {
  const monthText = new Date(year, month - 1).toLocaleString("ko-KR", { month: "long" });
  return { year, month, monthText };
}

export function sameYM(dateStr, ym) {
  const d = new Date(dateStr);
  return d.getFullYear() === ym.year && d.getMonth() + 1 === ym.month;
}
