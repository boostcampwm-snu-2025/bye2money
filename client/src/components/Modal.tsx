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

/**
 * 모달 컴포넌트
 * 확인/취소 버튼이 있는 다이얼로그 모달
 */
export function Modal({
  open,
  title,
  children,
  onCancel,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  busy = false,
  closeOnOverlay = true,
  showClose = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const onCancelRef = useRef(onCancel);
  const titleId = useMemo(() => `modal-title-${Math.random().toString(36).slice(2, 8)}`, []);

  /* onCancel 콜백 최신 값 유지 (의존성 배열 제거를 위해) */
  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  /* 키보드 이벤트 처리 (ESC: 닫기, Tab: 포커스 트랩) */
  useEffect(() => {
    if (!open) return;

    /* 모달 열릴 때 초기 포커스 */
    const toFocus =
      cardRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? confirmBtnRef.current;
    toFocus?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      /* ESC 키: 모달 닫기 */
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancelRef.current();
        return;
      }
      
      /* Tab 키: 포커스 트랩 (모달 내부에 포커스 고정) */
      if (e.key === 'Tab') {
        const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;

        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];

        /* Shift+Tab: 마지막에서 첫 번째로 순환 */
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
          return;
        }
        
        /* Tab: 첫 번째에서 마지막으로 순환 */
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [open]);

  if (!open) return null;

  /**
   * 오버레이 클릭 핸들러
   * 오버레이 영역(배경)을 클릭하면 모달 닫기
   */
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlay) return;
    if (e.target === overlayRef.current) {
      e.stopPropagation();
      onCancel();
    }
  };

  /**
   * 모달 카드 클릭 핸들러
   * 카드 내부 클릭 시 이벤트 전파 차단 (오버레이 클릭 방지)
   */
  const onCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={onOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div ref={cardRef} className="modal-card relative" onClick={onCardClick}>
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

/**
 * 입력 모달 컴포넌트
 * 텍스트 입력 필드가 있는 모달
 */
export function InputModal({
  open,
  title,
  placeholder,
  initial = '',
  onCancel,
  onSubmit,
  submitText = '추가',
}: InputModalProps) {
  const [value, setValue] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  /* 모달이 열릴 때 초기값으로 리셋 */
  useEffect(() => {
    if (open) setValue(initial);
  }, [open, initial]);

  if (!open) return null;

  /**
   * 제출 핸들러
   * 공백을 제거한 값을 전달
   */
  const submit = () => onSubmit(value.trim());

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
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder={placeholder}
      />
    </Modal>
  );
}
