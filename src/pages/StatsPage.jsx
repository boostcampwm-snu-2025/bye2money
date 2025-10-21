import { useMemo, useState } from "react";
import { useLedgerStore } from "../store/useLedgerStore";
import { comma } from "../utils/format";
import { parseYMD } from "../utils/date";
import {
  subMonths,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { CATEGORY_COLORS } from "../utils/theme";

export default function StatsPage() {
  const records = useLedgerStore((s) => s.records);
  const currentMonth = new Date(useLedgerStore((s) => s.currentMonth));
  const [openCat, setOpenCat] = useState(null);

  const monthRecords = useMemo(() => {
    const from = startOfMonth(currentMonth);
    const to = endOfMonth(currentMonth);
    return records.filter((r) =>
      isWithinInterval(parseYMD(r.date), { start: from, end: to })
    );
  }, [records, currentMonth]);

  const { statList, totalExpense } = useMemo(() => {
    const map = new Map();
    let total = 0;
    monthRecords
      .filter((r) => r.type === "expense")
      .forEach((r) => {
        total += r.amount;
        const key = r.category || "미분류";
        map.set(key, (map.get(key) || 0) + r.amount);
      });
    const list = Array.from(map.entries())
      .map(([cat, sum]) => ({
        cat,
        sum,
        ratio: total ? sum / total : 0,
        color: CATEGORY_COLORS[cat] ?? CATEGORY_COLORS["미분류"],
      }))
      .sort((a, b) => b.sum - a.sum);
    return { statList: list, totalExpense: total };
  }, [monthRecords]);

  // --- 도넛 차트 데이터 ---
  const pieData = useMemo(
    () => statList.map(({ cat, sum, color }) => ({ name: cat, value: sum, color })),
    [statList]
  );

  const trend6m = (category) => {
    const out = [];
    for (let i = 5; i >= 0; i--) {
      const m = subMonths(new Date(currentMonth), i);
      const ym = m.toISOString().slice(0, 7); 
      const sum = records
        .filter(
          (r) =>
            r.type === "expense" &&
            (r.category || "미분류") === category &&
            r.date.startsWith(ym)
        )
        .reduce((s, r) => s + r.amount, 0);
      out.push({ ym, sum });
    }
    return out;
  };

  const details = useMemo(() => {
    if (!openCat) return [];
    return records
      .filter((r) => r.type === "expense" && (r.category || "미분류") === openCat)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [records, openCat]);

  return (
    <div className="space-y-4">
      {/* 상단 카드: 이달 총 지출금액 */}
      <div className="rounded bg-white p-4 shadow">
        <div className="text-sm text-gray-600">이번 달 지출 금액</div>
        <div className="mt-1 text-2xl font-bold text-expense">
          {comma(totalExpense)}원
        </div>
      </div>

      {/* 그래프 + 리스트 2단 레이아웃 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* (왼쪽) 도넛 차트 */}
        <div className="rounded border bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-gray-700">
            카테고리 비율
          </div>
          <div className="h-64">
            {pieData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={1}
                    onClick={(entry) => setOpenCat(entry.name)}
                    isAnimationActive
                  >
                    {pieData.map((d) => (
                      <Cell key={d.name} fill={d.color} cursor="pointer" />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${comma(value)}원`}
                    itemStyle={{ color: "#111827" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                데이터가 없습니다.
              </div>
            )}
          </div>
          <div className="mt-3 text-center text-sm text-gray-600">
            총 지출 <span className="font-semibold">{comma(totalExpense)}</span>원
          </div>
        </div>

        <div className="rounded border bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-gray-700">
            카테고리별 지출
          </div>
          <ul className="divide-y">
            {statList.map(({ cat, sum, ratio, color }) => (
              <li key={cat}>
                <button
                  className="flex w-full items-center justify-between px-2 py-3 hover:bg-gray-50"
                  onClick={() => setOpenCat(openCat === cat ? null : cat)}
                  title="클릭하면 하단에 추이 그래프/상세가 펼쳐집니다"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="block h-4 w-4 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="flex-1 truncate text-left">{cat}</span>
                    <span className="w-12 shrink-0 tabular-nums text-right whitespace-nowrap">
                      {(ratio * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="ml-4 shrink-0 whitespace-nowrap tabular-nums text-right font-semibold">
                    {comma(sum)}원
                  </div>
                </button>
              </li>
            ))}
            {!statList.length && (
              <li className="py-8 text-center text-gray-400">지출 내역이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>

      {/* 선택된 카테고리의 6개월 추이 + 상세 내역 */}
      {openCat && (
        <div className="space-y-4">
          {/* 추이 그래프 */}
          <div className="rounded border bg-white p-4 shadow-sm">
            <div className="mb-2 text-sm text-gray-600">{openCat} 카테고리 소비 추이(최근 6개월)</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend6m(openCat)} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ym" />
                  <YAxis tickFormatter={(v) => (v >= 10000 ? `${Math.round(v / 10000)}만` : v)} />
                  <Tooltip formatter={(v) => `${comma(v)}원`} labelFormatter={(l) => `${l}`} />
                  <Line
                    type="monotone"
                    dataKey="sum"
                    dot
                    strokeWidth={2}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 상세 내역 */}
          <div className="rounded border bg-white p-4 shadow-sm">
            <div className="mb-2 text-sm text-gray-600">상세 내역</div>
            <ul className="divide-y">
              {details.map((r) => (
                <li key={r.id} className="flex items-center gap-2 px-2 py-2">
                  <span className="w-28 text-xs text-gray-500">{r.date}</span>
                  <span className="w-28">{r.payment || "—"}</span>
                  <span className="w-28 font-semibold">{comma(r.amount)}원</span>
                  <span className="flex-1 truncate">{r.memo || ""}</span>
                </li>
              ))}
              {!details.length && (
                <li className="py-6 text-center text-gray-400">해당 카테고리의 내역이 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
