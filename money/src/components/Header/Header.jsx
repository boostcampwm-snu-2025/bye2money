import { useEffect, useMemo, useState } from "react";
import { NAV_ITEMS } from "./nav.data.js";
import NavLinkItem from "./NavLinkItem.jsx";
import { addMonth, ymLabel } from "../../lib/date.js";
import { useYearMonth } from "../../context/YearMonthContext.jsx";

export default function Header() {
  const { ym, setYm } = useYearMonth();
  const label = useMemo(() => ymLabel(ym), [ym]);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goPrev = () => setYm(addMonth(ym, -1));
  const goNext = () => setYm(addMonth(ym, +1));

  return (
    <header className={"site-header" + (elevated ? " elevated" : "")}>
      <div className="container">
        <div className="header-row">
          {/* 1) 로고 */}
          <a href="/" className="header-logo">💸 bye2money</a>

          {/* 2) 월 네비게이터 */}
          <div className="month-nav">
            <button className="icon-btn" aria-label="이전 달" onClick={goPrev}>‹</button>
            <div className="month-box">
              <div className="y">{label.year}</div>
              <div className="m mono">{label.month}</div>
              <div className="t">{label.monthText}</div>
            </div>
            <button className="icon-btn" aria-label="다음 달" onClick={goNext}>›</button>
          </div>

          {/* 3) 탭 */}
          <nav className="header-nav" aria-label="주요 탭">
            <ul className="header-tabs">
              {NAV_ITEMS.map((it) => <NavLinkItem key={it.to} {...it} />)}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
