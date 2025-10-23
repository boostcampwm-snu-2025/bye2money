import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMonth } from './MonthContext';

const Ctx = createContext(null);
const uuid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage('txs', []);
  const [paymentMethods, setPaymentMethods] = useLocalStorage('payMethods', [
    { id: 'cash', name: '현금' },
    { id: 'card', name: '카드' },
  ]);
  const { month } = useMonth();

  const filteredByMonth = useMemo(() => {
    return transactions
      .filter(t => {
        const d = new Date(t.date);
        return d.getFullYear() === month.year && d.getMonth() + 1 === month.month;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, month]);

  const addTransaction = (tx) => setTransactions(prev => [tx, ...prev]);
  const deletePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
    setTransactions(prev =>
      prev.map(t => (t.paymentMethodId === id ? { ...t, paymentMethod: '' } : t))
    );
  };
  const addPaymentMethod = (name) => {
    const item = { id: uuid(), name };
    setPaymentMethods(prev => [...prev, item]);
    return item;
  };

  return (
    <Ctx.Provider value={{ transactions, paymentMethods, filteredByMonth, addTransaction, deletePaymentMethod, addPaymentMethod }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTransactions = () => useContext(Ctx);
