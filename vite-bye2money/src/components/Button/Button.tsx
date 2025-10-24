import React from "react";
import styles from "./Button.module.css";

export type ButtonType = "ghost" | "contained" | "outline";
export type ButtonSize = "L" | "M" | "S";
export type ElementPattern = "textOnly" | "iconOnly" | "iconText";
export type IconPosition = "left" | "right";
export type FlexType = "flexible" | "fixed";
export type Tone = "default" | "danger";

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
	buttonType?: ButtonType;
	size?: ButtonSize;
	elementPattern?: ElementPattern;
	icon?: React.ReactNode;
	iconPosition?: IconPosition;
	selected?: boolean;
	disabled?: boolean;
	tone?: Tone;
	flexType?: FlexType;
	fixedWidth?: number | string;
}

const Button = ({
	children,
	buttonType = "ghost",
	size = "M",
	elementPattern = "textOnly",
	icon,
	iconPosition = "left",
	selected = false,
	disabled = false,
	tone = "default",
	flexType = "flexible",
	fixedWidth,
	...rest
}: ButtonProps) => {
	const classes = [
		styles.button,
		styles[`type_${buttonType}`],
		styles[`size_${size}`],
		styles[`pattern_${elementPattern}`],
		styles[`tone_${tone}`],
		styles[`flex_${flexType}`],
		selected ? styles.selected : "",
		disabled ? styles.isDisabled : "",
	]
		.filter(Boolean)
		.join(" ");

	const style: React.CSSProperties = {};
	if (flexType === "fixed" && fixedWidth) {
		style.width =
			typeof fixedWidth === "number" ? `${fixedWidth}px` : fixedWidth;
	}

	const ariaPressed =
		typeof rest["aria-pressed"] !== "undefined"
			? rest["aria-pressed"]
			: selected;

	return (
		<button
			type="button"
			className={classes}
			disabled={disabled}
			aria-pressed={ariaPressed}
			style={style}
			{...rest}
		>
			{elementPattern === "iconOnly" && (
				<span className={styles.iconOnlyBox}>{icon}</span>
			)}

			{elementPattern === "textOnly" && (
				<span className={styles.label}>{children}</span>
			)}

			{elementPattern === "iconText" && (
				<span className={styles.iconTextRow}>
					{iconPosition === "left" && icon && (
						<span className={styles.icon}>{icon}</span>
					)}
					<span className={styles.label}>{children}</span>
					{iconPosition === "right" && icon && (
						<span className={styles.icon}>{icon}</span>
					)}
				</span>
			)}
		</button>
	);
};

export default Button;
