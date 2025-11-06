import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Button from "../../Header/Button";
import { getTodayDateString, areTransactionsEqual } from "../../../utils";
import CustomSelect from "./CustomSelect";
import FormInput from "./FormInput";
import AmountInput from "./AmountInput";
import CategorySelect from "./CategorySelect";

import { TransactionContext } from '../../../contexts/TransactionContext';

// --- Category data ---
const CATEGORIES = {
    expense: ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"],
    income: ["월급", "용돈", "기타 수입"],
};

const MAX_CONTENT_LENGTH = 32;

// Helper function to format number with commas
const formatAmount = (amount: number): string => {
    return amount.toLocaleString('ko-KR');
};

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
    const [formData, setFormData] = useState({
        type: "expense" as "expense" | "income",
        date: getTodayDateString(),
        amount: "",
        content: "",
        paymentMethod: "",
        category: "",
    });

    const [paymentMethods, setPaymentMethods] = useState([
        "현대카드",
        "현금",
        "신한카드",
    ]);

    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('Form must be used within TransactionContext.Provider');
    }
    const { dispatch, editingItem, setEditingItem } = context;

    // Populate form when editingItem changes
    useEffect(() => {
        if (editingItem) {
            setFormData({
                type: editingItem.type,
                date: editingItem.date,
                amount: formatAmount(Math.abs(editingItem.amount)),
                content: editingItem.content,
                paymentMethod: editingItem.paymentMethod,
                category: editingItem.category,
            });
        }
    }, [editingItem]);

    // Check if form data is different from editing item
    const hasChanges = editingItem ? !areTransactionsEqual(
        editingItem,
        {
            type: formData.type,
            date: formData.date,
            amount: formData.type === "income"
                ? parseFloat(formData.amount.replace(/,/g, ""))
                : -parseFloat(formData.amount.replace(/,/g, "")),
            content: formData.content,
            paymentMethod: formData.paymentMethod,
            category: formData.category
        }
    ) : true; // Always allow add items

    const isButtonDisabled =
        formData.amount.trim() === "" ||
        formData.content.trim() === "" ||
        formData.paymentMethod.trim() === "" ||
        formData.category.trim() === "" ||
        !hasChanges; // Disable if editing and nothing changed

    // Unified change handler
    const handleChange = (field: keyof typeof formData) => (//args from keys of formData
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { value } = e.target;

        // Special handling for amount field (format with commas)
        if (field === "amount") {
            const cleanedValue = value.replace(/,/g, "");
            if (cleanedValue === "" || /^[0-9]+$/.test(cleanedValue)) {
                const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setFormData(prev => ({ ...prev, amount: formattedValue }));
            }
            return;
        }

        // Special handling for content field (max length check)
        if (field === "content" && value.length > MAX_CONTENT_LENGTH) {
            return;
        }
        // general set function for arbitrary fields
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTypeToggle = () => {
        setFormData(prev => ({
            ...prev,
            type: prev.type === "expense" ? "income" : "expense"
        }));
    };

    const handleAddPaymentMethod = (newMethod: string) => {
        setPaymentMethods([...paymentMethods, newMethod]);
    };
    const handleDeletePaymentMethod = (methodToDelete: string) => {
        setPaymentMethods(paymentMethods.filter((method) => method !== methodToDelete));
        if (formData.paymentMethod === methodToDelete) {
            setFormData(prev => ({ ...prev, paymentMethod: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert amount from string (with commas) to number
        const numericAmount = parseFloat(formData.amount.replace(/,/g, ""));
        const finalAmount = formData.type === "income" ? numericAmount : -numericAmount;

        const newItem = {
            date: formData.date,
            amount: finalAmount,
            content: formData.content,
            paymentMethod: formData.paymentMethod,
            category: formData.category,
            type: formData.type,
        };

        if (editingItem) {
            // Update mode
            dispatch({
                type: 'UPDATE_ITEM',
                payload: {
                    oldItem: editingItem,
                    newItem
                }
            });
            setEditingItem(null);   //turn off edit state
        } else {
            // Add mode
            dispatch({ type: 'ADD_ITEM', payload: newItem });
        }

        // Reset form
        setFormData({
            type: "expense",
            date: getTodayDateString(),
            amount: "",
            content: "",
            paymentMethod: "",
            category: "",
        });
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormInput
                label="일자"
                type="date"
                value={formData.date}
                onChange={handleChange("date")}
            />

            <AmountInput
                transaction={formData.type}
                amount={formData.amount}
                onTransactionToggle={handleTypeToggle}
                onAmountChange={handleChange("amount")}
            />

            <FormInput
                label="내용"
                value={formData.content}
                onChange={handleChange("content")}
                placeholder="내역을 입력하세요"
                maxLength={MAX_CONTENT_LENGTH}
                showCharCount={true}
            />

            <InputGroup>
                <label>결제수단</label>
                <CustomSelect
                    options={paymentMethods}
                    selected={formData.paymentMethod}
                    onChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    onAdd={handleAddPaymentMethod}
                    onDelete={handleDeletePaymentMethod}
                />
            </InputGroup>

            <CategorySelect
                transaction={formData.type}
                categories={CATEGORIES}
                value={formData.category}
                onChange={handleChange("category")}
                placeholder="선택하세요"
            />

            <SubmitButton type="submit" disabled={isButtonDisabled} size="M" pattern="iconOnly">
                ✔
            </SubmitButton>
        </FormContainer>
    );
}