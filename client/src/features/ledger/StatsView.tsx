import { useMemo, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { sameMonth, parseYMD, weekdayLabel, addMonth } from '../../lib/date';
import { formatCurrency } from '../../lib/format';
import type { Txn, SpendCategory } from '../../types/ledger';

type CategoryStats = {
  category: SpendCategory;
  amount: number;
  percentage: number;
  color: string;
};

// 카테고리별 색상 매핑
const categoryColors: Record<SpendCategory, string> = {
  '생활': '#AACD7E',      // chip-40
  '식비': '#E39D5D',      // chip-20
  '교통': '#D7CA6B',      // chip-30
  '쇼핑/뷰티': '#F0B0D3', // chip-110
  '의료/건강': '#BDA6E1', // chip-100
  '문화/여가': '#A7B9E9', // chip-90
  '미분류': '#A28B78',    // chip-10
};

// SVG 도넛 차트 생성 함수
function DonutChart({ data, size = 200, strokeWidth = 40 }: { data: CategoryStats[]; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  let offset = 0;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, idx) => {
        const segmentLength = (item.percentage / 100) * circumference;
        const gap = circumference - segmentLength;
        const currentOffset = offset;
        
        offset += segmentLength;
        
        return (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${gap}`}
            strokeDashoffset={-currentOffset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${center} ${center})`}
          />
        );
      })}
    </svg>
  );
}

// 라인 차트 컴포넌트
function LineChart({ data, width = 500, height = 200 }: { data: { month: number; amount: number }[]; width?: number; height?: number }) {
  if (data.length === 0) return null;
  
  const padding = 50;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const maxAmount = Math.max(...data.map(d => d.amount), 0);
  const minAmount = Math.min(...data.map(d => d.amount), 0);
  const range = maxAmount - minAmount || 1;
  
  const points = data.map((d, idx) => {
    const x = padding + (idx / (data.length - 1 || 1)) * chartWidth;
    const y = padding + chartHeight - ((d.amount - minAmount) / range) * chartHeight;
    return { x, y, amount: d.amount };
  });
  
  const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  // 그리드 라인 개수
  const gridLinesY = 5;
  const gridLinesX = 12;
  
  return (
    <svg width={width} height={height} className="overflow-visible bg-white">
      {/* 수평 그리드 라인 */}
      {Array.from({ length: gridLinesY + 1 }).map((_, i) => {
        const y = padding + (i / gridLinesY) * chartHeight;
        return (
          <line
            key={`h-${i}`}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#e4e4e7"
            strokeWidth="1"
          />
        );
      })}
      
      {/* 수직 그리드 라인 */}
      {Array.from({ length: gridLinesX + 1 }).map((_, i) => {
        const x = padding + (i / gridLinesX) * chartWidth;
        return (
          <line
            key={`v-${i}`}
            x1={x}
            y1={padding}
            x2={x}
            y2={height - padding}
            stroke="#e4e4e7"
            strokeWidth="1"
          />
        );
      })}
      
      {/* 데이터 포인트와 라인 */}
      <path
        d={pathD}
        fill="none"
        stroke="#000"
        strokeWidth="2"
      />
      {points.map((p, idx) => (
        <g key={idx}>
          <circle cx={p.x} cy={p.y} r="4" fill="#000" />
          <text
            x={p.x}
            y={p.y - 10}
            textAnchor="middle"
            className="fill-zinc-900"
            fontSize="11"
            fontWeight="500"
          >
            {formatCurrency(p.amount).replace('원', '')}
          </text>
        </g>
      ))}
      
      {/* X축 레이블 */}
      {data.map((d, idx) => {
        const x = padding + (idx / (data.length - 1 || 1)) * chartWidth;
        return (
          <text
            key={idx}
            x={x}
            y={height - padding + 25}
            textAnchor="middle"
            className="fill-zinc-500"
            fontSize="11"
          >
            {d.month}
          </text>
        );
      })}
    </svg>
  );
}

