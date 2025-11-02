import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Types
export interface Expense {
  id: string
  date: string
  amount: number
  description: string
  paymentMethod: string
  category: string
  type: 'income' | 'expense'
  createdAt: string
}

interface ExpenseState {
  expenses: Expense[]
  loading: boolean
  error: string | null
}

// Action Types - Flux 패턴의 액션 정의
type ExpenseAction =
  | { type: 'FETCH_EXPENSES_START' }
  | { type: 'FETCH_EXPENSES_SUCCESS'; payload: Expense[] }
  | { type: 'FETCH_EXPENSES_ERROR'; payload: string }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }

// Reducer - Flux 패턴의 Store 로직
function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case 'FETCH_EXPENSES_START':
      return {
        ...state,
        loading: true,
        error: null
      }

    case 'FETCH_EXPENSES_SUCCESS':
      return {
        ...state,
        expenses: action.payload,
        loading: false,
        error: null
      }

    case 'FETCH_EXPENSES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      }

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      }

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      }

    default:
      return state
  }
}

// Context
interface ExpenseContextType {
  state: ExpenseState
  dispatch: React.Dispatch<ExpenseAction>
  fetchExpenses: () => Promise<void>
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>
  updateExpense: (id: string, expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined)

// Provider
interface ExpenseProviderProps {
  children: ReactNode
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [state, dispatch] = useReducer(expenseReducer, {
    expenses: [],
    loading: false,
    error: null
  })

  // Fetch expenses from API
  const fetchExpenses = async () => {
    dispatch({ type: 'FETCH_EXPENSES_START' })
    try {
      const response = await fetch('http://localhost:8000/api/expenses')
      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }
      const data = await response.json()
      dispatch({ type: 'FETCH_EXPENSES_SUCCESS', payload: data })
    } catch (error) {
      dispatch({
        type: 'FETCH_EXPENSES_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Add new expense
  const addExpense = async (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('http://localhost:8000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      })
      if (!response.ok) {
        throw new Error('Failed to add expense')
      }
      const newExpense = await response.json()
      dispatch({ type: 'ADD_EXPENSE', payload: newExpense })
    } catch (error) {
      console.error('Error adding expense:', error)
      throw error
    }
  }

  // Update expense
  const updateExpense = async (id: string, expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`http://localhost:8000/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      })
      if (!response.ok) {
        throw new Error('Failed to update expense')
      }
      const updatedExpense = await response.json()
      dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense })
    } catch (error) {
      console.error('Error updating expense:', error)
      throw error
    }
  }

  // Delete expense
  const deleteExpense = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/expenses/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete expense')
      }
      // 1초 지연 후 삭제 (기존 로직 유지)
      setTimeout(() => {
        dispatch({ type: 'DELETE_EXPENSE', payload: id })
      }, 1000)
    } catch (error) {
      console.error('Error deleting expense:', error)
      throw error
    }
  }

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpenses()
  }, [])

  const value = {
    state,
    dispatch,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense
  }

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}

// Custom Hook
export function useExpenses() {
  const context = useContext(ExpenseContext)
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider')
  }
  return context
}
