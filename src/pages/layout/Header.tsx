import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { MONTH_NAMES } from "../../assets/constants";
import CircleButton from "../../components/CircleButton";

interface HeaderProps {
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    viewMode: "list" | "calendar" | "stats";
}

const Header: React.FC<HeaderProps> = ({
    currentDate,
    setCurrentDate,
    viewMode,
}) => {
    // --- 날짜 변경 ---
    const handlePrevMonth = useCallback(() => {
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
    }, [currentDate, setCurrentDate]);

    const handleNextMonth = useCallback(() => {
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        );
    }, [currentDate, setCurrentDate]);

    return (
        <header className="flex items-center h-[200px] bg-[#9f9f9f]">
            <div className="flex justify-between items-center w-[960px] mx-auto mb-[50px]">
                {/* 1. 로고 */}
                <h1 className="w-[160px] text-4xl ml-[20px]">Wise Wallet</h1>

                {/* 2. 날짜 네비게이터 */}
                <div className="flex items-center gap-[60px]">
                    <button
                        className="text-2xl font-semibold hover:text-white transition-colors"
                        onClick={handlePrevMonth}
                    >
                        &lt;
                    </button>
                    <div className="text-center w-[60px]">
                        <p className="text-lg mb-3">
                            {currentDate.getFullYear()}
                        </p>
                        <p className="text-5xl">{currentDate.getMonth() + 1}</p>
                        <p className="text-lg mt-3">
                            {MONTH_NAMES[currentDate.getMonth()]}
                        </p>
                    </div>
                    <button
                        className="text-2xl font-semibold hover:text-white transition-colors"
                        onClick={handleNextMonth}
                    >
                        &gt;
                    </button>
                </div>

                {/* 3. 보기 모드 토글 버튼 */}
                <div className="w-[160px] flex gap-[12px] pl-[20px] mr-[20px]">
                    <Link to="/">
                        <CircleButton
                            isActive={viewMode === "list"}
                            imageUrl={"/images/listLogo.png"}
                            activeClass="bg-white"
                            inactiveClass="bg-transparent"
                        />
                    </Link>
                    <Link to="/calendar">
                        <CircleButton
                            isActive={viewMode === "calendar"}
                            imageUrl={"/images/calendarLogo.png"}
                            activeClass="bg-white"
                            inactiveClass="bg-transparent"
                        />
                    </Link>
                    <Link to="/stats">
                        <CircleButton
                            isActive={viewMode === "stats"}
                            imageUrl={"/images/statsLogo.png"}
                            activeClass="bg-white"
                            inactiveClass="bg-transparent"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
