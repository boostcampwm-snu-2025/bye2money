import docIcon from '../../assets/icons/doc.svg'
import calendarIcon from '../../assets/icons/calendar.svg'
import chartIcon from '../../assets/icons/chart.svg'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import chevronRightIcon from '../../assets/icons/chevron-right.svg'

interface HeaderProps {
  activeTab: 'doc' | 'calendar' | 'chart';
  onTabChange: (tab: 'doc' | 'calendar' | 'chart') => void;
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export default function Header({ activeTab, onTabChange, currentDate, onMonthChange }: HeaderProps) {
  // 이전 달로 이동하는 함수
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  // 현재 날짜 정보 계산
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 0부터 시작하므로 +1
  
  // 월 이름을 영어로 변환
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthName = monthNames[month - 1];

  return (
    <header className="h-[216px] bg-80 flex justify-center border-b border-neutral-border-default relative">
      <div className="w-[846px] h-[112px] flex items-center justify-between absolute top-[40px] left-[297px]">
        {/* Logo */}
        <div className="shrink-0">
          <h1 className="w-[132px] text-[24px] text-neutral-text-default" style={{ fontFamily: 'ChosunIlboMyungjo, serif' }}>
            Wise Wallet
          </h1>
        </div>

        {/* Month and Year */}
        <div className="w-[232px] h-[112px] flex items-center justify-between gap-[24px]">
          <button 
            onClick={handlePreviousMonth} 
            className="w-[32px] h-[32px]">
            <img src={chevronLeftIcon} alt="previous month" className="w-full h-full" />
          </button>
          <div className="flex flex-col items-center gap-[4px]">
            <div className="flex h-[24px] text-[14px] font-300 text-neutral-text-default justify-center items-center"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}>{year}</div>
            <div className="flex h-[56px] text-[48px] font-400 text-neutral-text-default justify-center items-center" 
                  style={{ fontFamily: 'ChosunIlboMyungjo, serif' }}>{month}</div>
            <div className="flex h-[24px] text-[14px] font-300 text-neutral-text-default justify-center items-center"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}>{monthName}</div>
          </div>
          <button onClick={handleNextMonth} 
            className="w-[32px] h-[32px]">
            <img src={chevronRightIcon} alt="next month" className="w-full h-full" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center">
          <nav>
            <ul className="w-[132px] h-[40px] flex items-center gap-[4px]">
              <li>
                <button
                  onClick={() => onTabChange('doc')}
                  className={`w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors ${
                    activeTab === 'doc' ? 'bg-neutral-surface-default' : ''
                  }`}>
                  <img src={docIcon} alt="document" className="w-[24px] h-[24px]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('calendar')}
                  className={`w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors ${
                    activeTab === 'calendar' ? 'bg-neutral-surface-default' : ''
                  }`}>
                  <img src={calendarIcon} alt="calendar" className="w-[24px] h-[24px]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('chart')}
                  className={`w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors ${
                    activeTab === 'chart' ? 'bg-neutral-surface-default' : ''
                  }`}>
                  <img src={chartIcon} alt="chart" className="w-[24px] h-[24px]" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
