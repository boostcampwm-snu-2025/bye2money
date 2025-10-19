import React from "react";
import { monthLabel } from "../utils";

const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="brand">Wise Wallet</div>
      <div className="month">
        <button className="navbtn" aria-label="prev">‹</button>
        <div className="month-num">8</div>
        <button className="navbtn" aria-label="next">›</button>
        <div className="month-text">August</div>
        <div className="year">{monthLabel()}</div>
      </div>
      <div className="icons">
        <span>🗒️</span>
        <span>📅</span>
        <span>📊</span>
      </div>
    </header>
  );
};

export default TopBar;
