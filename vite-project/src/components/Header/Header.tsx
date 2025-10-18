import React from "react";
import styled from "styled-components";
import Button from "./Button"; // 1번 파일에서 Button을 가져옴
import { getTodayYear, getTodayMonth, getTodayMonthName } from "../../utils";

// --- 헤더 스타일 ---
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between; /* 좌, 중, 우 3단 분리 */
  align-items: center;
  width: 100%;
  padding: 12px 24px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-size: 22px;
  margin: 0;
  cursor: pointer;
`;

const MonthNavigator = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MonthDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .year {
    font-size: 12px;
    color: #999;
  }
  .month {
    font-size: 20px;
    font-weight: bold;
  }
`;

const NavIcons = styled.div`
  display: flex;
  gap: 8px;
`;

// --- AppHeader 컴포넌트 ---
export default function AppHeader() {
  return (
    <HeaderContainer>
      <Logo>Wise Wallet</Logo>

      <MonthNavigator>
        <Button type="ghost" pattern="iconOnly" size="M">
          ⬅️
        </Button>
        <MonthDisplay>
          <span className="year">{getTodayYear()}</span>
          <span className="month">{getTodayMonth()} {getTodayMonthName()}</span>
        </MonthDisplay>
        <Button type="ghost" pattern="iconOnly" size="M">
          ➡️
        </Button>
      </MonthNavigator>

      <NavIcons>
        <Button type="ghost" pattern="iconOnly" size="M">
          📄
        </Button>
        <Button type="ghost" pattern="iconOnly" size="M">
          📊
        </Button>
      </NavIcons>
    </HeaderContainer>
  );
}