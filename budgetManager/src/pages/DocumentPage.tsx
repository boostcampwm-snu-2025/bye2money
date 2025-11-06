import InputBar from '../components/InputBar'
import type { Transaction } from '../components/InputBar'
import Container from '../components/Container'

interface DocumentPageProps {
  onOpenPaymentModal: () => void;
  allPayments: string[];
  onOpenDeleteConfirm: (payment: string) => void;
  onAddTransaction: (transaction: Transaction) => void;
  transactions: Transaction[];
  editingTransaction?: Transaction | null;
  onCancelEdit?: () => void;
  onDeleteTransaction?: (index: number, transaction: Transaction) => void;
  onEditTransaction?: (transaction: Transaction) => void;
  currentDate?: Date;
}

export default function DocumentPage({ onOpenPaymentModal, allPayments, onOpenDeleteConfirm, onAddTransaction, transactions, editingTransaction, onCancelEdit, onDeleteTransaction, onEditTransaction, currentDate }: DocumentPageProps) {
  return (
    <>
      <InputBar onOpenPaymentModal={onOpenPaymentModal} allPayments={allPayments} onOpenDeleteConfirm={onOpenDeleteConfirm} onAddTransaction={onAddTransaction} editingTransaction={editingTransaction} onCancelEdit={onCancelEdit} />
      <Container transactions={transactions} onDeleteTransaction={onDeleteTransaction} onEditTransaction={onEditTransaction} isEditing={!!editingTransaction} currentDate={currentDate} />
    </>
  )
}
