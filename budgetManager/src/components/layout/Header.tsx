import { useState } from 'react';
import '../../styles/components/Header.css'
import docIcon from '../../assets/icons/doc.svg'
import calendarIcon from '../../assets/icons/calendar.svg'
import chartIcon from '../../assets/icons/chart.svg'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import chevronRightIcon from '../../assets/icons/chevron-right.svg'

export default function Header() {
  // useState로 현재 날짜 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 이전 날로 이동하는 함수
  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  // 다음 날로 이동하는 함수
  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // 현재 날짜 정보 계산
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 0부터 시작하므로 +1
  const day = currentDate.getDate();
  
  // 월 이름을 영어로 변환
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthName = monthNames[month - 1];

  return (
    <header className="header">
      <div className="headerContent">
        <div className="logo">
          <h1>Wise Wallet</h1>
        </div>
        <div className="monthYear">
          <div className="year">{year}</div>
          <div className="dayContainer">
            <img 
              src={chevronLeftIcon} 
              alt="previous day" 
              className="chevronIcon" 
              onClick={handlePreviousDay}
            />
            <div className="day">{day}</div>
            <img 
              src={chevronRightIcon} 
              alt="next day" 
              className="chevronIcon" 
              onClick={handleNextDay}
            />
          </div>
          <div className="month">{monthName}</div>
        </div>
        <nav className="tab">
          <ul className="tabList">
            <li className="tabItem">
              <img src={docIcon} alt="document" className="tabIcon" />
            </li>
            <li className="tabItem">
              <img src={calendarIcon} alt="calendar" className="tabIcon" />
            </li>
            <li className="tabItem">
              <img src={chartIcon} alt="chart" className="tabIcon" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
