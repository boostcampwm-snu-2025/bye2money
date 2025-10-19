import { useState, useEffect } from 'react'
import AddOptionModal from './AddOptionModal'

interface Expense {
  id: string
  date: string
  amount: number
  description: string
  paymentMethod: string
  category: string
  type?: 'income' | 'expense'
  createdAt: string
}

interface GroupedExpenses {
  [date: string]: Expense[]
}

const categoryColors: { [key: string]: string } = {
  '문화/여가': 'bg-purple-200 text-purple-800',
  '교통': 'bg-teal-300 text-teal-900',
  '식비': 'bg-blue-200 text-blue-800',
  '생활': 'bg-purple-300 text-purple-900',
  '쇼핑/뷰티': 'bg-yellow-200 text-yellow-800',
  '월급': 'bg-orange-300 text-orange-900',
  '미분류': 'bg-pink-200 text-pink-800',
  '': 'bg-gray-200 text-gray-800'
}

function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filterDate, setFilterDate] = useState('2023. 08. 17')
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // Modal states
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  // Custom options
  const [paymentMethods, setPaymentMethods] = useState(['현대카드', '국민카드', '현금'])
  const [categories, setCategories] = useState(['문화/여가', '교통', '식비', '생활', '쇼핑/뷰티', '월급'])

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/expenses')
      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }

  // Group expenses by date
  const groupedExpenses: GroupedExpenses = expenses.reduce((acc, expense) => {
    const dateKey = expense.date
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(expense)
    return acc
  }, {} as GroupedExpenses)

  // Calculate totals
  const totalExpenses = expenses.filter(e => e.type === 'expense' || e.amount < 0).reduce((sum, e) => sum + Math.abs(e.amount), 0)
  const totalIncome = expenses.filter(e => e.type === 'income' || e.amount > 0).reduce((sum, e) => sum + e.amount, 0)

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR')
  }

  const getDateLabel = (dateString: string) => {
    // Convert "2023. 08. 17" to "8월 17일 목요일" format
    const parts = dateString.split('. ')
    if (parts.length >= 3) {
      const month = parseInt(parts[1])
      const day = parseInt(parts[2])
      const date = new Date(2023, month - 1, day)
      const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      return `${month}월 ${day}일 ${weekdays[date.getDay()]}`
    }
    return dateString
  }

  const getDailyTotal = (expenses: Expense[], type: 'income' | 'expense') => {
    return expenses
      .filter(e => e.type === type || (type === 'expense' && e.amount < 0) || (type === 'income' && e.amount > 0))
      .reduce((sum, e) => sum + Math.abs(e.amount), 0)
  }

  return (
    <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl shadow-sm">
      {/* Filter Bar */}
      <div className="flex items-center bg-white px-6 py-5 rounded-xl border-2 border-purple-400 gap-0 mb-6">
        <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[140px]">
          <label className="text-xs text-gray-500 font-normal">일자</label>
          <input
            type="text"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0"
          />
        </div>

        <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[160px]">
          <label className="text-xs text-gray-500 font-normal">금액</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">-</span>
            <input
              type="text"
              placeholder="0"
              className="flex-1 text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 text-right"
            />
            <span className="text-base font-medium text-gray-900">원</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[140px]">
          <label className="text-xs text-gray-500 font-normal">결제수단</label>
          <select
            value={filterPaymentMethod}
            onChange={(e) => {
              if (e.target.value === '__add__') {
                setIsPaymentModalOpen(true)
                setFilterPaymentMethod('')
              } else {
                setFilterPaymentMethod(e.target.value)
              }
            }}
            className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23999%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_center] pr-6"
          >
            <option value="">입력하세요</option>
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
            <option value="__add__">+ 추가하기</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[140px]">
          <label className="text-xs text-gray-500 font-normal">분류</label>
          <select
            value={filterCategory}
            onChange={(e) => {
              if (e.target.value === '__add__') {
                setIsCategoryModalOpen(true)
                setFilterCategory('')
              } else {
                setFilterCategory(e.target.value)
              }
            }}
            className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23999%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_center] pr-6"
          >
            <option value="">선택하세요</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
            <option value="__add__">+ 추가하기</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 px-4 py-2 min-w-[140px]">
          <label className="text-xs text-gray-500 font-normal">분류</label>
          <select
            className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23999%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_center] pr-6"
          >
            <option value="">선택하세요</option>
          </select>
        </div>

        <button className="w-12 h-12 rounded-full bg-gray-400 border-0 cursor-pointer flex items-center justify-center flex-shrink-0 ml-4 hover:bg-gray-500 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Statistics */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="text-sm text-gray-600">
          전체 내역 <span className="font-medium">{expenses.length}건</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-black"></span>
            <span className="text-gray-600">수입 {formatAmount(totalIncome)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-400"></span>
            <span className="text-gray-600">지출 {formatAmount(totalExpenses)}</span>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="p-6">
        {Object.entries(groupedExpenses).map(([date, dateExpenses]) => (
          <div key={date} className="mb-8">
            {/* Date Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-gray-900">{getDateLabel(date)}</h3>
              <div className="text-sm text-gray-600">
                {getDailyTotal(dateExpenses, 'income') > 0 && (
                  <span className="mr-4">수입 {formatAmount(getDailyTotal(dateExpenses, 'income'))}원</span>
                )}
                지출 {formatAmount(getDailyTotal(dateExpenses, 'expense'))}원
              </div>
            </div>

            {/* Transactions */}
            <div className="space-y-3">
              {dateExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center gap-4 py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Category Badge */}
                  <div className={`px-3 py-1.5 rounded text-sm font-medium min-w-[100px] text-center ${categoryColors[expense.category] || categoryColors['']}`}>
                    {expense.category || '미분류'}
                  </div>

                  {/* Description */}
                  <div className="flex-1 text-base text-gray-900">
                    {expense.description || '설명 없음'}
                  </div>

                  {/* Payment Method */}
                  <div className="text-sm text-gray-600 min-w-[100px]">
                    {expense.paymentMethod || '현대카드'}
                  </div>

                  {/* Amount */}
                  <div className={`text-base font-medium min-w-[120px] text-right ${
                    expense.type === 'income' || expense.amount > 0 ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {expense.type === 'income' || expense.amount > 0 ? '+' : '-'}{formatAmount(Math.abs(expense.amount))}원
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddOptionModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onAdd={(value) => {
          setPaymentMethods([...paymentMethods, value])
          setFilterPaymentMethod(value)
        }}
        title="결제수단 추가"
      />

      <AddOptionModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAdd={(value) => {
          setCategories([...categories, value])
          setFilterCategory(value)
        }}
        title="분류 추가"
      />
    </div>
  )
}

export default ExpenseList
