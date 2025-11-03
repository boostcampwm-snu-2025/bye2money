import React, { useState, useEffect } from 'react';

// App.jsx로부터 transactions 배열을 props로 받습니다.
const TransactionList = ({ transactions, isLoading }) => {
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-8 text-center text-gray-500">
        거래 내역을 불러오는 중입니다...
      </div>
    );
  }

  // 데이터가 없을 때
  if (transactions.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center text-gray-500">
        아직 등록된 거래 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* 테이블 전체 컨테이너 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        
        {/* 테이블 헤더 */}
        <div className="flex bg-gray-50 text-sm font-semibold text-gray-700 border-b">
          <div className="w-[10%] p-3 text-center">날짜</div>
          <div className="w-[10%] p-3 text-center">유형</div>
          <div className="w-[20%] p-3 text-right">금액</div>
          <div className="w-[30%] p-3">내용</div>
          <div className="w-[15%] p-3 text-center">결제수단</div>
          <div className="w-[15%] p-3 text-center">분류</div>
        </div>

        {/* 거래 내역 목록: map() 메서드를 사용하여 배열 순회 */}
        {transactions.map((transaction) => {
          // 지출/수입에 따라 텍스트 색상 결정
          const amountColor = transaction.type === '지출' ? 'text-red-600' : 'text-blue-600';
          const sign = transaction.type === '지출' ? '-' : '+';
          
          return (
            // key prop은 React가 목록의 요소를 효율적으로 업데이트하는 데 필수입니다.
            <div key={transaction.id} className="flex border-b hover:bg-gray-50 transition duration-100">
              
              {/* 날짜 */}
              <div className="w-[10%] p-3 text-center text-sm text-gray-500">
                {transaction.date}
              </div>
              
              {/* 유형 */}
              <div className="w-[10%] p-3 text-center text-sm font-medium">
                {transaction.type}
              </div>
              
              {/* 금액 (가장 중요) */}
              <div className={`w-[20%] p-3 text-right font-bold ${amountColor}`}>
                {sign}{new Intl.NumberFormat('ko-KR').format(transaction.amount)}원
              </div>
              
              {/* 내용 */}
              <div className="w-[30%] p-3 text-gray-800 truncate">
                {transaction.description}
              </div>
              
              {/* 결제수단 */}
              <div className="w-[15%] p-3 text-center text-sm text-gray-600">
                {transaction.paymentMethod}
              </div>
              
              {/* 분류 */}
              <div className="w-[15%] p-3 text-center text-sm text-gray-600">
                {transaction.category}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;