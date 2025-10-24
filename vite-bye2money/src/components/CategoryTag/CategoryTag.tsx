import React from "react";
import styles from "./CategoryTag.module.css";

import type { CategoryTagTone } from "../../types/types";
export interface CategoryTagProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
	tone?: CategoryTagTone;
	selected?: boolean;
	disabled?: boolean;
}

const CategoryTag = ({
	children,
	tone = "life",
	selected = false,
	disabled = false,
	...rest
}: CategoryTagProps) => {
	const classes = [
		styles.tag,
		styles[`tone_${tone}`],
		selected ? styles.state_selected : styles.state_default,
		disabled ? styles.state_disabled : styles.state_enabled,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<span
			className={classes}
			aria-pressed={selected}
			aria-disabled={disabled || undefined}
			{...rest}
		>
			<span className={styles.label}>{children}</span>
		</span>
	);
};

export default CategoryTag;
