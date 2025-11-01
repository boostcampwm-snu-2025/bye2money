import { useLedger } from './stores/ledger-store';
import { addMonth } from './lib/date';
import { Header } from './components/Header';
import { EntryBar } from './features/ledger/EntryBar';
import { ListView, ListViewFilter } from './features/ledger/ListView';
import { CalendarView } from './features/ledger/CalendarView';
import { StatsView } from './features/ledger/StatsView';
import { useMemo, useState } from 'react';
import { sameMonth } from './lib/date';

export default function App(){
  const { state, dispatch } = useLedger();
  const { year, month, tab } = state.ui;
  const go = (d:number)=>{ const n = addMonth(year,month,d); dispatch({type:'setMonth',year:n.year,month:n.month}); };
  
  // 필터 상태 (ListView와 공유)
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  
  // 월별 트랜잭션
  const monthly = useMemo(()=> state.txns.filter(t=>sameMonth(t.date,year,month)), [state.txns,year,month]);
  
  // 외부 클릭 시 편집 상태 해제
  const handleMainClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // EntryBar, 리스트 항목, 버튼이 아닌 곳을 클릭했을 때만 해제
    if (!target.closest('section') && !target.closest('label') && !target.closest('button') && state.ui.editingId) {
      dispatch({ type: 'setEditing', id: undefined });
    }
  };

  return (
    <div className="h-screen bg-zinc-100 text-zinc-900 flex flex-col overflow-hidden">
      <Header year={year} month={month} tab={tab}
              onPrev={()=>go(-1)} onNext={()=>go(1)} onTab={(t)=>dispatch({type:'switchTab',tab:t})}/>
      {/* 고정 영역: EntryBar + 필터 */}
      {tab === 'list' && (
        <div className="flex-shrink-0 relative z-20 bg-zinc-100">
          <EntryBar/>
          <div className="mx-auto max-w-4xl">
            <ListViewFilter 
              monthly={monthly}
              showIncome={showIncome}
              showExpense={showExpense}
              onToggleIncome={() => setShowIncome(!showIncome)}
              onToggleExpense={() => setShowExpense(!showExpense)}
            />
          </div>
        </div>
      )}
      {/* 스크롤 가능한 영역: 리스트만 - 절대 위치로 설정 */}
      <div className="flex-1 relative min-h-0">
        <div className="absolute inset-0 overflow-y-auto">
          <main className="pb-16" onClick={handleMainClick}>
            <div className="mx-auto max-w-4xl px-4">
              {tab==='list'
                ? <ListView showIncome={showIncome} showExpense={showExpense}/>
                : tab==='calendar'
                ? <CalendarView/>
                : tab==='stats'
                ? <StatsView/>
                : null}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
