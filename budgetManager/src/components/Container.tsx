import { useState } from 'react';
import checkboxIcon from '../assets/icons/check.svg';
import uncheckboxIcon from '../assets/icons/uncheckbox.svg';
import deleteBtn from '../assets/icons/deleteBtn.svg';
import type { Transaction } from './InputBar';

interface ContainerProps {
  transactions: Transaction[];
  onDeleteTransaction?: (index: number, transaction: Transaction) => void;
  onEditTransaction?: (transaction: Transaction) => void;
  isEditing?: boolean;
  currentDate?: Date;
}

// 카테고리별 배경색 매핑
const getCategoryBackgroundColor = (category: string): string => {
  const categoryColorMap: { [key: string]: string } = {
    '생활': 'var(--color-90)',
    '쇼핑/뷰티': 'var(--color-30)',
    '의료/건강': 'var(--color-50)',
    '식비': 'var(--color-60)',
    '교통': 'var(--color-70)',
    '문화/여가': 'var(--color-pastel-perfume)',
    '미분류': 'var(--color-pastel-lavenderPink)',
    '월급': 'var(--color-20)',
    '기타 수입': 'var(--color-10)',
    '용돈': 'var(--color-40)',
  };
  return categoryColorMap[category] || 'var(--color-neutral-surface-default)';
};

export default function Container({ transactions, onDeleteTransaction, onEditTransaction, isEditing, currentDate }: ContainerProps) {
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  const [hoveredTransactionIndex, setHoveredTransactionIndex] = useState<number | null>(null);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<number | null>(null);

  // 외부에서 편집이 취소되면 선택 상태 해제
  if (!isEditing && selectedTransactionIndex !== null) {
    setSelectedTransactionIndex(null);
  }

  // 선택된 월의 연월 구하기 (YYYY.MM 형식)
  const getSelectedYearMonth = (): string => {
    if (!currentDate) return '';
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${year}.${month}`;
  };

  // 필터링된 거래 데이터
  const filteredTransactions = transactions.filter(t => {
    // 월 필터링 (currentDate가 있으면 해당 월만 표시)
    if (currentDate) {
      const selectedYearMonth = getSelectedYearMonth();
      const transactionYearMonth = t.date.substring(0, 7); // "YYYY.MM" 추출
      if (transactionYearMonth !== selectedYearMonth) return false;
    }

    if (t.type === 'income') return showIncome;
    if (t.type === 'expense') return showExpense;
    return true;
  });

  // 날짜 문자열로부터 요일 계산
  const getDayOfWeek = (dateString: string): string => {
    const parts = dateString.split('.');
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return dayNames[date.getDay()];
  };

  // 일자별 수입/지출 합계 계산
  const getDateTotals = (dateString: string) => {
    const dateTransactions = filteredTransactions.filter(t => t.date === dateString);
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

    return { income, expense };
  };

  // 일자별로 그룹화하고 정렬
  const groupedTransactions = (() => {
    const grouped: { [key: string]: Transaction[] } = {};

    filteredTransactions.forEach(t => {
      if (!grouped[t.date]) {
        grouped[t.date] = [];
      }
      grouped[t.date].push(t);
    });

    // 날짜를 내림차순으로 정렬 (최신순)
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      return b.localeCompare(a);
    });

    return sortedDates.map(date => ({
      date,
      transactions: grouped[date]
    }));
  })();

  // 수입/지출 총액 계산
  const getIncomeTotalAmount = () => {
    return filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => {
        const amount = parseInt(t.amount.replace(/,/g, ''), 10);
        return total + amount;
      }, 0);
  };

  const getExpenseTotalAmount = () => {
    return filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => {
        const amount = parseInt(t.amount.replace(/,/g, ''), 10);
        return total + amount;
      }, 0);
  };

  const incomeTotalAmount = getIncomeTotalAmount();
  const expenseTotalAmount = getExpenseTotalAmount();
  const count = filteredTransactions.length;

  return(
    <div className="absolute top-[286px] left-[296px]">
        <div className="w-[846px] flex flex-col gap-[40px]">
            {/* monthlyInfo */}
            <div className="w-[846px] h-[24px] flex items-center justify-between">
                {/* item Counter */}
                <div className="flex items-center justify-start w-[76px] h-[24px] gap-[8px]">
                    <div className="flex items-center justify-start w-[45px] h-[24px] text-[12px] font-300 text-neutral-text-default">전체내역</div>
                    <div className="flex items-center justify-start w-[23px] h-[24px] text-[12px] font-300 text-neutral-text-default">{count}건</div>
                </div>
                {/* Checkbox buttons */}
                <div className="h-[24px] flex items-center justify-end gap-[12px] flex-nowrap">
                    {/* income checkbox */}
                    <div className="h-[24px] flex items-center justify-start gap-[4px] flex-nowrap shrink-0">
                        <button
                          onClick={() => setShowIncome(!showIncome)}
                          className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                            <img src={showIncome ? checkboxIcon : uncheckboxIcon} alt="income checkbox" className="w-[13px] h-[13px]" />
                        </button>
                        <div className="flex items-center justify-start h-[24px] text-[12px] font-300 text-neutral-text-default whitespace-nowrap">수입 {incomeTotalAmount.toLocaleString()}</div>
                    </div>
                    {/* expense checkbox */}
                    <div className="h-[24px] flex items-center justify-start gap-[4px] flex-nowrap shrink-0">
                        <button
                          onClick={() => setShowExpense(!showExpense)}
                          className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                            <img src={showExpense ? checkboxIcon : uncheckboxIcon} alt="expense checkbox" className="w-[13px] h-[13px]" />
                        </button>
                        <div className="flex items-center justify-start h-[24px] text-[12px] font-300 text-neutral-text-default whitespace-nowrap">지출 {expenseTotalAmount.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            {/* Transactions List by Date */}
            <div className="mt-[24px] flex flex-col gap-[40px]">
              {groupedTransactions.length === 0 ? (
                <div className="w-[846px] h-[56px] flex items-center justify-center text-[12px] font-300 text-neutral-text-weak bg-neutral-surface-weak">
                  내역이 없습니다
                </div>
              ) : (
                groupedTransactions.map(({ date, transactions: dateTransactions }) => {
                  const { income, expense } = getDateTotals(date);
                  const dayOfWeek = getDayOfWeek(date);

                  return (
                    <div key={date} className="flex flex-col gap-[16px]">
                      {/* Daily Summary Section */}
                      <div className="w-[846px] h-[16px] flex items-center justify-between" style={{ fontFamily: 'ChosunIlboMyungjo, serif', fontSize: '12px', fontWeight: '300', color: 'var(--color-neutral-text-default)' }}>
                        <div className="flex gap-[8px]">
                          <span>{date}</span>
                          <span>({dayOfWeek})</span>
                        </div>
                        <div className="flex gap-[24px]">
                          {income > 0 && <span>수입 {income.toLocaleString()}원</span>}
                          {expense > 0 && <span>지출 {expense.toLocaleString()}원</span>}
                        </div>
                      </div>

                      {/* Daily Items Container */}
                      <div className="flex flex-col border-t border-b border-neutral-border-default">
                        {dateTransactions.map((transaction, dateIndex) => {
                          // 필터링된 거래에서의 실제 인덱스를 찾기
                          const actualIndex = filteredTransactions.findIndex(t => t === transaction);
                          const isHovered = hoveredTransactionIndex === actualIndex;

                          return (
                            <div
                              key={`${date}-${dateIndex}`}
                              className="w-[846px] h-[56px] flex flex-col"
                              onMouseEnter={() => setHoveredTransactionIndex(actualIndex)}
                              onMouseLeave={() => setHoveredTransactionIndex(null)}
                            >
                              <div
                                className="w-[846px] h-[56px] flex items-center gap-[16px] pr-[16px] cursor-pointer transition-colors"
                                style={{
                                  backgroundColor: isHovered || selectedTransactionIndex === actualIndex ? '#FFFFFF' : 'transparent'
                                }}
                                onClick={(e) => {
                                  // 삭제 버튼 제외하고 클릭 시 InputBar에 값 채우기
                                  if ((e.target as HTMLElement).closest('.delete-btn')) return;
                                  e.stopPropagation();
                                  setSelectedTransactionIndex(actualIndex);
                                  onEditTransaction?.(transaction);
                                }}
                                onMouseLeave={() => {
                                  // 마우스가 떠날 때 선택 상태 유지, hover만 해제
                                  setHoveredTransactionIndex(null);
                                }}
                              >
                                {/* Category */}
                                <div className="w-[92px] h-[56px] flex flex-col items-center justify-center gap-[10px]"
                                  style={{
                                    padding: '4px 8px',
                                    backgroundColor: getCategoryBackgroundColor(transaction.category),
                                  }}>
                                  <div className="text-[12px] font-300 text-neutral-text-default">{transaction.category}</div>
                                </div>

                                {/* Description */}
                                <div className="w-[400px] h-[24px] flex items-center">
                                  <div className="text-[14px] font-300 text-neutral-text-default">{transaction.description}</div>
                                </div>

                                {/* Payment */}
                                <div className="w-[104px] h-[24px] flex items-center">
                                  <div className="text-[14px] font-300 text-neutral-text-default">{transaction.payment}</div>
                                </div>

                                {/* Value */}
                                <div className="w-[186px] h-[22px] flex items-center justify-end text-[14px] font-600" style={{
                                  color: transaction.type === 'income' ? 'var(--color-brand-text-income)' : 'var(--color-brand-text-expense)',
                                  width: isHovered ? '129px' : '186px'
                                }}>
                                  {transaction.type === 'income' ? '+' : '-'}{parseInt(transaction.amount.replace(/,/g, '')).toLocaleString()}원
                                </div>

                                {/* Delete Button */}
                                {isHovered && (
                                  <button
                                    className="delete-btn w-[41px] h-[24px] flex items-center justify-center gap-[4px] shrink-0"
                                    onClick={() => onDeleteTransaction?.(actualIndex, transaction)}
                                  >
                                    <img src={deleteBtn} alt="delete" className="w-[16px] h-[16px] flex items-center justify-center" />
                                    <span className="flex items-center justify-center text-[12px] font-300" style={{ color: 'var(--color-danger-text-default)' }}>삭제</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
        </div>
    </div>
  )
}
