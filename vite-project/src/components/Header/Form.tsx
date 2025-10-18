import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button"; // 1번 파일에서 Button을 가져옴

// --- 폼 스타일 ---
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

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  background-color: white;

  &[type="text"] {
    width: 220px;
  }
  &[type="number"] {
    width: 130px;
  }
  &[type="date"] {
    width: 140px;
  }
`;

const StyledSelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  background-color: white;
  width: 150px;
`;

const ToggleGroup = styled.div`
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1px;
`;

const ToggleButton = styled.button`
  padding: 8px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#333" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-left: none;
  }
`;

// Button을 확장(wrapping)해서 SubmitButton을 만듦
const SubmitButton = styled(Button)`
  background-color: #333;
  color: white;
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 18px;
  border-radius: 6px;
`;

// --- NewTransactionForm 컴포넌트 ---
export default function Form() {
    const [type, setType] = useState("expense");

    return (
        <FormContainer>
            <InputGroup>
                <label>날짜</label>
                <StyledInput type="date" defaultValue="2023-08-17" />
            </InputGroup>

            <InputGroup>
                <label>분류</label>
                <StyledSelect>
                    <option value="월급">월급</option>
                    <option value="식비">식비</option>
                </StyledSelect>
            </InputGroup>

            <InputGroup>
                <label>내용</label>
                <StyledInput type="text" placeholder="내역을 입력하세요" />
            </InputGroup>

            <InputGroup>
                <label>결제수단</label>
                <StyledSelect>
                    <option value="">선택하세요</option>
                    <option value="현대카드">현대카드</option>
                </StyledSelect>
            </InputGroup>

            <InputGroup>
                <label>금액</label>
                <StyledInput type="number" placeholder="0" />
            </InputGroup>

            <ToggleGroup>
                <ToggleButton
                    type="button"
                    active={type === "income"}
                    onClick={() => setType("income")}
                >
                    수입
                </ToggleButton>
                <ToggleButton
                    type="button"
                    active={type === "expense"}
                    onClick={() => setType("expense")}
                >
                    지출
                </ToggleButton>
            </ToggleGroup>

            <SubmitButton type="submit" size="M">
                ✔
            </SubmitButton>
        </FormContainer>
    );
}