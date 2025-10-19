import { useEffect, useMemo, useState } from 'react';
import { toYMD } from '../../utils/formatDate';
import { formatAmountInput, parseAmount } from '../../utils/formatCurrency';
import { useTransactions } from '../../context/TransactionContext';
import CategoryDropdown from './CategoryDropdown';
import PaymentDropdown from './PaymentDropdown';
import './inputbar.css';

export default function InputBar() {
  const { addTransaction } = useTransactions();
  const [date, setDate] = useState(toYMD(new Date()));
  const [type, setType] = useState('expense');
  const [amountUI, setAmountUI] = useState('');
  const [category, setCategory] = useState('');
  const [payment, setPayment] = useState('');
  const [desc, setDesc] = useState('');

  const onAmountChange = v => setAmountUI(formatAmountInput(v));
  const toggleType = () => { setType(t => t === 'expense' ? 'income' : 'expense'); setCategory(''); };
  const descCount = `${desc.length}/32`;

  const valid = useMemo(() => {
    const amt = parseAmount(amountUI);
    return date && amt > 0 && category && payment && desc.length <= 32;
  }, [date, amountUI, category, payment, desc]);

  const onSubmit = () => {
    if (!valid) return;
    const tx = {
      id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
      date,
      type,
      amount: parseAmount(amountUI),
      category,
      paymentMethod: payment,
      description: desc.trim(),
    };
    addTransaction(tx);
    setAmountUI('');
    setDesc('');
  };

  useEffect(() => setDate(toYMD(new Date())), []);

  return (
    <section className="inputbar">
      <div className="grid">
        <div className="field">
          <label>날짜</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="field">
          <label>금액</label>
          <div className="amount-row">
            <button type="button" className={`pm ${type}`} onClick={toggleType}>
              {type === 'expense' ? '−' : '+'}
            </button>
            <input value={amountUI} onChange={e => onAmountChange(e.target.value)} placeholder="0" />
          </div>
        </div>

        <CategoryDropdown type={type} value={category} onChange={setCategory} />
        <PaymentDropdown value={payment} onChange={setPayment} />

        <div className="field">
          <label><span className="count">{descCount}</span> 내용</label>
          <input value={desc} onChange={e => setDesc(e.target.value.slice(0, 32))} placeholder="설명 (최대 32자)" />
        </div>

        <div className="actions">
          <button className="btn primary" disabled={!valid} onClick={onSubmit}>확인</button>
        </div>
      </div>
    </section>
  );
}
