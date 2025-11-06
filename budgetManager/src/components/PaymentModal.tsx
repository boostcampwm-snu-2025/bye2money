import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (paymentName: string) => void;
}

export default function PaymentModal({ isOpen, onClose, onAdd }: PaymentModalProps) {
  const [paymentName, setPaymentName] = useState('');

  const handleAdd = () => {
    if (paymentName.trim()) {
      onAdd(paymentName);
      setPaymentName('');
    }
  };

  const handleClose = () => {
    setPaymentName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-10"
        style={{ backgroundColor: '#0000004D' }}
        onClick={handleClose}
      />

      {/* Modal Box */}
      <div
        className="absolute w-[384px] h-[200px] z-20 flex flex-col"
        style={{ top: '754px', left: '528px' }}>

        {/* Input Area */}
        <div
          className="flex flex-col bg-neutral-surface-default border-t border-r border-l border-neutral-border-default"
          style={{
            width: '384px',
            height: '144px',
            padding: '32px',
            gap: '8px'
          }}>
          <label className="text-[16px] font-300 text-neutral-text-default"
            style={{ fontFamily: 'pretendard' }}>
            추가하실 결제 수단을 입력해주세요
          </label>
          <input
            type="text"
            value={paymentName}
            onChange={(e) => setPaymentName(e.target.value)}
            placeholder="placeholder"
            className="w-full h-[40px] text-[12px] font-semibold text-neutral-text-weak rounded bg-neutral-surface-point"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '8px 16px' }}
          />
        </div>

        {/* Button Area */}
        <div className="flex items-center justify-between w-[384px] h-[56px] border bg-neutral-surface-default">
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-[192px] h-[56px] text-[14px] font-300 text-neutral-text-default border-r border-neutral-border-default">
            취소
          </button>
          <button
            onClick={handleAdd}
            disabled={!paymentName.trim()}
            className="flex items-center justify-center w-[192px] h-[56px] text-[14px] font-600 text-neutral-text-default">
            추가
          </button>
        </div>
      </div>
    </>
  );
}
