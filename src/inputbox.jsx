import React, { useState } from 'react'
import './inputbox.css'

function InputBox() {
  // 기본값: 오늘 날짜 (YYYY-MM-DD)
  const [date, setDate] = React.useState(() => {
    const d = new Date()
    return d.toISOString().slice(0, 10)
  })

  // 숫자와 '-'만 허용, 최대 길이 10 (YYYY-MM-DD)
  const handleDateChange = (e) => {
    const filtered = e.target.value.replace(/[^\d-]/g, '').slice(0, 10)
    setDate(filtered)
  }

  // 금액 및 부호 상태
  const [sign, setSign] = useState('-') // '-' 또는 '+'
  const [amount, setAmount] = useState('')

  // 분류 상태 및 옵션
  const [category, setCategory] = useState('')
  const EXPENSE_CATEGORIES = ['생활', '식비', '교통', '쇼핑/뷰티', '의료/건강','문화/여가', '미분류']
  const INCOME_CATEGORIES = ['월급', '용돈', '기타 수입']

  // 결제수단 상태
  const [payment, setPayment] = useState('')

  // 내용 상태 (최대 32자)
  const [content, setContent] = useState('')

  // 숫자 문자열을 천 단위 콤마로 포맷
  const formatNumber = (s) => {
    if (!s) return ''
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleAmountChange = (e) => {
    // 입력에서 비숫자 제거(콤마 포함), 최대 길이 제한
    const raw = e.target.value.replace(/[^\d]/g, '').slice(0, 12)
    setAmount(raw)
  }

  const handleContentChange = (e) => {
    const v = e.target.value.slice(0, 32)
    setContent(v)
  }

  // 유효성: date(10자), amount > 0, content non-empty, payment, category
  const isValid = (() => {
    const hasDate = date && date.length === 10
    const amt = parseInt(amount || '0', 10)
    return hasDate && amt > 0 && content.trim().length > 0 && payment && category
  })()

  const handleSubmit = () => {
    if (!isValid) return
    const log = {
      id: Date.now(),
      date,
      type: sign === '-' ? 'expense' : 'income',
      sign,
      amount: parseInt(amount || '0', 10),
      content,
      payment,
      category,
      createdAt: new Date().toISOString(),
    }
    const key = 'bye2money_logs'
    const arr = JSON.parse(localStorage.getItem(key) || '[]')
    arr.unshift(log) // 최신을 앞에
    localStorage.setItem(key, JSON.stringify(arr))
    // 이벤트로 로그 갱신 알림
    window.dispatchEvent(new CustomEvent('logsUpdated', { detail: log }))
    // 폼 초기화(필요하면 조절)
    setAmount('')
    setContent('')
    setCategory('')
    setPayment('')
  }

  return (
	<>
	  <div className="input-bar" role="region" aria-label="new-entry">
		<div className="input-inner">
		  <div className="field date-field">
			<label className="field-label">일자</label>
			<input
			  type="text"
			  inputMode="numeric"
			  pattern="[0-9-]*"
			  className="field-control"
			  value={date}
			  onChange={handleDateChange}
			  placeholder="YYYY-MM-DD"
			/>
		  </div>

		  <div className="field amount-field">
			<label className="field-label">금액</label>
			<div className="amount-row">
				<select
				className="field-control sign-select"
				value={sign}
				onChange={(e) => { setSign(e.target.value); setCategory('') }}
				aria-label="sign"
				>
					<option value="-">−</option>
					<option value="+">＋</option>
				</select>

				<div className="amount-wrap">
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					className="field-control amount-input"
					value={formatNumber(amount)}
					onChange={handleAmountChange}
					placeholder="0"
				/>
				<span className="currency">원</span>
				</div>
            </div>
           </div>

           <div className="field content-field">
             <div className="field-label-row">
               <label className="field-label">내용</label>
               <div className="char-count" aria-live="polite">{content.length}/32</div>
             </div>
             <input
               type="text"
               className="field-control"
               value={content}
               onChange={handleContentChange}
               placeholder="입력해주세요 (최대 32자)"
             />
           </div>

           <div className="field select-field">
             <label className="field-label">결제수단</label>
             <select
               className="field-control"
               value={payment}
               onChange={(e) => setPayment(e.target.value)}
             >
               <option value="">선택하세요</option>
               <option value="현금">현금</option>
               <option value="체크카드">체크카드</option>
               <option value="신용카드">신용카드</option>
             </select>
           </div>

           <div className="field select-field">
             <label className="field-label">분류</label>
             <select
               className="field-control"
               value={category}
               onChange={(e) => setCategory(e.target.value)}
             >
               <option value="">선택하세요</option>
               {(sign === '-' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map((c) => (
                 <option key={c} value={c}>{c}</option>
               ))}
             </select>
           </div>

           <div className="field submit-field">
             <label className="field-label" aria-hidden="true">&nbsp;</label>
             <button
               className="submit-btn"
               type="button"
               disabled={!isValid}
               onClick={handleSubmit}
             >
               확인
             </button>
           </div>
         </div>
       </div>
	</>
  )
}

export default InputBox
