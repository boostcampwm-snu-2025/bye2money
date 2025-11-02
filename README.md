# ✅ Wise Wallet 개발 체크리스트

## 🧩 프로젝트 세팅

- [x] Vite + React 초기 환경 구성
- [x] TailwindCSS 설치 및 설정
- [x] React Router DOM 설치
- [x] 프로젝트 alias(@) 설정
- [x] ESLint 기본 세팅 완료

---

## 🧠 상태 관리 (Context API)

- [x] TransactionContext 생성
- [x] TransactionProvider 구현
- [x] addTransaction / updateTransaction / deleteTransaction 작성
- [x] selectedTransaction 상태 관리 (수정 모드)
- [x] currentDate 상태 관리 및 월 변경 기능
- [x] useEffect로 날짜 변경 시 리스트 자동 갱신

---

## 💳 입력 폼 (TransactionInputRow)

- [x] 날짜 / 금액 / 내용 / 결제수단 / 분류 입력 구현
- [x] 수입(+) / 지출(-) 토글 버튼
- [x] 결제수단 추가 / 삭제 모달
- [x] 수입 / 지출 카테고리 구분
- [x] 입력 제한 (내용 32자)
- [x] 필수값 검증 (금액, 결제수단, 카테고리)
- [x] 수정 모드일 때 기존 데이터 자동 채움
- [x] 입력 후 필드 초기화
- [x] 폼 레이아웃 중앙 정렬 및 위치 조정 (flex, z-index)

---

## 📋 거래 내역 리스트 (TransactionList)

- [x] 거래 데이터 Context 연동
- [x] 월별 필터링
- [x] 일별 그룹화
- [x] 카테고리별 배경색 지정
- [x] 총 수입 / 총 지출 계산
- [x] 내역 클릭 시 수정 모드 진입
- [x] 삭제 버튼 구현
- [x] hover 효과 및 반응형 디자인 조정

---

## 🎨 레이아웃 및 디자인

- [x] Header 컴포넌트 고정 (position: fixed)
- [x] 로고 클릭 시 홈으로 이동
- [x] 월 이동 버튼 (‹ ›) 구현
- [x] 현재 월/연도/영문월명 표시
- [x] Home / Calendar / Statistics 아이콘 네비게이션
- [x] Header와 콘텐츠 겹침 해결 (pt-[200px])
- [x] HomePage를 Header보다 위에 띄우기 (`z-[60]`)
- [x] 리스트-입력창 간 z-index 및 margin 조정
- [x] 전체 레이아웃 1000px 중앙 정렬

---

## 💾 서버 (Express + SQLite3)

- [x] Express 서버 환경 구성 (`server.js`)
- [x] SQLite3 데이터베이스 초기 설정
- [x] DB 테이블 생성 (`transactions`)
- [x] CORS 설정
- [x] API 라우팅 `/api/transactions`
  - [x] GET (전체/월별)
  - [x] POST (추가)
  - [x] PUT (수정)
  - [x] DELETE (삭제)
- [x] axios 기반 클라이언트 연동
- [x] 서버 실행 스크립트 추가 (`npm run server`)

---

## 📊 통계 및 캘린더 페이지

- [x] CalendarPage 기본 구조 생성
- [x] StatisticsPage 기본 구조 생성
- [ ] 수입/지출 비율 그래프 추가 예정
- [ ] 날짜별 데이터 시각화 예정

---

## 🧱 파일 구조

- [x] `src/assets` (아이콘, 로고)
- [x] `src/components/Header.jsx`
- [x] `src/context/TransactionContext.js`
- [x] `src/context/TransactionProvider.jsx`
- [x] `src/features/home/HomePage.jsx`
- [x] `src/features/home/components/TransactionList.jsx`
- [x] `src/features/home/components/TransactionInputRow.jsx`
- [x] `src/features/calendar/CalendarPage.jsx`
- [x] `src/features/statistics/StatisticsPage.jsx`
- [x] `src/App.jsx`
- [x] `src/main.jsx`
- [x] `server/server.js`
- [x] `server/db.sqlite3`
