'use client';
import { Transaction, PaymentMethod, Category } from '@/types/transactions';
import { useState } from 'react';

interface InputBarProps {
  onAdd: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

export default function InputBar({ onAdd }: InputBarProps) {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [value, setValue] = useState('');
  const [isIncome, setIsIncome] = useState(false);
  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState<PaymentMethod | ''>('');
  const [category, setCategory] = useState<Category | ''>('');

  const paymentMethods: PaymentMethod[] = ['현금', '체크카드', '신용카드', '기타'];
  const expenseCategories: Category[] = ['식비', '교통', '쇼핑', '문화/여가', '의료/건강', '교육', '경조사비', '기타'];
  const incomeCategories: Category[] = ['급여', '용돈', '기타'];

  const categories = isIncome ? incomeCategories : expenseCategories;

  const isFormValid = date && value && Number(value) > 0 && description && payment && category;

  const handleSubmit = () => {
    if (!isFormValid) return;

    onAdd({
      date,
      type: isIncome ? 'income' : 'expense',
      value: Number(value),
      description,
      payment: payment as PaymentMethod,
      category: category as Category,
    });

    // 폼 초기화
    setValue('');
    setDescription('');
    setPayment('');
    setCategory('');
  };

  return (
    <div className="flex flex-row justify-between items-center p-4 md:px-6 w-full max-w-[894px] mx-auto bg-white border border-black/50">
      {/* 날짜 입력 */}
      <div className="flex flex-col items-start gap-1 w-[88px]">
        <label className="text-xs font-light leading-6 text-black">날짜</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full text-xs font-semibold leading-4 text-black outline-none"
        />
      </div>

      {/* 구분선 */}
      <div className="w-[0.5px] h-11 bg-black" />

  {/* 금액 입력 */}
  <div className="flex flex-col items-start gap-1 w-[134px] min-w-0">
        <label className="text-xs font-light leading-6 text-black">금액</label>
  <div className="flex flex-row items-center gap-2 w-full min-w-0">
          <button
            onClick={() => setIsIncome(!isIncome)}
            className="w-4 h-4 flex items-center justify-center"
            aria-label={isIncome ? '수입' : '지출'}
          >
            {isIncome ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
            className="flex-1 min-w-0 text-xs font-semibold leading-4 text-right text-black outline-none"
          />
          <span className="text-sm font-light text-black">원</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[0.5px] h-11 bg-black" />

  {/* 내용 입력 */}
  <div className="flex flex-col items-start gap-1 w-[160px] min-w-0">
        <div className="flex flex-row items-start gap-1 w-full">
          <label className="text-xs font-light leading-6 text-black">내용</label>
          <span className="flex-1 text-xs font-light leading-6 text-right text-[#777D84]">
            {description.length}/15
          </span>
        </div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 15))}
          placeholder="내용을 입력하세요"
          maxLength={15}
          className="w-full min-w-0 text-xs font-semibold leading-4 text-black outline-none placeholder:text-[#777D84] placeholder:font-normal"
        />
      </div>

      {/* 구분선 */}
      <div className="w-[0.5px] h-11 bg-black" />

      {/* 결제수단 선택 */}
      <div className="flex flex-col items-start gap-1 w-[104px]">
        <label className="text-xs font-light leading-6 text-black">결제수단</label>
        <div className="relative w-full">
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value as PaymentMethod)}
            className="w-full text-xs font-semibold leading-4 text-black outline-none appearance-none bg-transparent pr-5"
          >
            <option value="" className="text-[#777D84]">선택</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          <svg 
            className="absolute right-0 top-0 w-4 h-4 pointer-events-none" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[0.5px] h-11 bg-black" />

      {/* 카테고리 선택 */}
      <div className="flex flex-col items-start gap-1 w-[104px]">
        <label className="text-xs font-light leading-6 text-black">카테고리</label>
        <div className="relative w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full text-xs font-semibold leading-4 text-black outline-none appearance-none bg-transparent pr-5"
          >
            <option value="" className="text-[#777D84]">선택</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <svg 
            className="absolute right-0 top-0 w-4 h-4 pointer-events-none" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* 추가 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-opacity ${
          isFormValid ? 'bg-black opacity-100' : 'bg-black opacity-32'
        }`}
        aria-label="추가"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
