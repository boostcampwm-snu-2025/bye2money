import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './Icon';

type ModalProps = {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  busy?: boolean;
  /** 오버레이 클릭으로 닫기 허용 (기본 true) */
  closeOnOverlay?: boolean;
  /** 닫기 X 버튼 표시 (기본 true) */
  showClose?: boolean;
};

export function Modal({
  open, title, children, onCancel, onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  busy = false,
  closeOnOverlay = true,
  showClose = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useMemo(() => `modal-title-${Math.random().toString(36).slice(2, 8)}`, []);

  // 닫기(ESC), 포커스 트랩
  useEffect(() => {
    if (!open) return;

    // 초기 포커스
    const toFocus =
      cardRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? confirmBtnRef.current;
    toFocus?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
        return;
      }
      if (e.key === 'Tab') {
        // 포커스 트랩
        const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;

        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];

        // Shift+Tab
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
          return;
        }
        // Tab
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [open, onCancel]);

  if (!open) return null;

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlay) return;
    if (e.target === overlayRef.current) onCancel();
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onMouseDown={onOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div ref={cardRef} className="modal-card relative">
        {showClose && (
          <button
            aria-label="닫기"
            onClick={onCancel}
            className="absolute right-3 top-3 rounded-full p-1 hover:bg-gs-200"
          >
            <Icon name="closed" className="h-4 w-4" />
          </button>
        )}

        <h3 id={titleId} className="mb-3 title-sb-16">{title}</h3>

        <div className="mb-4 body-14 text-neutral-text-weak">{children}</div>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn btn-secondary">{cancelText}</button>
          <button
            ref={confirmBtnRef}
            onClick={onConfirm}
            disabled={busy}
            className={`btn ${busy ? 'btn-disabled' : 'btn-primary'}`}
          >
            {busy ? '처리 중…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

type InputModalProps = {
  open: boolean;
  title: string;
  placeholder?: string;
  initial?: string;
  onCancel: () => void;
  onSubmit: (value: string) => void;
  submitText?: string;
};

export function InputModal({
  open,
  title,
  placeholder,
  initial = '',
  onCancel,
  onSubmit,
  submitText = '추가',
}: InputModalProps) {
  const [v, setV] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setV(initial);
  }, [open, initial]);

  if (!open) return null;

  const submit = () => onSubmit(v.trim());

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onConfirm={submit}
      confirmText={submitText}
    >
      <input
        ref={inputRef}
        className="input"
        value={v}
        onChange={e => setV(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder={placeholder}
      />
    </Modal>
  );
}
