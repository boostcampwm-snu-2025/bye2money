import { useMonth } from '../../context/MonthContext';
import { monthNameEng } from '../../utils/formatDate';
import './MonthSelector.css'; 

export default function MonthSelector() {
  const { yearMonth, label, prevMonth, nextMonth } = useMonth();
  return (
    <div className="month-selector">
      <div><button onClick={prevMonth}>&lt;</button></div>
      <div className="month-selecor-year-month">
        <div className='month-selector-show-year'>{yearMonth.year}</div>
        <div className='month-selector-show-month'>{yearMonth.month}</div>
        <div className='month-selector-show-month-eng'>{monthNameEng(yearMonth.month)}</div>
      </div>
      <div><button onClick={nextMonth}>&gt;</button></div>
      
      
    </div>
  );
}
