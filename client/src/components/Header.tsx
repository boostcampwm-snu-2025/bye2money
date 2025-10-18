import type { Tab } from '../types/ledger';
import { Icon } from './Icon';

export function Header({ year, month, tab, onPrev, onNext, onTab }:{
  year:number; month:number; tab:Tab; onPrev:()=>void; onNext:()=>void; onTab:(t:Tab)=>void;
}){
  return (
    <header className="sticky top-0 z-10 bg-[#7BA1C6] text-neutral-text-rev">
      <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
        <button onClick={()=>onTab('list')} className="font-serif text-lg">Wise Wallet</button>

        <div className="mx-auto flex items-center gap-1">
          <button onClick={onPrev} className="btn btn-ghost rounded px-2 text-neutral-text-rev/90" aria-label="이전 달">
            <Icon name="chevron-left" />
          </button>
          <div className="mx-3 w-28 text-center">
            <div className="text-xs opacity-90">{year}</div>
            <div className="text-xl leading-none">{month}</div>
            <div className="text-xs opacity-80">August</div>
          </div>
          <button onClick={onNext} className="btn btn-ghost rounded px-2 text-neutral-text-rev/90" aria-label="다음 달">
            <Icon name="chevron-right" />
          </button>
        </div>

        <nav className="flex items-center gap-1">
          {[
            {k:'list'   as Tab, ic:'doc',      label:'내역'},
            {k:'calendar' as Tab, ic:'calendar', label:'달력'},
            {k:'stats' as Tab, ic:'chart',    label:'통계'},
          ].map(({k,ic,label})=>(
            <button key={k} onClick={()=>onTab(k)}
              className={`rounded-full p-2 ${tab===k?'bg-neutral-surface text-neutral-text':'hover:bg-black/10'}`}
              aria-label={label}>
              <Icon name={ic as any}/>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
