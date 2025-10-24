# bye2money

전기정보공학부 김희원 웹가계부 프로젝트

## How to run this project

### Vite Frontend

```bash
# move to the project directory
cd vite-bye2money

# install dependencies if needed
npm install

# run this project
npm run dev
```

This project will open at `http://localhost:5173`

### Express Backend

```bash
# move to the server directory
cd server

# install dependecies if needed
npm install

# run this project
npm run dev
```

## Project Structure

- `src`
  - `assets`
  - `components`
    - `Button`
    - `CategoryTag`
    - `CheckBox`
    - `Modal`
    - `TextInput`
  - `constants`
  - `hooks`
  - `pages`
  - `styles`
  - `types`
  - `ui`
    - `Calendar`
    - `Header`
  - `utils`

* `components` directory contains reusable common components, and `ui` directory contains larger, feature-specific ui components for the main page.

## Color system

Defined at [`colors.css`](/vite-bye2money/src/styles/colors.css)

## Icons

Using Material UI

## Code Convention

- Handler: name starts with `handle`
- Each component directory (total 5) consists of:
  - `<component name>.tsx` : TSX component (Component defined in this file is imported from other files)
  - `<component name>.module.css` : CSS module file
  - `const.ts` : const variables are defined if needed (`/constants` directory로 옮길까 생각중)
- Components are defined using the arrow function:

  ```tsx
  export interface ComponentProps {
  	// FIXME: maybe erase export later
  	prop1: PropType1;
  	prop2: PropType2;
  }

  // maybe some small business logics (large ones are defined explicitly at seperate files)

  const Component = ({ props }: ComponentProps) => {
  	// hooks
  	// maybe some small business logics
  	return <></>;
  };

  export default Component;
  ```

- For CSS files, use the defined color system as much as possible
- Pages are named as: `<Page name>Page.tsx`

## Notes

- 공통 변수는 `MainPage.tsx`에서 관리 (Provider? Maybe replace later)
- `InputBar` component는 global한 `year`, `month`와 연동되지 않도록
- 가계부에 입력할 수 있는 기간은 2000-2025년

## Component Testing

5 common components' UI & features are tested using `/pages/ComponentTestPage.tsx`.

This page can be accessed by: `http://localhost:5173/component-test`

## Checklist (개발 순서)

- 기본 컴포넌트 5가지 먼저 개발 (테스트는 `MainPage.tsx`에 import하여 확인)- 큰 틀만 V
  - Figma 보면서 props 변수 정의
  - 각 변수에 따른 세부 기능들 구현
- Figma 확인하여 컴포넌트들의 세부 디자인 디테일 구현 V
- Color system 정의하기 V, 적용하도록 코드 수정 V
- 메인 페이지 컴포넌트 생성
  (진행 순서가 Header->Calendar->...인 이유는 흐름 상 Calendar에서 date를 지정한 후, 그 date로 가계부 data를 불러오기 때문에, date picking을 할 수 있는 Calendar를 먼저 만드는게 좋겠다고 생각함.)
  - Header V
  - Calendar V
    - `react-day-picker` used for UI, `date-fns` used for logics (for calculating, etc)
- `MainPage.tsx`에서 global하게 관리하는 변수들: year, month, current tab. 각각을 각 컴포넌트의 props로 넘겨주도록

- Express Backend 생성
