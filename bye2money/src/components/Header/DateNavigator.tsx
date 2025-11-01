'use client';

import { useDate } from '@/contexts/DateContext';

export function DateNavigator() {
  const { currentDate, goToPreviousMonth, goToNextMonth, year, month } = useDate();

  return (
    <div className="flex flex-row items-center gap-4">
      <button
        onClick={goToPreviousMonth}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
        aria-label="이전 달"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M15 18L9 12L15 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-light text-[#2D3648]">{year}</span>
        <div className="flex flex-row items-baseline gap-1">
          <span className="text-4xl font-bold text-[#2D3648]">{month}</span>
          <span className="text-sm font-light text-[#2D3648]">
            {getMonthName(currentDate)}
          </span>
        </div>
      </div>

      <button
        onClick={goToNextMonth}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
        aria-label="다음 달"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M9 18L15 12L9 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function getMonthName(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[date.getMonth()];
}
