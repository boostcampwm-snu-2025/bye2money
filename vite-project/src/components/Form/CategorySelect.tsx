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

const StyledCategorySelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  background-color: white;
  width: 150px;
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
