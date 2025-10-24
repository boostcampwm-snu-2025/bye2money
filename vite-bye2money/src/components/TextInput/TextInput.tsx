import React, { useId, useMemo, useState, useCallback } from "react";
import styles from "./TextInput.module.css";

export type TextInputType = "default" | "textAreaOnly";
export type TextInputStates = "enabled" | "active" | "disabled" | "error";
export type TextInputTypingStates =
	| "placeholder"
	| "onFocus"
	| "typing"
	| "typed";
export type TextInputTextAlignType = "left" | "center" | "right";

export interface TextInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
	inputType?: TextInputType;
	label?: string;
	error?: boolean;
	disabled?: boolean;
	rows?: number;
	onValueChange?: (value: string) => void;
	value?: string;
	forceTypingState?: TextInputTypingStates;
	textAlign?: TextInputTextAlignType;
}

const TextInput = ({
	inputType = "default",
	label,
	error = false,
	disabled = false,
	rows = 4,
	onChange,
	onValueChange,
	value,
	defaultValue,
	placeholder,
	onFocus,
	onBlur,
	forceTypingState,
	textAlign = "left",
	id,
	...rest
}: TextInputProps) => {
	const autoId = useId();
	const inputId = useMemo(() => id ?? autoId, [id, autoId]);

	const isControlled = useMemo(() => typeof value === "string", [value]);
	const [uncontrolled, setUncontrolled] = useState<string>(
		defaultValue?.toString() ?? ""
	);
	const [focused, setFocused] = useState<boolean>(false);
	const [recentlyTypedAt, setRecentlyTypedAt] = useState<number>(0);

	const currentValue = useMemo(
		() => (isControlled ? (value as string) : uncontrolled),
		[isControlled, value, uncontrolled]
	);

	const handleChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = useCallback(
		(e) => {
			const next = e.currentTarget.value;
			if (!isControlled) setUncontrolled(next);
			onChange?.(e as React.ChangeEvent<HTMLInputElement>);
			onValueChange?.(next);
			setRecentlyTypedAt(Date.now());
		},
		[isControlled, onChange, onValueChange]
	);

	const handleFocus: React.FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = useCallback(
		(e) => {
			setFocused(true);
			onFocus?.(e as React.FocusEvent<HTMLInputElement>);
		},
		[onFocus]
	);

	const handleBlur: React.FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = useCallback(
		(e) => {
			setFocused(false);
			onBlur?.(e as React.FocusEvent<HTMLInputElement>);
		},
		[onBlur]
	);

	const inferredTypingState: TextInputTypingStates = useMemo(() => {
		if (forceTypingState) return forceTypingState;
		if (!focused && !currentValue) return "placeholder";
		if (focused && !currentValue) return "onFocus";
		if (focused && currentValue && Date.now() - recentlyTypedAt < 150)
			return "typing";
		if (!focused && currentValue) return "typed";
		return "typing";
	}, [forceTypingState, focused, currentValue, recentlyTypedAt]);

	const classes = useMemo(
		() =>
			[
				styles.root,
				styles[`type_${inputType}`],
				disabled
					? styles.state_disabled
					: error
					? styles.state_error
					: focused
					? styles.state_active
					: styles.state_enabled,
				styles[`typing_${inferredTypingState}`],
			]
				.filter(Boolean)
				.join(" "),
		[disabled, error, focused, inferredTypingState, inputType]
	);

	const commonProps = useMemo(
		() => ({
			id: inputId,
			className: styles.input,
			disabled,
			placeholder,
			onFocus: handleFocus,
			onBlur: handleBlur,
			onChange: handleChange,
			value: currentValue,
			...(isControlled ? {} : { defaultValue }),
			"aria-invalid": error || undefined,
			"aria-disabled": disabled || undefined,
			style: {
				textAlign,
			},
		}),
		[
			inputId,
			disabled,
			placeholder,
			handleFocus,
			handleBlur,
			handleChange,
			currentValue,
			isControlled,
			defaultValue,
			error,
			textAlign,
		]
	);

	return (
		<label className={classes} htmlFor={inputId}>
			{label ? <span className={styles.label}>{label}</span> : null}

			{inputType === "textAreaOnly" ? (
				<textarea
					{...(commonProps as any)}
					className={`${styles.input} ${styles.textarea}`}
					rows={rows}
					{...rest}
				/>
			) : (
				<input {...(commonProps as any)} type="text" {...rest} />
			)}
		</label>
	);
};

export default TextInput;
