import { useState, useEffect } from 'react'
import AddOptionModal from './AddOptionModal'

interface Expense {
  id: string
  date: string
  amount: number
  description: string
  paymentMethod: string
  category: string
  type: 'income' | 'expense'
  createdAt: string
}

interface GroupedExpenses {
  [date: string]: Expense[]
}

const categoryColors: { [key: string]: { bg: string; text: string } } = {
  '문화/여가': { bg: '#e9d5ff', text: '#6b21a8' },
  '교통': { bg: '#5eead4', text: '#134e4a' },
  '식비': { bg: '#bfdbfe', text: '#1e40af' },
  '생활': { bg: '#d8b4fe', text: '#6b21a8' },
  '쇼핑/뷰티': { bg: '#fef08a', text: '#854d0e' },
  '월급': { bg: '#fdba74', text: '#7c2d12' },
  '미분류': { bg: '#fbcfe8', text: '#9f1239' },
  '': { bg: '#e5e7eb', text: '#1f2937' }
}

interface ExpenseListProps {
  onEditExpense: (expense: Expense) => void
  selectedExpenseId: string | null
  currentYear: number
  currentMonth: number
}

function ExpenseList({ onEditExpense, selectedExpenseId, currentYear, currentMonth }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]) // generic type, 초기값
  const [filterDate, setFilterDate] = useState('2023. 08. 17') //필터용 날짜
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('') //결제수단 필터
  const [filterCategory, setFilterCategory] = useState('') //카테고리 필터

  // 수입/지출 필터 (기본값: 둘 다 true)
  const [showIncome, setShowIncome] = useState(true)
  const [showExpense, setShowExpense] = useState(true)

  // 삭제 관련 state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null)
  const [deleteModalPosition, setDeleteModalPosition] = useState({ top: 0, left: 0 })

  // Modal states
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false) //결제수단 모달 열림 여부
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false) //분류 모달 열림 여뷰

  // Custom options
  const [paymentMethods, setPaymentMethods] = useState(['현대카드', '국민카드', '현금']) //결제수단 목록
  const [categories, setCategories] = useState(['문화/여가', '교통', '식비', '생활', '쇼핑/뷰티', '월급']) //분류 목록

  useEffect(() => {
    fetchExpenses()
  }, [currentYear, currentMonth])  // 월이 변경될 때마다 다시 fetch
 
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

  // 필터링된 expenses (타입 + 월 필터)
  const filteredExpenses = expenses.filter(expense => {
    const isIncome = expense.type === 'income'
    const isExpense = expense.type === 'expense'

    if (isIncome && !showIncome) return false
    if (isExpense && !showExpense) return false

    // 월 필터링
    const parts = expense.date.split('.').map(p => p.trim())
    if (parts.length >= 2) {
      const expenseYear = parseInt(parts[0])
      const expenseMonth = parseInt(parts[1])
      if (expenseYear !== currentYear || expenseMonth !== currentMonth) {
        return false
      }
    }

    return true
  })

  // Group expenses by date (정규화된 날짜로 그룹화)
  const groupedExpenses: GroupedExpenses = filteredExpenses.reduce((acc, expense) => {
    // 날짜 정규화: 공백과 . 제거 후 다시 일관된 형식으로
    const normalized = expense.date.replace(/\s/g, '').replace(/\./g, '')
    const parts = expense.date.split('.').map(p => p.trim())

    // 정규화된 키 생성 (YYYY.MM.DD 형식)
    const dateKey = parts.length >= 3
      ? `${parts[0]}. ${parts[1].padStart(2, '0')}. ${parts[2].padStart(2, '0')}`
      : expense.date

    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(expense)
    return acc
  }, {} as GroupedExpenses)

  // Calculate totals (amount는 항상 양수, type으로만 구분)
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0)
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0)

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR')
  } //날짜별로 묶기

  const getDateLabel = (dateString: string) => {
    // Convert "2023. 08. 17" to "8월 17일 목요일" format
    const parts = dateString.split('. ')
    if (parts.length >= 3) {
      const year = parseInt(parts[0])
      const month = parseInt(parts[1])
      const day = parseInt(parts[2])
      const date = new Date(year, month - 1, day)
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

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (expenseId: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    setDeleteModalPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 200 // 모달 너비만큼 왼쪽으로 이동
    })
    setExpenseToDelete(expenseId)
    setIsDeleteModalOpen(true)
  }

  // 삭제 확인 핸들러
  const handleDeleteConfirm = async () => {
    if (!expenseToDelete) return

    try {
      // 1초 지연 후 삭제
      setTimeout(async () => {
        const response = await fetch(`http://localhost:8000/api/expenses/${expenseToDelete}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete expense')
        }

        // 로컬 state 업데이트
        setExpenses(expenses.filter(e => e.id !== expenseToDelete))
        setIsDeleteModalOpen(false)
        setExpenseToDelete(null)
      }, 1000)
    } catch (error) {
      console.error('Error deleting expense:', error)
      alert('삭제에 실패했습니다.')
    }
  }

  // 내역 클릭 핸들러 (수정 모드)
  const handleExpenseClick = (expense: Expense) => {
    onEditExpense(expense)
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-white">
      {/* Statistics */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 bg-white">
        <div className="text-sm text-gray-700">
          전체 내역 <span className="font-medium">{expenses.length}건</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showIncome}
              onChange={(e) => setShowIncome(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-green-600 font-medium">수입 {formatAmount(totalIncome)}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showExpense}
              onChange={(e) => setShowExpense(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-red-600 font-medium">지출 {formatAmount(totalExpenses)}</span>
          </label>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white">
        {Object.entries(groupedExpenses)
          .sort(([dateA], [dateB]) => {
            // 날짜를 Date 객체로 변환하여 내림차순 정렬 (최신순)
            const parseDate = (dateStr: string) => {
              const parts = dateStr.split('. ')
              return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
            }
            return parseDate(dateB).getTime() - parseDate(dateA).getTime()
          })
          .map(([date, dateExpenses]) => (
          <div key={date} className="border-b border-gray-200 last:border-b-0">
            {/* Date Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900">{getDateLabel(date)}</h3>
              <div className="text-sm flex items-center gap-4">
                {getDailyTotal(dateExpenses, 'income') > 0 && (
                  <span className="text-green-600 font-medium">수입 {formatAmount(getDailyTotal(dateExpenses, 'income'))}원</span>
                )}
                <span className="text-red-600 font-medium">지출 {formatAmount(getDailyTotal(dateExpenses, 'expense'))}원</span>
              </div>
            </div>

            {/* Transactions */}
            <div>
              {dateExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className={`flex items-center gap-6 py-4 px-4 border-b border-gray-100 last:border-b-0 hover:bg-white transition-colors group relative cursor-pointer ${
                    selectedExpenseId === expense.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => handleExpenseClick(expense)}
                >
                  {/* Category Badge */}
                  <div
                    className="px-3 py-1.5 rounded text-xs font-medium min-w-[80px] text-center"
                    style={{
                      backgroundColor: (categoryColors[expense.category] || categoryColors['']).bg,
                      color: (categoryColors[expense.category] || categoryColors['']).text
                    }}
                  >
                    {expense.category || '미분류'}
                  </div>

                  {/* Description */}
                  <div className="flex-1 text-sm text-gray-900">
                    {expense.description || '설명 없음'}
                  </div>

                  {/* Payment Method */}
                  <div className="text-sm text-gray-600 min-w-[100px] text-center">
                    {expense.paymentMethod || '현대카드'}
                  </div>

                  {/* Amount */}
                  <div className={`text-sm font-medium min-w-[100px] text-right ${
                    expense.type === 'income' || expense.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {expense.type === 'income' || expense.amount > 0 ? '+' : '-'}{formatAmount(Math.abs(expense.amount))}원
                  </div>

                  {/* 삭제 아이콘 (호버 시 표시) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteClick(expense.id, e)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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

      {/* 삭제 확인 작은 모달 */}
      {isDeleteModalOpen && (
        <>
          {/* 배경 클릭 감지용 투명 레이어 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsDeleteModalOpen(false)
              setExpenseToDelete(null)
            }}
          />
          {/* 작은 팝업 모달 */}
          <div
            className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-80 z-50"
            style={{
              top: `${deleteModalPosition.top}px`,
              left: `${deleteModalPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              해당 내역을 삭제하시겠습니까?
            </h3>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setExpenseToDelete(null)
                }}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ExpenseList
