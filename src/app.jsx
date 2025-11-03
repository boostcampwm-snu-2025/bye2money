import { StrictMode, useState } from 'react';
import Header from './header.jsx';
import InputBox from './inputbox.jsx';
import Logs from './logs.jsx';

function App() {
  // global date state for month navigation
  const [date, setDate] = useState(new Date());

  const [logs, setLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bye2money_logs') || '[]')
    } catch {
      return []
    }
  })

  // 로그 추가 함수
  const addLogs = (newLog) => {
    const updatedLogs = [newLog, ...logs]
    setLogs(updatedLogs)
    
    // localStorage에 저장
    try {
      localStorage.setItem('bye2money_logs', JSON.stringify(updatedLogs))
    } catch (error) {
      console.error('저장 실패:', error)
    }
  }

  const deleteLog = (logId) => {
    try {
      const updatedLogs = logs.filter(log => log.id !== logId);
      setLogs(updatedLogs);
      localStorage.setItem('bye2money_logs', JSON.stringify(updatedLogs));
    } catch (error) {
      console.error('로그 삭제 실패:', error);
    }
  };
  
  return (
    <StrictMode>
      <Header date={date} setDate={setDate} />
      <InputBox addLogs={addLogs} />
      <Logs date={date} logs={logs} deleteLog={deleteLog} />
    </StrictMode>
  );
}

export default App;