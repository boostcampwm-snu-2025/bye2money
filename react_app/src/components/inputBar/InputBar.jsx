import { useEffect, useMemo, useState } from 'react';
import { toYMD } from '../../utils/formatDate';
import { formatAmountInput, parseAmount } from '../../utils/formatCurrency';
import DescriptionInput from './DescriptionInput';
import CategoryDropdown from './CategoryDropdown';
import PaymentDropdown from './PaymentDropdown';
import './inputbar.css';

export default function InputBar({ className = '' }) {

  const [date, setDate] = useState(toYMD(new Date()));
  const [type, setType] = useState('expense');
  const [amountUI, setAmountUI] = useState('');
  const [category, setCategory] = useState('');
  const [payment, setPayment] = useState('');
  const [desc, setDesc] = useState('');

  const onAmountChange = v => setAmountUI(formatAmountInput(v));
  const toggleType = () => {
    setType(t => (t === 'expense' ? 'income' : 'expense'));
    setCategory('');
  };

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
    <div className='input-bar-wrapper'>
      <section className={`inputbar-flex ${className}`}>
        <div className="col">
          <div className="col-header">일자</div>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="col">
          <div className="col-header">금액</div>
          <div className="amount-row">
            <button type="button" className={`pm ${type}`} onClick={toggleType}>
              {type === 'expense' ? '−' : '+'}
            </button>
            <div style={{ position: 'relative' }}>
              <input
                value={amountUI}
                onChange={e => onAmountChange(e.target.value)}
                placeholder="0"
                style={{ textAlign: 'right', paddingRight: '30px' }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#555',
                  fontSize: '14px',
                }}
              >
                원
              </span>
            </div>
          </div>
        </div>

        <div className="col">
          <DescriptionInput desc={desc} setDesc={setDesc} />
        </div>

        <div className="col">
          <div className="col-header">결제수단</div>
          <PaymentDropdown value={payment} onChange={setPayment} />
        </div>

        <div className="col">
          <div className="col-header">분류</div>
          <CategoryDropdown type={type} value={category} onChange={setCategory} />
        </div>

        <div className="col col-check">
          
          <button className="btn primary check-btn" disabled={!valid} onClick={onSubmit}>
            <span className="check-icon"></span>
          </button>
        </div>
      </section>
    </div>

  );
}
