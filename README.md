# 1주차 체크리스트
## 0. 프로젝트 개발 환경 설정
- [x] vite기반 React 개발환경 구현
- [ ] React 컴포넌트가 뭔지(...) 이해부터 하기ㅠㅜ
- [ ] tailwindcss 등의 디자인 요소 적용
- [ ] Figma의 기획서, 디자인, 컴포넌트를 참고하여 개발 구현 요소 정하기

## 1. 구현해야 하는 공통 컴포넌트 확인 (컴포넌트 문서 확인하여 구현)
- [ ] Button
- [ ] Text input
- [ ] modal
- [ ] checkbox
- [ ] category tag
어떻게, 어떤 기능을 구현할지는 구현하면서 생각해봅시다...

## 2. 메인화면 구현 (정적 영역 우선 구현)
### Header 영역
- [ ] 로고 영역, 월 영역, 기타 버튼영역 구분 (디자인은 padding 먹이고 등간격으로 띄우는 방식으로 하면 될 것 같음)
- [ ] Button, Text input, modal 컴포넌트 구현하여 필요한 부분에 동적 구현 완성
- 1. 좌/우 화살표 버튼을 눌렀을 때 월이 자동으로 이동되도록 구현
- 2. 로고 누르면 메인화면으로 이동하도록 링크
어떤 부분을 동적 구현할지는 일단 정적으로 한번 구현해보고 필요한 요소들을 추가하기!!

### Main 가계부 영역
- [ ] 일단 정적으로 가계부 영역 구현해보기
- 1. 소비 내역을 나타내는 기본 구성 요소 디자인
- 2. 카테고리별로 소비 내역을 분류할 수 있도록 구현
- 3. 날짜별로 소비내역들을 담을 수 있는 하나의 컨테이너 제작
- 4. 날짜 컨테이너 별로 날짜를 띄우고, 컨테이너 안의 소비내역을 불러와서 수입/지출 띄울 수 있게 제작
- [ ] 입력 칸 정적 요소 우선적으로 구현 후 동적요소 구현. 가령:
- 1. 새로운 내역 입력할 수 있는 칸 구현
- 2. 일자 선택은 달력 컴포넌트를 외부에서 가져와서 모달로 띄우기
- 3. 금액 입력, 내용 입력 칸 Text input 컴포넌트 이용하고 개별적으로 필요한 부분 기능 추가
- 4. 결제수단, 분류는 modal 이용해서 각각 특정 목록 띄우기
- [ ] 동적 요소 추가
- 1. 카테고리를 클릭했을 때 카테고리를 수정할 수 있는 모달 띄우기
- 2. 각 소비 목록 오른쪽에 마우스를 호버했을 때 x 표시가 뜨게해서 삭제 기능 지원
- 3. 유효성 검사 후 불가능한 값이 입력되었을 경우 입력을 막는 기능


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
