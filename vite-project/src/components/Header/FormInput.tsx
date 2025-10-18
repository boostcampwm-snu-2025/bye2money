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

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  background-color: white;

  &[type="text"] {
    width: 220px;
  }
  &[type="date"] {
    width: 140px;
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
