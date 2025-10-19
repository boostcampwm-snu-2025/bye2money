# bye2money

## Blueprint

### Tech Stack

Vite + React + Typescript + Tailwind CSS + Zustand

### Structure

```bash
src/
├── App.css -> Import tailwind and define some common configurations.
├── App.tsx
├── assets -> Static assets.
├── components -> Shared components (Button, Text Input, Check Box, Category Tag, Modal)
├── main.tsx -> Entry point.
├── pages -> Main, Calendar, Graph pages.
├── store -> Zustand store for state management.
├── themes -> Tailwind themes corresponding to design system.
└── types -> Type definitions.
```

## To Do

- [x] 프로젝트 구조 Init.
- [x] 정적 Asset 적재
- [x] 디자인 Foundation 에 맞는 Tailwind Theme 구현
- [x] 소비 내역 Type 설계
- 공통 컴포넌트 구현
  - [x] Button
  - [x] Text Input
  - [x] Check Box
  - [x] Category Tag
  - [x] Modal
- [x] Zustand store 구현
- 페이지 공통 헤더 구현
  - [x] 로고
  - [x] 연월 표시 및 변경
  - [x] 페이지간 이동
- 페이지 구현
  - 메인 페이지
    - [x] 신규 지출 내역 입력
    - [x] 수입 지출 내역 목록
    - [x] 월 합계 상단 바
    - [x] 일별 지출 내역
    - [x] 개별 지출 내역
  - 달력 페이지
    - [ ] 달력 레이아웃
    - [ ] 일별 소비 합계 내역 표시
    - [ ] 하단 월 요약바
  - 통계 페이지
    - [ ] 도넛 그래프
    - [ ] 해당월 지출금액 차트
    - [ ] 카테고리 소비 변동 추이 그래프
    - [ ] 카테고리 소비 내역 리스트
