// src/components/Header.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "@/context/TransactionContext";
import logo from "../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const { currentDate, setCurrentDate } = useContext(TransactionContext); // ✅ Context에서 상태 불러오기
  const [activeIcon, setActiveIcon] = React.useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[currentDate.getMonth()];

  // ✅ Context의 currentDate 변경 (TransactionContext의 useEffect가 서버 재요청 수행)
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 font-sans">
      {/* 상단 파란색 배경 */}
      <div className="h-[200px] bg-gradient-to-b from-[#7DB3D8] to-[#6BA3CA] py-10 pb-20 flex items-center justify-center relative">
        <div className="w-[1000px] px-10 flex items-center justify-between relative">
          {/* 로고 */}
          <div
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/");
            }}
            className="cursor-pointer"
            aria-label="Go to homepage"
          >
            <img src={logo} alt="Wrap Wallet" className="h-8" />
          </div>

          {/* 중앙 날짜 선택 영역 */}
          <div className="flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <button
              onClick={handlePrevMonth}
              className="bg-transparent border-none text-[#1C2E3E] cursor-pointer text-lg px-2 py-1 font-light hover:opacity-70"
            >
              ‹
            </button>

            <div className="text-center text-[#1C2E3E] min-w-[80px] leading-tight">
              <div className="text-[12px] mb-5 tracking-tight">{year}</div>
              <div className="text-[32px] font-normal leading-none">
                {month}
              </div>
              <div className="text-[12px] mt-5 font-light tracking-tight">
                {monthName}
              </div>
            </div>

            <button
              onClick={handleNextMonth}
              className="bg-transparent border-none text-[#1C2E3E] cursor-pointer text-lg px-2 py-1 font-light hover:opacity-70"
            >
              ›
            </button>
          </div>

          {/* 우측 아이콘들 */}
          <div className="flex gap-2">
            {[
              { id: "home", src: "src/assets/home_icon.svg", path: "/" },
              {
                id: "calendar",
                src: "src/assets/calendar_icon.svg",
                path: "/calendar-page",
              },
              {
                id: "stats",
                src: "src/assets/statistics_icon.svg",
                path: "/statistics-page",
              },
            ].map((icon) => (
              <img
                key={icon.id}
                src={icon.src}
                className={`h-10 w-10 cursor-pointer rounded-full p-2 transition-colors duration-200 ${
                  activeIcon === icon.id
                    ? "bg-white"
                    : "bg-transparent hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveIcon(icon.id);
                  navigate(icon.path);
                }}
                alt={icon.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
