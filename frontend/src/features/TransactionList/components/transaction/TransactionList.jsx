import TransactionItem from "./TransactionItem.jsx";

export default function TransactionList({ transactions, onSelect, onDelete, selected }) {
  // 날짜별 그룹
  const grouped = transactions.reduce((acc, t) => {
    if (!acc[t.date]) acc[t.date] = [];
    acc[t.date].push(t);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="w-full flex flex-col mt-4">
      {sortedDates.map((date) => {
        const daily = grouped[date];
        const totalExpense = daily
          .filter((t) => t.amount < 0)
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const totalIncome = daily
          .filter((t) => t.amount > 0)
          .reduce((sum, t) => sum + t.amount, 0);

        return (
          <div key={date} className="py-6">
            <div className="pb-3 font-serif font-sm text-xs flex justify-between items-center mb-2">
              <span>
                {(() => {
                  const d = new Date(date);
                  const month = d.getMonth() + 1;
                  const day = d.getDate();
                  const weekday = d.toLocaleDateString("ko-KR", { weekday: "long" });
                  return `${month}월 ${day}일 ${weekday}`;
                })()}
              </span>
              <span>
                {totalIncome > 0 && (
                  <span>
                    수입 {totalIncome.toLocaleString()}원
                  </span>
                )}
                {totalExpense > 0 && (
                  <span className="ml-4">
                    지출 {totalExpense.toLocaleString()}원
                  </span>
                )}
              </span>
            </div>

            <div className="font-sans font-light text-sm flex flex-col border-t border-b">
              {daily.map((t) => (
                <TransactionItem
                  key={t.id}
                  t={t}
                  selected={selected}
                  onSelect={onSelect}
                  onDelete={onDelete}
                />
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
}