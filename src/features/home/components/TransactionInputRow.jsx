import React, { useState, useContext, useEffect } from "react";
import { TransactionContext } from "@/context/TransactionContext.js";

const TransactionInputRow = () => {
  // TransactionContext에서 필요한 상태와 함수 불러오기
  const {
    addTransaction,
    updateTransaction,
    currentDate,
    selectedTransaction,
    setSelectedTransaction,
  } = useContext(TransactionContext);

  // selectedTransaction이 변경될 때마다 폼에 해당 transaction의 데이터 채우기
  useEffect(() => {
    if (selectedTransaction) {
      const d = new Date(selectedTransaction.date);
      setDate(
        `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}. ${String(d.getDate()).padStart(2, "0")}`
      );
      setType(selectedTransaction.type === "income" ? "+" : "-");
      setAmount(selectedTransaction.amount);
      setContent(selectedTransaction.memo || "");
      setPaymentMethod(selectedTransaction.paymentMethod);
      setCategory(selectedTransaction.category);
    }
  }, [selectedTransaction]);

  // selectedTransaction이 null일 때 폼 초기화
  useEffect(() => {
    if (!selectedTransaction) {
      setAmount("");
      setContent("");
      setPaymentMethod("");
      setCategory("");
    }
  }, [selectedTransaction]);

  const [date, setDate] = useState(() => {
    const d = new Date(currentDate);
    return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}. ${String(d.getDate()).padStart(2, "0")}`;
  }); // 폼에 표시되는 날짜 문자열을 관리

  const [type, setType] = useState("+"); // 수입("+") 또는 지출("-") 구분 상태

  const [amount, setAmount] = useState(""); // 금액 입력값 상태

  const [content, setContent] = useState(""); // 메모/내용 입력값 상태 (최대 32자)

  const [paymentMethods, setPaymentMethods] = useState(["현금", "신용카드"]); // 사용 가능한 결제수단 목록

  const [paymentMethod, setPaymentMethod] = useState(""); // 선택된 결제수단

  const [category, setCategory] = useState(""); // 선택된 분류(카테고리)

  const [isPaymentOpen, setIsPaymentOpen] = useState(false); // 결제수단 드롭다운 열림 여부

  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // 분류 드롭다운 열림 여부

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 결제수단 추가 모달 표시 여부

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 결제수단 삭제 확인 모달 표시 여부

  const [newMethod, setNewMethod] = useState(""); // 추가할 새로운 결제수단 입력값

  const [targetMethod, setTargetMethod] = useState(""); // 삭제 대상 결제수단

  // 수입/지출 토글 핸들러 함수
  const handleTypeToggle = () => setType(type === "+" ? "-" : "+");
  // 내용 입력 핸들러 함수 (최대 32자 제한)
  const handleContentChange = (e) => setContent(e.target.value.slice(0, 32));

  // 결제수단 추가 핸들러 함수
  const handleAddMethod = () => {
    if (newMethod.trim() && !paymentMethods.includes(newMethod.trim())) {
      setPaymentMethods([...paymentMethods, newMethod.trim()]);
    }
    setNewMethod("");
    setIsAddModalOpen(false);
  };

  // 결제수단 삭제 핸들러 함수
  const handleDeleteMethod = (method) => {
    setTargetMethod(method);
    setIsDeleteModalOpen(true);
  };

  // 결제수단 삭제 확인 함수
  const confirmDelete = () => {
    setPaymentMethods(paymentMethods.filter((m) => m !== targetMethod));
    if (paymentMethod === targetMethod) setPaymentMethod("");
    setIsDeleteModalOpen(false);
  };

  // 폼 제출 핸들러 함수 (거래 추가/수정)
  const handleSubmit = () => {
    if (!amount || !category || !paymentMethod) return;

    const txData = {
      date: date.replace(/\./g, "-").replace(/\s/g, ""),
      type: type === "+" ? "income" : "expense",
      amount: Number(amount),
      memo: content,
      paymentMethod,
      category,
    };

    if (selectedTransaction) {
      // 수정 모드
      updateTransaction(selectedTransaction.id, txData);
      setSelectedTransaction(null); // 수정 완료 후 해제
    } else {
      // 추가 모드
      addTransaction(txData);
    }

    // 폼 초기화
    setAmount("");
    setContent("");
    setPaymentMethod("");
    setCategory("");
  };

  return (
    <div className="w-[1000px] bg-white shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        {/* 왼쪽 섹션 */}
        <div className="flex items-center divide-x divide-gray-200">
          {/* 일자 */}
          <div className="flex flex-col px-4 py-3 min-w-[120px]">
            <label className="text-xs text-gray-500 mb-1">일자</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm text-gray-800 border-none outline-none bg-transparent"
            />
          </div>

          {/* 금액 */}
          <div className="flex flex-col px-4 py-3 min-w-[250px]">
            <label className="text-xs text-gray-500 mb-1">금액</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleTypeToggle}
                className="text-2xl font-light text-gray-800 border-none outline-none bg-transparent cursor-pointer hover:text-blue-500 transition-colors"
              >
                {type}
              </button>
              <label className="text-xs text-gray-500 mb-1 opacity-0">
                금액
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm text-gray-800 border-none outline-none bg-transparent w-full"
                />
                <span className="text-sm text-gray-600">원</span>
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div className="flex flex-col px-4 py-3 min-w-[200px] relative">
            <label className="text-xs text-gray-500 mb-1 flex justify-between">
              <span>내용</span>
              <span className="text-gray-400 text-xs">{content.length}/32</span>
            </label>
            <input
              type="text"
              value={content}
              onChange={handleContentChange}
              placeholder="입력하세요"
              className="text-sm text-gray-800 border-none outline-none bg-transparent"
            />
          </div>

          {/* 결제수단 드롭다운 */}
          <div className="flex flex-col px-4 py-3 min-w-[150px] relative">
            <label className="text-xs text-gray-500 mb-1">결제수단</label>
            <div
              className="relative"
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
            >
              <div className="flex justify-between items-center cursor-pointer text-sm">
                <span
                  className={!paymentMethod ? "text-gray-400" : "text-gray-800"}
                >
                  {paymentMethod || "선택하세요"}
                </span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${
                    isPaymentOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isPaymentOpen && (
                <div className="absolute top-full left-0 mt-1 w-[140px] bg-white border border-gray-200 rounded-md shadow-md z-10 overflow-hidden">
                  {paymentMethods.map((method, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center px-3 py-[6px] text-sm hover:bg-gray-50 cursor-pointer">
                        <span
                          onClick={() => {
                            setPaymentMethod(method);
                            setIsPaymentOpen(false);
                          }}
                        >
                          {method}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMethod(method);
                          }}
                          className="text-gray-400 hover:text-red-500 text-base leading-none"
                        >
                          ×
                        </button>
                      </div>
                      {i < paymentMethods.length - 1 && (
                        <hr className="border-gray-200" />
                      )}
                    </div>
                  ))}
                  {/* 추가하기 */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddModalOpen(true);
                    }}
                    className="px-3 py-[6px] text-sm text-blue-600 hover:bg-gray-50 cursor-pointer text-center"
                  >
                    추가하기
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 분류 드롭다운 */}
          <div className="flex flex-col px-4 py-3 min-w-[150px] relative">
            <label className="text-xs text-gray-500 mb-1">분류</label>
            <div
              className="relative"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <div className="flex justify-between items-center cursor-pointer text-sm">
                <span className={!category ? "text-gray-400" : "text-gray-800"}>
                  {category || "선택하세요"}
                </span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-[160px] bg-white border border-gray-200 rounded-md shadow-md z-10 overflow-hidden">
                  {type === "+" ? (
                    <>
                      <div className="bg-gray-50 px-3 py-1 text-[11px] text-gray-500 border-b border-gray-200">
                        수입 카테고리
                      </div>
                      {["월급", "용돈", "기타수입"].map((cat, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setCategory(cat);
                            setIsCategoryOpen(false);
                          }}
                          className="px-3 py-[6px] text-sm hover:bg-gray-50 cursor-pointer"
                        >
                          {cat}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-50 px-3 py-1 text-[11px] text-gray-500 border-b border-gray-200">
                        지출 카테고리
                      </div>
                      {[
                        "생활",
                        "식비",
                        "교통",
                        "쇼핑/뷰티",
                        "의료/건강",
                        "문화/여가",
                        "미분류",
                      ].map((cat, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setCategory(cat);
                            setIsCategoryOpen(false);
                          }}
                          className="px-3 py-[6px] text-sm hover:bg-gray-50 cursor-pointer"
                        >
                          {cat}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 체크버튼 */}
        <div className="flex items-center justify-center px-4 py-3">
          <button
            onClick={handleSubmit}
            className="p-0 rounded-full border-none bg-transparent cursor-pointer"
          >
            <img
              src="src/assets/check.svg"
              alt="Check Icon"
              className="w-10 h-10"
            />
          </button>
        </div>
      </div>

      {/* 추가 모달 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="bg-white w-[300px] rounded-md overflow-hidden shadow-lg">
            <div className="p-5">
              <p className="text-sm text-gray-800 mb-3">
                추가하실 결제 수단을 입력해주세요.
              </p>
              <input
                type="text"
                value={newMethod}
                onChange={(e) => setNewMethod(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 text-sm bg-gray-50 outline-none"
                placeholder="예: 체크카드"
              />
            </div>
            <div className="flex border-t text-sm">
              <button
                className="w-1/2 py-2 hover:bg-gray-100"
                onClick={() => setIsAddModalOpen(false)}
              >
                취소
              </button>
              <button
                className="w-1/2 py-2 text-blue-600 font-medium border-l hover:bg-gray-50"
                onClick={handleAddMethod}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="bg-white w-[300px] rounded-md overflow-hidden shadow-lg">
            <div className="p-5">
              <p className="text-sm text-gray-800 mb-3">
                해당 결제 수단을 삭제하시겠습니까?
              </p>
              <div className="text-gray-500 text-sm bg-gray-50 py-2 px-3 rounded-md border border-gray-200">
                {targetMethod}
              </div>
            </div>
            <div className="flex border-t text-sm">
              <button
                className="w-1/2 py-2 hover:bg-gray-100"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                취소
              </button>
              <button
                className="w-1/2 py-2 text-red-500 font-medium border-l hover:bg-gray-50"
                onClick={confirmDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionInputRow;
