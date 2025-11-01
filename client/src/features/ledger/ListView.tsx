import { useMemo, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { sameMonth, weekdayLabel, parseYMD } from '../../lib/date';
import { formatCurrency, isIncome } from '../../lib/format';
import type { Txn } from '../../types/ledger';
import { Modal } from '../../components/Modal';

type Group = { date:string; items:Txn[]; incomeSum:number; expenseSum:number };

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
  const incomeTotal = monthly.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0);
  const expenseTotal = monthly.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0);

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

export function ListView({
  showIncome,
  showExpense
}: {
  showIncome: boolean;
  showExpense: boolean;
}){
  const { state, dispatch } = useLedger();
  const { year, month } = state.ui;

  const monthly = useMemo(()=> state.txns.filter(t=>sameMonth(t.date,year,month)), [state.txns,year,month]);

  const grouped:Group[] = useMemo(()=>{
    const m = new Map<string,Txn[]>();
    monthly.forEach(t=>{ const arr=m.get(t.date)??[]; arr.push(t); m.set(t.date,arr); });
    return Array.from(m.entries()).map(([date,items])=>{
      items.sort((a,b)=> a.createdAt - b.createdAt);
      return {
        date, items,
        incomeSum: items.filter(i=>i.amount>0).reduce((s,i)=>s+i.amount,0),
        expenseSum: items.filter(i=>i.amount<0).reduce((s,i)=>s+i.amount,0),
      };
    }).sort((a,b)=> b.date.localeCompare(a.date));
  }, [monthly]);

  // 삭제 모달
  const [pendingId,setPendingId] = useState<string|undefined>();
  const [busy,setBusy] = useState(false);
  const pendingTxn = pendingId ? state.txns.find(t => t.id === pendingId) : undefined;
  const pendingMethod = pendingTxn ? state.methods.find(m => m.id === pendingTxn.methodId) : undefined;
  
  const confirmDelete = ()=>{
    if(!pendingId) return;
    setBusy(true);
    setTimeout(()=>{
      dispatch({type:'removeTxn', id: pendingId});
      setBusy(false); setPendingId(undefined);
    }, 1000);
  };

  return (
    <section className="font-sans">
      {/* 날짜 그룹 리스트 */}
      <div className="space-y-6">
        {grouped.map(g=>{
          const wd = weekdayLabel(g.date);
          const { y, m, d } = parseYMD(g.date);
          const items = g.items.filter(i => (isIncome(i.amount)&&showIncome) || (!isIncome(i.amount)&&showExpense));
          if(items.length===0) return null;
          return (
            <div key={g.date}>
              <div className="mb-2 body-14 text-zinc-500">
                <div className="flex items-center justify-between">
                  <div>{m}월 {d}일 {wd}요일</div>
                </div>
                <div className="mt-1 flex items-center justify-end body-14 text-zinc-900 gap-4">
                  {g.incomeSum > 0 && <span>수입 {formatCurrency(g.incomeSum)}</span>}
                  {g.expenseSum < 0 && <span>지출 {formatCurrency(g.expenseSum)}</span>}
                </div>
              </div>
              <ul className="space-y-0 border border-zinc-200 bg-white">
                {items.map(t=>(
                  <TxnItem key={t.id} txn={t}
                    onEdit={()=>dispatch({type:'setEditing', id:t.id})}
                    onDelete={()=>setPendingId(t.id)}
                    methodName={state.methods.find(m=>m.id===t.methodId)?.name ?? '—'}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <Modal open={!!pendingId} title="해당 내역을 삭제하시겠습니까?"
             busy={busy} onCancel={()=>!busy && setPendingId(undefined)}
             onConfirm={confirmDelete} confirmText="삭제" cancelText="취소">
        {pendingTxn && (
          <div className="space-y-2 body-14">
            <div>
              <span className="text-neutral-text-weak">카테고리: </span>
              <span className="text-neutral-text">{pendingTxn.amount > 0 ? '수입' : '지출'}/{pendingTxn.category}</span>
            </div>
            <div>
              <span className="text-neutral-text-weak">내용: </span>
              <span className="text-neutral-text">{pendingTxn.memo || '메모 없음'}</span>
            </div>
            <div>
              <span className="text-neutral-text-weak">결제수단: </span>
              <span className="text-neutral-text">{pendingMethod?.name ?? '—'}</span>
            </div>
            <div>
              <span className="text-neutral-text-weak">금액: </span>
              <span className={`text-neutral-text ${pendingTxn.amount > 0 ? 'text-brand-text-income' : 'text-brand-text-expense'}`}>
                {formatCurrency(pendingTxn.amount)}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

function TxnItem({txn,onEdit,onDelete,methodName}:{txn:Txn;onEdit:()=>void;onDelete:()=>void;methodName:string;}){
  const pos = txn.amount>0;
  return (
    <li onClick={onEdit}
        className="group grid cursor-pointer items-stretch bg-white hover:bg-zinc-50 border-b border-zinc-200 last:border-0 font-sans"
        style={{ gridTemplateColumns: '120px 1fr 80px 120px auto', gap: '0' }}>
      {/* 카테고리 박스 - 더 큰 박스 레이아웃 */}
      <div className="tag shrink-0 text-zinc-900 flex items-center justify-center px-4 py-3 min-h-[60px] body-12" data-cat={txn.category}>
        {txn.category}
      </div>
      {/* 설명 */}
      <div className="min-w-0 body-14 text-zinc-900 truncate px-4 py-3 flex items-center">
        {txn.memo || <span className="text-neutral-text-weak">메모 없음</span>}
      </div>
      {/* 결제수단 - 고정 열 */}
      <div className="body-14 text-neutral-text-weak text-left truncate px-4 py-3 flex items-center">
        {methodName}
      </div>
      {/* 금액 */}
      <div className={`body-14 text-right px-4 py-3 flex items-center ${pos?'text-brand-text-income':'text-brand-text-expense'}`}>
        {formatCurrency(txn.amount)}
      </div>
      <div className="px-4 py-3 flex items-center">
        <button
          onClick={(e)=>{ e.stopPropagation(); onDelete(); }}
          className="invisible shrink-0 border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 hover:bg-zinc-50 group-hover:visible body-12 transition-colors"
          aria-label="삭제">삭제</button>
      </div>
    </li>
  );
}
