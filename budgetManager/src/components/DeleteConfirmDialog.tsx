import type { Transaction } from './InputBar';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  type: 'payment' | 'transaction';
  paymentName?: string;
  transaction?: Transaction;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({
  isOpen,
  type,
  paymentName,
  transaction,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  const isPayment = type === 'payment';
  const messageHeight = isPayment ? '144px' : '200px';
  const dialogHeight = isPayment ? '200px' : '256px';

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-10"
        style={{ backgroundColor: '#0000004D' }}
        onClick={onCancel}
      />

      {/* Dialog Box */}
      <div
        className={`absolute w-[384px] z-20 flex flex-col`}
        style={{ height: dialogHeight, top: '754px', left: '528px' }}>
        {/* Message */}
        <div className="flex flex-col justify-center items-start bg-neutral-surface-default border-t border-r border-l border-neutral-border-default"
          style={{
            width: '384px',
            height: messageHeight,
            padding: '32px',
            gap: '8px'
          }}>
          {isPayment ? (
            <>
              <p className="text-[16px] font-400 text-neutral-text-default text-center">
                해당 결제 수단을 삭제하시겠습니까?
              </p>
              <p className="text-[12px] font-300 text-neutral-text-default text-center">결제 수단 : {paymentName}</p>
            </>
          ) : (
            <>
              <p className="flex items-center justify-start text-[16px] font-400 text-neutral-text-default">
                해당 내역을 삭제하시겠습니까?
              </p>
              {transaction && (
                <div className="flex flex-col items-start justify-start gap-[4px] text-[12px] font-300 text-neutral-text-default">
                  <p>카테고리: {transaction.type === 'income' ? '수입' : '지출'}/{transaction.category}</p>
                  <p>내용: {transaction.description}</p>
                  <p>결제수단: {transaction.payment}</p>
                  <p>금액: {parseInt(transaction.amount.replace(/,/g, '')).toLocaleString()}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Button Area */}
        <div className="flex items-center justify-between w-[384px] h-[56px] border bg-neutral-surface-default">
          <button
            onClick={onCancel}
            className="flex items-center justify-center w-[192px] h-[56px] text-[14px] font-300 text-neutral-text-default border-r border-neutral-border-default">
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={isPayment ? !paymentName?.trim() : false}
            className="flex items-center justify-center w-[192px] h-[56px] text-[14px] font-600 text-neutral-text-default">
            삭제
          </button>
        </div>
      </div>
    </>
  );
}
