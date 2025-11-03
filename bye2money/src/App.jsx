import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import InputBar from './components/InputBar'; 
import TransactionList from './components/TransactionList'
import { useState, useEffect } from 'react';
import mockTransactions from './data/mockTransactions';

function App() {

  const [activeMenu, setActiveMenu] = useState('list');
  const [transactions, setTransactions] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

useEffect(() => {
      setTimeout(() => {
          setTransactions(mockTransactions); // 목 데이터로 상태 설정
          setIsLoading(false);              // 로딩 완료
      }, 1000); 
  }, []); // 빈 배열: 최초 1회만 실행

  const addTransaction = (newTransaction) => {
    setTransactions(prevTransactions => [
      { id: Date.now(), ...newTransaction }, 
      ...prevTransactions, 
    ]);
  };

return (
    // 라우터로 전체를 감싸줍니다.
    <Router>
      <Header 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu}
      />
      <Routes>
        <Route path="/" element={<div>홈 화면입니다.</div>} />
        <Route 
          path="/transaction" 
          element={
            <>
              <InputBar addTransaction={addTransaction}/> 
              <TransactionList transactions={transactions}/>
            </>
          }
        />
        <Route path="/calendar" element={<div>달력 화면입니다.</div>} />
        <Route path="/stats" element={<div>통계 화면입니다.</div>} />
      </Routes>

    </Router>
  );
}

export default App;