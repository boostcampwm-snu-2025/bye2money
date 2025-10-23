import { Trash2 } from "lucide-react";
import { CATEGORIES } from "../constants/categories";

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
                  <span className="text-brand-text-income">
                    수입 {totalIncome.toLocaleString()}원
                  </span>
                )}
                {totalExpense > 0 && (
                  <span className="text-brand-text-expense ml-4">
                    지출 {totalExpense.toLocaleString()}원
                  </span>
                )}
              </span>
            </div>

            <div className="font-sans font-light text-sm flex flex-col border-t border-b">
              {daily.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelect(t)}
                  className="group flex justify-between items-center text-left hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-23 h-14 flex items-center justify-center text-xs text-black ${
                        CATEGORIES[t.category] || ""
                    }`}>
                      {t.category || "기타"}
                    </div>
                    <span>{t.content}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="w-30">{t.payment}</span>
                    <span
                      className={`w-30 text-right mr-4 ${
                        t.amount > 0 ? "text-brand-text-income" : "text-brand-text-expense"
                      }`}
                    >
                      {t.amount > 0
                        ? `+${t.amount.toLocaleString()}`
                        : t.amount.toLocaleString()}
                      원
                    </span>
                    <Trash2
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(t.id);
                      }}
                      className={`${
                        selected?.id === t.id ? "block" : "hidden group-hover:block"
                      } text-danger-text-default opacity-60 hover:opacity-100 cursor-pointer`}
                      />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}