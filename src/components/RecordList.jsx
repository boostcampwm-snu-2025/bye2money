import { useMemo, useState } from "react";
import { useLedgerStore } from "../store/useLedgerStore";
import { comma } from "../utils/format";
import { weekdayKr, parseYMD } from "../utils/date";
import { CATEGORY_COLORS } from "../utils/theme";
import { startOfMonth, endOfMonth, isWithinInterval, compareDesc } from "date-fns";

import { useUi } from "../context/UiContext";
import useEntryForm from "../hooks/useEntryForm";

export default function RecordList({ onPickForEdit, selectedId }) {
  const records = useLedgerStore((s) => s.records);
  const currentMonth = new Date(useLedgerStore((s) => s.currentMonth));
  const removeRecord = useLedgerStore((s) => s.removeRecord);

  const { openAlert } = useUi();
  const { form, dispatch, requestDelete } = useEntryForm(); // EntryBar와 동일 훅 재사용

  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  const [hoverId, setHoverId] = useState(null);

  const monthRecords = useMemo(() => {
    const from = startOfMonth(currentMonth);
    const to = endOfMonth(currentMonth);
    return records
      .filter((r) => isWithinInterval(parseYMD(r.date), { start: from, end: to }))
      .sort((a, b) => {
        const d = compareDesc(parseYMD(a.date), parseYMD(b.date));
        if (d !== 0) return d;
        const ca = new Date(a.createdAt || 0);
        const cb = new Date(b.createdAt || 0);
        return compareDesc(ca, cb);
      });
  }, [records, currentMonth]);

  // 수입/지출 필터
  const filtered = useMemo(
    () => monthRecords.filter((r) => (r.type === "income" ? showIncome : showExpense)),
    [monthRecords, showIncome, showExpense]
  );

  // 상단 합계
  const summary = useMemo(() => {
    const inc = filtered.filter((r) => r.type === "income").reduce((s, r) => s + r.amount, 0);
    const exp = filtered.filter((r) => r.type === "expense").reduce((s, r) => s + r.amount, 0);
    return { inc, exp, count: filtered.length };
  }, [filtered]);

  // 날짜 묶음
  const byDate = useMemo(() => {
    const m = new Map();
    for (const r of filtered) {
      if (!m.has(r.date)) m.set(r.date, []);
      m.get(r.date).push(r);
    }
    return Array.from(m.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  // 아이템 클릭 
  const pickForEdit = (r) => {
    dispatch?.({ type: "LOAD_EDIT", payload: r });
    onPickForEdit?.(r);
  };

  // 삭제 버튼 
  const handleRemove = (r) => {
    requestDelete?.(r, async () => {
      setTimeout(() => {
        removeRecord(r.id);
        openAlert?.("삭제되었습니다.");
      }, 1000);
    });
  };

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm">
      {/* 상단 합계/필터 */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
        <div className="text-gray-600">
          전체 내역 {summary.count}건 · 수입{" "}
          <b className="text-blue-600">{comma(summary.inc)}</b>원 · 지출{" "}
          <b className="text-red-600">{comma(summary.exp)}</b>원
        </div>
        <label className="ml-auto flex items-center gap-1">
          <input
            type="checkbox"
            checked={showIncome}
            onChange={(e) => setShowIncome(e.target.checked)}
          />{" "}
          수입
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={showExpense}
            onChange={(e) => setShowExpense(e.target.checked)}
          />{" "}
          지출
        </label>
      </div>

      {/* 일자 그룹 */}
      <div className="space-y-6">
        {byDate.map(([date, items]) => {
          const dayInc = items.filter((r) => r.type === "income").reduce((s, r) => s + r.amount, 0);
          const dayExp = items.filter((r) => r.type === "expense").reduce((s, r) => s + r.amount, 0);
          return (
            <div key={date}>
              <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
                <div className="font-semibold">
                  {date} {weekdayKr(date)}
                </div>
                <div className="flex gap-4">
                  <span className="text-blue-600">수입 {comma(dayInc)}</span>
                  <span className="text-red-600">지출 {comma(dayExp)}</span>
                </div>
              </div>

              <ul className="divide-y">
                {items.map((r) => (
                  <li
                    key={r.id}
                    onMouseEnter={() => setHoverId(r.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => pickForEdit(r)}
                    className={`relative grid grid-cols-[100px,120px,1fr,140px,90px] items-center gap-3 px-2 py-3
                      ${selectedId === r.id ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-gray-50"}`}
                  >
                    {/* 카테고리 배지 */}
                    <span
                      className="mr-1 inline-block max-w-[92px] truncate rounded px-2 py-1 text-center text-xs"
                      title={r.category || "—"}
                      style={{
                        background:
                          CATEGORY_COLORS[r.category] ||
                          CATEGORY_COLORS["미분류"] ||
                          "#eee",
                      }}
                    >
                      {r.category || "—"}
                    </span>

                    {/* 금액 */}
                    <span
                      className={`text-right tabular-nums font-semibold ${
                        r.type === "income" ? "text-blue-600" : "text-red-600"
                      }`}
                    >
                      {r.type === "income" ? "+" : "-"}
                      {comma(r.amount)}
                    </span>

                    {/* 메모 */}
                    <span className="truncate text-gray-800">{r.memo || ""}</span>

                    {/* 결제수단 */}
                    <span className="truncate text-gray-500">{r.payment || "—"}</span>

                    {/* 삭제 버튼 (hover시에만 노출) */}
                    <span className="flex justify-end">
                      {hoverId === r.id && (
                        <button
                          className="rounded border bg-white px-3 py-1 text-sm hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation(); // 편집 클릭과 분리
                            handleRemove(r);
                          }}
                        >
                          삭제
                        </button>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {byDate.length === 0 && (
          <div className="py-12 text-center text-gray-400">표시할 내역이 없습니다.</div>
        )}
      </div>
    </section>
  );
}
