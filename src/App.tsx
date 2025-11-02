import { useState } from 'react';
import Header from './component/Header.tsx';       //  Header component import
import InputForm from './component/InputForm.tsx';   // InputForm component import
import type {Transaction} from './types.ts';
import TransactionList from './component/TransactionList.tsx';

function App() {
  // 전체 가계부 데이터 관리
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 새 내역 추가 함수
  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(), // 고유 ID 생성
    };

    setTransactions([...transactions, transaction]);

    // 콘솔에서 확인용 (나중에 리스트 컴포넌트로 표시)
    console.log('새 내역 등록:', transaction);
    console.log('전체 내역:', [...transactions, transaction]);
  };

  return (
    // move class to top div
    <div>
      <Header />
      <InputForm onSubmit={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;