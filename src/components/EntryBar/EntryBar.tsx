import styles from './EntryBar.module.css';
import { useState, useRef } from 'react';
import { formatDate } from '../../utils/date';
import type { TransactionEntry, PayMethod, Category } from '../../types/entry';
import { Dropdown, type DropdownOption } from '../Dropdown';

type EntryBarProps = {
    date?: string; // YYYY.MM.DD
    amount?: number;
    memo?: string;
    onSubmit?: (entry: TransactionEntry) => void;
};

export function EntryBar({ date, amount = 0, memo = '', onSubmit }: EntryBarProps) {
    const today = new Date();
    const defaultDate = formatDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const [isMinus, setIsMinus] = useState(true);
    const MAX_MEMO = 32;
    const [memoText, setMemoText] = useState<string>(memo);
    const amountRef = useRef<HTMLInputElement>(null);
    const [pay, setPay] = useState<PayMethod>('');
    const [category, setCategory] = useState<Category>('');
    const [payOptions, setPayOptions] = useState<DropdownOption[]>([
        { id: 'cash', label: '현금' },
        { id: 'card', label: '신용카드' },
        { id: 'transfer', label: '계좌이체' },
    ]);
    const [categoryOptions, setCategoryOptions] = useState<DropdownOption[]>([
        { id: 'food', label: '식비' },
        { id: 'life', label: '생활' },
        { id: 'transport', label: '교통' },
    ]);

    const handleSubmit = () => {
        if (!onSubmit) return;
        const amtRaw = amountRef.current?.value?.replace(/[^0-9]/g, '') ?? '';
        const amtNum = Number(amtRaw || 0) * (isMinus ? -1 : 1);
        const entry: TransactionEntry = {
            date: date ?? defaultDate,
            amount: amtNum,
            memo: memoText,
            payMethod: pay ?? '',
            category: category,
        };
        onSubmit(entry);
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.bar}>
                {/* 일자 */}
                <div className={`${styles.field} ${styles.dateField}`}>
                    <span className={styles.label}>일자</span>
                    <div className={styles.valueRow}>
                        <span className={styles.dateValue}>{date ?? defaultDate}</span>
                    </div>
                </div>

                <div className={styles.divider} />

                {/* 금액 */}
                <div className={`${styles.field} ${styles.amountField}`}>
                    <span className={styles.label}>금액</span>
                    <div className={styles.valueRow}>
                        <div className={styles.amountBox}>
                                    <button
                                        className={styles.pmToggle}
                                        type="button"
                                        aria-label="minus or plus"
                                        onClick={() => setIsMinus((v) => !v)}
                                    >
                                        {isMinus ? '-' : '+'}
                                    </button>
                                    <input ref={amountRef} className={styles.amountInput} type="text" inputMode="numeric" defaultValue={amount} />
                                    <span className={styles.currency}>원</span>
                                </div>
                    </div>
                </div>

                <div className={styles.divider} />

                {/* 내용 */}
                <div className={`${styles.field} ${styles.memoField}`}>
                    <span className={styles.label}>내용</span>
                    <div className={styles.memoWrap}>
                        <input
                            className={styles.memoInput}
                            type="text"
                            placeholder="입력하세요"
                            value={memoText}
                            maxLength={MAX_MEMO}
                            onChange={(e) => setMemoText(e.target.value.slice(0, MAX_MEMO))}
                        />
                        <span className={styles.counter}>{memoText.length}/{MAX_MEMO}</span>
                    </div>
                </div>

                <div className={styles.divider} />

                {/* 결제수단 */}
                <div className={`${styles.field} ${styles.payField}`}>
                    <span className={styles.label}>결제수단</span>
                    <div className={styles.valueRow}>
                        <div style={{ width: '100%' }}>
                            <Dropdown
                                options={payOptions}
                                value={pay}
                                placeholder="선택하세요"
                                onChange={(id) => setPay(id as PayMethod)}
                                onRemoveOption={(id) => setPayOptions(opts => opts.filter(o => o.id !== id))}
                                onAddOption={
                                    { /* 미구현 */}
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                {/* 분류 */}
                <div className={`${styles.field} ${styles.catField}`}>
                    <span className={styles.label}>분류</span>
                    <div className={styles.valueRow}>
                        <Dropdown
                            options={categoryOptions}
                            value={category}
                            placeholder="선택하세요"
                            onChange={(id) => setCategory(id as Category)}
                        />
                    </div>
                </div>

                {/* 제출 */}
                <div className={`${styles.field} ${styles.submitField}`}>
                    <button className={styles.submit} aria-label="submit" onClick={handleSubmit}>✓</button>
                </div>
            </div>
        </div>
    );
}