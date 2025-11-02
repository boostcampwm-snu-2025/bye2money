import React, { useState, useContext, useEffect, useRef } from "react";
import { TransactionContext } from "@/context/TransactionContext";

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

export default function TransactionList() {
  const {
    transactions,
    currentDate,
    deleteTransaction,
    setSelectedTransaction,
    selectedTransaction,
  } = useContext(TransactionContext);

  // 현재 월에 해당하는 거래만 필터링
  const filtered = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getFullYear() === currentDate.getFullYear() &&
      txDate.getMonth() === currentDate.getMonth()
    );
  });

  // 날짜별 그룹화
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

  // 월 전체 수입/지출 합계
  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // ✅ 클릭 외부 감지용 ref
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // 현재 수정 중이고, 리스트 내부를 벗어난 클릭일 때
      if (
        selectedTransaction &&
        listRef.current &&
        !listRef.current.contains(e.target)
      ) {
        setSelectedTransaction(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedTransaction]);

  return (
    <div
      ref={listRef}
      className="w-[1000px] mx-auto mt-5 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
    >
      {/* ✅ 월 전체 요약 */}
      <div className="flex justify-between items-center px-6 py-3 text-sm border-b border-gray-200 bg-gray-50">
        <div className="text-gray-600">
          전체 내역{" "}
          <span className="text-gray-400 ml-1">{filtered.length}건</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-sm" />
            <span className="text-gray-700">수입</span>
            <span className="text-blue-600 font-medium">
              {formatAmount(totalIncome)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm" />
            <span className="text-gray-700">지출</span>
            <span className="text-red-500 font-medium">
              {formatAmount(totalExpense)}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ 날짜별 내역 */}
      {sortedDates.map((date) => {
        const dayTransactions = grouped[date];

        // 🔹 날짜별 수입/지출 합계 계산
        const dayIncome = dayTransactions
          .filter((t) => t.type === "income")
          .reduce((a, b) => a + b.amount, 0);
        const dayExpense = dayTransactions
          .filter((t) => t.type === "expense")
          .reduce((a, b) => a + b.amount, 0);

        const weekday = new Date(date).toLocaleDateString("ko-KR", {
          weekday: "long",
        });

        return (
          <div key={date} className="px-6 py-4 border-t border-gray-100">
            {/* ✅ 날짜 + 일별 요약 */}
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

            {/* ✅ 개별 거래 목록 */}
            <div className="flex flex-col gap-[2px]">
              {dayTransactions.map((tx) => (
                <TransactionRow
                  key={tx.id}
                  tx={tx}
                  deleteTransaction={deleteTransaction}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const TransactionRow = ({ tx, deleteTransaction }) => {
  const { setSelectedTransaction } = useContext(TransactionContext);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(async () => {
      await deleteTransaction(tx.id);
      setIsDeleting(false);
      setShowModal(false);
    }, 1000);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between px-3 py-2 transition duration-200 ${
          isHovered ? "bg-white" : "bg-gray-50"
        } ${isDeleting ? "opacity-50" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          // 삭제 버튼 누른 게 아니라면
          if (e.target.tagName !== "BUTTON") {
            setSelectedTransaction(tx);
          }
        }}
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
            {tx.memo || tx.content || "(내용 없음)"}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-sm text-gray-500 w-[70px] text-right">
            {tx.paymentMethod}
          </span>
          <span
            className={`text-sm font-medium text-right w-[90px] ${
              tx.type === "income" ? "text-blue-600" : "text-red-500"
            }`}
          >
            {tx.type === "expense" ? "-" : ""}
            {tx.amount.toLocaleString()}원
          </span>

          {isHovered && !isDeleting && (
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-400 hover:text-red-500 transition text-sm"
            >
              🗑
            </button>
          )}
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20">
          <div className="bg-white rounded-md shadow-md w-[340px] p-5 text-center">
            <h3 className="text-[15px] text-gray-800 mb-3">
              해당 내역을 삭제하시겠습니까?
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              • {tx.category} <br />• {tx.paymentMethod} <br />•{" "}
              {tx.amount.toLocaleString()}원
            </p>
            <div className="flex border-t">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 text-gray-600 hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 text-red-600 hover:bg-red-50 font-medium border-l"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
