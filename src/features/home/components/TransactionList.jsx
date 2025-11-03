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
  // TransactionContext에서 상태 및 함수 불러오기
  const {
    transactions,
    currentDate,
    deleteTransaction,
    setSelectedTransaction,
    selectedTransaction,
  } = useContext(TransactionContext);

  // 현재 월에 해당하는 거래 내역만 필터링
  //(transactions 배열에서 currentDate와 동일한 연도와 월에 속하는 거래 항목만 뽑아 filtered에 담음)
  const filtered = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getFullYear() === currentDate.getFullYear() &&
      txDate.getMonth() === currentDate.getMonth()
    );
  });

  // 같은 날짜별로 거래 내역을 그룹화
  // (grouped 객체에 날짜별로 거래 항목 배열을 저장)
  const grouped = filtered.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {});

  // 숫자를 한국 통화(KRW) 형식으로 변환
  const formatAmount = (value) =>
    value.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    });

  // 월 전체 수입 합계 계산
  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  // 월 전체 지출 합계 계산
  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  // 날짜를 내림차순으로 정렬 (최신 날짜가 위로)
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // 리스트 외부 클릭 시 선택된 거래 해제 기능 구현
  const listRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
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
      className="w-[1000px] mx-auto mt-6 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
    >
      {/* 월 전체 요약 */}
      <div className="flex justify-between items-center px-6 py-4 text-sm border-b border-gray-100 bg-gray-50">
        <div className="text-gray-600 font-medium">
          전체 내역{" "}
          <span className="text-gray-400 ml-1 font-normal">
            {filtered.length}건
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-700">수입</span>
            <span className="text-blue-600 font-semibold">
              {formatAmount(totalIncome)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-gray-700">지출</span>
            <span className="text-red-500 font-semibold">
              {formatAmount(totalExpense)}
            </span>
          </div>
        </div>
      </div>

      {/* 날짜별 내역 */}
      {sortedDates.map((date) => {
        const dayTransactions = grouped[date];

        // 해당 날짜의 일일 수입 및 지출 합계 계산
        const dayIncome = dayTransactions
          .filter((t) => t.type === "income")
          .reduce((a, b) => a + b.amount, 0);
        const dayExpense = dayTransactions
          .filter((t) => t.type === "expense")
          .reduce((a, b) => a + b.amount, 0);

        // 해당 날짜의 요일 추출 (예: 월요일, 화요일)
        const weekday = new Date(date).toLocaleDateString("ko-KR", {
          weekday: "long",
        });

        return (
          <div key={date} className="px-6 py-4 border-t border-gray-100">
            {/* 날짜 헤더 */}
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-semibold text-gray-800">
                {date} ({weekday})
              </div>
              <div className="text-xs text-gray-500 space-x-3">
                {dayIncome > 0 && (
                  <span className="text-blue-600">
                    +{formatAmount(dayIncome)}
                  </span>
                )}
                {dayExpense > 0 && (
                  <span className="text-red-500">
                    -{formatAmount(dayExpense)}
                  </span>
                )}
              </div>
            </div>

            {/* 거래 목록 */}
            <div className="flex flex-col gap-1">
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

//개별 거래 항목 렌더링 및 삭제 기능 관리
const TransactionRow = ({ tx, deleteTransaction }) => {
  const { setSelectedTransaction } = useContext(TransactionContext);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 삭제 버튼 클릭 시 해당 거래 삭제
  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(async () => {
      await deleteTransaction(tx.id);
      setIsDeleting(false);
      setShowModal(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-200 ${
          isHovered ? "bg-gray-100" : "bg-white"
        } ${isDeleting ? "opacity-50" : "opacity-100"} border border-gray-100`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          if (e.target.tagName !== "BUTTON") setSelectedTransaction(tx);
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-[2px] rounded-full text-[12px] font-medium ${
              categoryColors[tx.category] || "bg-gray-100"
            } text-gray-700`}
          >
            {tx.category}
          </div>
          <div className="text-sm text-gray-700 truncate max-w-[400px]">
            {tx.memo || tx.content || "(내용 없음)"}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500 min-w-[70px] text-right">
            {tx.paymentMethod}
          </span>
          <span
            className={`text-sm font-semibold text-right min-w-[100px] ${
              tx.type === "income" ? "text-blue-600" : "text-red-500"
            }`}
          >
            {tx.type === "expense" ? "-" : "+"}
            {tx.amount.toLocaleString()}원
          </span>

          {isHovered && !isDeleting && (
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              🗑
            </button>
          )}
        </div>
      </div>

      {/*  삭제 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-md w-[340px] p-5 text-center">
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
