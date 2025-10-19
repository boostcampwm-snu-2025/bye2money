import InputBar from '../../components/InputBar/InputBar';
import { useTransactions } from '../../context/TransactionContext';

import './home_page.css';

export default function HomePage() {
  const { filteredByMonth } = useTransactions();
  return (
    <main>
      <div className='input-section'>
        <div className='input-bar-wrapper'>
          <InputBar className='input-bar' />
        </div>

      </div>

      <section style={{ padding: '12px' }}>
        {filteredByMonth.length === 0 ? (
          <p style={{ color: '#666' }}>해당 월 내역이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredByMonth.map(tx => (
              <li key={tx.id} style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 8, padding: 10 }}>
                <div>{tx.date} · {tx.type === 'expense' ? '지출' : '수입'} · {tx.category}</div>
                <div>{tx.description || '설명 없음'}</div>
                <div>결제수단: {tx.paymentMethod || ''}</div>
                <strong style={{ color: tx.type === 'expense' ? '#e5484d' : '#0d7a2b' }}>
                  {tx.type === 'expense' ? '−' : '+'}{tx.amount.toLocaleString()}
                </strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
