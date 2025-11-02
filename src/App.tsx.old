import { useState, useRef, useEffect } from 'react'
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Calendar from './components/Calendar'

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

type ViewMode = 'list' | 'calendar'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
  }

  const handleClearEdit = () => {
    setEditingExpense(null)
  }

  const handleExpenseUpdated = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  // ExpenseForm 외부 클릭 시 선택 상태 해제
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isFormClick = formRef.current && formRef.current.contains(target)
      const isListClick = listRef.current && listRef.current.contains(target)

      // ExpenseForm과 ExpenseList 둘 다 외부를 클릭한 경우에만 선택 해제
      if (!isFormClick && !isListClick && editingExpense) {
        setEditingExpense(null)
      }
    }

    if (editingExpense) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingExpense])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="bg-gray-400 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: App name */}
            <div className="text-white text-lg font-medium">
              Bye2Money
            </div>

            {/* Right: View mode icons */}
            <div className="flex items-center gap-3">
              {/* List icon */}
              <button
                onClick={() => {
                  setViewMode('list')
                  setEditingExpense(null)
                }}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white bg-opacity-30'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
                title="리스트"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="2" fill="white" rx="1"/>
                  <rect x="3" y="9" width="14" height="2" fill="white" rx="1"/>
                  <rect x="3" y="14" width="14" height="2" fill="white" rx="1"/>
                </svg>
              </button>

              {/* Calendar icon */}
              <button
                onClick={() => {
                  setViewMode('calendar')
                  setEditingExpense(null)
                }}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white bg-opacity-30'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
                title="달력"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="13" stroke="white" strokeWidth="1.5" fill="none" rx="2"/>
                  <line x1="3" y1="8" x2="17" y2="8" stroke="white" strokeWidth="1.5"/>
                  <line x1="7" y1="2" x2="7" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="2" x2="13" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Chart icon (placeholder for future) */}
              <button
                className="p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
                title="통계"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="12" width="3" height="5" fill="white" rx="1"/>
                  <rect x="8.5" y="8" width="3" height="9" fill="white" rx="1"/>
                  <rect x="13" y="4" width="3" height="13" fill="white" rx="1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="px-5">
            <div className="mb-6" ref={formRef}>
              <ExpenseForm
                editingExpense={editingExpense}
                onClearEdit={handleClearEdit}
                onExpenseUpdated={handleExpenseUpdated}
              />
            </div>
            <div ref={listRef}>
              <ExpenseList
                onEditExpense={handleEditExpense}
                refreshTrigger={refreshTrigger}
                selectedExpenseId={editingExpense?.id || null}
              />
            </div>
          </div>
        ) : (
          <Calendar />
        )}
      </div>
    </div>
  )
}

export default App