export function StatsView() {
  const { state } = useLedger();
  const { year, month } = state.ui;
  const [selectedCategory, setSelectedCategory] = useState<SpendCategory | null>(null);

  // 현재 월의 지출 트랜잭션만 필터링
  const expenses = useMemo(
    () => state.txns.filter((t) => sameMonth(t.date, year, month) && t.amount < 0),
    [state.txns, year, month]
  );

  // 총 지출 금액
  const totalExpense = useMemo(
    () => Math.abs(expenses.reduce((sum, t) => sum + t.amount, 0)),
    [expenses]
  );

  // 카테고리별 통계
  const categoryStats = useMemo(() => {
    const stats = new Map<SpendCategory, number>();
    
    // 지출 카테고리 리스트 (명시적으로 정의)
    const spendCategories: SpendCategory[] = ['생활', '식비', '교통', '쇼핑/뷰티', '의료/건강', '문화/여가', '미분류'];
    
    expenses.forEach((t) => {
      // 지출 카테고리인지 확인
      if (spendCategories.includes(t.category as SpendCategory)) {
        const category = t.category as SpendCategory;
        const current = stats.get(category) || 0;
        stats.set(category, current + Math.abs(t.amount));
      }
    });

    const result: CategoryStats[] = Array.from(stats.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
        color: categoryColors[category],
      }))
      .sort((a, b) => b.percentage - a.percentage); // 비율 순으로 정렬

    return result;
  }, [expenses, totalExpense]);

  // 선택된 카테고리의 최근 6개월 지출 데이터
  const categoryTrend = useMemo(() => {
    if (!selectedCategory) return [];

    const trend: { month: number; amount: number }[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const targetDate = addMonth(year, month, -i);
      const monthExpenses = state.txns.filter(
        (t) =>
          sameMonth(t.date, targetDate.year, targetDate.month) &&
          t.amount < 0 &&
          t.category === selectedCategory
      );
      const monthTotal = Math.abs(monthExpenses.reduce((sum, t) => sum + t.amount, 0));
      trend.push({
        month: targetDate.month,
        amount: monthTotal,
      });
    }

    return trend;
  }, [selectedCategory, year, month, state.txns]);

  // 선택된 카테고리의 상세 내역
  const categoryDetails = useMemo(() => {
    if (!selectedCategory) return [];

    const details = expenses
      .filter((t) => t.category === selectedCategory)
      .sort((a, b) => b.date.localeCompare(a.date));

    // 날짜별로 그룹핑
    const grouped = new Map<string, Txn[]>();
    details.forEach((t) => {
      const existing = grouped.get(t.date) || [];
      grouped.set(t.date, [...existing, t]);
    });

    return Array.from(grouped.entries()).map(([date, items]) => ({
      date,
      items: items.sort((a, b) => a.createdAt - b.createdAt),
      total: Math.abs(items.reduce((sum, t) => sum + t.amount, 0)),
    }));
  }, [selectedCategory, expenses]);

  return (
    <section className="font-sans">
      {/* 월별 총 지출 */}
      <div className="bg-white border border-zinc-200 p-6 mb-6">
        {/* 도넛 차트와 카테고리 리스트 */}
        <div className="flex gap-8 items-start">
          {/* 도넛 차트 - 왼쪽 */}
          <div className="flex-shrink-0">
            <DonutChart data={categoryStats} size={240} strokeWidth={50} />
          </div>

          {/* 카테고리별 통계 표 - 오른쪽 */}
          <div className="flex-1">
            {/* 제목과 총액 */}
            <div className="mb-3">
              <div className="body-16 text-zinc-900 mb-1">이번 달 지출 금액</div>
              <div className="body-16 text-zinc-900">{formatCurrency(-totalExpense)}</div>
            </div>
            
            {/* 구분선 */}
            <div className="border-b border-zinc-200 mb-3"></div>

            {/* 카테고리 표 */}
            <table className="w-full">
              <tbody>
                {categoryStats.map((stat) => (
                  <tr
                    key={stat.category}
                    onClick={() => {
                      // 같은 카테고리를 다시 클릭하면 닫기, 다른 카테고리를 클릭하면 선택 변경
                      if (selectedCategory === stat.category) {
                        setSelectedCategory(null);
                      } else {
                        setSelectedCategory(stat.category);
                      }
                    }}
                    className="cursor-pointer transition-opacity hover:opacity-90"
                  >
                    <td className="py-2.5 pr-4">
                      <div
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded"
                        style={{ backgroundColor: stat.color }}
                      >
                        <span className="body-12 text-zinc-900">{stat.category}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right body-14 text-zinc-900 w-16">
                      {stat.percentage.toFixed(0)}%
                    </td>
                    <td className="py-2.5 text-right body-14 text-zinc-900">
                      {formatCurrency(stat.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 선택된 카테고리의 소비 추이 그래프와 상세 내역 */}
      {selectedCategory && (
        <div className="bg-white border border-zinc-200 p-6">
          <h3 className="body-16 text-zinc-900 mb-6">
            {selectedCategory} 카테고리 소비 추이
          </h3>

          {/* 라인 차트 */}
          <div className="mb-8">
            <LineChart data={categoryTrend} width={600} height={200} />
          </div>

          {/* 상세 내역 */}
          <div className="space-y-6">
            {categoryDetails.map(({ date, items, total }) => {
              const wd = weekdayLabel(date);
              const { m, d } = parseYMD(date);
              return (
                <div key={date}>
                  <div className="mb-2 body-14 text-zinc-500">
                    <div className="flex items-center justify-between">
                      <div>{m}월 {d}일 {wd}요일</div>
                      <div className="body-14 text-zinc-900">지출 {formatCurrency(-total)}</div>
                    </div>
                  </div>
                  <ul className="space-y-0 border border-zinc-200 bg-white">
                    {items.map((txn) => {
                      const methodName = state.methods.find((m) => m.id === txn.methodId)?.name ?? '—';
                      return (
                        <li
                          key={txn.id}
                          className="group grid cursor-pointer items-stretch bg-white hover:bg-zinc-50 border-b border-zinc-200 last:border-0 font-sans"
                          style={{ gridTemplateColumns: '120px 1fr 80px 120px auto', gap: '0' }}
                        >
                          <div className="tag shrink-0 text-white flex items-center justify-center px-4 py-3 min-h-[60px] body-12" data-cat={txn.category}>
                            {txn.category}
                          </div>
                          <div className="min-w-0 body-14 text-zinc-900 truncate px-4 py-3 flex items-center">
                            {txn.memo || <span className="text-neutral-text-weak">메모 없음</span>}
                          </div>
                          <div className="body-14 text-neutral-text-weak text-left truncate px-4 py-3 flex items-center">
                            {methodName}
                          </div>
                          <div className="body-14 text-brand-text-expense text-right px-4 py-3 flex items-center">
                            {formatCurrency(txn.amount)}
                          </div>
                          <div className="px-4 py-3"></div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

