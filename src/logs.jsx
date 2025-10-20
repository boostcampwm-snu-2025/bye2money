import React, { useEffect, useState } from 'react'
import './inputbox.css' // reuse styles or create logs-specific css if preferred

function Logs() {
  const [logs, setLogs] = useState(() => {
    const arr = JSON.parse(localStorage.getItem('bye2money_logs') || '[]')
    return arr
  })

  useEffect(() => {
    const handler = (e) => {
      // 새 로그가 들어오면 로컬스토리지를 다시 읽어 갱신
      const arr = JSON.parse(localStorage.getItem('bye2money_logs') || '[]')
      setLogs(arr)
    }
    window.addEventListener('logsUpdated', handler)
    // storage 이벤트도 보조로 수신 (다른 탭에서 변경 시)
    const storageHandler = (e) => {
      if (e.key === 'bye2money_logs') {
        const arr = JSON.parse(localStorage.getItem('bye2money_logs') || '[]')
        setLogs(arr)
      }
    }
    window.addEventListener('storage', storageHandler)
    return () => {
      window.removeEventListener('logsUpdated', handler)
      window.removeEventListener('storage', storageHandler)
    }
  }, [])

  const formatNumber = (n) => {
    if (!n && n !== 0) return ''
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  if (!logs || logs.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h3>Logs</h3>
        <div>내역이 없습니다.</div>
      </div>
    )
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Logs</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {logs.map((l) => (
          <li key={l.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <div style={{ minWidth: 120, color: '#333' }}>{l.date}</div>
              <div style={{ fontWeight: 700, color: l.sign === '-' ? '#d9534f' : '#2a9d8f' }}>
                {l.sign}{formatNumber(l.amount)}
              </div>
              <div style={{ color: '#666' }}>{l.category}</div>
              <div style={{ marginLeft: 'auto', color: '#999' }}>{l.payment}</div>
            </div>
            <div style={{ color: '#444', marginTop: 6 }}>{l.content}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Logs