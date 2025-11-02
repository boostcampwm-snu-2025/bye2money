const DAYS = ["일","월","화","수","목","금","토"]

export default function TransactionCalendarView({ transactions, year, month }) {
  const today = new Date();
  const isToday = (day) =>
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day;

  // 이번 달의 시작 요일과 마지막 날짜 계산
  const startDay = new Date(year, month - 1, 1).getDay(); // 0(일) ~ 6(토)
  const lastDate = new Date(year, month, 0).getDate();

  // 날짜별 아이템 분류
  const grouped = transactions.reduce((acc, t) => {
    const day = new Date(t.date).getDate();
    acc[day] = acc[day] || [];
    acc[day].push(t);
    return acc;
  }, {});

  // 하단 요약용 (분리해도 되겠지만 일단 여기에 둠)
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((a, c) => a + c.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((a, c) => a + Math.abs(c.amount), 0);
  const net = totalIncome - totalExpense;

  return (
    <main className="w-[900px] bg-white mt-[176px]">
      <div className="w-full grid grid-cols-7 border-t border-l">
        {DAYS.map((d) => (
          <div key={d} className="text-center py-2 font-sans font-light text-xs border-r">{d}</div>
        ))}
      </div>

      <div className="w-full grid grid-cols-7 font-sans font-light text-sm border-t border-l">
        {[...Array(startDay).keys()].map(i => (
            <div key={`empty-${i}`} className="border-r border-b h-28" />
        ))}

        {Array.from({ length: lastDate }, (_, i) => i + 1).map((day) => {
            const list = grouped[day] || [];

            // 날짜별 총합 계산
            const dayTotal = list.reduce((sum, t) => sum + t.amount, 0);

            return (
            <div
                key={day}
                className={`h-28 border-r border-b p-2 flex flex-col justify-between relative text-neutral-text-default ${
                isToday(day) ? "bg-neutral-surface-point" : ""
                }`}
            >
                {/* 아이템 내역 */}
                <ul className="space-y-[2px]">
                {list.map((t) => (
                    <li
                    key={t.id}
                    className={`truncate text-xs ${
                        t.amount > 0 ? "text-brand-text-income" : "text-brand-text-expense"
                    }`}
                    >
                    {t.amount.toLocaleString()}
                    </li>
                ))}
                </ul>

                {/* 하단 날짜 + 총합 */}
                <div className="flex justify-between items-end text-xs">
                <span>
                    {dayTotal !== 0 && dayTotal.toLocaleString()}
                </span>
                <span className="font-serif text-xs">{day}</span>
                </div>
            </div>
            );
        })}

        {/* 남은 빈칸도 border 유지 */}
        {Array.from({ length: 42 - (startDay + lastDate) }).map((_, i) => (
            <div key={`post-${i}`} className="border-r border-b h-28" />
        ))}
        </div>

      <div className="flex justify-between px-6 py-3 text-xs font-serif">
        <div>
          총 수입 {totalIncome.toLocaleString()}원 총 지출 {totalExpense.toLocaleString()}원
        </div>
        <div>
          총합 {net.toLocaleString()}원
        </div>
      </div>
    </main>
  );
}