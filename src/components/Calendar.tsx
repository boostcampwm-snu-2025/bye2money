import { useState, useEffect } from 'react'

interface Expense { //정의 
  id: string
  date: string
  amount: number
  description: string
  paymentMethod: string
  category: string
  type: 'income' | 'expense'
  createdAt: string
}

interface DailyStats { //정의 
  income: number
  expense: number
  total: number
}

interface MonthlyStats {
  [date: string]: DailyStats
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date()) //제네릭  어떤 달
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({})

  useEffect(() => {
    fetchExpenses()
  }, []) //마운트 직후 fetch

  useEffect(() => {
    calculateMonthlyStats()
  }, [expenses, currentDate]) //요 두개 바뀔 때 마다 변경 

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/expenses') //비동기 
      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }
      const data = await response.json()
      setExpenses(data) //베열 상태로 변환된 데이터를 렌더링 
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }

  const calculateMonthlyStats = () => { //
    const stats: MonthlyStats = {} //결과 
    const year = currentDate.getFullYear() //js내장 객체
    const month = currentDate.getMonth() + 1

    expenses.forEach(expense => {
      // Parse date format "2023. 08. 17"
      const parts = expense.date.split('. ')
      const expenseYear = parseInt(parts[0])
      const expenseMonth = parseInt(parts[1])
      const expenseDay = parseInt(parts[2])

      // Only include expenses from current month
      if (expenseYear === year && expenseMonth === month) {
        const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(expenseDay).padStart(2, '0')}`

        if (!stats[dateKey]) {
          stats[dateKey] = { income: 0, expense: 0, total: 0 }
        }

        if (expense.type === 'income') {
          stats[dateKey].income += expense.amount
          stats[dateKey].total += expense.amount
        } else {
          stats[dateKey].expense += expense.amount
          stats[dateKey].total -= expense.amount
        }
      }
    })

    setMonthlyStats(stats)
  }

  /*
  [
  "2023-08-17": { income: 50000, expense: 10000, total: 40000 },
  "2023-08-18": { income: 0, expense: 7000, total: -7000 }
  ]

}

  */
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR')
  }

  const goToPreviousMonth = () => { //currentDaate
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  } //데이트 객체 만들고 업뎃 

  const isToday = (day: number) => { //내가 지금 보고 있는 칸.
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() && //값만 비교
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const renderCalendar = () => { // 달력 칸 생성
  const daysInMonth = getDaysInMonth(currentDate) // → 28 (2월이니까)
  const firstDay = getFirstDayOfMonth(currentDate) // → 6 (토요일 시작)
  const days = []
  const year = currentDate.getFullYear() // → 2025
  const month = currentDate.getMonth() + 1 // → 2 (2월)

  // ✅ 1일이 토요일이니까 앞에 6칸 빈 칸 넣기 (일~금)
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="border bg-gray-50" />)
    // 예시:
    // [ empty, empty, empty, empty, empty, empty ]
  }

  // ✅ 1일부터 28일까지 칸 만들기
  for (let day = 1; day <= daysInMonth; day++) {

    // 날짜 key 생성: "2025-02-03"
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    // 해당 날짜에 수입/지출 내역 가져오기
    const stats = monthlyStats[dateKey]
    const today = isToday(day) // 오늘 날짜면 배경 파란색

    // 달력 칸 push
    days.push(
      <div
        key={day}
        className={`border p-2 ${today ? 'bg-blue-50' : 'bg-white'}`}
      >
        {/* 날짜 표시 */}
        <div className={`text-sm mb-2 ${today ? 'text-blue-600' : 'text-gray-900'}`}>
          {day}
        </div>

        {/* ✅ 예시 설명 */}
        {/* day = 3 일 때 → monthlyStats["2025-02-03"] = { income: 50000 } */}
        {/* day = 10 일 때 → monthlyStats["2025-02-10"] = { expense: 20000 } */}

        {stats && (
          <div className="text-xs space-y-1">
            {stats.income > 0 && <div className="text-green-600">+{formatAmount(stats.income)}</div>}
            {stats.expense > 0 && <div className="text-red-600">-{formatAmount(stats.expense)}</div>}
            {(stats.income > 0 || stats.expense > 0) && (
              <div className={`pt-1 border-t ${stats.total >= 0 ? 'text-blue-600' : 'text-gray-600'}`}>
                {formatAmount(stats.total)}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
  /*
  stats = {
  income: 50000,
  expense: 10000,
  total: 40000
}
*/

  return days
}


  // Calculate monthly totals
  const monthlyTotals = Object.values(monthlyStats).reduce( //필터
    (acc, stats) => ({//누적 
      income: acc.income + stats.income,
      expense: acc.expense + stats.expense,
      total: acc.total + stats.total
    }),
    { income: 0, expense: 0, total: 0 }
  )

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-400">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 15l-5-5 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="text-center">
          <div className="text-xs text-white opacity-90">{currentDate.getFullYear()}</div>
          <div className="text-3xl font-semibold text-white">{currentDate.getMonth() + 1}</div>
          <div className="text-xs text-white opacity-75">
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentDate.getMonth()]}
          </div>
        </div>

        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 15l5-5-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <div
              key={day}
              className={`text-center text-sm font-medium py-2 ${
                index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0">
          {renderCalendar()}
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-600">총 수입: </span>
              <span className="font-medium text-green-600">
                {formatAmount(monthlyTotals.income)}원
              </span>
            </div>
            <div>
              <span className="text-gray-600">총 지출: </span>
              <span className="font-medium text-red-600">
                {formatAmount(monthlyTotals.expense)}원
              </span>
            </div>
          </div>
          <div>
            <span className="text-gray-600">총합: </span>
            <span className={`font-bold text-base ${
              monthlyTotals.total >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              {monthlyTotals.total >= 0 ? '+' : ''}{formatAmount(monthlyTotals.total)}원
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
