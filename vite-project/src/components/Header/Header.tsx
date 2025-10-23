import React from "react";
import styled from "styled-components";
import Button from "./Button"; // 1번 파일에서 Button을 가져옴
import { getTodayYear, getTodayMonth, getTodayMonthName } from "../../utils";

// --- 헤더 스타일 ---
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 32px;
  background-color: #62626268;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  cursor: pointer;
  color: #333;
  font-family: 'Georgia', serif;
`;

const MonthNavigator = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const MonthDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 120px;

  .year {
    font-size: 13px;
    color: #999;
    font-weight: 400;
  }
  .month {
    font-size: 36px;
    font-weight: 300;
    color: #333;
    letter-spacing: -1px;
    line-height: 1;
  }
  .monthName {
    font-size: 14px;
    color: #666;
    font-weight: 400;
  }
`;

const NavIcons = styled.div`
  display: flex;
  gap: 12px;
`;

// --- AppHeader 컴포넌트 ---
export default function AppHeader() {
  return (
    <HeaderContainer>
      <Logo>Wise Wallet</Logo>

      <MonthNavigator>
        <Button type="ghost" pattern="iconOnly" size="L">
          ‹
        </Button>
        <MonthDisplay>
          <span className="year">{getTodayYear()}</span>
          <span className="month">{getTodayMonth()}</span>
          <span className="monthName">{getTodayMonthName()}</span>
        </MonthDisplay>
        <Button type="ghost" pattern="iconOnly" size="L">
          ›
        </Button>
      </MonthNavigator>

      <NavIcons>
        <Button type="ghost" pattern="iconOnly" size="M">
          📋
        </Button>
        <Button type="ghost" pattern="iconOnly" size="M">
          📅
        </Button>
        <Button type="ghost" pattern="iconOnly" size="M">
          📊
        </Button>
      </NavIcons>
    </HeaderContainer>
  );
}