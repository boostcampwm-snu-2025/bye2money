import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { getTodayDateString } from "../../utils";
import CustomSelect from "./CustomSelect";

// --- (신규) 수입/지출 카테고리 데이터 ---
const expenseCategories = ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"];

const incomeCategories = ["월급", "용돈", "기타 수입"];

// --- 폼 스타일 (수정됨) ---
const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background-color: #fdfdfd;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 11px;
    color: #888;
    margin-left: 4px;
  }
`;
const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TypeToggleButton = styled.button`
  width: 32px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0; 
  display: flex;
  align-items: center;
  justify-content: center;

  
  &: hover {
    opacity: 0.8;
}
`;
//   /* 'transactionType' prop에 따라 동적으로 스타일 변경 */
//   color: ${(props) =>
//         props.transaction === "expense" ? "#E57373" : "#81C784"};
//   border-color: ${(props) =>
//         props.transaction === "expense" ? "#E57373" : "#81C784"};
//   background-color: white;

const StyledInput = styled.input`
border: none;
border - radius: 6px;
padding: 8px 10px;
font - size: 14px;
background - color: white;

  & [type = "text"] {
    width: 220px;
}
  &.amount - input {
    width: 130px;
    text - align: right;
}
  & [type = "date"] {
    width: 140px;
}
`;
const StyledCategorySelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  background-color: white;
  width: 150px;
`;

const SubmitButton = styled(Button)`
background-color: #333;
color: white;
width: 40px;
height: 40px;
padding: 0;
font - size: 18px;
border - radius: 6px;
`;


// --- NewTransactionForm 컴포넌트 ---
export default function Form() {
    const [transaction, setTransaction] = useState("expense");
    const [amount, setAmount] = useState("");
    const [content, setContent] = useState("");

    const todayDate = getTodayDateString();
    // 💡 (2) 결제수단 목록을 state로 관리
    const [paymentMethods, setPaymentMethods] = useState([
        "현대카드",
        "현금",
        "신한카드",
    ]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const handleTypeToggle = () => {
        setTransaction((prevTransaction) =>
            prevTransaction === "expense" ? "income" : "expense"
        );
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const cleanedValue = value.replace(/,/g, "");

        if (cleanedValue === "" || /^[0-9]+$/.test(cleanedValue)) {
            const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            setAmount(formattedValue);
        }
    };
    const MAX_CONTENT_LENGTH = 32;
    // 내용 글자수 제한 핸들러 (선택 사항)
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length <= MAX_CONTENT_LENGTH) {
            setContent(value); // content 상태가 있다면 업데이트
        }
    };

    // 💡 (4) CustomSelect에 전달할 핸들러 함수
    const handleAddPaymentMethod = (newMethod: string) => {
        setPaymentMethods([...paymentMethods, newMethod]);
    };

    const handleDeletePaymentMethod = (methodToDelete: string) => {
        setPaymentMethods(
            paymentMethods.filter((method) => method !== methodToDelete)
        );
        // 💡 만약 삭제된 항목이 현재 선택된 항목이라면, 선택 해제
        if (selectedPaymentMethod === methodToDelete) {
            setSelectedPaymentMethod("");
        }
    };
    return (
        <FormContainer>
            <InputGroup>
                <label>일자</label>
                <StyledInput type="date" defaultValue={todayDate} />
            </InputGroup>

            <InputGroup>
                <label>금액</label>
                <AmountContainer>
                    <TypeToggleButton
                        type="button"
                        onClick={handleTypeToggle}
                        transaction={transaction}
                    >
                        {transaction === "expense" ? "-" : "+"}
                    </TypeToggleButton>
                    <StyledInput
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        className="amount-input"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </AmountContainer>
            </InputGroup>

            <InputGroup>
                <LabelWrapper>
                    <label>내용</label>
                    <label>{content.length}/{MAX_CONTENT_LENGTH}</label>
                </LabelWrapper>
                <StyledInput type="text" value={content} onChange={handleContentChange} placeholder="내역을 입력하세요" />
            </InputGroup>

            {/* 💡 --- (4) 결제수단 그룹 수정 --- 💡 */}
            <InputGroup>
                <label>결제수단</label>
                {/* 기존 StyledSelect 대신 CustomSelect 컴포넌트 사용 */}
                <CustomSelect
                    options={paymentMethods}
                    selected={selectedPaymentMethod}
                    onChange={setSelectedPaymentMethod}
                    onAdd={handleAddPaymentMethod}
                    onDelete={handleDeletePaymentMethod}
                />
            </InputGroup>

            <InputGroup>
                <label>분류</label>
                <StyledCategorySelect>
                    {transaction === "expense"
                        ? expenseCategories.map((cat) => (
                            <option>{cat}</option>
                        ))
                        : incomeCategories.map((cat) => (
                            <option>{cat}</option>
                        ))}
                </StyledCategorySelect>
            </InputGroup>

            <SubmitButton type="submit" size="M">
                ✔
            </SubmitButton>
        </FormContainer>

    );
}