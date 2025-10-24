import { useState, useMemo } from "react";
import styles from "./InputBar.module.css";

import { ExpandMore, CheckRounded } from "@mui/icons-material";

import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

import PaymentSelectPanel from "../PaymentSelectPanel/PaymentSelectPanel";

import { CATEGORY_TAG_LABELS } from "../../components/CategoryTag/const";
import type { CategoryTagTone } from "../../types/types";

export interface InputBarProps {
	date: string;
	amount?: number;
	maxContentLen?: number;
	content?: string;
	onSubmit?: (v: {
		date: string;
		amount: number;
		content: string;
		payment: string | null;
		category: string | null;
	}) => void;
}

const InputBar = ({
	date,
	amount = 0,
	content = "",
	maxContentLen = 32,
	onSubmit,
}: InputBarProps) => {
	const [inputYear, setInputYear] = useState(
		() => Number(date.slice(0, 4)) || 2025
	);
	const [inputMonth, setInputMonth] = useState(
		() => Number(date.slice(5, 7)) || 1
	);
	const [inputDay, setInputDay] = useState(
		() => Number(date.slice(8, 10)) || 1
	);

	const [isExpense, setIsExpense] = useState(amount <= 0);
	const [absAmount, setAbsAmount] = useState(Math.abs(amount) || 0);
	const [text, setText] = useState(content);
	const [payment, setPayment] = useState<string | null>(null);
	const [category, setCategory] = useState<CategoryTagTone | null>(null);

	const to2 = (n: number) => String(n).padStart(2, "0");

	const signedAmount = useMemo(
		() => (isExpense ? -absAmount : absAmount),
		[isExpense, absAmount]
	);

	const canSubmit = useMemo(
		() =>
			(absAmount ?? 0) > 0 && text.trim().length > 0 && !!payment && !!category,
		[absAmount, text, payment, category]
	);

	const handleSubmit = () => {
		// Check if entered YYMMDD is valid.
		// Ignore if invalid date is entered.

		if (
			!(inputYear >= 2000 && inputYear <= 2025) ||
			!(inputMonth >= 1 && inputMonth <= 12) ||
			!(inputDay >= 1 && inputDay <= 24) //
		) {
			// Invalid date
			return;
		}

		const validDate = `${inputYear}-${to2(inputMonth)}-${to2(inputDay)}`;

		onSubmit?.({
			date: validDate,
			amount: signedAmount,
			content: text.trim(),
			payment,
			category,
		});
	};

	return (
		<div className={styles.bar} role="group" aria-label="새 지출/수입 입력">
			{/* 날짜 */}
			<div className={styles.cellDate}>
				<div className={styles.label}>일자</div>
				<div className={styles.dateInputs}>
					<div className={styles.dateField}>
						<TextInput
							inputType="default"
							aria-label="년"
							inputMode="numeric"
							placeholder="YYYY"
							value={String(inputYear || "")}
							maxLength={4}
							onValueChange={(v) => {
								const n = Number((v ?? "").replace(/[^0-9]/g, ""));
								if (Number.isNaN(n)) return;
								setInputYear(n);
							}}
							textAlign="center"
						/>
					</div>
					<span className={styles.dot}>.</span>

					<div className={styles.dateFieldNarrow}>
						<TextInput
							inputType="default"
							aria-label="월"
							inputMode="numeric"
							placeholder="MM"
							value={String(inputMonth || "")}
							maxLength={2}
							onValueChange={(v) => {
								const n = Number((v ?? "").replace(/[^0-9]/g, ""));
								if (Number.isNaN(n)) return;
								setInputMonth(n);
							}}
							textAlign="center"
						/>
					</div>
					<span className={styles.dot}>.</span>

					<div className={styles.dateFieldNarrow}>
						<TextInput
							inputType="default"
							aria-label="일"
							inputMode="numeric"
							placeholder="DD"
							value={String(inputDay || "")}
							maxLength={2}
							onValueChange={(v) => {
								const n = Number((v ?? "").replace(/[^0-9]/g, ""));
								if (Number.isNaN(n)) return;
								setInputDay(n);
							}}
							textAlign="center"
						/>
					</div>
				</div>
			</div>

			<div className={styles.vrule} aria-hidden />

			{/* 금액 */}
			<div className={styles.cellAmount}>
				<div className={styles.label}>금액</div>
				<div className={styles.amountBox}>
					<Button
						elementPattern="textOnly"
						size="S"
						buttonType="ghost"
						tone={isExpense ? "default" : "default"}
						fixedWidth={16}
						flexType="fixed"
						onClick={() => setIsExpense((v) => !v)}
					>
						{isExpense ? "−" : "+"}
					</Button>

					<div className={styles.textInputWrap}>
						<TextInput
							inputType="default"
							placeholder="0"
							inputMode="numeric"
							disabled={false}
							aria-label="금액"
							value={absAmount === 0 ? "" : String(absAmount)}
							onValueChange={(next) => {
								const raw = (next ?? "").replace(/[^0-9]/g, "");
								setAbsAmount(raw ? Number(raw) : 0);
							}}
							textAlign="right"
						/>
					</div>

					<span className={styles.won}>원</span>
				</div>
			</div>

			<div className={styles.vrule} aria-hidden />

			{/* 내용 */}
			<div className={styles.cellContent}>
				<div className={styles.labelRow}>
					<div className={styles.label}>내용</div>
					<div className={styles.counter}>
						{text.length}/{maxContentLen}
					</div>
				</div>
				<div className={styles.textInputWrap}>
					<TextInput
						inputType="default"
						placeholder="입력하세요"
						disabled={false}
						aria-label="내용"
						value={text}
						maxLength={maxContentLen}
						onValueChange={(v) => setText(v)}
					/>
				</div>
			</div>

			<div className={styles.vrule} aria-hidden />

			{/* 결제수단 */}
			<div className={styles.cellSelect}>
				<div className={styles.label}>결제수단</div>
				<div className={styles.selectLike}>
					<PaymentSelectPanel
						value={payment ?? undefined}
						onChange={(v) => setPayment(v)}
					/>
				</div>
			</div>

			<div className={styles.vrule} aria-hidden />

			{/* 분류 */}
			<div className={styles.cellSelect}>
				<div className={styles.label}>분류</div>
				<div className={styles.selectLike}>
					<select
						aria-label="분류"
						className={styles.select}
						value={category ?? ""}
						onChange={(e) =>
							setCategory(((e.target.value || null) as CategoryTagTone) || null)
						}
					>
						<option className={styles.dropDownPlaceholder} value="" disabled>
							선택하세요
						</option>
						{Object.entries(CATEGORY_TAG_LABELS).map(([key, label]) => (
							<option key={key} value={key}>
								{label}
							</option>
						))}
					</select>
					<ExpandMore className={styles.chevron} />
				</div>
			</div>

			<div className={styles.cellSubmit}>
				<Button
					buttonType="contained"
					elementPattern="iconOnly"
					size="M"
					icon={<CheckRounded />}
					tone="default"
					aria-label="입력 완료"
					onClick={handleSubmit}
					disabled={!canSubmit}
				/>
			</div>
		</div>
	);
};

export default InputBar;
