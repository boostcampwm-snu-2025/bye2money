# bye2money

## 기능요구사항
[Figma Link](https://www.figma.com/design/jLywQbHP0k3G8i4CjMK3IH/WEB_%EA%B0%80%EA%B3%84%EB%B6%80%EC%84%9C%EB%B9%84%EC%8A%A4--Copy-?node-id=24302-41640&t=AA9G2phxlUlWDTC9-1)

가계부는 3개의 화면으로 구성하며, 메인화면 위주로 2주간 진행.

1. 메인화면(수입/지출 내역목록 및 등록)
2. 달력 UI <선택기능>
3. 시각화 UI <선택기능>

1주차의 완성 목표를 구체적으로 정리하고 시작한다.

## Tech Stack
- vite
- React + Typescript + tailwindcss

## 구현요구사항
- vite build
- 컴포넌트 설계 - 트리 구조 - App.tsx는 간단한 구조만
- 컴포넌트 구현 - 함수 형태로(Hooks API를 익히는 것에 의미를 둠)
- useState의 동작 방식 이해하기
- useEffect에서 비동기 작업 처리, dependencies 파라미터 필요성 이해하기
- 데이터 통신은 가급적 fetch 사용

## 1주차 완성 목표 및 PRD
- vite setting
- foundation setting to code
- header
    - logo
    - monthYear
    - tab
- input bar
    - date
    - value
    - description
    - payment
    - category
    - addButton