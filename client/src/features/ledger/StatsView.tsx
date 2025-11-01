import { useMemo, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { sameMonth, parseYMD, weekdayLabel, addMonth } from '../../lib/date';
import { formatCurrency } from '../../lib/format';
import type { Txn, SpendCategory } from '../../types/ledger';

/** 카테고리별 통계 데이터 */
type CategoryStats = {
  category: SpendCategory;
  amount: number;
  percentage: number;
  color: string;
};

/** 카테고리별 색상 매핑 */
const categoryColors: Record<SpendCategory, string> = {
  '생활': '#AACD7E',
  '식비': '#E39D5D',
  '교통': '#D7CA6B',
  '쇼핑/뷰티': '#F0B0D3',
  '의료/건강': '#BDA6E1',
  '문화/여가': '#A7B9E9',
  '미분류': '#A28B78',
};

/**
 * 도넛 차트 컴포넌트
 * SVG를 사용하여 카테고리별 지출 비율을 시각화
 */
function DonutChart({
  data,
  size = 200,
  strokeWidth = 40
}: {
  data: CategoryStats[];
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  let offset = 0;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, index) => {
        const segmentLength = (item.percentage / 100) * circumference;
        const gap = circumference - segmentLength;
        const currentOffset = offset;
        
        offset += segmentLength;
        
        return (
          <circle
            key={index}
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

/**
 * 라인 차트 컴포넌트
 * SVG를 사용하여 시계열 데이터를 선 그래프로 표시
 */
function LineChart({
  data,
  width = 500,
  height = 200
}: {
  data: { month: number; amount: number }[];
  width?: number;
  height?: number;
}) {
  if (data.length === 0) return null;
  
  const padding = 50;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const maxAmount = Math.max(...data.map(dataPoint => dataPoint.amount), 0);
  const minAmount = Math.min(...data.map(dataPoint => dataPoint.amount), 0);
  const range = maxAmount - minAmount || 1;
  
  const points = data.map((dataPoint, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
    const y = padding + chartHeight - ((dataPoint.amount - minAmount) / range) * chartHeight;
    return { x, y, amount: dataPoint.amount };
  });
  
  const pathD = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
  
  /* 그리드 라인 설정 */
  const gridLinesY = 5; // 수평 그리드 라인 개수
  const gridLinesX = 12; // 수직 그리드 라인 개수
  
  return (
    <svg width={width} height={height} className="overflow-visible bg-white">
      {/* 수평 그리드 라인 */}
      {Array.from({ length: gridLinesY + 1 }).map((_, index) => {
        const y = padding + (index / gridLinesY) * chartHeight;
        return (
          <line
            key={`h-${index}`}
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
      {Array.from({ length: gridLinesX + 1 }).map((_, index) => {
        const x = padding + (index / gridLinesX) * chartWidth;
        return (
          <line
            key={`v-${index}`}
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
      {points.map((point, index) => (
        <g key={index}>
          <circle cx={point.x} cy={point.y} r="4" fill="#000" />
          <text
            x={point.x}
            y={point.y - 10}
            textAnchor="middle"
            className="fill-zinc-900"
            fontSize="11"
            fontWeight="500"
          >
            {formatCurrency(point.amount).replace('원', '')}
          </text>
        </g>
      ))}
      
      {/* X축 레이블 */}
      {data.map((monthData, index) => {
        const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
        return (
          <text
            key={index}
            x={x}
            y={height - padding + 25}
            textAnchor="middle"
            className="fill-zinc-500"
            fontSize="11"
          >
            {monthData.month}
          </text>
        );
      })}
    </svg>
  );
}

/**
 * 통계 뷰 컴포넌트
 * 카테고리별 지출 통계와 소비 추이를 표시
 */
export function StatsView() {
  const { state } = useLedger();
  const { year, month } = state.ui;
  const [selectedCategory, setSelectedCategory] = useState<SpendCategory | null>(null);

  /* 현재 월의 지출 트랜잭션만 필터링 */
  const expenses = useMemo(
    () => state.txns.filter(
      (transaction) => sameMonth(transaction.date, year, month) && transaction.amount < 0
    ),
    [state.txns, year, month]
  );

  /* 총 지출 금액 계산 */
  const totalExpense = useMemo(
    () => Math.abs(expenses.reduce((sum, transaction) => sum + transaction.amount, 0)),
    [expenses]
  );

  /* 카테고리별 통계 계산 */
  const categoryStats = useMemo(() => {
    const stats = new Map<SpendCategory, number>();
    
    /* 지출 카테고리 목록 */
    const spendCategories: SpendCategory[] = [
      '생활',
      '식비',
      '교통',
      '쇼핑/뷰티',
      '의료/건강',
      '문화/여가',
      '미분류'
    ];
    
    expenses.forEach((transaction) => {
      if (spendCategories.includes(transaction.category as SpendCategory)) {
        const category = transaction.category as SpendCategory;
        const currentAmount = stats.get(category) || 0;
        stats.set(category, currentAmount + Math.abs(transaction.amount));
      }
    });

    const result: CategoryStats[] = Array.from(stats.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
        color: categoryColors[category],
      }))
      .sort((a, b) => b.percentage - a.percentage); // 비율 내림차순 정렬

    return result;
  }, [expenses, totalExpense]);

  /* 선택된 카테고리의 최근 6개월 지출 추이 */
  const categoryTrend = useMemo(() => {
    if (!selectedCategory) return [];

    const trend: { month: number; amount: number }[] = [];
    
    /* 최근 6개월 데이터 수집 */
    for (let monthsAgo = 5; monthsAgo >= 0; monthsAgo--) {
      const targetDate = addMonth(year, month, -monthsAgo);
      const monthExpenses = state.txns.filter(
        (transaction) =>
          sameMonth(transaction.date, targetDate.year, targetDate.month) &&
          transaction.amount < 0 &&
          transaction.category === selectedCategory
      );
      const monthTotal = Math.abs(
        monthExpenses.reduce((sum, transaction) => sum + transaction.amount, 0)
      );
      trend.push({
        month: targetDate.month,
        amount: monthTotal,
      });
    }

    return trend;
  }, [selectedCategory, year, month, state.txns]);

  /* 선택된 카테고리의 상세 내역 (날짜별 그룹화) */
  const categoryDetails = useMemo(() => {
    if (!selectedCategory) return [];

    const details = expenses
      .filter((transaction) => transaction.category === selectedCategory)
      .sort((a, b) => b.date.localeCompare(a.date)); // 최신 날짜가 먼저

    /* 날짜별로 그룹핑 */
    const groupedByDate = new Map<string, Txn[]>();
    details.forEach((transaction) => {
      const existingTransactions = groupedByDate.get(transaction.date) || [];
      groupedByDate.set(transaction.date, [...existingTransactions, transaction]);
    });

    return Array.from(groupedByDate.entries()).map(([date, items]) => ({
      date,
      items: items.sort((a, b) => a.createdAt - b.createdAt), // 같은 날 내에서 생성 시간순
      total: Math.abs(items.reduce((sum, transaction) => sum + transaction.amount, 0)),
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
                      /* 같은 카테고리 재클릭: 상세 뷰 닫기, 다른 카테고리 클릭: 선택 변경 */
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
              const weekday = weekdayLabel(date);
              const { m: dateMonth, d: dateDay } = parseYMD(date);
              return (
                <div key={date}>
                  <div className="mb-2 body-14 text-zinc-500">
                    <div className="flex items-center justify-between">
                      <div>{dateMonth}월 {dateDay}일 {weekday}요일</div>
                      <div className="body-14 text-zinc-900">지출 {formatCurrency(-total)}</div>
                    </div>
                  </div>
                  <ul className="space-y-0 border border-zinc-200 bg-white">
                    {items.map((transaction) => {
                      const methodName = state.methods.find((method) => method.id === transaction.methodId)?.name ?? '—';
                      return (
                        <li
                          key={transaction.id}
                          className="group grid cursor-pointer items-stretch bg-white hover:bg-zinc-50 border-b border-zinc-200 last:border-0 font-sans"
                          style={{ gridTemplateColumns: '120px 1fr 80px 120px auto', gap: '0' }}
                        >
                          <div className="tag shrink-0 text-white flex items-center justify-center px-4 py-3 min-h-[60px] body-12" data-cat={transaction.category}>
                            {transaction.category}
                          </div>
                          <div className="min-w-0 body-14 text-zinc-900 truncate px-4 py-3 flex items-center">
                            {transaction.memo || <span className="text-neutral-text-weak">메모 없음</span>}
                          </div>
                          <div className="body-14 text-neutral-text-weak text-left truncate px-4 py-3 flex items-center">
                            {methodName}
                          </div>
                          <div className="body-14 text-brand-text-expense text-right px-4 py-3 flex items-center">
                            {formatCurrency(transaction.amount)}
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

