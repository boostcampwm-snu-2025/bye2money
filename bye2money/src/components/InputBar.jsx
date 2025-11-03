import React, { useState } from 'react';

const InputBar = ({ addTransaction }) => {
    // 현재 날짜를 'YYYY-MM-DD' 형식으로 가져오는 헬퍼 함수
    const getTodayDateInputFormat = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`; // HTML input type="date" 형식
    };

    // 폼 상태를 관리할 useState (예시)
    const [formData, setFormData] = useState({
        date: getTodayDateInputFormat(),
        type: '지출',
        amount: 0,
        description: '기본 문구입니다',
        paymentMethod: '카드',
        category: '식비',
    });

// 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

  // 폼 제출(저장 버튼 클릭) 핸들러
    const handleSave = () => {
        // 폼 유효성 검사 (금액이 0보다 큰지 등)
        if (formData.amount <= 0 || formData.description.trim() === '') {
        alert("금액과 내용을 정확히 입력해주세요.");
        return;
        }

        // 1. 부모(App.jsx)의 addTransaction 함수를 호출하여 데이터 전달
        addTransaction(formData);
        
        // 2. 입력 필드 초기화
        setFormData({
        date: getTodayDateInputFormat(),
        type: '지출',
        amount: 0,
        description: '',
        paymentMethod: '카드',
        category: '식비',
        });

    };


    return (
    // Tailwind를 사용한 간단한 입력 바 디자인
    <div className="divide-x divide-gray-300 flex flex-row text-[12px] justify-between w-[894px] h-[76px] bg-white border-[0.5px] border-solid border-solid justify-self-center mt-[-38px] z-40 relative px-[24px] py-[16px]">
        <div className="flex flex-col justify-between w-[88px] font-bold">
            <span>일자</span>
            <input
                type="date"
                name="date" // 💡 name 속성 추가
                value={formData.date}
                onChange={handleChange}
                className="w-full text-sm border-none focus:outline-none"
            />
        </div>

        <div className="flex flex-col w-[134px] justify-between font-bold">
            <span> 금액 </span>
            <div>
                <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    className="rounded focus:border-indigo-500 appearance-none"
                >
                <option value="지출">–</option>
                <option value="수입">+</option>
                </select>

                <input 
                    type="number"
                    name='amount'
                    value={formData.amount} 
                    className="w-1/2 text-right p-1 focus:outline-none"
                    onChange={handleChange}
                />
                <span className="text-sm text-gray-500 ml-1">원</span>
            </div>
        </div>


        <div className="flex flex-col w-[160px] justify-between font-bold relative">
            <span>내용</span>
            <input 
              type="text"
              name="description"
              placeholder="입력하세요"
              value={formData.description}
              className="w-full focus:outline-none text-gray-400"
              maxLength={32}
              onChange={handleChange}
            />

            <span className="absolute right-2 text-xs text-gray-400">
              {formData.description.length}/32
            </span>
          </div>


        <div className="flex flex-col w-[104px] justify-between font-bold relative">
            <span> 결제수단 </span>
            <select 
                placeholder='선택하세요' 
                name= "paymentMethod"
                className="w-full border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none"
                value= {formData.paymentMethod}
                onChange={handleChange}
                >
              <option value="">선택하세요</option>
              <option value="카드">카드</option>
              <option value="현금">현금</option>
            </select>
          </div>

     
        <div className="flex flex-col w-[104px] justify-between font-bold relative">
            <span>분류</span>
            <select 
                name="category" 
                value={formData.category}
                onChange={handleChange}className="w-full border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none">
              
              <option value="">선택하세요</option>
              <option value="식비">식비</option>
              <option value="교통">교통</option>
            </select>
          </div>

 
          <div className="w-[40px]  flex justify-center">
            <button 
              className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-green-500 transition duration-150"
              onClick={handleSave}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </button>
          </div>
          {/* 
        </div>
        End: 실제 입력 값 행 */}

      </div>
  );
};

export default InputBar;