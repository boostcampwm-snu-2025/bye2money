import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
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

const SubmitButton = styled(Button)`
  background-color: #333;
  color: white;
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 18px;
  border-radius: 6px;
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

            <SubmitButton type="submit" size="M">
                ✔
            </SubmitButton>
        </FormContainer>
    );
}