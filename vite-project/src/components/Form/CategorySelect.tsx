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

const StyledCategorySelect = styled.select`
  border: none;
  padding: 8px 4px;
  font-size: 14px;
  background-color: transparent;
  min-width: 100px;
  outline: none;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface CategorySelectProps {
  transaction: "expense" | "income";
  categories: {
    expense: string[];
    income: string[];
  };
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategorySelect({
  transaction,
  categories,
  value,
  onChange,
}: CategorySelectProps) {
  const currentCategories =
    transaction === "expense" ? categories.expense : categories.income;

  return (
    <InputGroup>
      <label>분류</label>
      <StyledCategorySelect value={value} onChange={onChange}>
        {currentCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </StyledCategorySelect>
    </InputGroup>
  );
}
