import { useLedger } from './stores/ledger-store';
import { addMonth } from './lib/date';
import { Header } from './components/Header';
import { EntryBar } from './features/ledger/EntryBar';
import { ListView } from './features/ledger/ListView';

export default function App(){
  const { state, dispatch } = useLedger();
  const { year, month, tab } = state.ui;
  const go = (d:number)=>{ const n = addMonth(year,month,d); dispatch({type:'setMonth',year:n.year,month:n.month}); };
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <Header year={year} month={month} tab={tab}
              onPrev={()=>go(-1)} onNext={()=>go(1)} onTab={(t)=>dispatch({type:'switchTab',tab:t})}/>
      <main className="mx-auto max-w-4xl px-4 pb-16">
        <EntryBar/>
        {tab==='list'
          ? <ListView/>
          : <div className="mt-8 rounded-2xl border bg-white p-8 text-zinc-500">달력/통계는 2주차에 구현합니다.</div>}
      </main>
    </div>
  );
}
