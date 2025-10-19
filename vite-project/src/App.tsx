import React from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header 컴포넌트를 여기에 렌더링합니다. */}
      <Header />
      <Form />

      {/* <main> */}
      {/* 이 아래에 가계부의 나머지 부분 (내역, 입력창 등)이 들어갑니다. */}
      {/* </main> */}
    </div>
  );
}

export default App;