import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MonthProvider } from './context/MonthContext';
import { TransactionProvider } from './context/TransactionContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MonthProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </MonthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
