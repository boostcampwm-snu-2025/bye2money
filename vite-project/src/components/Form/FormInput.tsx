import React from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 16px;
  border-right: 1px solid #e8e8e8;

  &:first-child {
    padding-left: 0;
  }

  label {
    font-size: 12px;
    color: #666;
    font-weight: 500;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  border: none;
  padding: 8px 4px;
  font-size: 14px;
  background-color: transparent;
  outline: none;

  &[type="text"] {
    min-width: 180px;
  }
  &[type="date"] {
    min-width: 120px;
  }

  &::placeholder {
    color: #ccc;
  }
`;

interface FormInputProps {
  label: string;
  type?: "text" | "date";
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  showCharCount?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  value,
  placeholder,
  defaultValue,
  onChange,
  maxLength,
  showCharCount = false,
}: FormInputProps) {
  const currentLength = value?.length || 0;

  return (
    <InputGroup>
      {showCharCount && maxLength ? (
        <LabelWrapper>
          <label>{label}</label>
          <label>
            {currentLength}/{maxLength}
          </label>
        </LabelWrapper>
      ) : (
        <label>{label}</label>
      )}
      <StyledInput
        type={type}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </InputGroup>
  );
}
