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
  border-radius: 8px; /* 기본 둥글기 */
  padding: 8px 12px;
  font-size: 16px;
  font-weight: bold;

  /* 'type' prop에 따른 스타일 (Ghost 타입) */
  ${(props) =>
        props.type === "ghost" &&
        `
    &:hover {
      background-color: #f0f0f0; /* 마우스 올리면 살짝 배경 */
    }
  `}

  /* 'pattern' prop에 따른 스타일 (IconOnly 타입) */
  ${(props) =>
        props.pattern === "iconOnly" &&
        `
    border-radius: 50%; /* 원형 버튼 */
    width: 44px;
    height: 44px;
    padding: 0;
    font-size: 20px; /* 아이콘 크기 키우기 */
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