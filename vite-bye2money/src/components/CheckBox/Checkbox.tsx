import { useState, useCallback } from "react";
import styles from "./CheckBox.module.css";

export interface CheckBoxProps {
	label?: string;
	selected?: boolean;
	onChange?: (selected: boolean) => void;
}

const CheckBox = ({ label = "LABEL", selected, onChange }: CheckBoxProps) => {
	const [isselected, setIsselected] = useState<boolean>(!!selected);

	const toggle = useCallback(() => {
		const next = !isselected;
		setIsselected(next);
		onChange?.(next);
	}, [isselected, onChange]);

	const classes = [
		styles.root,
		isselected ? styles.state_selected : styles.state_default,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<label className={classes} onClick={toggle}>
			<span className={styles.box} aria-hidden="true">
				<svg
					className={styles.icon}
					width="18"
					height="18"
					viewBox="0 0 20 20"
					focusable="false"
					aria-hidden="true"
				>
					<circle cx="10" cy="10" r="9" />
					<path
						d="M6 10.5l2.5 2.5L14 7.5"
						fill="none"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			<span className={styles.text}>{label}</span>
		</label>
	);
};

export default CheckBox;
