'use client';

export function HeaderActions() {
  const handleReceiptClick = () => {
    console.log('Receipt clicked');
  };

  const handleCalendarClick = () => {
    console.log('Calendar clicked');
  };

  const handleStatsClick = () => {
    console.log('Statistics clicked');
  };

  return (
    <div className="flex flex-row items-center gap-3">
      <button
        onClick={handleReceiptClick}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="영수증"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M9 2H15M9 22H15M9 2V22M15 2V22M5 6H19M5 10H19M5 14H19M5 18H19" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={handleCalendarClick}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="캘린더"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 10H21M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <button
        onClick={handleStatsClick}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="통계"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M3 3V21H21M7 16V11M12 16V7M17 16V13" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
