import React, { useState } from 'react'
import './header.css'

function Header() {
  const [date, setDate] = useState(new Date())
  
  const handleNavigate = (path) => {
    window.location.href = path
  }

  // Month manipulation functions
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  // English month names and current month text
  const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthEnglish = MONTHS_EN[date.getMonth()]

  return (
	<>
	  <header>
		<div className="header-inner">
		  <div className="logo-container" onClick={() => handleNavigate('/')}>
			Wise Wallet
		  </div>

		  <div className="center-calendar" aria-label="month selector">
			<button className="cal-btn" onClick={prevMonth} aria-label="previous month">◀</button>
			<div className="calender-display">	
				<div className="year">{date.getFullYear()}</div>
				<div className="month">{date.getMonth() + 1}</div>
				<div className="month_english">{monthEnglish}</div>
			</div>
			<button className="cal-btn" onClick={nextMonth} aria-label="next month">▶</button>
		  </div>

		  <div className="link-container">
			<button className="icon-btn" title="Logs" onClick={() => handleNavigate('/logs')}>📒</button>
			<button className="icon-btn" title="Calendar" onClick={() => handleNavigate('/calendar')}>🗓️</button>
			<button className="icon-btn" title="Statics" onClick={() => handleNavigate('/statics')}>📊</button>
		  </div>
		</div>
	  </header>
	</>
  )
}

export default Header
