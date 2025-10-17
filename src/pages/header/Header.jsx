import CircleButton from "@/components/CircleButton";

const Header = ({ currentDate, setCurrentDate, viewMode, setViewMode }) => {
    // --- 날짜 변경 로직 ---
    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
    };
    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        );
    };

    return (
        <header className="flex justify-between items-center p-4">
            {/* 1. 로고 */}
            <h1 className="text-2xl font-bold">Wise Wallet</h1>

            {/* 2. 날짜 네비게이터 */}
            <div className="flex items-center space-x-4">
                <button onClick={handlePrevMonth}>&lt;</button>
                <div className="text-center">
                    <p className="text-sm">{currentDate.getFullYear()}</p>
                    <p className="text-2xl">
                        {currentDate.toLocaleString("default", {
                            month: "long",
                        })}
                    </p>
                </div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>

            {/* 3. 보기 모드 토글 버튼 */}
            <div className="flex space-x-2">
                <CircleButton
                    isActive={viewMode === "list"}
                    onClick={() => setViewMode("list")}
                    imageUrl={"/listLogo.png"}
                    activeColor="rgba(255,255,255,1)"
                    inactiveColor="rgba(0,0,0,0)"
                />
                <CircleButton
                    isActive={viewMode === "calendar"}
                    onClick={() => setViewMode("calendar")}
                    imageUrl={"/calendarLogo.png"}
                    activeColor="rgba(255,255,255,1)"
                    inactiveColor="rgba(0,0,0,0)"
                />
                <CircleButton
                    isActive={viewMode === "stats"}
                    onClick={() => setViewMode("stats")}
                    imageUrl={"/statsLogo.png"}
                    activeColor="rgba(255,255,255,1)"
                    inactiveColor="rgba(0,0,0,0)"
                />
            </div>
        </header>
    );
};

export default Header;
