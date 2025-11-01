import { useEffect, useMemo, useRef, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { toDateInputValue, parseYMD } from '../../lib/date';
import { formatCurrency, formatNumberInput } from '../../lib/format';
import type { Category, IncomeCategory, SpendCategory, Txn } from '../../types/ledger';
import { PaymentMethodSelect } from '../../components/PaymentMethodSelect';
import { Icon } from '../../components/Icon';

// 날짜 포맷: "2023. 08. 01"
const formatDateDisplay = (dateStr: string): string => {
  const { y, m, d } = parseYMD(dateStr);
  return `${y}. ${String(m).padStart(2, '0')}. ${String(d).padStart(2, '0')}.`;
};

const incomeCats: IncomeCategory[] = ['월급', '용돈', '기타수입'];
const spendCats: SpendCategory[] = ['생활', '식비', '교통', '쇼핑/뷰티', '의료/건강', '문화/여가', '미분류'];

export function EntryBar() {
  const { state, dispatch } = useLedger();
  const editing = state.ui.editingId ? state.txns.find(t => t.id === state.ui.editingId) : undefined;

  // 폼 상태
  const [date, setDate] = useState(toDateInputValue(new Date()));
  const [sign, setSign] = useState<'+' | '-' >('-');
  const [amountStr, setAmountStr] = useState('0'); // 쉼표 포함 표시 문자열
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [memo, setMemo] = useState('');
  const [methodId, setMethodId] = useState(state.methods[0]?.id ?? '');
  const [category, setCategory] = useState<Category>('미분류');

  // 편집 진입 스냅샷(Dirty 체크용)
  const [snapshot, setSnapshot] = useState<{
    date: string; sign: '+' | '-'; amount: number; memo: string; methodId: string; category: Category;
  }>();

  useEffect(() => {
    if (!editing) { setSnapshot(undefined); return; }
    const abs = Math.abs(editing.amount);
    setDate(editing.date);
    setSign(editing.amount > 0 ? '+' : '-');
    setAmountStr(abs.toLocaleString('ko-KR'));
    setMemo(editing.memo);
    setMethodId(editing.methodId);
    setCategory(editing.category);
    setSnapshot({
      date: editing.date,
      sign: editing.amount > 0 ? '+' : '-',
      amount: abs,
      memo: editing.memo,
      methodId: editing.methodId,
      category: editing.category,
    });
  }, [editing?.id]);

  // 카테고리 옵션
  const options = sign === '+' ? incomeCats : spendCats;

  // 숫자값/미리보기
  const numericAmount = useMemo(
    () => Number(amountStr.replace(/[^0-9]/g, '')) || 0,
    [amountStr]
  );
  const previewAmount = useMemo(
    () => formatCurrency((sign === '+' ? 1 : -1) * numericAmount),
    [sign, numericAmount]
  );

  // 유효성 + Dirty
  const baseValid = date && numericAmount > 0 && methodId && category && memo.length <= 32;
  const dirty = snapshot
    ? (snapshot.date !== date ||
      snapshot.sign !== sign ||
      snapshot.amount !== numericAmount ||
      snapshot.memo !== memo ||
      snapshot.methodId !== methodId ||
      snapshot.category !== category)
    : true;
  const valid = baseValid && dirty;

  // 저장
  const submit = () => {
    if (!valid) return;
    const txn: Txn = {
      id: editing?.id ?? crypto.randomUUID(),
      date,
      amount: (sign === '+' ? 1 : -1) * numericAmount,
      memo, methodId, category,
      createdAt: editing?.createdAt ?? Date.now()
    };
    dispatch({ type: editing ? 'updateTxn' : 'addTxn', txn });
    // 수정/추가 후 입력바 즉시 초기화
    setDate(toDateInputValue(new Date()));
    setSign('-'); setAmountStr('0'); setMemo('');
    setMethodId(state.methods[0]?.id ?? ''); setCategory('미분류');
    // 편집 상태 해제
    if (editing) {
      dispatch({ type: 'setEditing', id: undefined });
    }
  };

  // 금액 입력: 쉼표 포맷 + 커서 유지
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const caret = el.selectionStart ?? el.value.length;
    const { formatted, newCaret } = formatNumberInput(el.value, caret);
    setAmountStr(formatted);
    requestAnimationFrame(() => {
      const input = amountInputRef.current;
      if (input) { input.setSelectionRange(newCaret, newCaret); }
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
        {/* 날짜 */}
        <div 
          className="relative flex flex-col border-r border-zinc-200 px-3 py-1.5 cursor-pointer min-h-[45px] first:pl-0"
          onClick={() => {
            if (dateInputRef.current) {
              dateInputRef.current.showPicker?.();
            }
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

        {/* 금액(+/- 토글) */}
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

        {/* 내용 */}
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

        {/* 결제수단(커스텀 드롭다운) */}
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
                if (methodId === id) setMethodId(state.methods.find(m => m.id !== id)?.id ?? '');
              }}
            />
          </div>
        </div>

        {/* 분류 + 확인 */}
        <div className="flex flex-col px-3 py-1.5 min-h-[45px]">
          <span className="body-12 text-zinc-500 mb-1.5">분류</span>
          <div className="flex items-center gap-2 flex-1">
            <select
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className="flex-1 min-w-0 bg-transparent title-sb-12 outline-none"
            >
              {options.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              aria-label="확인"
              disabled={!valid}
              onClick={submit}
              className={`shrink-0 inline-grid place-items-center rounded-full
                          h-8 w-8 transition-all
                          ${valid
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
