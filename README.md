# 가계부 2주차

기본 작업:
- [x] 직접 공식 문서 읽고, tailwindcss v4 문법으로 전환
- [x] Express로 mock server 만들기 (실제 CRUD API는 GPT 도움 받음)
- [x] localStorage 대신 mock server를 통한 React CRUD 구현 (MainPage.jsx / PaymentDropdown.jsx)
- [x] 피드백 반영하여 리팩토링: 파일 구조 feature 단위로 정리, TransactionList에서 map 되는 컴포넌트를 TransactionItem으로 분리 + 아이템 추가 시 useReducer 사용 (GPT 도움 받음)

스펙 구현:
- [ ] 헤더를 통한 월별 리스트 전환 / 페이지 뷰 전환
- [x] InputBar: 결제 수단 삭제 모달
- [x] 결제 수단 삭제 시, 해당 결제 수단을 사용하는 아이템의 결제 수단 “”로 변경 
- [ ] InputBar: 분류 드롭다운 추가 -> 지출/수입 별 카테고리 차이
- [ ] InputBar: 모든 입력이 추가되어야 아이템 생성 버튼 활성화
- [ ] 아이템 삭제 모달 도입 (삭제 시, 1초 지연 후 삭제)
- [ ] InputBar: 선택된 아이템이 있을 시, 인풋 바 이외의 영역 클릭하면 선택 해제
- [ ] 달력 페이지 구현
- [ ] 그래프 페이지 구현