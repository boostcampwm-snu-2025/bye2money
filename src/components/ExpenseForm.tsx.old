import { useState, useEffect, useRef } from 'react'
import AddOptionModal from './AddOptionModal'

interface ExpenseFormData {
  date: string
  amount: number
  description: string
  paymentMethod: string
  category: string
  type: 'income' | 'expense'
}

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

interface ExpenseFormProps {
  editingExpense: Expense | null
  onClearEdit: () => void
  onExpenseUpdated: () => void
}

function ExpenseForm({ editingExpense, onClearEdit, onExpenseUpdated }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: '2023. 08. 17',
    amount: 0,
    description: '',
    paymentMethod: '',
    category: '',
    type: 'expense'
  })

  // 결제수단 관리 state
  const [paymentMethods, setPaymentMethods] = useState<string[]>(['현대카드', '국민카드', '현금'])
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false)
  const [isPaymentAddModalOpen, setIsPaymentAddModalOpen] = useState(false)
  const [isPaymentDeleteModalOpen, setIsPaymentDeleteModalOpen] = useState(false)
  const [paymentToDelete, setPaymentToDelete] = useState<string>('')
  const paymentDropdownRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target as Node)) {
        setIsPaymentDropdownOpen(false)
      }
    }

    if (isPaymentDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPaymentDropdownOpen])

  // 수정 모드: editingExpense가 변경될 때 formData 업데이트
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        date: editingExpense.date,
        amount: editingExpense.amount,
        description: editingExpense.description,
        paymentMethod: editingExpense.paymentMethod,
        category: editingExpense.category,
        type: editingExpense.type
      })
    }
  }, [editingExpense])

  // 수입/지출 타입에 따른 결제수단 옵션 (동일하게 사용)
  const paymentMethodOptions = {
    income: paymentMethods,
    expense: paymentMethods
  }

  // 수입/지출 타입에 따른 카테고리 옵션
  const categoryOptions = {
    income: [
      { value: '월급', label: '월급' },
      { value: '용돈', label: '용돈' },
      { value: '기타수입', label: '기타수입' }
    ],
    expense: [
      { value: '생활', label: '생활' },
      { value: '식비', label: '식비' },
      { value: '교통', label: '교통' },
      { value: '쇼핑/뷰티', label: '쇼핑/뷰티' },
      { value: '의료/건강', label: '의료/건강' },
      { value: '문화/여가', label: '문화/여가' },
      { value: '미분류', label: '미분류' }
    ]
  }

  // 모든 필드가 입력되었는지 확인
  const isFormValid = () => {
    return formData.date !== '' &&
           formData.amount > 0 &&
           formData.description.trim() !== '' &&
           formData.paymentMethod !== '' &&
           formData.category !== ''
  }

  // 수정 모드에서 변경사항이 있는지 확인
  const hasChanges = () => {
    if (!editingExpense) return true // 생성 모드는 항상 true

    return formData.date !== editingExpense.date ||
           formData.amount !== editingExpense.amount ||
           formData.description !== editingExpense.description ||
           formData.paymentMethod !== editingExpense.paymentMethod ||
           formData.category !== editingExpense.category ||
           formData.type !== editingExpense.type
  }

  // 버튼 활성화 조건: 모든 필드 입력 && (생성 모드 또는 수정사항이 있음)
  const isButtonEnabled = () => {
    return isFormValid() && hasChanges()
  }

  const handleSubmit = async () => {
    // 유효성 검증
    if (!isFormValid()) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    // 날짜 형식 검증
    const dateRegex = /^\d{4}\.\s\d{2}\.\s\d{2}$/
    if (!dateRegex.test(formData.date)) {
      alert('날짜 형식이 올바르지 않습니다. (예: 2023. 08. 17)')
      return
    }

    // 금액 검증
    if (formData.amount <= 0) {
      alert('금액은 0보다 커야 합니다.')
      return
    }

    // 내용 길이 검증
    if (formData.description.length > 32) {
      alert('내용은 32자 이내로 입력해주세요.')
      return
    }

    try {
      const isEditMode = editingExpense !== null
      const url = isEditMode
        ? `http://localhost:8000/api/expenses/${editingExpense.id}`
        : 'http://localhost:8000/api/expenses'
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(isEditMode ? 'Failed to update expense' : 'Failed to create expense')
      }

      const data = await response.json()
      console.log(isEditMode ? 'Expense updated:' : 'Expense created:', data)

      // 폼 초기화
      setFormData({
        date: '2023. 08. 17',
        amount: 0,
        description: '',
        paymentMethod: '',
        category: '',
        type: 'expense'
      })

      // 수정 모드 해제
      if (isEditMode) {
        onClearEdit()
        onExpenseUpdated()
      }

      alert(isEditMode
        ? '수정되었습니다!'
        : (formData.type === 'income' ? '수입이 저장되었습니다!' : '지출이 저장되었습니다!'))

      // 페이지 새로고침하여 목록 업데이트 (생성 시에만)
      if (!isEditMode) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('저장에 실패했습니다.')
    }
  }

  // 타입 변경 시 결제수단과 카테고리 초기화
  const handleTypeChange = (newType: 'income' | 'expense') => {
    setFormData({
      ...formData,
      type: newType,
      paymentMethod: '',
      category: ''
    })
  }

  // 결제수단 추가
  const handleAddPaymentMethod = (newMethod: string) => {
    if (newMethod.trim() && !paymentMethods.includes(newMethod)) {
      setPaymentMethods([...paymentMethods, newMethod])
      setFormData({ ...formData, paymentMethod: newMethod })
    }
    setIsPaymentAddModalOpen(false)
  }

  // 결제수단 삭제 확인
  const handleDeletePaymentMethodConfirm = (method: string) => {
    setPaymentToDelete(method)
    setIsPaymentDeleteModalOpen(true)
  }

  // 결제수단 삭제 실행
  const handleDeletePaymentMethod = () => {
    setPaymentMethods(paymentMethods.filter(m => m !== paymentToDelete))
    // 현재 선택된 결제수단이 삭제되는 경우 빈칸으로 설정
    if (formData.paymentMethod === paymentToDelete) {
      setFormData({ ...formData, paymentMethod: '' })
    }
    setIsPaymentDeleteModalOpen(false)
    setPaymentToDelete('')
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => { //사용자가 입력한 객체
    const value = e.target.value
    if (value.length <= 32) {
      setFormData({ ...formData, description: value }) //descritiona만 바꾸는 것. 나머지는 유지
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormData({ ...formData, amount: parseInt(value) || 0 })
  }

  return (
    <div ref={formRef} className="flex items-center bg-white px-6 py-5 rounded-xl border border-gray-200 gap-0 w-full max-w-full overflow-x-auto">
      {/* 수입/지출 타입 */}
      <div className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[120px]">
        <label className="text-xs text-gray-500 font-normal whitespace-nowrap">구분</label>
        <select
          value={formData.type}
          onChange={(e) => handleTypeChange(e.target.value as 'income' | 'expense')}
          className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23999%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_center] pr-6"
        >
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
      </div>

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
      <div ref={paymentDropdownRef} className="flex flex-col gap-1 px-4 py-2 border-r border-gray-200 min-w-[140px] relative">
        <label className="text-xs text-gray-500 font-normal whitespace-nowrap">결제수단</label>
        <div
          onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
          className="text-base font-medium text-gray-900 outline-none bg-transparent border-0 p-0 cursor-pointer flex items-center justify-between"
        >
          <span>{formData.paymentMethod || '선택하세요'}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-2">
            <path d="M1 1L5 5L9 1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* 커스텀 드롭다운 패널 */}
        {isPaymentDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            <div
              onClick={() => {
                setFormData({ ...formData, paymentMethod: '' })
                setIsPaymentDropdownOpen(false)
              }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-500"
            >
              선택하세요
            </div>
            {paymentMethodOptions[formData.type].map((method) => (
              <div
                key={method}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between group"
              >
                <span
                  onClick={() => {
                    setFormData({ ...formData, paymentMethod: method })
                    setIsPaymentDropdownOpen(false)
                  }}
                  className="flex-1 text-sm text-gray-900"
                >
                  {method}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePaymentMethodConfirm(method)
                    setIsPaymentDropdownOpen(false)
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity ml-2"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
            <div
              onClick={() => {
                setIsPaymentAddModalOpen(true)
                setIsPaymentDropdownOpen(false)
              }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-blue-500 font-medium border-t border-gray-200"
            >
              + 추가하기
            </div>
          </div>
        )}
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
          {categoryOptions[formData.type].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!isButtonEnabled()}
        className={`w-12 h-12 rounded-full border-0 flex items-center justify-center flex-shrink-0 ml-4 transition-colors ${
          isButtonEnabled()
            ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* 결제수단 추가 모달 */}
      <AddOptionModal
        isOpen={isPaymentAddModalOpen}
        onClose={() => setIsPaymentAddModalOpen(false)}
        onAdd={handleAddPaymentMethod}
        title="추가하실 결제 수단을 입력해주세요"
      />

      {/* 결제수단 삭제 확인 모달 */}
      {isPaymentDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setIsPaymentDeleteModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              해당 결제 수단을 삭제하시겠습니까?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              삭제한 결제수단으로 작성된 수입지출내역은 빈칸으로 남습니다.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsPaymentDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleDeletePaymentMethod}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
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
//신경쓴 부분은 handle함수 만든 이유. 제약을 걸기 위한 것.
export default ExpenseForm
