import { useEffect, useReducer } from "react";
import { Check, MinusIcon, PlusIcon } from "lucide-react";
import PaymentDropdown from "../payment/PaymentDropdown";
import { CATEGORIES } from "../../categories.constants";

const MAX_CONTENT_LEN = 32; // 내용 글자 수 제한
const Today = () => new Date().toISOString().split("T")[0]; // YYYY-MM-DD
const initialState = {
  date: Today(), 
  amount: 0,
  content: "",
  payment: "",
  category: "",
  isExpense: true,
};

// Reducer 도입 (GPT의 도움을 받음)
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": // State처럼, 특정 값 수정
      return { ...state, [action.field]: action.value };
    case "TOGGLE_EXPENSE": // 수입 <> 지출 토글
      return { ...state, isExpense: !state.isExpense };
    case "FILL_SELECTED": // 선택된 항목이 있으면 채워넣기
      const s = action.payload;
      return { // selected 안 내용이 null인 건 배제 (애초에 생성될 때 예외 처리)
        ...state,
        date: s.date,
        amount: Math.abs(s.amount),
        content: s.content,
        payment: s.payment,
        category: s.category,
        isExpense: s.amount < 0, // 음수면 지출
      };
    case "RESET":
      return initialState; // 날짜 바뀌는 건 생각 X...
    default:
      return state;
  }
}

export default function TransactionInputBar({ onAdd, onEdit, selected, refreshTransactions }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { date, amount, content, payment, category, isExpense } = state;

  // 선택된 항목이 있으면 채워넣기
  useEffect(() => {
    if (selected) dispatch({ type: "FILL_SELECTED", payload: selected });
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 간단한 예외 처리
    if (!amount || !content || !payment || !category) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (content.length > MAX_CONTENT_LEN) {
      alert(`내용은 ${MAX_CONTENT_LEN}자 이내로 입력해주세요.`);
      return;
    }

    const newTransaction = {
      id: selected?.id || Date.now(), // transaction.length로 하는 id는 중복 가능성이 있어서, GPT가 추천해줌
      date,
      amount: isExpense ? -Math.abs(amount) : Math.abs(amount),
      content,
      payment,
      category,
    };

    if (selected) onEdit(newTransaction);
    else onAdd(newTransaction);
    
    dispatch({ type: "RESET" }); // 입력 후 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[894px] h-[76px] mt-[176px] border-[0.5px] bg-white flex items-center justify-center">
        <div className="flex items-center divide-x">
          
          {/* 일자 */}
          <div className="flex flex-col gap-1 px-4">
            <label className="w-22 font-sans font-light text-xs">일자</label>
            {/* @TODO: 사실 이 date 입력 부분은 헤더에서 넘어가는 거고, 여기서는 표시만 되는 것 같은데, 일단 이렇게 구현*/}
            <input
              className="font-sans font-semibold text-xs"
              type="date"
              value={date}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "date", value: e.target.value })}
            />
          </div>
          
          {/* 금액 */}
          <div className="flex flex-col gap-1 px-4">
            <label className="font-sans font-light text-xs">금액</label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => dispatch({ type: "TOGGLE_EXPENSE" })}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-100"
              >
                {isExpense ? <MinusIcon size={16}/> : <PlusIcon size={16}/>}
              </button>
              <input
                className="w-33 text-right font-sans font-semibold text-xs text-neutral-text-weak"
                type="number"
                min="0"
                value={amount}
                onChange={(e) => 
                  dispatch({
                    type: "SET_FIELD",
                    field: "amount",
                    value: Number(e.target.value || 0),
                  })
                }
              />
              <span>원</span>
            </div>
          </div>
          
          {/* 내용 */}
          <div className="flex flex-col gap-1 px-4">
            <div className="flex items-center justify-between gap-2">
              <label className="w-40 font-sans font-light text-xs">내용</label>
              <span className="w-8 text-right font-sans font-light text-xs text-neutral-text-weak">{content.length}/{MAX_CONTENT_LEN}</span>
            </div>
            <input
                className="w-full font-sans font-semibold text-xs text-neutral-text-weak"
                type="text"
                placeholder="입력하세요"
                value={content}
                onChange={(e) => 
                  dispatch({
                    type: "SET_FIELD",
                    field: "content",
                    value: e.target.value.slice(0, MAX_CONTENT_LEN),
                  })
                }
              />
          </div>

          {/* 결제수단 */}
          <div className="flex flex-col gap-1 px-4">
            <label className="w-26 font-sans font-light text-xs">결제수단</label>
            <PaymentDropdown 
              value={payment} 
              refreshTransactions={refreshTransactions}
              onSelect={(v) => dispatch({ type: "SET_FIELD", field: "payment", value: v })}
            />
          </div>
          
          {/* 분류 */}
          <div className="flex flex-col gap-1 px-4">
            <label className="w-26 font-sans font-light text-xs">분류</label>
            <select
              className="font-sans font-semibold text-xs text-neutral-text-weak"
              value={category}
              onChange={(e) => 
                dispatch({ type: "SET_FIELD", field: "category", value: e.target.value })
              }
            >
              <option value="" disabled hidden>선택하세요</option>
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
        >
          <Check size={20} />
        </button>
      </div>
    </form>
  );
}
