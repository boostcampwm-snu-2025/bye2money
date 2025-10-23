import { useEffect, useMemo, useRef, useState } from 'react';
import { useLedger } from '../../stores/ledger-store';
import { toDateInputValue } from '../../lib/date';
import { formatCurrency, formatNumberInput } from '../../lib/format';
import type { Category, IncomeCategory, SpendCategory, Txn } from '../../types/ledger';
import { PaymentMethodSelect } from '../../components/PaymentMethodSelect';
import { Icon } from '../../components/Icon';

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
    if (!editing) { // 새 입력 초기화
      setDate(toDateInputValue(new Date()));
      setSign('-'); setAmountStr('0'); setMemo('');
      setMethodId(state.methods[0]?.id ?? ''); setCategory('미분류');
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
        sticky top-[52px] z-10 mt-4
        rounded-2xl bg-white p-3
        ring-1 ring-black/5 shadow-sm
        font-sans                                /* ← Pretendard Variable 강제 */
      "
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
        {/* 날짜 */}
        <label className="flex items-center gap-2 rounded-xl border border-zinc-200 p-2">
          <span className="w-10 body-12 text-zinc-500">일자</span>   {/* light/12 */}
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="h-8 w-full rounded bg-transparent title-sb-12 outline-none
                       placeholder:font-light placeholder:text-zinc-400"      /* semibold/12 */
          />
        </label>

        {/* 금액(+/- 토글) */}
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 p-2">
          <button
            onClick={() => setSign(sign === '-' ? '+' : '-')}
            className="grid h-8 w-8 place-items-center rounded-full border border-zinc-300
                       title-sb-12 leading-8"                                     /* semibold/12 */
            aria-label="지출/수입 토글"
          >
            {sign}
          </button>
          <input
            ref={amountInputRef}
            value={amountStr}
            inputMode="numeric"
            onChange={onAmountChange}
            className="w-full bg-transparent title-sb-12 outline-none
                       placeholder:font-light placeholder:text-zinc-400"
          />
          <span className="whitespace-nowrap title-sb-12 text-zinc-500">{previewAmount}</span>
        </div>

        {/* 내용 */}
        <label className="flex items-center gap-2 rounded-xl border border-zinc-200 p-2 md:col-span-2">
          <span className="w-10 body-12 text-zinc-500">내용</span>   {/* light/12 */}
          <input
            value={memo}
            maxLength={32}
            onChange={e => setMemo(e.target.value)}
            placeholder="입력하세요"
            className="w-full bg-transparent title-sb-12 outline-none
                       placeholder:font-light placeholder:text-zinc-400"
          />
          <span className="body-12 text-zinc-400">{memo.length}/32</span>
        </label>

        {/* 결제수단(커스텀 드롭다운) */}
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 p-2">
          <span className="w-14 body-12 text-zinc-500">결제수단</span>  {/* light/12 */}
          <div className="w-full body-12">
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
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 p-2">
          <span className="w-10 body-12 text-zinc-500">분류</span>     {/* light/12 */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value as Category)}
            className="w-full rounded bg-transparent title-sb-12 outline-none"
          >
            {options.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            aria-label="확인"
            disabled={!valid}
            onClick={submit}
            className={`inline-grid place-items-center rounded-full p-0
                        h-10 w-10 shrink-0 transition
                        ${valid
                          ? 'bg-zinc-900 text-white hover:opacity-90 active:opacity-80'
                          : 'bg-zinc-900 text-zinc-500 opacity-[0.32] cursor-not-allowed'
                        }`}
          >
            <Icon name="check" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
