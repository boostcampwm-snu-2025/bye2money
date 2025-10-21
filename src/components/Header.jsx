import { useNavigate, useLocation } from "react-router-dom";
import { useLedgerStore } from "../store/useLedgerStore";
import { fmtYM, prevMonth, nextMonth } from "../utils/date";
import { HEADER_BG } from "../utils/theme";

function IconDoc() { return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 4h7l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor"/><path d="M13 4v5h5" stroke="currentColor"/></svg>
);}
function IconCal() { return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor"/><path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor"/></svg>
);}
function IconPie() { return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 1 1-9 9h9V3Z" stroke="currentColor"/><path d="M21 12A9 9 0 0 0 12 3v9h9Z" stroke="currentColor"/></svg>
);}

export default function Header() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const currentMonth = useLedgerStore(s => s.currentMonth);
  const setMonth = useLedgerStore(s => s.setMonth);
  const cm = new Date(currentMonth);

  const tab = pathname.includes("calendar") ? "calendar"
            : pathname.includes("stats") ? "stats" : "main";

  return (
    <header className="sticky top-0 z-30 shadow-sm" style={{ background: HEADER_BG }}>
      <div className="mx-auto grid h-20 max-w-5xl grid-cols-3 items-center px-6 text-white">
        {/* 좌측 로고 */}
        <button onClick={() => nav("/main")} className="justify-self-start text-xl font-semibold">
          bye2money
        </button>

        {/* 가운데 월 네비게이션 */}
        <div className="flex items-center justify-center gap-3">
          <button className="rounded px-2 py-1 hover:bg-white/15" onClick={() => setMonth(prevMonth(cm))}>‹</button>
          <div className="text-center">
            <div className="text-xs opacity-90">{cm.getFullYear()}</div>
            <div className="text-3xl font-bold leading-none">{cm.getMonth()+1}</div>
            <div className="text-[11px] opacity-90">
              {new Intl.DateTimeFormat("en", { month: "long" }).format(cm)}
            </div>
          </div>
          <button className="rounded px-2 py-1 hover:bg-white/15" onClick={() => setMonth(nextMonth(cm))}>›</button>
        </div>

        {/* 우측 아이콘 탭 */}
        <nav className="flex items-center justify-end gap-3">
          <Tab icon={<IconDoc />} active={tab==="main"} onClick={() => nav("/main")} />
          <Tab icon={<IconCal />} active={tab==="calendar"} onClick={() => nav("/calendar")} />
          <Tab icon={<IconPie />} active={tab==="stats"} onClick={() => nav("/stats")} />
        </nav>
      </div>
    </header>
  );
}

function Tab({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`grid h-9 w-9 place-items-center rounded-full border
        ${active ? "bg-white text-black" : "bg-white/15 text-white"}
        hover:bg-white hover:text-black transition`}
      aria-label="tab"
      title="tab"
    >
      {icon}
    </button>
  );
}
