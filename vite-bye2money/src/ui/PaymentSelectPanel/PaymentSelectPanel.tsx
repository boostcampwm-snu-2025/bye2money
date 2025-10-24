import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PaymentSelectPanel.module.css";

import { ExpandMore } from "@mui/icons-material";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import Modal from "../../components/Modal/Modal";

import { DEFAULT_PAYMENT_OPTIONS } from "../InputBar/const";

type PaymentSelectPanelProps = {
	value?: string;
	onChange?: (v: string) => void;
	disabled?: boolean;
};

export default function PaymentSelectPanel({
	value,
	onChange,
	disabled = false,
}: PaymentSelectPanelProps) {
	const [options, setOptions] = useState<string[]>(() => [
		...DEFAULT_PAYMENT_OPTIONS,
	]);

	const [open, setOpen] = useState<boolean>(false);
	const [highlight, setHighlight] = useState<number>(-1);
	const [addOpen, setAddOpen] = useState<boolean>(false);
	const [draft, setDraft] = useState<string>("");

	const rootRef = useRef<HTMLDivElement>(null);

	const display = value ?? "";

	const items = useMemo(
		() => options.map((label, idx) => ({ label, idx })),
		[options]
	);

	// Close panel when the background is clicked
	useEffect(() => {
		if (!open) return;
		const onDoc = (e: MouseEvent) => {
			if (!rootRef.current) return;
			if (!rootRef.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [open]);

	// keyboard
	const handleKey = (e: React.KeyboardEvent) => {
		if (disabled) return;

		if (!open) {
			if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
				e.preventDefault();
				setOpen(true);
				setHighlight(0);
			}
			return;
		}

		const addRowIndex = items.length; // last row = add row (추가하기)

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlight((h) => Math.min(h + 1, addRowIndex));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlight((h) => Math.max(h - 1, 0));
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (highlight === addRowIndex) {
				setAddOpen(true);
			} else if (highlight >= 0 && highlight < items.length) {
				const label = items[highlight].label;
				onChange?.(label);
				setOpen(false);
			}
		} else if (e.key === "Escape") {
			e.preventDefault();
			setOpen(false);
		}
	};

	const choose = (label: string) => {
		onChange?.(label);
		setOpen(false);
	};

	const remove = (idx: number) => {
		if (options.length <= 1) return; // at least 1 option needed
		const removed = options[idx];
		setOptions((prev) => prev.filter((_, i) => i !== idx));

		if (!value && removed === display) {
			onChange?.("");
		}
		setHighlight(0);
	};

	// add option via modal
	const confirmAdd = () => {
		const name = draft.trim();
		if (!name) return;
		if (!options.includes(name)) {
			setOptions((prev) => [...prev, name]);
			onChange?.(name);
		}
		setDraft("");
		setAddOpen(false);
		setOpen(false);
	};

	const hasValue = !!display;

	return (
		<div
			ref={rootRef}
			className={styles.root}
			data-disabled={disabled ? "" : undefined}
			onKeyDown={handleKey}
		>
			<button
				type="button"
				className={styles.trigger}
				data-has-value={hasValue ? "" : undefined}
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => !disabled && setOpen((v) => !v)}
			>
				<span className={styles.triggerText}>{display || "선택하세요"}</span>
				<ExpandMore className={styles.chevron} />
			</button>

			{/* Dropdown panel */}
			{open && (
				<div className={styles.panel} role="listbox" tabIndex={-1}>
					{items.map(({ label, idx }) => (
						<div key={label} className={styles.row}>
							<button
								type="button"
								role="option"
								aria-selected={display === label}
								className={`${styles.item} ${
									highlight === idx ? styles.isHover : ""
								}`}
								onMouseEnter={() => setHighlight(idx)}
								onClick={() => choose(label)}
							>
								<span className={styles.itemLabel}>{label}</span>
								<div className={styles.removeBtn}>
									<Button
										elementPattern="textOnly"
										size="S"
										buttonType="ghost"
										tone="danger"
										aria-label={`${label} 삭제`}
										onClick={(e) => {
											e.stopPropagation();
											remove(idx);
										}}
									>
										×
									</Button>
								</div>
							</button>
							<div className={styles.divider} />
						</div>
					))}

					{/* 추가하기 */}
					<div className={styles.row}>
						<button
							type="button"
							className={`${styles.addRow} ${
								highlight === items.length ? styles.isHover : ""
							}`}
							onMouseEnter={() => setHighlight(items.length)}
							onClick={() => setAddOpen(true)}
						>
							추가하기
						</button>
					</div>
				</div>
			)}

			{/* 추가하기 Modal */}
			<Modal
				open={addOpen}
				onClose={() => {
					setDraft("");
					setAddOpen(false);
				}}
				onConfirm={confirmAdd}
				title="추가하실 결제 수단을 입력해주세요."
				confirmLabel="추가"
				cancelLabel="취소"
			>
				<div className={styles.modalBody}>
					<TextInput
						inputType="default"
						placeholder="placeholder"
						aria-label="새 결제수단"
						value={draft}
						onValueChange={(v) => setDraft(v ?? "")}
						onKeyDown={(e) => {
							if (e.key === "Enter") confirmAdd();
						}}
					/>
				</div>
			</Modal>
		</div>
	);
}
