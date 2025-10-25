import { useState, useEffect } from "react";
import PageHeader from "../features/PageHeader.jsx";
import TransactionListView from "../features/TransactionList/components/TransactionListView.jsx";
import { getTransactions } from "../shared/api/transactions.js";

export default function MainPage() {
  // @TODO: "월별" 필터링
  const [transactions, setTransactions] = useState([]);

  // 서버에서 데이터 가져오기
  const refreshTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    refreshTransactions();
  }, []);

  // 같은 데이터를 토대로 3개의 다른 방식으로 보여주는 거라, 라우팅을 사용하지 않음
  return (
    <div>
      {/* Background: 원래는 메인 페이지의 모든 구성 요소를 컴포넌트화하는 게 맞지 않나 하는 생각이었는데, 정적이어서 그냥 이렇게 처리*/}
      <div className="w-full h-50 bg-pastel-jordyBlue absolute top-0" />
      <div className="relative w-[1440px] mx-auto flex flex-col items-center">
        <PageHeader /> {/* @TODO: View 변경*/}
        <TransactionListView transactions={transactions} setTransactions={setTransactions} refreshTransactions={refreshTransactions}/>
      </div>
    </div>
  );
}