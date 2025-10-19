import { useMonth } from '../../context/MonthContext';

export default function MonthSelector() {
  const { label, prevMonth, nextMonth } = useMonth();
  return (
    <div className="month-selector">
      <button onClick={prevMonth}>&lt;</button>
      <span>{label}</span>
      <button onClick={nextMonth}>&gt;</button>
    </div>
  );
}
