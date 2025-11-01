import { useLedger } from './stores/ledger-store';
import { addMonth } from './lib/date';
import { Header } from './components/Header';
import { EntryBar } from './features/ledger/EntryBar';
import { ListView, ListViewFilter } from './features/ledger/ListView';
import { CalendarView } from './features/ledger/CalendarView';
import { StatsView } from './features/ledger/StatsView';
import { useMemo, useState } from 'react';
import { sameMonth } from './lib/date';

/**
 * 메인 애플리케이션 컴포넌트
 * 전체 레이아웃과 탭별 뷰 관리를 담당
 */
export default function App() {
  const { state, dispatch } = useLedger();
  const { year, month, tab } = state.ui;
  
  /**
   * 월 이동 함수
   * @param delta - 이동할 월 수 (양수: 다음 달, 음수: 이전 달)
   */
  const navigateMonth = (delta: number) => { 
    const nextMonth = addMonth(year, month, delta); 
    dispatch({ type: 'setMonth', year: nextMonth.year, month: nextMonth.month }); 
  };
  
  /* 리스트 뷰 필터 상태 */
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  
  /* 현재 월의 트랜잭션 */
  const monthlyTransactions = useMemo(() => 
    state.txns.filter(transaction => sameMonth(transaction.date, year, month)), 
    [state.txns, year, month]
  );
  
  /**
   * 외부 클릭 시 편집 상태 해제
   * EntryBar, 리스트 항목, 버튼이 아닌 영역 클릭 시에만 해제
   */
  const handleMainClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest('section') &&
      !target.closest('label') &&
      !target.closest('button') &&
      state.ui.editingId
    ) {
      dispatch({ type: 'setEditing', id: undefined });
    }
  };

  return (
    <div className="h-screen bg-zinc-100 text-zinc-900 flex flex-col overflow-hidden">
      <Header year={year} month={month} tab={tab}
              onPrev={()=>navigateMonth(-1)} onNext={()=>navigateMonth(1)} onTab={(selectedTab)=>dispatch({type:'switchTab',tab:selectedTab})}/>
      {/* 고정 영역: EntryBar + 필터 */}
      {tab === 'list' && (
        <div className="flex-shrink-0 relative z-20 bg-zinc-100">
          <EntryBar/>
          <div className="mx-auto max-w-4xl">
            <ListViewFilter 
              monthly={monthlyTransactions}
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
