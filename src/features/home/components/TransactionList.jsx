//import React, { useContext } from "react";
// import { TransactionContext } from "@/context/TransactionContext"; // 나중에 연결용

const categoryColors = {
  생활: "bg-[#d8eafc]",
  식비: "bg-[#fde2e2]",
  교통: "bg-[#ffeccf]",
  쇼핑: "bg-[#ffe9f5]",
  뷰티: "bg-[#ffe9f5]",
  의료건강: "bg-[#d8f9f2]",
  문화여가: "bg-[#e6d8f9]",
  기타수입: "bg-[#faf5d7]",
  월급: "bg-[#fff2cc]",
  용돈: "bg-[#f9f4ff]",
  미분류: "bg-[#f2f2f2]",
};

const TransactionList = ({ transactions = [] }) => {
  // const { transactions } = useContext(TransactionContext); // 나중에 context로 변경 가능

  // 날짜별 그룹화
  const grouped = transactions.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {});

  // 금액 포맷 함수
  const formatAmount = (value) =>
    value.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    });

  // 날짜 정렬 (내림차순)
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="w-[900px] mx-auto bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
      {/* 상단 요약 */}
      <div className="flex justify-end gap-6 p-4 text-sm text-gray-700 border-b border-gray-200">
        <div>
          <span className="font-medium text-blue-600">수입</span>{" "}
          <span>
            {formatAmount(
              transactions
                .filter((t) => t.type === "+")
                .reduce((a, b) => a + b.amount, 0)
            )}
          </span>
        </div>
        <div>
          <span className="font-medium text-red-500">지출</span>{" "}
          <span>
            {formatAmount(
              transactions
                .filter((t) => t.type === "-")
                .reduce((a, b) => a + b.amount, 0)
            )}
          </span>
        </div>
      </div>

      {/* 본문 */}
      <div className="divide-y divide-gray-100">
        {sortedDates.map((date) => {
          const dayTransactions = grouped[date];
          const totalIncome = dayTransactions
            .filter((t) => t.type === "+")
            .reduce((a, b) => a + b.amount, 0);
          const totalExpense = dayTransactions
            .filter((t) => t.type === "-")
            .reduce((a, b) => a + b.amount, 0);

          return (
            <div key={date} className="p-4">
              {/* 날짜 헤더 */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-gray-700">
                  {date}{" "}
                  <span className="ml-2 text-xs text-gray-400">
                    {new Date(date).toLocaleDateString("ko-KR", {
                      weekday: "short",
                    })}
                  </span>
                </h2>
                <div className="text-xs text-gray-500">
                  {totalIncome > 0 && (
                    <span className="text-blue-600 mr-3">
                      수입 {formatAmount(totalIncome)}
                    </span>
                  )}
                  {totalExpense > 0 && (
                    <span className="text-red-500">
                      지출 {formatAmount(totalExpense)}
                    </span>
                  )}
                </div>
              </div>

              {/* 각 항목 */}
              <div className="flex flex-col gap-1">
                {dayTransactions.map((tx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition"
                  >
                    {/* 왼쪽 카테고리 블록 */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-[70px] text-center py-1 rounded-md text-[13px] text-gray-700 font-medium ${
                          categoryColors[tx.category] || "bg-gray-100"
                        }`}
                      >
                        {tx.category}
                      </div>
                      <div className="text-sm text-gray-700">{tx.content}</div>
                    </div>

                    {/* 결제수단 + 금액 */}
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
