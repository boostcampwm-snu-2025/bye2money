import type { Tab } from '../types/ledger';
import { Icon } from './Icon';

const MONTH_EN = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export function Header({
  year, month, tab, onPrev, onNext, onTab
}:{
  year:number; month:number; tab:Tab;
  onPrev:()=>void; onNext:()=>void; onTab:(t:Tab)=>void;
}) {
  const monthName = MONTH_EN[(month - 1 + 12) % 12];

  return (
    <header className="sticky top-0 z-10 bg-brand-accent">
      <div className="mx-auto max-w-4xl flex items-center gap-4 px-4 py-8 md:py-10">
        {/* 로고 */}
        <button
          onClick={()=>onTab('list')}
          className="font-serif text-[24px] leading-[32px] tracking-[0] text-neutral-text"
        >
          Wise Wallet
        </button>

        {/* 중앙: 연/월/영문월 */}
        <div className="mx-auto flex items-center gap-1">
          <button
            onClick={onPrev}
            className="rounded p-2 text-neutral-text hover:bg-black/10"
            aria-label="이전 달"
          >
            <Icon name="chevron-left" />
          </button>

          <div className="mx-3 w-28 text-center">
            {/* 연도: Pretendard Variable 300 */}
            <div className="font-sans text-xs font-light text-neutral-text/90">{year}</div>
            {/* 월 숫자: 조선일보명조 400 */}
            <div className="font-serif text-4xl md:text-5xl leading-none font-normal text-neutral-text">
              {month}
            </div>
            {/* 영문 월: Pretendard Variable 300 */}
            <div className="font-sans text-xs font-light text-neutral-text/80">
              {monthName}
            </div>
          </div>

          <button
            onClick={onNext}
            className="rounded p-2 text-neutral-text hover:bg-black/10"
            aria-label="다음 달"
          >
            <Icon name="chevron-right" />
          </button>
        </div>

        {/* 우측 탭: 활성만 흰 원형 배경 */}
        <nav className="flex items-center gap-2">
          {([
            { k: 'list' as Tab, ic: 'doc',      label: '내역' },
            { k: 'calendar' as Tab, ic: 'calendar', label: '달력' },
            { k: 'stats' as Tab, ic: 'chart',    label: '통계' },
          ] as const).map(({ k, ic, label }) => {
            const active = tab === k;
            return (
              <button
                key={k}
                onClick={()=>onTab(k)}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={[
                  'p-2 rounded-full transition',
                  active
                    ? 'bg-neutral-surface text-neutral-text shadow-sm ring-1 ring-black/5'
                    : 'bg-transparent text-neutral-text hover:bg-black/10'
                ].join(' ')}
              >
                <Icon name={ic as any} />
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
