import { createPortal } from 'react-dom';
import styles from './AddItemModal.module.css';
import { useEffect, useRef, useState } from 'react';

type Props = {
    title?: string;
    placeholder?: string;
    open: boolean;
    onConfirm: (value: string) => void;
    onCancel: () => void;
};

export function AddItemModal({ title = '추가하실 결제 수단을 입력해주세요.', placeholder = '신용카드', open, onConfirm, onCancel }: Props) {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setValue('');
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [open]);

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (!open) return;
            if (e.key === 'Escape') onCancel();
            if (e.key === 'Enter') onConfirm(value.trim());
        }
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open, value, onCancel, onConfirm]);

    if (!open) return null;
    return createPortal(
        <div className={styles.backdrop} onClick={onCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>{title}</div>
                <div className={styles.body}>
                    <input ref={inputRef} className={styles.input} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className={styles.footer}>
                    <button className={`${styles.footerBtn} ${styles.cancel}`} onClick={onCancel}>취소</button>
                    <div className={styles.footerDivider} />
                    <button className={styles.footerBtn} onClick={() => onConfirm(value.trim())}>추가</button>
                </div>
            </div>
        </div>,
        document.body
    );
}
