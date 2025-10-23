import { useState } from 'react'

interface ExpenseFormData {
  date: string
  amount: number
  description: string
  paymentMethod: string
  category: string
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
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormData({ ...formData, amount: parseInt(value) || 0 })
  }

  return (
    <div className="flex items-center bg-white px-6 py-5 rounded-xl border border-gray-200 gap-0 w-full max-w-full overflow-x-auto">
      {/* 일자 */}
      <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[140px]">
        <label className="text-xs text-gray-500 font-normal whitespace-nowrap">일자</label>
        <input
          type="text"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0"
        />
      </div>

      {/* 금액 */}
      <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[160px]">
        <label className="text-xs text-gray-500 font-normal whitespace-nowrap">금액</label>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">-</span>
          <input
            type="text"
            value={formData.amount || ''}
            onChange={handleAmountChange}
            placeholder="0"
            className="flex-1 text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 text-right"
            inputMode="numeric"
          />
          <span className="text-base font-medium text-gray-900">원</span>
        </div>
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 flex-1 min-w-[250px]">
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-500 font-normal whitespace-nowrap">내용</label>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {formData.description.length}/32
          </span>
        </div>
        <input
          type="text"
          placeholder="입력하세요"
          value={formData.description}
          onChange={handleDescriptionChange}
          className="w-full text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0"
        />
      </div>

      {/* 결제수단 */}
      <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[140px]">
        <label className="text-xs text-gray-500 font-normal whitespace-nowrap">결제수단</label>
        <select
          value={formData.paymentMethod}
          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
          className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2210%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23999%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_center] pr-6"
        >
          <option value="">선택하세요</option>
          <option value="card">카드</option>
          <option value="cash">현금</option>
          <option value="transfer">계좌이체</option>
        </select>
      </div>

      {/* 분류 */}
      <div className="flex flex-col gap-1 px-4 py-2 min-w-[140px]">
        <label className="text-xs text-gray-500 font-normal whitespace-nowrap">분류</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23999%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_center] pr-6"
        >
          <option value="">선택하세요</option>
          <option value="food">식비</option>
          <option value="transport">교통</option>
          <option value="shopping">쇼핑</option>
          <option value="etc">기타</option>
        </select>
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-12 h-12 rounded-full bg-gray-400 border-0 cursor-pointer flex items-center justify-center flex-shrink-0 ml-4 hover:bg-gray-500 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default ExpenseForm
