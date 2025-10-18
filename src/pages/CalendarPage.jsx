import { useMemo } from "react";
import { useLedgerStore } from "../store/useLedgerStore";
import { comma } from "../utils/format";
import { parseYMD } from "../utils/date";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isWithinInterval,
 format } from "date-fns";

const WEEK_LABELS = ["일","월","화","수","목","금","토"];

export default function CalendarPage() {
  const currentMonth = new Date(useLedgerStore(s => s.currentMonth));
  const records = useLedgerStore(s => s.records);

  const monthInterval = { start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) };

  const days = useMemo(() => {
    const first = startOfWeek(monthInterval.start, { weekStartsOn: 0 });
    const last = endOfWeek(monthInterval.end, { weekStartsOn: 0 });
    const out = [];
    for (let d = first; d <= last; d = addDays(d, 1)) out.push(new Date(d));
    return out;
  }, [currentMonth]);

 const monthRecords = useMemo(
  () => records.filter(r => isWithinInterval(parseYMD(r.date), monthInterval)),
    [records, currentMonth]
  );

  const dayMap = useMemo(() => {
    const m = new Map();
    for (const r of monthRecords) {
      const key = r.date;
      if (!m.has(key)) m.set(key, []);
      m.get(key).push(r);
    }
    return m;
  }, [monthRecords]);

  const totals = useMemo(() => {
    let inc = 0, exp = 0;
    monthRecords.forEach(r => r.type==="income" ? inc+=r.amount : exp+=r.amount);
    return { inc, exp, sum: inc-exp };
  }, [monthRecords]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded border bg-white">
        {/* 헤더 요일 */}
        <div className="grid grid-cols-7 border-b bg-gray-50 text-center text-sm">
          {WEEK_LABELS.map(w => <div key={w} className="py-2">{w}</div>)}
        </div>
        {/* 날짜 셀 */}
        <div className="grid grid-cols-7">
          {days.map((d, i) => {
            const iso = format(d, "yyyy-MM-dd");
            const list = dayMap.get(iso) || [];
            const inc = list.filter(x=>x.type==="income").reduce((s,x)=>s+x.amount,0);
            const exp = list.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amount,0);
            const muted = !isSameMonth(d, currentMonth);
            return (
              <div key={i} className={`h-28 border-b border-r p-2 text-sm ${muted ? "bg-gray-50 text-gray-400" : "bg-white"}`}>
                <div className={`mb-1 text-xs ${isToday(d) ? "inline-block rounded bg-blue-100 px-1 font-semibold text-blue-700" : ""}`}>
                  {d.getDate()}
                </div>
                <div className="space-y-1 leading-4">
                  {inc>0 && <div className="text-blue-600">+{comma(inc)}</div>}
                  {exp>0 && <div className="text-red-600">-{comma(exp)}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 합계 */}
      <div className="flex justify-between text-sm text-gray-700">
        <div>총 수입 <b className="text-blue-600">{comma(totals.inc)}</b>원 · 총 지출 <b className="text-red-600">{comma(totals.exp)}</b>원</div>
        <div>총합 <b>{comma(totals.sum)}</b>원</div>
      </div>
    </div>
  );
}
