# Wise Wallet

가계부 관리 웹 애플리케이션입니다.

## 기술 스택

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** - 스타일링
- **Context API + useReducer** - 상태 관리
- **LocalStorage** - 데이터 영속성

## 주요 기능

### ✅ 구현 완료

#### 1. 메인 화면 (리스트 뷰)
- **헤더**
  - 로고 (Wise Wallet)
  - 연/월 표시 및 이동 (이전/다음 달)
  - 탭 메뉴 (내역/달력/통계)
- **입력 바 (EntryBar)**
  - 일자 선택 (달력 아이콘)
  - 금액 입력 (+/- 토글)
  - 내용 (메모) 입력
  - 결제수단 선택 및 관리
  - 분류 선택
  - 등록/수정 기능
- **리스트 뷰**
  - 날짜별 그룹핑
  - 수입/지출 필터 (체크박스)
  - 카테고리 색상 박스
  - 트랜잭션 정보 표시 (카테고리, 내용, 결제수단, 금액)
  - 편집/삭제 기능
  - 일별 합계 표시

#### 2. 달력 뷰
- 월별 달력 그리드
- 날짜별 수입/지출/합계 표시
  - 수입: 연한 파란색
  - 지출: 빨간색
  - 합계: 검정색
- 오늘 날짜 배경색 하이라이트
- 월별 총합 표시 (총 수입/총 지출/총합)

### 🚧 구현 예정

#### 3. 통계 뷰
- 월별 통계 차트
- 카테고리별 지출 분석

## 프로젝트 구조

```
src/
├── components/          # 공통 컴포넌트
│   ├── Header.tsx       # 헤더 (로고, 날짜 네비게이션, 탭)
│   ├── Modal.tsx        # 모달 컴포넌트
│   └── PaymentMethodSelect.tsx  # 결제수단 선택 드롭다운
├── features/
│   └── ledger/
│       ├── EntryBar.tsx      # 입력 바
│       ├── ListView.tsx      # 리스트 뷰
│       └── CalendarView.tsx  # 달력 뷰
├── stores/
│   └── ledger-store.tsx     # 전역 상태 관리 (Context + Reducer)
├── lib/                     # 유틸리티 함수
│   ├── date.ts            # 날짜 관련 함수
│   └── format.ts           # 포맷팅 함수
└── types/
    └── ledger.ts           # TypeScript 타입 정의
```

## 개발 가이드

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 주요 컴포넌트 설명

- **EntryBar**: 트랜잭션 등록/수정을 위한 입력 폼
- **ListView**: 날짜별로 그룹핑된 트랜잭션 리스트
- **CalendarView**: 달력 형태의 트랜잭션 통계 뷰
- **PaymentMethodSelect**: 결제수단 선택 및 관리 드롭다운

### 상태 관리

- `LedgerProvider`: 전역 상태 관리 컨텍스트
- `useLedger`: 상태 및 dispatch 함수를 반환하는 훅
- LocalStorage에 자동 저장 (200ms 디바운스)

### 스타일링

- Tailwind CSS 사용
- 커스텀 타이포그래피 클래스:
  - `body-12`, `body-14`, `body-16`: Pretendard Variable Light
  - `title-sb-12`, `title-sb-14`, `title-sb-16`: Pretendard Variable Semibold
- 폰트: Pretendard Variable, ChosunNm, Chosunilbo_myungjo

## 참고사항

- 데이터는 브라우저의 LocalStorage에 저장됩니다.
- 초기 데이터는 `/public/data/seed.json`에서 로드됩니다.
