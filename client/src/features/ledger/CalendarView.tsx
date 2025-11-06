import { useMemo } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { sameMonth, parseYMD } from '../../lib/date';
import { formatCurrency } from '../../lib/format';
import type { Txn } from '../../types/ledger';

/** 달력 셀의 데이터 */
type DayData = {
  date: string;
  income: number;
  expense: number;
  total: number;
  isToday: boolean;
  isCurrentMonth: boolean;
};

/**
 * 달력 뷰 컴포넌트
 * 월별 달력 그리드와 날짜별 트랜잭션 통계를 표시
 */
export function CalendarView() {
  const { state } = useLedger();
  const { year, month } = state.ui;

  /* 현재 월의 트랜잭션 필터링 */
  const monthlyTransactions = useMemo(
    () => state.txns.filter((transaction) => sameMonth(transaction.date, year, month)),
    [state.txns, year, month]
  );

  /* 오늘 날짜 정보 */
  const today = useMemo(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
      dateStr: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
    };
  }, []);

  /* 월별 총합 계산 */
  const monthSummary = useMemo(() => {
    const income = monthlyTransactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = monthlyTransactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    return { income, expense, total: income + expense };
  }, [monthlyTransactions]);

  /* 날짜별로 트랜잭션 그룹화 */
  const transactionsByDate = useMemo(() => {
    const dateMap = new Map<string, Txn[]>();
    monthlyTransactions.forEach((transaction) => {
      const existingTransactions = dateMap.get(transaction.date) || [];
      dateMap.set(transaction.date, [...existingTransactions, transaction]);
    });
    return dateMap;
  }, [monthlyTransactions]);

  /* 달력 그리드 생성 (6주 × 7일 = 42개 셀) */
  const calendarGrid = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstWeekday = firstDay.getDay(); // 0: 일요일 ~ 6: 토요일
    const daysInMonth = lastDay.getDate();

    /* 이전 달 날짜들 (첫 주를 채우기 위함) */
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prevLastDay = new Date(prevYear, prevMonth, 0).getDate();
    const prevDays: DayData[] = [];
    
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const date = prevLastDay - i;
      const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      prevDays.push({
        date: dateStr,
        income: 0,
        expense: 0,
        total: 0,
        isToday: false,
        isCurrentMonth: false,
      });
    }

    /* 현재 달 날짜들 */
    const currentDays: DayData[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayTransactions = transactionsByDate.get(dateStr) || [];
      const income = dayTransactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const expense = dayTransactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const total = income + expense;
      const isToday = today.year === year && today.month === month && today.date === day;

      currentDays.push({
        date: dateStr,
        income,
        expense,
        total,
        isToday,
        isCurrentMonth: true,
      });
    }

    /* 다음 달 날짜들 (총 42개 셀을 채우기 위함) */
    const nextDays: DayData[] = [];
    const totalCells = prevDays.length + currentDays.length;
    const remaining = 42 - totalCells; // 6주 × 7일 = 42
    
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      nextDays.push({
        date: dateStr,
        income: 0,
        expense: 0,
        total: 0,
        isToday: false,
        isCurrentMonth: false,
      });
    }

    return [...prevDays, ...currentDays, ...nextDays];
  }, [year, month, transactionsByDate, today]);

  /* 주 단위로 그룹화 */
  const weeks = useMemo(() => {
    const result: DayData[][] = [];
    for (let i = 0; i < calendarGrid.length; i += 7) {
      result.push(calendarGrid.slice(i, i + 7));
    }
    return result;
  }, [calendarGrid]);

  return (
    <section className="font-sans">
      {/* 달력 그리드 */}
      <div className="bg-white border border-zinc-200">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b border-zinc-200">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div
              key={day}
              className="body-14 text-zinc-500 text-center py-2 border-r border-zinc-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 달력 셀들 */}
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 border-b border-zinc-200 last:border-b-0">
            {week.map((day) => {
              const { d: dateDay } = parseYMD(day.date);
              return (
                <div
                  key={day.date}
                  className={`
                    min-h-[100px] border-r border-zinc-200 last:border-r-0 p-2
                    ${day.isCurrentMonth ? 'bg-white' : 'bg-zinc-50'}
                    ${day.isToday ? 'bg-zinc-100' : ''}
                  `}
                >
                  {/* 날짜 숫자 */}
                  <div className="body-14 text-zinc-500 mb-1">
                    {day.isCurrentMonth ? dateDay : ''}
                  </div>

                  {/* 트랜잭션 정보 */}
                  {day.isCurrentMonth && (
                    <div className="space-y-0.5 text-xs">
                      {day.income > 0 && (
                        <div className="text-brand-text-income body-12 truncate">
                          {formatCurrency(day.income).replace('원', '')}
                        </div>
                      )}
                      {day.expense < 0 && (
                        <div className="text-brand-text-expense body-12 truncate">
                          {formatCurrency(day.expense).replace('원', '')}
                        </div>
                      )}
                      {day.total !== 0 && (
                        <div className="text-zinc-900 body-12 font-medium truncate">
                          {formatCurrency(day.total).replace('원', '')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 월별 총합 */}
      <div className="mt-6 bg-white border border-zinc-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="body-14 text-zinc-500">
              총 수입 <span className="text-zinc-900">{formatCurrency(monthSummary.income)}</span>
            </div>
            <div className="body-14 text-zinc-500">
              총 지출 <span className="text-zinc-900">{formatCurrency(monthSummary.expense)}</span>
            </div>
          </div>
          <div className="body-14 text-zinc-900 font-medium">
            총합 {formatCurrency(monthSummary.total)}
          </div>
        </div>
      </div>
    </section>
  );
}

