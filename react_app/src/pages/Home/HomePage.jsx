import InputBar from '../../components/InputBar/InputBar';
import { useTransactions } from '../../context/TransactionContext';
import TransactionList from "../../components/TransactionList/TransactionList";

import './home_page.css';

export default function HomePage() {
  const { filteredByMonth } = useTransactions();
  return (
    <main>
      <div className='input-section'>


        <InputBar className='input-bar' />


      </div>

      <div className='transaction-list-wrapper-wrapper'>
        <div className='transaction-list-wrapper'>
          <TransactionList />
        </div> 
      </div>



    </main>
  );
}
