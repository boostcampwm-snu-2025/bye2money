import { useMonth } from '../../context/MonthContext';
import { monthNameEng } from '../../utils/formatDate';

export default function MonthSelector() {
  const { yearMonth, label, prevMonth, nextMonth } = useMonth();
  return (
    <div className="month-selector">
      <div><button onClick={prevMonth}>&lt;</button></div>
      <div>
        <div>{yearMonth.year}</div>
        <div>{yearMonth.month}</div>
        <div>{monthNameEng(yearMonth.month)}</div>
      </div>
      <div><button onClick={nextMonth}>&gt;</button></div>
      
      
    </div>
  );
}
