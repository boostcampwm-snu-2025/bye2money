import { useMemo, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { sameMonth, weekdayLabel } from '../../lib/date';
import { formatCurrency, isIncome } from '../../lib/format';
import type { Txn } from '../../types/ledger';
import { Modal } from '../../components/Modal';

type Group = { date:string; items:Txn[]; incomeSum:number; expenseSum:number };

export function ListView(){
  const { state, dispatch } = useLedger();
  const { year, month } = state.ui;

  const monthly = useMemo(()=> state.txns.filter(t=>sameMonth(t.date,year,month)), [state.txns,year,month]);
  const incomeTotal = monthly.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0);
  const expenseTotal = monthly.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0);

  const [showIncome,setShowIncome] = useState(true);
  const [showExpense,setShowExpense] = useState(true);

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
  const confirmDelete = ()=>{
    if(!pendingId) return;
    setBusy(true);
    setTimeout(()=>{
      dispatch({type:'removeTxn', id: pendingId});
      setBusy(false); setPendingId(undefined);
    }, 1000);
  };

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between text-sm text-zinc-700">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={showIncome} onChange={e=>setShowIncome(e.target.checked)}/>
            <span>수입 {formatCurrency(incomeTotal)}</span>
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={showExpense} onChange={e=>setShowExpense(e.target.checked)}/>
            <span>지출 {formatCurrency(expenseTotal)}</span>
          </label>
        </div>
        <div className="text-zinc-500">전체 내역 {monthly.length}건</div>
      </div>

      {/* 날짜 그룹 리스트 */}
      <div className="space-y-6">
        {grouped.map(g=>{
          const wd = weekdayLabel(g.date);
          const items = g.items.filter(i => (isIncome(i.amount)&&showIncome) || (!isIncome(i.amount)&&showExpense));
          if(items.length===0) return null;
          return (
            <div key={g.date}>
              <div className="mb-2 flex items-center justify-between text-sm text-zinc-500">
                <div>{g.date} {wd}요일</div>
                <div className="flex gap-4">
                  <span>수입 {formatCurrency(g.incomeSum)}</span>
                  <span>지출 {formatCurrency(g.expenseSum)}</span>
                </div>
              </div>
              <ul className="space-y-2">
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
             onConfirm={confirmDelete} confirmText="삭제">
        삭제 후에는 복구할 수 없습니다.
      </Modal>
    </section>
  );
}

function TxnItem({txn,onEdit,onDelete,methodName}:{txn:Txn;onEdit:()=>void;onDelete:()=>void;methodName:string;}){
  const pos = txn.amount>0;
  return (
    <li onClick={onEdit}
        className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white p-3">
      <div className="flex min-w-0 items-center gap-3">
        {/* 카테고리 칩 */}
        <span className="tag shrink-0" data-cat={txn.category}>
          {txn.category}
        </span>
        {/* 메모 */}
        <span className="truncate">{txn.memo || <span className="text-neutral-text-weak">메모 없음</span>}</span>
        {/* 결제수단 */}
        <span className="shrink-0 text-xs text-neutral-text-weak">{methodName}</span>
      </div>
      <div className={`shrink-0 ${pos?'text-green-600':'text-red-600'}`}>{formatCurrency(txn.amount)}</div>
      <button
        onClick={(e)=>{ e.stopPropagation(); onDelete(); }}
        className="invisible shrink-0 rounded-md border px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-50 group-hover:visible"
        aria-label="삭제">삭제</button>
    </li>
  );
}
