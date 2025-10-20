# 프로젝트 디렉토리 구조

```
bye2money/
├── .github/
│   └── pull_request_template.md
├── README.md
├── dirTree.md
└── budgetManager/
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── assets/
    │   │   └── fonts/
    │   │       └── ChosunNm.ttf
    │   ├── components/
    │   │   ├── InputBar.tsx
    │   │   └── layout/
    │   │       └── Header.tsx
    │   ├── icons/
    │   │   ├── calendar.svg
    │   │   ├── chart.svg
    │   │   ├── check.svg
    │   │   ├── checkbox.svg
    │   │   ├── chevron-down.svg
    │   │   ├── chevron-left.svg
    │   │   ├── chevron-right.svg
    │   │   ├── chevron-up.svg
    │   │   ├── closed.svg
    │   │   ├── doc.svg
    │   │   ├── minus.svg
    │   │   ├── plus.svg
    │   │   └── uncheckbox.svg
    │   ├── pages/
    │   │   └── MainPage.tsx
    │   └── styles/
    │       ├── globals.css
    │       ├── components/
    │       │   └── Header.css
    │       ├── pages/
    │       │   └── MainPage.css
    │       └── themes/
    │           ├── colors.css
    │           ├── spacing.css
    │           └── typography.css
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## 주요 폴더 설명

### 📁 **budgetManager/**
메인 React 애플리케이션 폴더

### 📁 **src/**
소스 코드 폴더
- **App.tsx**: 메인 앱 컴포넌트
- **main.tsx**: 애플리케이션 진입점

### 📁 **src/components/**
React 컴포넌트들
- **InputBar.tsx**: 입력 바 컴포넌트
- **layout/Header.tsx**: 헤더 레이아웃 컴포넌트 (날짜 네비게이션 기능 포함)

### 📁 **src/pages/**
페이지 컴포넌트들
- **MainPage.tsx**: 메인 페이지 컴포넌트

### 📁 **src/styles/**
스타일시트 폴더
- **globals.css**: 전역 스타일 (테마 변수 import 포함)
- **components/**: 컴포넌트별 스타일
- **pages/**: 페이지별 스타일
- **themes/**: 디자인 시스템 테마 (색상, 간격, 타이포그래피)

### 📁 **src/icons/**
SVG 아이콘 파일들
- 네비게이션 아이콘 (chevron-left, chevron-right)
- UI 아이콘 (calendar, chart, doc 등)

### 📁 **src/assets/fonts/**
폰트 파일들
- **ChosunNm.ttf**: 커스텀 폰트 파일

### 📁 **public/**
정적 파일들
- **vite.svg**: Vite 로고

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **CSS Variables** (디자인 시스템)
- **SVG Icons** (벡터 아이콘)
- **Custom Fonts** (ChosunNm)

## 주요 기능

- ✅ **헤더 컴포넌트**: 날짜 네비게이션 기능 (useState 활용)
- ✅ **디자인 시스템**: 색상, 간격, 타이포그래피 변수 관리
- ✅ **반응형 레이아웃**: CSS Grid/Flexbox 활용
- ✅ **커스텀 폰트**: ChosunNm 폰트 적용
