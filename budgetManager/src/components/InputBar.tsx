import { useState, useEffect } from "react";
import minusIcon from '../assets/icons/minus.svg';
import plusIcon from '../assets/icons/plus.svg';
import addButtonIcon from '../assets/icons/addBtn.svg';
import addButtonActiveIcon from '../assets/icons/addBtnActive.svg';
import chevronIcon from '../assets/icons/chevron-down.svg';
import closedIcon from '../assets/icons/closed.svg';

const CATEGORIES = {
  income: ['월급', '용돈', '기타수입'],
  expense: ['생활', '식비', '교통', '쇼핑/뷰티', '의료/건강', '문화/여가', '미분류']
};

export interface Transaction {
  id?: number;
  date: string;
  amount: string;
  description: string;
  payment: string;
  category: string;
  type: 'income' | 'expense';
}

interface InputBarProps {
  onOpenPaymentModal: () => void;
  allPayments: string[];
  onOpenDeleteConfirm: (payment: string) => void;
  onAddTransaction: (transaction: Transaction) => void;
  editingTransaction?: Transaction | null;
  onCancelEdit?: () => void;
}

export default function InputBar({ onOpenPaymentModal, allPayments, onOpenDeleteConfirm, onAddTransaction, editingTransaction, onCancelEdit }: InputBarProps) {
  const [date, setDate] = useState(new Date());
  const [dateInput, setDateInput] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');

  // 초기 로드시 dateInput 설정
  useEffect(() => {
    setDateInput(formatDate(date));
  }, []);

  // editingTransaction 변경시 form에 값 채우기 또는 초기화
  useEffect(() => {
    if (editingTransaction) {
      const [year, month, day] = editingTransaction.date.split('.');
      setDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
      setDateInput(editingTransaction.date);
      setAmount(editingTransaction.amount);
      setDescription(editingTransaction.description);
      setSelectedPayment(editingTransaction.payment);
      setSelectedCategory(editingTransaction.category);
      setTransactionType(editingTransaction.type);
    } else {
      // editingTransaction이 null이 되면 form 초기화
      setDateInput(formatDate(new Date()));
      setDate(new Date());
      setAmount('');
      setDescription('');
      setSelectedPayment(null);
      setSelectedCategory(null);
      setTransactionType('expense');
    }
  }, [editingTransaction]);

  // 수정 모드에서 변경사항 감지
  const isModified = (): boolean => {
    if (!editingTransaction) return false;
    return (
      dateInput !== editingTransaction.date ||
      amount !== editingTransaction.amount ||
      description !== editingTransaction.description ||
      selectedPayment !== editingTransaction.payment ||
      selectedCategory !== editingTransaction.category ||
      transactionType !== editingTransaction.type
    );
  };

  // 날짜 포맷: Date 객체 → "YYYY.MM.DD" 문자열
  const formatDate = (dateObj: Date): string => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 날짜 입력 핸들러
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 입력값을 즉시 반영 (사용자가 타이핑하는 모습을 볼 수 있도록)
    setDateInput(inputValue);

    // YYYY.MM.DD 형식 검증 (정확한 형식만 처리)
    const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!dateRegex.test(inputValue)) {
      return; // 형식이 맞지 않으면 상태 업데이트 안함
    }

    const parts = inputValue.split('.');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // 날짜 유효성 검사
    const newDate = new Date(year, month - 1, day);
    if (newDate.getFullYear() === year &&
        newDate.getMonth() === month - 1 &&
        newDate.getDate() === day) {
      setDate(newDate);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 32) {
      setDescription(e.target.value.slice(0, 32));
    } else {
      setDescription(e.target.value);
    }
  };

  // 금액 입력 핸들러: 숫자만 입력받고 세 자리마다 쉼표 추가
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 숫자만 추출
    const numericValue = inputValue.replace(/[^\d]/g, '');

    // 숫자에 쉼표 추가
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setAmount(formattedValue);
  };

  const handlePaymentSelect = (payment: string) => {
    setSelectedPayment(payment);
    setIsPaymentDropdownOpen(false);
  };

  const handleRemovePaymentClick = (payment: string) => {
    onOpenDeleteConfirm(payment);
  };

  const handleToggleTransactionType = () => {
    setTransactionType(transactionType === 'expense' ? 'income' : 'expense');
    // 거래 유형이 바뀌면 선택된 카테고리 초기화
    setSelectedCategory(null);
  };

  const handleCategoryButtonClick = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  // 모든 필드 입력 완료 여부 확인
  const isAllFieldsFilled = (): boolean => {
    return (
      dateInput !== '' &&
      amount !== '' &&
      description.trim() !== '' &&
      selectedPayment !== null &&
      selectedCategory !== null
    );
  };

  // 확인 버튼 클릭 핸들러
  const handleAddButtonClick = () => {
    if (!isAllFieldsFilled()) return;

    // 금액에서 쉼표 제거 (저장용)
    const numericAmount = amount.replace(/,/g, '');

    const newTransaction: Transaction = {
      date: dateInput,
      amount: numericAmount,
      description,
      payment: selectedPayment || '',
      category: selectedCategory || '',
      type: transactionType
    };

    onAddTransaction(newTransaction);

    // 입력 필드 초기화
    setDateInput(formatDate(new Date()));
    setDate(new Date());
    setAmount('');
    setDescription('');
    setSelectedPayment(null);
    setSelectedCategory(null);
    setTransactionType('expense');

    // 수정 모드 해제
    onCancelEdit?.();
  };

  const divider = <div className="w-[0.5px] h-[44px] bg-neutral-text-default" />;
  return (
    <div className="absolute top-[176px] left-[273px]" data-inputbar>
        <div className="w-[894px] h-[76px] flex items-center justify-between bg-neutral-surface-default border border-neutral-border-default"
            style={{ padding: '16px 24px' }}>
            {/* date */}
            <div className="flex flex-col w-[88px] h-[44px] gap-[4px]">
                <div className="flex items-center justify-start w-[88px] h-[24px] text-[12px] font-300 text-neutral-text-default">일자</div>
                <input
                  type="text"
                  value={dateInput}
                  onChange={handleDateChange}
                  placeholder="YYYY.MM.DD"
                  className="flex items-center justify-start w-[88px] h-[16px] text-[12px] font-semibold text-neutral-text-default placeholder-neutral-text-weak"
                />
            </div>
            {/* divider */}
            {divider}
            {/* value */}
            <div className="flex flex-col w-[134px] h-[44px] items-center justify-center gap-[4px]">
                <div className="flex items-center justify-start w-[134px] h-[24px] text-[12px] font-300 text-neutral-text-default">금액</div>
                <div className="flex items-center justify-between gap-[8px]">
                    <button
                      onClick={handleToggleTransactionType}
                      className="w-[16px] h-[16px] flex items-center justify-center hover:opacity-70 transition-opacity"
                      title={transactionType === 'expense' ? '수입으로 변경' : '지출로 변경'}>
                      <img src={transactionType === 'income' ? plusIcon : minusIcon} alt={transactionType === 'income' ? 'plus' : 'minus'} className="w-full h-full" />
                    </button>
                    <input
                      className="w-[88px] h-[16px] text-[14px] font-300 text-neutral-text-default text-right"
                      type="text"
                      placeholder="0"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                    <div className="text-[14px] font-300 text-neutral-text-default">원</div>
                </div>
            </div>
            {/* divider */}
            {divider}
            {/* description */}
            <div className="flex flex-col w-[160px] h-[44px] gap-[4px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start w-[21px] h-[24px] text-[12px] font-300 text-neutral-text-default">내용</div>
                    <div className="flex items-center justify-end w-[135px] h-[24px] text-[12px] font-300 text-neutral-text-weak">{description.length}/32</div>
                </div>
                <input className="flex items-center text-left w-[160px] h-[16px] text-[14px] font-300 text-neutral-text-default" type="text" placeholder="입력하세요" value={description} onChange={handleDescriptionChange}/>
            </div>
            {/* divider */}
            {divider}
            {/* payment */}
            <div className="flex flex-col w-[104px] h-[44px] gap-[4px] relative">
                <div className="flex items-center justify-start w-[104px] h-[24px] text-[12px] font-300 text-neutral-text-default">결제수단</div>
                <div className="flex items-center justify-between">
                    <button
                    onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                    className="w-[104px] h-[16px] text-[12px] font-600 text-neutral-text-weak text-left">
                    {selectedPayment || '선택하세요'}
                    </button>
                    <img className="flex items-center justify-end w-[16px] h-[16px]" src={chevronIcon} alt="dropdown" />
                </div>
                
                {/* Payment Dropdown */}
                {isPaymentDropdownOpen && (
                    <div className="absolute top-[60px] translate-x-[-24px] w-[152px] bg-neutral-surface-default border border-neutral-border-default z-10"
                        style={{ boxShadow: '0px 4px 4px 0px #524D901A, 0px 2px 2px 0px #524D9014' }}>
                        {allPayments.map((payment, index) => (
                        <div key={payment} className="flex flex-col items-center">
                            <div className="flex items-center justify-between h-[56px] gap-[8px] hover:bg-neutral-surface-weak"
                                style={{ padding: '16px 24px' }}
                                onClick={() => handlePaymentSelect(payment)}>
                            <div className="flex items-center justify-start w-[72px] h-[24px] text-[12px] font-300 text-neutral-text-default">
                                {payment}
                            </div>
                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePaymentClick(payment);
                                }}
                                className="w-[24px] h-[24px] flex items-center justify-end">
                                <img src={closedIcon} alt="remove" className="w-[24px] h-[24px]" />
                            </button>
                        </div>
                        {index < allPayments.length && (
                            <div className="w-[100px] h-[0.5px] bg-neutral-border-default" />
                            )}
                            </div>
                        ))}
                        {/* Add Payment Option */}
                        <div className="flex items-center justify-between h-[56px] gap-[8px] hover:bg-neutral-surface-weak cursor-pointer"
                            style={{ padding: '16px 24px' }}
                            onClick={() => {
                            onOpenPaymentModal();
                            setIsPaymentDropdownOpen(false);
                            }}>
                        <div className="w-[72px] h-[24px] text-[12px] font-300 text-neutral-text-default">
                            추가하기
                        </div>
                        </div>
                    </div>
                    )
                }
            </div>
            {/* divider */}
            {divider}
            {/* category */}
            <div className="flex flex-col w-[104px] h-[44px] gap-[4px] relative">
                <div className="flex items-center justify-start w-[104px] h-[24px] text-[12px] font-300 text-neutral-text-default">분류</div>    
                <div className="flex items-center justify-between">
                    <button
                    onClick={handleCategoryButtonClick}
                    className="w-[104px] h-[16px] text-[12px] font-600 text-neutral-text-weak text-left">
                    {selectedCategory || '선택하세요'}
                    </button>
                    <img className="flex items-center justify-end w-[16px] h-[16px]" src={chevronIcon} alt="dropdown" />
                </div>
                
                {/* Category Dropdown - Single Step */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-[60px] translate-x-[-24px] w-[152px] bg-neutral-surface-default border border-neutral-border-default z-10"
                       style={{ boxShadow: '0px 4px 4px 0px #524D901A, 0px 2px 2px 0px #524D9014' }}>
                    {CATEGORIES[transactionType].map((category, index) => (
                      <div key={category} className="flex flex-col items-center">
                        <div
                          className="flex items-center justify-between h-[56px] gap-[8px] hover:bg-neutral-surface-weak cursor-pointer"
                          style={{ padding: '16px 24px', width: '152px' }}
                          onClick={() => handleCategorySelect(category)}>
                          <div className="flex items-center justify-start w-[72px] h-[24px] text-[12px] font-300 text-neutral-text-default">
                            {category}
                          </div>
                        </div>
                        {index < CATEGORIES[transactionType].length - 1 && (
                          <div className="w-[100px] h-[0.5px] bg-neutral-border-default" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            {/* select icon */}
            <button
              onClick={handleAddButtonClick}
              disabled={editingTransaction ? !isModified() || !isAllFieldsFilled() : !isAllFieldsFilled()}
              className="w-[40px] h-[40px] flex items-center justify-center"
              title={editingTransaction ? "수정 완료" : "내역 추가"}>
              <img
                className="w-[40px] h-[40px]"
                src={(editingTransaction ? isModified() && isAllFieldsFilled() : isAllFieldsFilled()) ? addButtonActiveIcon : addButtonIcon}
                alt={editingTransaction ? "confirm button" : "add button"}
              />
            </button>
        </div>
    </div>
  )
}