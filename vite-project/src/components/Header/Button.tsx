import React from "react";
import styled from "styled-components";

// 스타일만 가진 버튼 (이 파일 안에서만 사용)
const StyledButton = styled.button`
  /* 'Button' 컴포넌트의 기본 스타일 */
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  /* 'type' prop에 따른 스타일 (Ghost 타입) */
  ${(props) =>
    props.type === "ghost" &&
    `
    background-color: transparent;
    border: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `}

  /* 'pattern' prop에 따른 스타일 (IconOnly 타입) */
  ${(props) =>
    props.pattern === "iconOnly" &&
    `
    border-radius: 8px;
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 18px;
  `}

  /* 'size' prop에 따른 스타일 (Large 타입) */
  ${(props) =>
    props.size === "L" &&
    `
    width: 48px;
    height: 48px;
    font-size: 28px;
  `}
`;

// 외부에서 import해서 사용할 Button 컴포넌트
const Button = ({ type, pattern, size, children, ...rest }) => {
  return (
    <StyledButton type={type} pattern={pattern} size={size} {...rest}>
      {children}
    </StyledButton>
  );
};

// Button 컴포넌트를 기본(default)으로 내보내기
export default Button;