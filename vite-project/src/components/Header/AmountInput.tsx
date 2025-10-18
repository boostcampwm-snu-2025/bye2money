import React from "react";
import styled from "styled-components";

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
  background-color: transparent;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  background-color: white;
  width: 130px;
  text-align: right;
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
