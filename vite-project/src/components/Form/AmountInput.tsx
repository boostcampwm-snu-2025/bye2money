import React from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 16px;
  border-right: 1px solid #e8e8e8;

  label {
    font-size: 12px;
    color: #666;
    font-weight: 500;
  }
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TypeToggleButton = styled.button`
  width: 28px;
  height: 28px;
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #666;
  padding: 0;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 4px;
  }
`;

const StyledInput = styled.input`
  border: none;
  padding: 8px 4px;
  font-size: 14px;
  background-color: transparent;
  min-width: 100px;
  text-align: right;
  outline: none;

  &::placeholder {
    color: #ccc;
  }
`;

interface AmountInputProps {
  transaction: "expense" | "income";
  amount: string;
  onTransactionToggle: () => void;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AmountInput({
  transaction,
  amount,
  onTransactionToggle,
  onAmountChange,
}: AmountInputProps) {
  return (
    <InputGroup>
      <label>금액</label>
      <AmountContainer>
        <TypeToggleButton type="button" onClick={onTransactionToggle}>
          {transaction === "expense" ? "-" : "+"}
        </TypeToggleButton>
        <StyledInput
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={amount}
          onChange={onAmountChange}
        />
      </AmountContainer>
    </InputGroup>
  );
}
