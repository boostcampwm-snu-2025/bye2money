import { useEffect, useMemo, useRef, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { toDateInputValue, parseYMD } from '../../lib/date';
import { formatCurrency, formatNumberInput } from '../../lib/format';
import type { Category, IncomeCategory, SpendCategory, Txn } from '../../types/ledger';
import { PaymentMethodSelect } from '../../components/PaymentMethodSelect';
import { Icon } from '../../components/Icon';

/**
 * 날짜 문자열을 "YYYY. MM. DD." 형식으로 포맷
 * @example "2023-08-01" -> "2023. 08. 01."
 */
const formatDateDisplay = (dateStr: string): string => {
  const { y: dateYear, m: dateMonth, d: dateDay } = parseYMD(dateStr);
  return `${dateYear}. ${String(dateMonth).padStart(2, '0')}. ${String(dateDay).padStart(2, '0')}.`;
};

/** 수입 카테고리 목록 */
const incomeCategories: IncomeCategory[] = ['월급', '용돈', '기타수입'];

/** 지출 카테고리 목록 */
const spendCategories: SpendCategory[] = ['생활', '식비', '교통', '쇼핑/뷰티', '의료/건강', '문화/여가', '미분류'];

/**
 * 트랜잭션 입력 바 컴포넌트
 * 수입/지출 내역을 입력하거나 편집할 수 있는 폼
 */
export function EntryBar() {
  const { state, dispatch } = useLedger();
  const editingTransaction = state.ui.editingId 
    ? state.txns.find(transaction => transaction.id === state.ui.editingId) 
    : undefined;

  /* 폼 상태 관리 */
  const [date, setDate] = useState(toDateInputValue(new Date()));
  const [sign, setSign] = useState<'+' | '-' >('-');
  const [amountStr, setAmountStr] = useState('0'); // 쉼표 포함 표시용 문자열
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [memo, setMemo] = useState('');
  const [methodId, setMethodId] = useState(state.methods[0]?.id ?? '');
  const [category, setCategory] = useState<Category>('미분류');

  /**
   * 편집 모드 진입 시 초기값 스냅샷 (변경 감지용)
   * 이 값을 기준으로 폼이 변경되었는지 확인
   */
  const [snapshot, setSnapshot] = useState<{
    date: string; 
    sign: '+' | '-'; 
    amount: number; 
    memo: string; 
    methodId: string; 
    category: Category;
  }>();

  /* 편집 모드 진입 시 폼 초기화 */
  useEffect(() => {
    if (!editingTransaction) {
      setSnapshot(undefined);
      return;
    }

    const absoluteAmount = Math.abs(editingTransaction.amount);
    setDate(editingTransaction.date);
    setSign(editingTransaction.amount > 0 ? '+' : '-');
    setAmountStr(absoluteAmount.toLocaleString('ko-KR'));
    setMemo(editingTransaction.memo);
    setMethodId(editingTransaction.methodId);
    setCategory(editingTransaction.category);
    
    setSnapshot({
      date: editingTransaction.date,
      sign: editingTransaction.amount > 0 ? '+' : '-',
      amount: absoluteAmount,
      memo: editingTransaction.memo,
      methodId: editingTransaction.methodId,
      category: editingTransaction.category,
    });
  }, [editingTransaction?.id]);

  /* 수입/지출에 따른 카테고리 옵션 */
  const categoryOptions = sign === '+' ? incomeCategories : spendCategories;

  /* 금액 관련 계산 */
  const numericAmount = useMemo(
    () => Number(amountStr.replace(/[^0-9]/g, '')) || 0,
    [amountStr]
  );
  const previewAmount = useMemo(
    () => formatCurrency((sign === '+' ? 1 : -1) * numericAmount),
    [sign, numericAmount]
  );

  /* 폼 유효성 검사 */
  const baseValid = date && numericAmount > 0 && methodId && category && memo.length <= 32;
  const hasChanges = snapshot
    ? (snapshot.date !== date ||
       snapshot.sign !== sign ||
       snapshot.amount !== numericAmount ||
       snapshot.memo !== memo ||
       snapshot.methodId !== methodId ||
       snapshot.category !== category)
    : true;
  const isValid = baseValid && hasChanges;

  /**
   * 트랜잭션 저장 (추가 또는 수정)
   */
  const submit = () => {
    if (!isValid) return;

    const transaction: Txn = {
      id: editingTransaction?.id ?? crypto.randomUUID(),
      date,
      amount: (sign === '+' ? 1 : -1) * numericAmount,
      memo,
      methodId,
      category,
      createdAt: editingTransaction?.createdAt ?? Date.now()
    };

    dispatch({ 
      type: editingTransaction ? 'updateTxn' : 'addTxn', 
      txn: transaction 
    });

    /* 저장 후 폼 초기화 */
    setDate(toDateInputValue(new Date()));
    setSign('-');
    setAmountStr('0');
    setMemo('');
    setMethodId(state.methods[0]?.id ?? '');
    setCategory('미분류');

    /* 편집 상태 해제 */
    if (editingTransaction) {
      dispatch({ type: 'setEditing', id: undefined });
    }
  };

  /**
   * 금액 입력 핸들러
   * 쉼표 포맷팅을 적용하고 커서 위치 유지
   */
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target;
    const caretPosition = inputElement.selectionStart ?? inputElement.value.length;
    const { formatted, newCaret } = formatNumberInput(inputElement.value, caretPosition);
    
    setAmountStr(formatted);
    
    /* 다음 프레임에 커서 위치 복원 */
    requestAnimationFrame(() => {
      if (amountInputRef.current) {
        amountInputRef.current.setSelectionRange(newCaret, newCaret);
      }
    });
  };

  return (
    <section
      className="
        relative z-10 mx-auto max-w-4xl px-4
        bg-white p-2 border border-zinc-200
        ring-1 ring-black/5 shadow-sm
        font-sans
        -mt-6
      "
    >
      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-5">
        {/* 날짜 선택 필드 */}
        <div 
          className="relative flex flex-col border-r border-zinc-200 px-3 py-1.5 cursor-pointer min-h-[45px] first:pl-0"
          onClick={() => {
            dateInputRef.current?.showPicker?.();
          }}
        >
          <span className="body-12 text-zinc-500 mb-1.5">일자</span>
          <div className="flex items-center gap-1.5 flex-1">
            <span className="title-sb-12 text-zinc-900">
              {formatDateDisplay(date)}
            </span>
            <Icon name="calendar" className="w-4 h-4 shrink-0 text-zinc-400" />
          </div>
          <input
            ref={dateInputRef}
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="날짜 선택"
          />
        </div>

        {/* 금액 입력 필드 (수입/지출 토글 포함) */}
        <div className="flex flex-col border-r border-zinc-200 px-3 py-1.5 min-h-[45px]">
          <span className="body-12 text-zinc-500 mb-1.5">금액</span>
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setSign(sign === '-' ? '+' : '-')}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-zinc-300
                         title-sb-12 transition-colors hover:border-zinc-400
                         active:bg-zinc-50" aria-label="지출/수입 토글"
            >
              {sign}
            </button>
            <div className="flex-1 min-w-0 flex items-center gap-2 flex-nowrap">
              <div className="h-px flex-1 bg-zinc-300"></div>
              <input
                ref={amountInputRef}
                value={amountStr}
                inputMode="numeric"
                onChange={onAmountChange}
                className="min-w-[2rem] max-w-[4rem] bg-transparent title-sb-12 outline-none text-center
                           placeholder:font-light placeholder:text-zinc-400"
                placeholder="0"
              />
            </div>
            <span className="shrink-0 whitespace-nowrap title-sb-12 text-zinc-500 ml-1">
              {previewAmount}
            </span>
          </div>
        </div>

        {/* 내용 입력 필드 */}
        <label className="flex flex-col border-r border-zinc-200 px-3 py-1.5 min-h-[45px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="body-12 text-zinc-500">내용</span>
            <span className="body-12 text-zinc-400">{memo.length}/32</span>
          </div>
          <input
            value={memo}
            maxLength={32}
            onChange={e => setMemo(e.target.value)}
            placeholder="입력하세요"
            className="flex-1 bg-transparent title-sb-12 outline-none
                       placeholder:font-light placeholder:text-zinc-400"
          />
        </label>

        {/* 결제수단 선택 (드롭다운) */}
        <div className="flex flex-col border-r border-zinc-200 px-3 py-1.5 min-h-[45px]">
          <span className="body-12 text-zinc-500 mb-1.5">결제수단</span>
          <div className="flex-1 body-12">
            <PaymentMethodSelect
              methods={state.methods}
              value={methodId}
              onChange={setMethodId}
              onAdd={(name) => {
                const id = name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + crypto.randomUUID().slice(0, 4);
                dispatch({ type: 'addMethod', method: { id, name } });
                setMethodId(id);
              }}
              onRemove={(id) => {
                dispatch({ type: 'removeMethod', id });
                if (methodId === id) {
                  setMethodId(state.methods.find(method => method.id !== id)?.id ?? '');
                }
              }}
            />
          </div>
        </div>

        {/* 분류 선택 및 확인 버튼 */}
        <div className="flex flex-col px-3 py-1.5 min-h-[45px]">
          <span className="body-12 text-zinc-500 mb-1.5">분류</span>
          <div className="flex items-center gap-2 flex-1">
            <select
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className="flex-1 min-w-0 bg-transparent title-sb-12 outline-none"
            >
              {categoryOptions.map(categoryOption => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
            <button
              aria-label="확인"
              disabled={!isValid}
              onClick={submit}
              className={`shrink-0 inline-grid place-items-center rounded-full
                          h-8 w-8 transition-all
                          ${isValid
                            ? 'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-700'
                            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                          }`}
            >
              <Icon name="check" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
