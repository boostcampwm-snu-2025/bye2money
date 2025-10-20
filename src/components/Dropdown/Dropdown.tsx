import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export type DropdownOption = { id: string; label: string };

type DropdownProps = {
    options: DropdownOption[];
    value?: string;
    placeholder?: string;
    onChange?: (id: string) => void;
    onRemoveOption?: (id: string) => void;
    onAddOption?: () => void;
};

export function Dropdown({ options, value, placeholder = '선택하세요', onChange, onRemoveOption, onAddOption }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

    const selected = useMemo(() => options.find(o => o.id === value) ?? null, [options, value]);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            const target = e.target as Node;
            const c = containerRef.current;
            const m = menuRef.current;
            if (!c) return;
            // If click is outside both trigger container and the portaled menu, close
            if (!c.contains(target) && (!m || !m.contains(target))) {
                setOpen(false);
            }
        }
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    useEffect(() => {
        function updatePos() {
            const c = containerRef.current;
            if (!c) return;
            const rect = c.getBoundingClientRect();
            setMenuPos({ top: rect.bottom + 6 /* small gap */, left: rect.left, width: rect.width });
        }
        if (open) {
            updatePos();
            window.addEventListener('scroll', updatePos, true);
            window.addEventListener('resize', updatePos);
            return () => {
                window.removeEventListener('scroll', updatePos, true);
                window.removeEventListener('resize', updatePos);
            };
        }
    }, [open]);

    return (
        <div className={styles.container} ref={containerRef}>
            <button type="button" className={styles.trigger} onClick={() => setOpen(o => !o)} aria-expanded={open}>
                <span className={selected ? styles.selectedLabel : styles.placeholder}>
                    {selected ? selected.label : placeholder}
                </span>
                <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            </button>
            {open && createPortal(
                <div
                    ref={menuRef}
                    className={styles.menuPortal}
                    role="listbox"
                    style={{ position: 'fixed', top: menuPos.top, left: menuPos.left, width: menuPos.width }}
                >
                    {options.map((opt) => (
                        <span>
                            <div key={opt.id} className={styles.option} role="option" aria-selected={opt.id === value}
                                onClick={() => { onChange && onChange(opt.id); setOpen(false); }}>
                                <span>{opt.label}</span>
                                {onRemoveOption && (
                                    <button type="button" className={styles.removeBtn} aria-label={`${opt.label} 삭제`}
                                        onClick={(e) => { e.stopPropagation(); onRemoveOption(opt.id); }}>
                                        ×
                                    </button>
                                )}
                            </div>
                            <div className={styles.dividerHorizontal} />
                        </span>
                    ))}
                    {onAddOption && (
                        <div className={styles.addRow} onClick={() => { onAddOption(); setOpen(false); }}>
                            추가하기
                        </div>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
