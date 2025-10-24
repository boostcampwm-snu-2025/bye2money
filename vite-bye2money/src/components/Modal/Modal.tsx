import React, { useEffect, useId, useRef } from "react";
import classNames from "classnames";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

export type ModalType = "default";

export interface ModalProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title"> {
	open: boolean;
	onClose?: () => void;
	onConfirm?: () => void;
	type?: ModalType;
	title?: React.ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	disableConfirm?: boolean;
	closeOnBackdrop?: boolean;
	closeOnEsc?: boolean;
	footer?: React.ReactNode;
}

const Modal = ({
	open,
	onClose,
	onConfirm,
	type = "default",
	title,
	confirmLabel = "추가",
	cancelLabel = "취소",
	disableConfirm = false,
	closeOnBackdrop = true,
	closeOnEsc = true,
	footer,
	id,
	children,
	...rest
}: ModalProps) => {
	const autoId = useId();
	const dialogId = id ?? autoId;
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const el = panelRef.current;
		el?.querySelector<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (closeOnEsc && e.key === "Escape") onClose?.();
		};
		document.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener("keydown", onKey);
		};
	}, [open, closeOnEsc, onClose]);

	const classes = classNames(styles.root, styles[`type_${type}`], {
		[styles.state_open]: open,
		[styles.state_closed]: !open,
	});

	return (
		<div
			className={classes}
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? `${dialogId}-title` : undefined}
			style={{ display: open ? "grid" : "none" }}
			{...rest}
		>
			<div
				className={styles.backdrop}
				onClick={() => {
					if (closeOnBackdrop) onClose?.();
				}}
			/>
			<div className={styles.panel} ref={panelRef}>
				{title && (
					<div className={styles.header}>
						<h2 id={`${dialogId}-title`} className={styles.title}>
							{title}
						</h2>
					</div>
				)}

				<div className={styles.body}>{children}</div>

				<div className={styles.footer}>
					{!footer && (
						<>
							<Button
								buttonType="outline"
								elementPattern="textOnly"
								onClick={onClose}
							>
								{cancelLabel}
							</Button>
							<Button
								buttonType="outline"
								elementPattern="textOnly"
								selected
								onClick={onConfirm}
								disabled={disableConfirm}
							>
								{confirmLabel}
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
