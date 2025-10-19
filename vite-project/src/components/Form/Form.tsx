import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Header/Button";
import { getTodayDateString } from "../../utils";
import CustomSelect from "./CustomSelect";
import FormInput from "./FormInput";
import AmountInput from "./AmountInput";
import CategorySelect from "./CategorySelect";

// --- Category data ---
const CATEGORIES = {
    expense: ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"],
    income: ["월급", "용돈", "기타 수입"],
};

const MAX_CONTENT_LENGTH = 32;

// --- Form styles ---
const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 16px 24px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 16px;
  border-right: 1px solid #e8e8e8;

  &:first-child {
    padding-left: 0;
  }

  &:last-of-type {
    border-right: none;
  }

  label {
    font-size: 12px;
    color: #666;
    font-weight: 500;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #000;
  color: white;
  width: 48px;
  height: 48px;
  padding: 0;
  font-size: 20px;
  border-radius: 50%;
  margin-left: 16px;
  flex-shrink: 0;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;


// --- Form Component ---
export default function Form() {
    const [transaction, setTransaction] = useState<"expense" | "income">("expense");
    const [amount, setAmount] = useState("");
    const [content, setContent] = useState("");
    const [paymentMethods, setPaymentMethods] = useState([
        "현대카드",
        "현금",
        "신한카드",
    ]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    const isButtonDisabled = amount.trim() === "" || content.trim() === "" || selectedPaymentMethod.trim() === "";
    const todayDate = getTodayDateString();


    const handleTypeToggle = () => {
        setTransaction((prev) => (prev === "expense" ? "income" : "expense"));
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const cleanedValue = value.replace(/,/g, "");

        if (cleanedValue === "" || /^[0-9]+$/.test(cleanedValue)) {
            const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            setAmount(formattedValue);
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length <= MAX_CONTENT_LENGTH) {
            setContent(value);
        }
    };

    const handleAddPaymentMethod = (newMethod: string) => {
        setPaymentMethods([...paymentMethods, newMethod]);
    };

    const handleDeletePaymentMethod = (methodToDelete: string) => {
        setPaymentMethods(
            paymentMethods.filter((method) => method !== methodToDelete)
        );
        if (selectedPaymentMethod === methodToDelete) {
            setSelectedPaymentMethod("");
        }
    };
    return (
        <FormContainer>
            <FormInput label="일자" type="date" defaultValue={todayDate} />

            <AmountInput
                transaction={transaction}
                amount={amount}
                onTransactionToggle={handleTypeToggle}
                onAmountChange={handleAmountChange}
            />

            <FormInput
                label="내용"
                value={content}
                onChange={handleContentChange}
                placeholder="내역을 입력하세요"
                maxLength={MAX_CONTENT_LENGTH}
                showCharCount={true}
            />

            <InputGroup>
                <label>결제수단</label>
                <CustomSelect
                    options={paymentMethods}
                    selected={selectedPaymentMethod}
                    onChange={setSelectedPaymentMethod}
                    onAdd={handleAddPaymentMethod}
                    onDelete={handleDeletePaymentMethod}
                />
            </InputGroup>

            <CategorySelect transaction={transaction} categories={CATEGORIES} />

            <SubmitButton type="submit" disabled={isButtonDisabled} size="M">
                ✔
            </SubmitButton>
        </FormContainer>
    );
}