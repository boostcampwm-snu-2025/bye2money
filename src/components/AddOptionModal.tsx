import { useState } from 'react'

interface AddOptionModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (value: string) => void
  title: string
}

function AddOptionModal({ isOpen, onClose, onAdd, title }: AddOptionModalProps) {
  const [inputValue, setInputValue] = useState('')

  if (!isOpen) return null

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim())
      setInputValue('')
      onClose()
    }
  }

  const handleCancel = () => {
    setInputValue('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[400px]">
        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="placeholder"
            className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-base outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
              if (e.key === 'Escape') handleCancel()
            }}
            autoFocus
          />
        </div>

        {/* Buttons */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 text-base text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-200"
          >
            취소
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 py-3 text-base text-gray-900 font-medium hover:bg-gray-50 transition-colors"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddOptionModal
