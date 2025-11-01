import { useMemo, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { sameMonth, weekdayLabel, parseYMD } from '../../lib/date';
import { formatCurrency, isIncome } from '../../lib/format';
import type { Txn } from '../../types/ledger';
import { Modal } from '../../components/Modal';

/** 날짜별로 그룹화된 트랜잭션 데이터 */
type DateGroup = {
  date: string;
  items: Txn[];
  incomeSum: number;
  expenseSum: number;
};

/**
 * 리스트 뷰 필터 컴포넌트
 * 수입/지출 필터링 버튼과 전체 통계를 표시
 */
export function ListViewFilter({
  monthly,
  showIncome,
  showExpense,
  onToggleIncome,
  onToggleExpense
}: {
  monthly: Txn[];
  showIncome: boolean;
  showExpense: boolean;
  onToggleIncome: () => void;
  onToggleExpense: () => void;
}) {
  /* 월별 수입/지출 총합 계산 */
  const incomeTotal = monthly
    .filter(transaction => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenseTotal = monthly
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="flex items-center justify-between text-sm text-zinc-700 bg-zinc-100 px-4 py-3">
      <div className="text-zinc-500 body-14">전체 내역 {monthly.length}건</div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleIncome}
          className="flex items-center gap-1.5"
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
            showIncome 
              ? 'bg-zinc-900 border-zinc-900' 
              : 'bg-transparent border-zinc-300'
          }`}>
            {showIncome && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="body-14">수입 {formatCurrency(incomeTotal)}</span>
        </button>
        <button 
          onClick={onToggleExpense}
          className="flex items-center gap-1.5"
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
            showExpense 
              ? 'bg-zinc-900 border-zinc-900' 
              : 'bg-transparent border-zinc-300'
          }`}>
            {showExpense && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="body-14">지출 {formatCurrency(expenseTotal)}</span>
        </button>
      </div>
    </div>
  );
}

/**
 * 리스트 뷰 컴포넌트
 * 날짜별로 그룹화된 트랜잭션 리스트를 표시
 */
export function ListView({
  showIncome,
  showExpense
}: {
  showIncome: boolean;
  showExpense: boolean;
}) {
  const { state, dispatch } = useLedger();
  const { year, month } = state.ui;

  /* 현재 월의 트랜잭션 필터링 */
  const monthlyTransactions = useMemo(() => 
    state.txns.filter(transaction => sameMonth(transaction.date, year, month)), 
    [state.txns, year, month]
  );

  /* 날짜별로 트랜잭션 그룹화 및 정렬 */
  const groupedByDate: DateGroup[] = useMemo(() => {
    const dateMap = new Map<string, Txn[]>();
    
    monthlyTransactions.forEach(transaction => { 
      const existingTransactions = dateMap.get(transaction.date) ?? []; 
      existingTransactions.push(transaction); 
      dateMap.set(transaction.date, existingTransactions); 
    });

    return Array.from(dateMap.entries()).map(([date, items]) => {
      /* 같은 날짜 내에서 생성 시간순으로 정렬 */
      items.sort((a, b) => a.createdAt - b.createdAt);
      
      return {
        date, 
        items,
        incomeSum: items
          .filter(item => item.amount > 0)
          .reduce((sum, item) => sum + item.amount, 0),
        expenseSum: items
          .filter(item => item.amount < 0)
          .reduce((sum, item) => sum + item.amount, 0),
      };
    }).sort((a, b) => b.date.localeCompare(a.date)); // 최신 날짜가 먼저
  }, [monthlyTransactions]);

  /* 삭제 모달 상태 관리 */
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  
  const pendingTransaction = pendingDeleteId 
    ? state.txns.find(transaction => transaction.id === pendingDeleteId) 
    : undefined;
  const pendingPaymentMethod = pendingTransaction 
    ? state.methods.find(method => method.id === pendingTransaction.methodId) 
    : undefined;
  
  /**
   * 트랜잭션 삭제 확인 및 실행
   */
  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    
    setBusy(true);
    setTimeout(() => {
      dispatch({ type: 'removeTxn', id: pendingDeleteId });
      setBusy(false); 
      setPendingDeleteId(undefined);
    }, 1000);
  };

  return (
    <section className="font-sans">
      {/* 날짜별 그룹화된 트랜잭션 리스트 */}
      <div className="space-y-6">
        {groupedByDate.map(group => {
          const weekday = weekdayLabel(group.date);
          const { m: dateMonth, d: dateDay } = parseYMD(group.date);
          
          /* 필터 조건에 맞는 항목만 표시 */
          const filteredItems = group.items.filter(item => 
            (isIncome(item.amount) && showIncome) || 
            (!isIncome(item.amount) && showExpense)
          );
          
          if (filteredItems.length === 0) return null;
          
          return (
            <div key={group.date}>
              {/* 날짜 헤더 및 일별 합계 */}
              <div className="mb-2 body-14 text-zinc-500">
                <div className="flex items-center justify-between">
                  <div>{dateMonth}월 {dateDay}일 {weekday}요일</div>
                </div>
                <div className="mt-1 flex items-center justify-end body-14 text-zinc-900 gap-4">
                  {group.incomeSum > 0 && (
                    <span>수입 {formatCurrency(group.incomeSum)}</span>
                  )}
                  {group.expenseSum < 0 && (
                    <span>지출 {formatCurrency(group.expenseSum)}</span>
                  )}
                </div>
              </div>
              
              {/* 트랜잭션 리스트 */}
              <ul className="space-y-0 border border-zinc-200 bg-white">
                {filteredItems.map(transaction => (
                  <TxnItem
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={() => dispatch({ type: 'setEditing', id: transaction.id })}
                    onDelete={() => setPendingDeleteId(transaction.id)}
                    methodName={
                      state.methods.find(method => method.id === transaction.methodId)?.name ?? '—'
                    }
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* 삭제 확인 모달 */}
      <Modal
        open={!!pendingDeleteId}
        title="해당 내역을 삭제하시겠습니까?"
        busy={busy}
        onCancel={() => !busy && setPendingDeleteId(undefined)}
        onConfirm={confirmDelete}
        confirmText="삭제"
        cancelText="취소"
      >
        {pendingTransaction && (
          <div className="space-y-2 body-14">
            <div>
              <span className="text-neutral-text-weak">카테고리: </span>
              <span className="text-neutral-text">{pendingTransaction.amount > 0 ? '수입' : '지출'}/{pendingTransaction.category}</span>
            </div>
            <div>
              <span className="text-neutral-text-weak">내용: </span>
              <span className="text-neutral-text">{pendingTransaction.memo || '메모 없음'}</span>
            </div>
            <div>
              <span className="text-neutral-text-weak">결제수단: </span>
              <span className="text-neutral-text">{pendingPaymentMethod?.name ?? '—'}</span>
            </div>
            <div>
              <span className="text-neutral-text-weak">금액: </span>
              <span className={`text-neutral-text ${pendingTransaction.amount > 0 ? 'text-brand-text-income' : 'text-brand-text-expense'}`}>
                {formatCurrency(pendingTransaction.amount)}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

/**
 * 트랜잭션 리스트 아이템 컴포넌트
 */
function TxnItem({
  transaction,
  onEdit,
  onDelete,
  methodName
}: {
  transaction: Txn;
  onEdit: () => void;
  onDelete: () => void;
  methodName: string;
}) {
  const isIncomeTransaction = transaction.amount > 0;
  
  return (
    <li
      onClick={onEdit}
      className="group grid cursor-pointer items-stretch bg-white hover:bg-zinc-50 border-b border-zinc-200 last:border-0 font-sans"
      style={{ gridTemplateColumns: '120px 1fr 80px 120px auto', gap: '0' }}
    >
      {/* 카테고리 태그 */}
      <div
        className="tag shrink-0 text-zinc-900 flex items-center justify-center px-4 py-3 min-h-[60px] body-12"
        data-cat={transaction.category}
      >
        {transaction.category}
      </div>
      
      {/* 메모 */}
      <div className="min-w-0 body-14 text-zinc-900 truncate px-4 py-3 flex items-center">
        {transaction.memo || (
          <span className="text-neutral-text-weak">메모 없음</span>
        )}
      </div>
      
      {/* 결제수단 */}
      <div className="body-14 text-neutral-text-weak text-left truncate px-4 py-3 flex items-center">
        {methodName}
      </div>
      
      {/* 금액 (수입: 파란색, 지출: 빨간색) */}
      <div
        className={`body-14 text-right px-4 py-3 flex items-center ${
          isIncomeTransaction 
            ? 'text-brand-text-income' 
            : 'text-brand-text-expense'
        }`}
      >
        {formatCurrency(transaction.amount)}
      </div>
      
      {/* 삭제 버튼 (호버 시 표시) */}
      <div className="px-4 py-3 flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="invisible shrink-0 border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 hover:bg-zinc-50 group-hover:visible body-12 transition-colors"
          aria-label="삭제"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
