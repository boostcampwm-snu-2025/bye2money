import { useState, useEffect } from 'react';
import Header from '../components/layout/Header'
import DocumentPage from './DocumentPage'
import CalendarPage from './CalendarPage'
import ChartPage from './ChartPage'
import PaymentModal from '../components/PaymentModal'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import type { Transaction } from '../components/InputBar'
import { transactionApi, paymentApi } from '../api/client';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState<'doc' | 'calendar' | 'chart'>('doc');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [allPayments, setAllPayments] = useState<string[]>([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteConfirmType, setDeleteConfirmType] = useState<'payment' | 'transaction'>('payment');
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [transactionToDeleteIndex, setTransactionToDeleteIndex] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingTransactionIndex, setEditingTransactionIndex] = useState<number | null>(null);

  // 초기 로드: 백엔드에서 결제수단 및 거래 데이터 불러오기
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [payments, transactionsData] = await Promise.all([
          paymentApi.getAll(),
          transactionApi.getAll()
        ]);
        setAllPayments(payments);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Failed to load initial data:', error);
        // 오류 시 빈 배열로 초기화
        setAllPayments([]);
        setTransactions([]);
      }
    };

    loadInitialData();
  }, []);

  const handleTabChange = (tab: 'doc' | 'calendar' | 'chart') => {
    setActiveTab(tab);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleAddPayment = async (newPayment: string) => {
    try {
      await paymentApi.create(newPayment);
      setAllPayments([...allPayments, newPayment]);
      setIsPaymentModalOpen(false);
    } catch (error) {
      console.error('Failed to add payment:', error);
      alert('결제수단 추가에 실패했습니다.');
    }
  };

  const handleOpenDeleteConfirm = (payment: string) => {
    setDeleteConfirmType('payment');
    setPaymentToDelete(payment);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteConfirmType === 'payment' && paymentToDelete) {
        await paymentApi.delete(paymentToDelete);
        const updatedPayments = allPayments.filter(p => p !== paymentToDelete);
        setAllPayments(updatedPayments);
        setIsDeleteConfirmOpen(false);
        setPaymentToDelete(null);
      } else if (deleteConfirmType === 'transaction' && transactionToDelete && transactionToDelete.id !== undefined) {
        // 1초 지연 후 삭제
        const transactionId = transactionToDelete.id;
        setTimeout(async () => {
          try {
            await transactionApi.delete(transactionId);
            const updatedTransactions = transactions.filter((_, i) => i !== transactionToDeleteIndex);
            setTransactions(updatedTransactions);
            setIsDeleteConfirmOpen(false);
            setTransactionToDelete(null);
            setTransactionToDeleteIndex(null);
          } catch (error) {
            console.error('Failed to delete transaction:', error);
            alert('거래 삭제에 실패했습니다.');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setPaymentToDelete(null);
    setTransactionToDelete(null);
    setTransactionToDeleteIndex(null);
  };

  // 거래 삭제 핸들러
  const handleDeleteTransaction = (index: number, transaction: Transaction) => {
    setDeleteConfirmType('transaction');
    setTransactionToDelete(transaction);
    setTransactionToDeleteIndex(index);
    setIsDeleteConfirmOpen(true);
  };

  // 거래 수정 핸들러
  const handleEditTransaction = (transaction: Transaction) => {
    // 새 객체를 생성하여 React가 변경을 감지하도록 함
    const index = transactions.findIndex(t => t === transaction);
    setEditingTransaction({ ...transaction });
    setEditingTransactionIndex(index);
  };

  // 거래 수정 취소 핸들러
  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setEditingTransactionIndex(null);
  };

  const handleAddTransaction = async (transaction: Transaction) => {
    try {
      if (editingTransactionIndex !== null && transactions[editingTransactionIndex]?.id) {
        // 수정 모드: 기존 거래 업데이트
        const transactionId = transactions[editingTransactionIndex].id;
        await transactionApi.update(transactionId, transaction);
        const updatedTransactions = transactions.map((t, i) =>
          i === editingTransactionIndex ? { ...transaction, id: transactionId } : t
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
        setEditingTransactionIndex(null);
      } else {
        // 추가 모드: 새 거래 추가
        const newTransaction = await transactionApi.create(transaction);
        setTransactions([...transactions, newTransaction]);
      }
    } catch (error) {
      console.error('Failed to save transaction:', error);
      alert('거래 저장에 실패했습니다.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'doc':
        return <DocumentPage onOpenPaymentModal={handleOpenPaymentModal} allPayments={allPayments} onOpenDeleteConfirm={handleOpenDeleteConfirm} onAddTransaction={handleAddTransaction} transactions={transactions} editingTransaction={editingTransaction} onCancelEdit={handleCancelEdit} onDeleteTransaction={handleDeleteTransaction} onEditTransaction={handleEditTransaction} currentDate={currentDate} />;
      case 'calendar':
        return <CalendarPage currentDate={currentDate} transactions={transactions} />;
      case 'chart':
        return <ChartPage />;
      default:
        return <DocumentPage onOpenPaymentModal={handleOpenPaymentModal} allPayments={allPayments} onOpenDeleteConfirm={handleOpenDeleteConfirm} onAddTransaction={handleAddTransaction} transactions={transactions} editingTransaction={editingTransaction} onCancelEdit={handleCancelEdit} onDeleteTransaction={handleDeleteTransaction} onEditTransaction={handleEditTransaction} currentDate={currentDate} />;
    }
  };

  // 전체 화면 클릭 감지
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // InputBar 제외하고 다른 영역 클릭 시 선택 해제
      if (!(e.target as HTMLElement).closest('[data-inputbar]') && editingTransaction) {
        handleCancelEdit();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [editingTransaction]);

  return (
    <div className="mainPage">
      <Header activeTab={activeTab} onTabChange={handleTabChange} currentDate={currentDate} onMonthChange={handleMonthChange} />
      {renderContent()}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onAdd={handleAddPayment}
        />
      )}

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteConfirmOpen}
        type={deleteConfirmType}
        paymentName={paymentToDelete || ''}
        transaction={transactionToDelete || undefined}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}