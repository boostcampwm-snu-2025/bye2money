# 🧩 Pull Request: 기본 구조 및 Header/Transactions 기능 구현 

## 📌 개요 (Overview)
React + Vite 기반으로 프로젝트 기본 구조를 구축하고,  
Header / Transactions 페이지의 핵심 기능을 구현했습니다.

**일반 CSS(`styles.css`)** 로 스타일링했습니다.  
연/월 상태를 Context API로 관리하며, SPA 라우팅 구조를 구성했습니다.

---
## 문제 해결 및 AI 사용
 
리엑트를 처음 사용하다보니 짧은 시간에 구현하기란 쉽지 않았습니다. 

헤더 부분의 구현을 먼저 해결하기 위해 다음과 같은프롬프트를 사용하였습니다.

- 온라인 가계부를 리엑트를 사용해서 제작할 것
- 헤더 부분부터 제작할 예정
- 헤더 부분은 ~ (기획서에 담긴 내용)~

이후 CSS를 만드는 부분에 대해서도 AI를 사용해가면서 완성

-----

## 🛠️ 주요 구현 내용 (Details)

### 🏗️ 프로젝트 구조
src/
├── components/Header/
├── context/
├── pages/
├── lib/
├── styles.css


### 🧠 기능별 구현
- **App.jsx**
  - React Router 기반 SPA 라우팅 구성
  - YearMonthProvider 전역 Context 적용

- **Header.jsx**
  - 상단 고정 헤더(sticky header)
  - 현재 월 표시 및 좌우 이동(`addMonth`)
  - 스크롤 시 그림자(elevated 상태)
  - 페이지 이동 탭(nav) 구성

- **Transactions.jsx**
  - Mock 데이터 기반 월별 내역 필터링(`sameYM`)
  - 수입/지출/총 건수 통계 표시
  - 카드형 UI 구성

- **YearMonthContext.jsx**
  - Context + useState로 연/월 전역 상태 관리

- **styles.css**
  - reset + 변수(theme color, border, radius 등)
  - header/card 레이아웃 + 반응형 CSS 정의

---

체크리스트

- [ ] 기본 라우팅
- [ ] 헤더 구현
- [ ] Year/Month
- [ ] Transaction
- [ ] CSS
- [ ] 달력 페이지 구현
- [ ] Stat 시각화


