import React, { useState } from 'react'
import './logs.css'

// add commas to number string (moved from component body to avoid re-creation on each render)
const formatNumber = (n) => {
  if (!n && n !== 0) return ''
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// format date (YYYY-MM-DD -> M월 D일 요일)
const formatDateForDisplay = (dateStr) => {
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
}

function Logs({ date, logs, deleteLog }) {
 
  // logToDelete가 null이면 모달 숨김, log 객체가 있으면 모달 표시
  const [logToDelete, setLogToDelete] = useState(null);
  // 삭제 버튼 클릭 시 -> 모달 열기
  const handleOpenDeleteModal = (log) => {
    setLogToDelete(log);
  };

  // 모달에서 '취소' 클릭 시 -> 모달 닫기
  const handleCloseDeleteModal = () => {
    setLogToDelete(null);
  };

  // 모달에서 '삭제' 클릭 시 -> 실제 삭제 로직 실행
  const handleConfirmDelete = () => {
    if (logToDelete) {
      deleteLog(logToDelete.id);
      setLogToDelete(null); // 모달 닫기
    }
  };

  // 1. 선택된 '월'에 해당하는 내역만 필터링
  const selectedYear = date.getFullYear()
  const selectedMonth = String(date.getMonth() + 1).padStart(2, '0')
  const selectedYearMonth = `${selectedYear}-${selectedMonth}` // "YYYY-MM" 형식

  const filteredLogs = logs.filter(log => log.date.startsWith(selectedYearMonth))

  // 2. 필터링된 내역으로 [월별] 통계 계산 (상단 요약용)
  const totalCount = filteredLogs.length
  const totalIncome = filteredLogs.reduce((sum, log) => 
    log.type === 'income' ? sum + log.amount : sum, 0)
  const totalExpense = filteredLogs.reduce((sum, log) => 
    log.type === 'expense' ? sum + log.amount : sum, 0)

  // 3. [요청] 정렬: 1. 날짜(date) 내림차순, 2. ID(id) 내림차순
  const sortedLogs = filteredLogs.sort((a, b) => {
    // 주 정렬 (날짜)
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    
    // 보조 정렬 (ID)
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;

    return 0;
  });

  // 4. [요청] 일별 그룹화 및 [일별] 통계 계산
  const groupedLogs = sortedLogs.reduce((acc, log) => {
    const dateKey = log.date; // "YYYY-MM-DD"
    
    // 이 날짜의 그룹이 없으면 새로 생성
    if (!acc[dateKey]) {
      acc[dateKey] = {
        logs: [],
        dailyIncome: 0,
        dailyExpense: 0,
      };
    }
    
    // 로그 추가
    acc[dateKey].logs.push(log);
    
    // 일별 통계 계산
    if (log.type === 'income') {
      acc[dateKey].dailyIncome += log.amount;
    } else {
      acc[dateKey].dailyExpense += log.amount;
    }
    
    return acc;
  }, {}); // 초기값은 빈 객체

  // Object.entries는 { "2025-11-02": data, ... }를
  // [ ["2025-11-02", data], ... ] 배열로 변환
  const logGroups = Object.entries(groupedLogs);

  // 5. 렌더링
  
  // 내역이 없는 경우
  if (filteredLogs.length === 0) {
    return (
      <div className="logs-container">
        <h3>{selectedYear}년 {selectedMonth}월 내역</h3>
        <div className="no-logs-message">
          해당 월의 내역이 없습니다.
        </div>
      </div>
    )
  }

  // 내역이 있는 경우
  return (
    <div className="logs-container">
      {/* 1. 월별 요약 렌더링 */}
      <div className="monthly-summary">
        <div className="summary-item">
          <span className="summary-label">전체 내역</span>
          <span className="summary-value">{totalCount}건</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">총 수입</span>
          <span className="summary-value amount-income">
            {formatNumber(totalIncome)}원
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">총 지출</span>
          <span className="summary-value amount-expense">
            {formatNumber(totalExpense)}원
          </span>
        </div>
      </div>

      {/* 2. 일별 로그 그룹 렌더링 */}
      <div className="daily-log-list">
        {logGroups.map(([date, data]) => (
          <div key={date} className="daily-log-group">
            {/* 2-1. 일별 헤더 (날짜, 일별 총계) */}
            <div className="daily-header">
              <span className="daily-date">{formatDateForDisplay(date)}</span>
              <div className="daily-totals">
                {data.dailyIncome > 0 && (
                  <span className="amount-income">
                    수입 {formatNumber(data.dailyIncome)}원
                  </span>
                )}
                {data.dailyExpense > 0 && (
                  <span className="amount-expense">
                    지출 {formatNumber(data.dailyExpense)}원
                  </span>
                )}
              </div>
            </div>

            {/* 2-2. 개별 로그 항목 리스트 */}
            <ul className="log-item-list">
              {data.logs.map((log) => (
                <li key={log.id} className="log-item">
                  <span className="log-category">{log.category}</span>
                  <span className="log-content">{log.content}</span>
                  <span className="log-payment">{log.payment}</span>
                  <span className={`log-amount ${log.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                    {log.sign}{formatNumber(log.amount)}
                  </span>
                  <button 
                    className="log-delete-btn" 
                    onClick={(e) => {
                      e.stopPropagation(); // li의 클릭 이벤트 전파 방지
                      handleOpenDeleteModal(log);
                    }}
                  >
                    &times; {/* 'x' 아이콘 */}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {logToDelete && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h3 className="delete-modal-header">내역 삭제</h3>
            <p className="delete-modal-prompt">
              정말로 이 내역을 삭제하시겠습니까?
            </p>
            
            {/* 삭제할 내역 정보 표시 */}
            <div className="delete-modal-body">
              <div className="log-item-preview">
                <span>{logToDelete.date}</span>
                <span>{logToDelete.content}</span>
                <span className={logToDelete.type === 'income' ? 'amount-income' : 'amount-expense'}>
                  {logToDelete.sign}{formatNumber(logToDelete.amount)}원
                </span>
              </div>
            </div>

            {/* 확인/취소 버튼 */}
            <div className="delete-modal-actions">
              <button 
                className="modal-btn modal-btn-cancel"
                onClick={handleCloseDeleteModal}
              >
                취소
              </button>
              <button 
                className="modal-btn modal-btn-confirm"
                onClick={handleConfirmDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Logs