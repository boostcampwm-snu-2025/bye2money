import type { Transaction } from '../components/InputBar';

interface CalendarPageProps {
  currentDate: Date;
  transactions: Transaction[];
}

export default function CalendarPage({ currentDate, transactions }: CalendarPageProps) {

  // 월의 첫 날과 마지막 날 구하기
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  // 월의 시작 요일 (0 = 일요일, 6 = 토요일)
  const getStartDay = (date: Date) => {
    return getFirstDayOfMonth(date).getDay();
  };

  // 월의 마지막 날짜
  const getLastDate = (date: Date) => {
    return getLastDayOfMonth(date).getDate();
  };

  // 이전 월의 마지막 날짜들
  const getPrevMonthLastDate = (date: Date) => {
    return getLastDayOfMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1)).getDate();
  };

  // 캘린더 그리드 생성
  const getCalendarDays = () => {
    const firstDay = getStartDay(currentDate);
    const lastDate = getLastDate(currentDate);
    const prevMonthLastDate = getPrevMonthLastDate(currentDate);
    const days = [];

    // 이전 달의 날짜들
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDate - i,
        isCurrentMonth: false
      });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        date: i,
        isCurrentMonth: true
      });
    }

    // 다음 달의 날짜들 (총 42개 = 6주 * 7일)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false
      });
    }

    return days;
  };

  // 특정 날짜의 거래 데이터 가져오기
  const getTransactionsForDate = (date: number) => {
    const dateString = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(date).padStart(2, '0')}`;
    return transactions.filter(t => t.date === dateString);
  };

  // 특정 날짜의 누적 수입, 수출, 총합 계산
  const getTransactionSummary = (date: number) => {
    const dateTransactions = getTransactionsForDate(date);
    let income = 0;
    let expense = 0;

    dateTransactions.forEach(t => {
      const amount = parseInt(t.amount.replace(/,/g, ''), 10);
      if (t.type === 'income') {
        income += amount;
      } else {
        expense += amount;
      }
    });

    const total = income - expense;
    return { income, expense, total };
  };

  // 월 전체 수입, 수출, 총합 계산
  const getMonthSummary = () => {
    let monthIncome = 0;
    let monthExpense = 0;

    transactions.forEach(t => {
      const tDate = new Date(t.date.split('.').join('-'));
      if (tDate.getFullYear() === currentDate.getFullYear() &&
          tDate.getMonth() === currentDate.getMonth()) {
        const amount = parseInt(t.amount.replace(/,/g, ''), 10);
        if (t.type === 'income') {
          monthIncome += amount;
        } else {
          monthExpense += amount;
        }
      }
    });

    const monthTotal = monthIncome - monthExpense;
    return { monthIncome, monthExpense, monthTotal };
  };

  // 오늘 날짜 확인
  const today = new Date();
  const isToday = (date: number) => {
    return date === today.getDate() &&
           currentDate.getFullYear() === today.getFullYear() &&
           currentDate.getMonth() === today.getMonth();
  };

  const calendarDays = getCalendarDays();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const monthSummary = getMonthSummary();

  // 표시되는 주의 개수 계산
  const visibleWeeks = Array.from({ length: 6 }).filter((_, weekIndex) => {
    const weekDays = calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7);
    return weekDays.some(day => day.isCurrentMonth);
  }).length;

  // 캘린더 높이: 헤더(48px) + 주마다(120px)
  const calendarHeight = 48 + visibleWeeks * 120;
  // 캡션 위치: 캘린더 높이 + 16px
  const captionTop = calendarHeight + 16;

  return (
    <div className="absolute top-[176px] left-[297px] border-[0.5px] border-neutral-border-default">
      <div className="flex flex-col w-[846px] bg-neutral-surface-default">
        {/* Day Names Header */}
        <div className="flex items-center justify-between w-[846px] h-[48px]">
          {dayNames.map((day) => (
            <div key={day} className="flex-1 flex items-center justify-center h-[48px] border-[0.5px] border-neutral-border-default">
              <div className="text-[12px] font-300 text-neutral-text-default">{day}</div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, weekIndex) => {
            const weekDays = calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7);
            const hasCurrentMonthDays = weekDays.some(day => day.isCurrentMonth);

            // 현재 달의 날이 없으면 렌더링하지 않음
            if (!hasCurrentMonthDays) {
              return null;
            }

            return (
              <div key={weekIndex} className="flex items-center justify-between w-[846px] h-[120px]">
                {weekDays.map((day, dayIndex) => {
                  const summary = day.isCurrentMonth ? getTransactionSummary(day.date) : { income: 0, expense: 0, total: 0 };
                  const todayDate = day.isCurrentMonth && isToday(day.date);

                  return (
                    <div
                      key={dayIndex}
                      className={`border flex flex-col items-end justify-between ${
                        day.isCurrentMonth ? 'cursor-pointer hover:bg-neutral-surface-weak' : ''
                      }`}
                      style={{
                        width: '120.857px',
                        height: '120px',
                        padding: '8px',
                        borderWidth: '0.5px',
                        backgroundColor: todayDate ? 'var(--color-neutral-surface-point)' : '',
                        borderColor: 'var(--color-neutral-border-default)'
                      }}>
                      {/* Content Area */}
                      {day.isCurrentMonth && (
                        <div className="w-[104px] h-[72px] flex flex-col gap-[2px] text-left">
                          {summary.income > 0 && (
                            <div className="text-[14px] font-300" style={{ color: 'var(--color-brand-text-income)' }}>
                              {summary.income.toLocaleString()}
                            </div>
                          )}
                          {summary.expense > 0 && (
                            <div className="text-[14px] font-300" style={{ color: 'var(--color-brand-text-expense)' }}>
                              -{summary.expense.toLocaleString()}
                            </div>
                          )}
                          {(summary.income > 0 || summary.expense > 0) && (
                            <div className="text-[14px] font-300" style={{ color: 'var(--color-brand-text-default)' }}>
                              {summary.total < 0 ? '-' : ''}{Math.abs(summary.total).toLocaleString()}
                            </div>
                          )}
                        </div>
                      )}
                      {/* Date */}
                      {day.isCurrentMonth && (
                        <div className="w-[104px] h-[16px] flex items-center justify-end">
                          <div className="text-[14px] font-300" style={{ fontFamily: 'ChosunIlboMyungjo, serif' }}>{day.date}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption/Summary Area */}
      <div
        className="absolute w-[846px] h-[16px] flex items-center justify-between"
        style={{
          top: `${captionTop}px`,
          left: '0px',
          color: 'var(--color-neutral-text-default)',
          fontFamily: 'ChosunIlboMyungjo, serif',
          fontSize: '12px',
          fontWeight: '300'
        }}>
        <div className="flex items-center gap-[24px]">
          {monthSummary.monthIncome >= 0 && (
            <span>
              총 수입 <span style={{ color: 'var(--color-brand-text-income)' }}>{monthSummary.monthIncome.toLocaleString()}</span>원
            </span>
          )}
          {monthSummary.monthExpense >= 0 && (
            <span>
              총 지출 <span style={{ color: 'var(--color-brand-text-expense)' }}>{monthSummary.monthExpense.toLocaleString()}</span>원
            </span>
          )}
        </div>
        <div style={{ color: 'var(--color-brand-text-default)' }}>
          총합 {monthSummary.monthTotal < 0 ? '-' : ''}
          <span style={{ color: 'var(--color-brand-text-default)' }}>{Math.abs(monthSummary.monthTotal).toLocaleString()}</span>원
        </div>
      </div>
    </div>
  );
}
