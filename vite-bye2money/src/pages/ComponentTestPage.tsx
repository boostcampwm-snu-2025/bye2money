import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import CheckBox from "../components/CheckBox/Checkbox";
import CategoryTag from "../components/CategoryTag/CategoryTag";
import Modal from "../components/Modal/Modal";

const ComponentTestPage = () => {
	const [open, setOpen] = useState<boolean>(false); // for Modal open
	const [payMethod, setPayMethod] = useState<string>(""); // for Modal placeholder
	const [selected, setSelected] = useState<boolean>(false); // for Checkbox

	return (
		<div style={{ padding: 24, display: "grid", gap: 24 }}>
			<header style={{ display: "flex", justifyContent: "space-between" }}>
				<h1 style={{ margin: 0 }}>Component Test</h1>
				<Link to="/">홈으로</Link>
			</header>

			{/* Button */}
			<section>
				<h2>Button</h2>
				<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
					<Button>Ghost</Button>
					<Button buttonType="outline">Outline</Button>
					<Button buttonType="contained">Contained</Button>
					<Button selected>Selected</Button>
					<Button disabled>Disabled</Button>
					<Button onClick={() => setOpen(true)} buttonType="outline">
						모달 열기
					</Button>
				</div>
			</section>

			{/* TextInput */}
			<section>
				<h2>TextInput</h2>
				<div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
					<TextInput placeholder="placeholder" />
					<TextInput error placeholder="error state" />
					<TextInput disabled placeholder="disabled" />
					<TextInput
						inputType="textAreaOnly"
						rows={5}
						placeholder="textarea only"
					/>
				</div>
			</section>

			{/* CheckBox */}
			<section>
				<h2>CheckBox</h2>
				<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
					<CheckBox label="Default" />
					<CheckBox label="Selected" selected />
				</div>
			</section>

			{/* CategoryTag */}
			<section>
				<h2>CategoryTag</h2>
				<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
					<CategoryTag tone="life">생활</CategoryTag>
					<CategoryTag tone="shopping_beauty">쇼핑/뷰티</CategoryTag>
					<CategoryTag tone="medical_health">의료/건강</CategoryTag>
					<CategoryTag tone="food">식비</CategoryTag>
					<CategoryTag tone="transportation">교통</CategoryTag>
					<CategoryTag tone="culture_leisure">문화/여가</CategoryTag>
					<CategoryTag tone="salary">월급</CategoryTag>
					<CategoryTag tone="other_income">기타 수입</CategoryTag>
					<CategoryTag tone="allowance">용돈</CategoryTag>
					<CategoryTag tone="unclassified">미분류</CategoryTag>
				</div>
			</section>

			{/* Modal */}
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				onConfirm={() => {
					console.log("confirm:", payMethod);
					setOpen(false);
				}}
				title="추가하실 결제 수단을 적어주세요."
			>
				<TextInput
					placeholder="placeholder"
					value={payMethod}
					onValueChange={setPayMethod}
				/>
			</Modal>
		</div>
	);
};

export default ComponentTestPage;
