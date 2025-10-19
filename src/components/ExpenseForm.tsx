import { useState } from 'react'

interface ExpenseFormData {
  date: string
  amount: number
  description: string
  paymentMethod: string
  category: string
}

const styles = {
  expenseForm: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    gap: '20px',
    maxWidth: '1400px',
    width: '100%',
  } as React.CSSProperties,

  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '120px',
  } as React.CSSProperties,

  label: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  } as React.CSSProperties,

  input: {
    padding: '8px 12px',
    border: 'none',
    borderBottom: '2px solid #e0e0e0',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#333',
  } as React.CSSProperties,

  select: {
    padding: '8px 12px',
    border: 'none',
    borderBottom: '2px solid #e0e0e0',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#333',
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    paddingRight: '30px',
  } as React.CSSProperties,

  amountInput: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  } as React.CSSProperties,

  amountField: {
    flex: 1,
    minWidth: '80px',
  } as React.CSSProperties,

  currency: {
    fontSize: '16px',
    color: '#666',
  } as React.CSSProperties,

  descriptionField: {
    flex: 1,
    minWidth: '200px',
  } as React.CSSProperties,

  descriptionInputWrapper: {
    position: 'relative',
  } as React.CSSProperties,

  charCount: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '12px',
    color: '#999',
  } as React.CSSProperties,

  divider: {
    width: '1px',
    height: '40px',
    backgroundColor: '#e0e0e0',
  } as React.CSSProperties,

  submitBtn: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#8b8b8b',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: '10px',
  } as React.CSSProperties,
}

function ExpenseForm() {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: '2023. 08. 17',
    amount: 0,
    description: '',
    paymentMethod: '',
    category: ''
  })

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create expense')
      }

      const data = await response.json()
      console.log('Expense created:', data)

      // 폼 초기화
      setFormData({
        date: '2023. 08. 17',
        amount: 0,
        description: '',
        paymentMethod: '',
        category: ''
      })

      alert('지출이 저장되었습니다!')
    } catch (error) {
      console.error('Error:', error)
      alert('저장에 실패했습니다.')
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 32) {
      setFormData({ ...formData, description: value })
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setFormData({ ...formData, amount: value })
  }

  return (
    <div style={styles.expenseForm}>
      <div style={styles.formField}>
        <label style={styles.label}>일자</label>
        <input
          type="text"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          style={styles.input}
        />
      </div>

      <div style={styles.divider}></div>

      <div style={styles.formField}>
        <label style={styles.label}>금액</label>
        <div style={styles.amountInput}>
          <input
            type="number"
            value={formData.amount}
            onChange={handleAmountChange}
            style={{...styles.input, ...styles.amountField}}
          />
          <span style={styles.currency}>원</span>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={{...styles.formField, ...styles.descriptionField}}>
        <label style={styles.label}>내용</label>
        <div style={styles.descriptionInputWrapper}>
          <input
            type="text"
            placeholder="입력하세요"
            value={formData.description}
            onChange={handleDescriptionChange}
            style={styles.input}
          />
          <span style={styles.charCount}>{formData.description.length}/32</span>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.formField}>
        <label style={styles.label}>결제수단</label>
        <select
          value={formData.paymentMethod}
          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
          style={styles.select}
        >
          <option value="">선택하세요</option>
          <option value="card">카드</option>
          <option value="cash">현금</option>
          <option value="transfer">계좌이체</option>
        </select>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.formField}>
        <label style={styles.label}>분류</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={styles.select}
        >
          <option value="">선택하세요</option>
          <option value="food">식비</option>
          <option value="transport">교통</option>
          <option value="shopping">쇼핑</option>
          <option value="etc">기타</option>
        </select>
      </div>

      <button style={styles.submitBtn} onClick={handleSubmit}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default ExpenseForm
