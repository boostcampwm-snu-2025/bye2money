import React, { useState, useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext.js";

const TransactionInputRow = () => {
  const { addTransaction, currentDate } = useContext(TransactionContext);

  const [date, setDate] = useState(() => {
    const d = new Date(currentDate);
    return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}. ${String(d.getDate()).padStart(2, "0")}`;
  });

  const [type, setType] = useState("+");
  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");
  const [paymentMethods, setPaymentMethods] = useState(["현금", "신용카드"]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [category, setCategory] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newMethod, setNewMethod] = useState("");
  const [targetMethod, setTargetMethod] = useState("");

  const handleTypeToggle = () => setType(type === "+" ? "-" : "+");
  const handleContentChange = (e) => setContent(e.target.value.slice(0, 32));

  const handleAddMethod = () => {
    if (newMethod.trim() && !paymentMethods.includes(newMethod.trim())) {
      setPaymentMethods([...paymentMethods, newMethod.trim()]);
    }
    setNewMethod("");
    setIsAddModalOpen(false);
  };

  const handleDeleteMethod = (method) => {
    setTargetMethod(method);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setPaymentMethods(paymentMethods.filter((m) => m !== targetMethod));
    if (paymentMethod === targetMethod) setPaymentMethod("");
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = () => {
    if (!amount || !category || !paymentMethod) return;

    const tx = {
      date,
      type,
      amount: Number(amount),
      content,
      paymentMethod,
      category,
      createdAt: new Date(),
    };

    addTransaction(tx);

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
          <div className="flex flex-col px-4 py-3 min-w-[80px]">
            <label className="text-xs text-gray-500 mb-1">금액</label>
            <button
              onClick={handleTypeToggle}
              className="text-2xl font-light text-gray-800 border-none outline-none bg-transparent cursor-pointer hover:text-blue-500 transition-colors"
            >
              {type}
            </button>
          </div>

          <div className="flex flex-col px-4 py-3 min-w-[150px]">
            <label className="text-xs text-gray-500 mb-1 opacity-0">금액</label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-sm text-gray-800 border-none outline-none bg-transparent w-full"
              />
              <span className="text-sm text-gray-600">원</span>
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

      {/* ➕ 추가 모달 */}
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

      {/* ❌ 삭제 모달 */}
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
