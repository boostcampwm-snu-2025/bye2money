import React, { useState } from "react";

export default function IconToggle() {
  const [active, setActive] = useState("document"); // 현재 활성화된 버튼

  return (
    <div className="icon-toggle-group">
      <button
        className={`icon-toggle-btn ${active === "document" ? "active" : ""}`}
        onClick={() => setActive("document")}
      >
        <img
          src="/img/document_icon.png"
          className="h-5 w-5"
          alt="내역"
        />
      </button>

      <button
        className={`icon-toggle-btn ${active === "calendar" ? "active" : ""}`}
        onClick={() => setActive("calendar")}
      >
        <img
          src="/img/calendar_icon.png"
          className="h-5 w-5"
          alt="달력"
        />
      </button>

      <button
        className={`icon-toggle-btn ${active === "chart" ? "active" : ""}`}
        onClick={() => setActive("chart")}
      >
        <img
          src="/img/chart_icon.png"
          className="h-5 w-5"
          alt="통계"
        />
      </button>
    </div>
  );
}
