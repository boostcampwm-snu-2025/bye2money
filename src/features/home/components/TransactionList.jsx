import React, { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext.js";

const categoryColors = {
  생활: "bg-[#d8eafc]",
  식비: "bg-[#fde2e2]",
  교통: "bg-[#ffeccf]",
  "쇼핑/뷰티": "bg-[#ffe9f5]",
  "의료/건강": "bg-[#d8f9f2]",
  "문화/여가": "bg-[#e6d8f9]",
  기타수입: "bg-[#faf5d7]",
  월급: "bg-[#fff2cc]",
  용돈: "bg-[#f9f4ff]",
  미분류: "bg-[#f2f2f2]",
};

const TransactionList = () => {
  const { transactions, currentDate } = useContext(TransactionContext);

  // ✅ 현재 월에 해당하는 거래만 필터링
  const filtered = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getFullYear() === currentDate.getFullYear() &&
      txDate.getMonth() === currentDate.getMonth()
    );
  });

  // ✅ 날짜별 그룹화
  const grouped = filtered.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {});

  const formatAmount = (value) =>
    value.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    });

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // ✅ 전체 수입 / 지출 합산
  const totalIncome = filtered
    .filter((t) => t.type === "+")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.type === "-")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="w-[1000px] mx-auto mt-5 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      {/* ✅ 상단 전체 요약 */}
      <div className="flex justify-between items-center px-6 py-3 text-sm border-b border-gray-200">
        <div className="text-gray-600">
          전체 내역{" "}
          <span className="text-gray-400 ml-1">{filtered.length}건</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-800 rounded-sm" />
            <span className="text-gray-700">수입</span>
            <span className="text-blue-600 font-medium">
              {formatAmount(totalIncome)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-800 rounded-sm" />
            <span className="text-gray-700">지출</span>
            <span className="text-red-500 font-medium">
              {formatAmount(totalExpense)}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ 본문 */}
      <div className="divide-y divide-gray-100">
        {sortedDates.map((date) => {
          const dayTransactions = grouped[date];
          const dayIncome = dayTransactions
            .filter((t) => t.type === "+")
            .reduce((a, b) => a + b.amount, 0);
          const dayExpense = dayTransactions
            .filter((t) => t.type === "-")
            .reduce((a, b) => a + b.amount, 0);

          const weekday = new Date(date).toLocaleDateString("ko-KR", {
            weekday: "long",
          });

          return (
            <div key={date} className="px-6 py-4">
              {/* ✅ 날짜 헤더 */}
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-700 font-medium">
                  {date} {weekday}
                </div>
                <div className="text-xs text-gray-500">
                  {dayIncome > 0 && (
                    <span className="text-blue-600 mr-3">
                      수입 {formatAmount(dayIncome)}
                    </span>
                  )}
                  {dayExpense > 0 && (
                    <span className="text-red-500">
                      지출 {formatAmount(dayExpense)}
                    </span>
                  )}
                </div>
              </div>

              {/* ✅ 거래 내역 */}
              <div className="flex flex-col gap-[2px]">
                {dayTransactions.map((tx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-1 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-[70px] text-center py-1 rounded-md text-[13px] text-gray-700 font-medium ${
                          categoryColors[tx.category] || "bg-gray-100"
                        }`}
                      >
                        {tx.category}
                      </div>
                      <div className="text-sm text-gray-700">
                        {tx.content || "(내용 없음)"}
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <span className="text-sm text-gray-500 w-[70px] text-right">
                        {tx.paymentMethod}
                      </span>
                      <span
                        className={`text-sm font-medium text-right ${
                          tx.type === "+" ? "text-blue-600" : "text-red-500"
                        } w-[90px]`}
                      >
                        {tx.type === "+" ? "" : "-"}
                        {formatAmount(tx.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;
