import { useEffect, useMemo, useReducer, useCallback } from "react";
import { useLedgerStore } from "../store/useLedgerStore";
import Dropdown from "./Dropdown";
import AddItemModal from "./AddItemModal";
import ConfirmModal from "./ConfirmModal";
import { comma, parseMoney } from "../utils/format";
import { startOfMonthISO, toYMD } from "../utils/date";

const MAX_MEMO = 32;

const initialForm = () => ({
  type: "expense",         
  date: toYMD(new Date()),  
  amount: "",               
  category: "",
  payment: "",
  memo: "",

  openAddPayment: false,
  openRemovePayment: false,
  targetPaymentToRemove: "",
});

const ACT = {
  INIT_FROM_EDIT: "INIT_FROM_EDIT",
  RESET: "RESET",
  SET_FIELD: "SET_FIELD",
  TOGGLE_TYPE: "TOGGLE_TYPE",
  OPEN_ADD: "OPEN_ADD",
  CLOSE_ADD: "CLOSE_ADD",
  OPEN_REMOVE: "OPEN_REMOVE",
  CLOSE_REMOVE: "CLOSE_REMOVE",
  CLEAR_PAYMENT_IF_REMOVED: "CLEAR_PAYMENT_IF_REMOVED",
};

function reducer(state, action) {
  switch (action.type) {
    case ACT.INIT_FROM_EDIT: {
      const r = action.payload;
      return {
        ...state,
        type: r.type,
        date: r.date,
        amount: comma(String(r.amount ?? "")),
        category: r.category || "",
        payment: r.payment || "",
        memo: r.memo || "",
      };
    }
    case ACT.RESET:
      return { ...initialForm(), payment: "" };
    case ACT.SET_FIELD:
      return { ...state, [action.field]: action.value };
    case ACT.TOGGLE_TYPE:
      return { ...state, type: state.type === "expense" ? "income" : "expense" };
    case ACT.OPEN_ADD:
      return { ...state, openAddPayment: true };
    case ACT.CLOSE_ADD:
      return { ...state, openAddPayment: false };
    case ACT.OPEN_REMOVE:
      return {
        ...state,
        openRemovePayment: true,
        targetPaymentToRemove: action.value || state.payment || "",
      };
    case ACT.CLOSE_REMOVE:
      return { ...state, openRemovePayment: false, targetPaymentToRemove: "" };
    case ACT.CLEAR_PAYMENT_IF_REMOVED:
      return state.payment === action.value ? { ...state, payment: "" } : state;
    default:
      return state;
  }
}

export default function EntryBar({ editTarget, onFinishEdit }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialForm);

  const currentMonth = useLedgerStore((s) => s.currentMonth);
  const categories = useLedgerStore((s) => s.categories);
  const payments = useLedgerStore((s) => s.payments);
  const addRecord = useLedgerStore((s) => s.addRecord);
  const updateRecord = useLedgerStore((s) => s.updateRecord);

  const catOptions = useMemo(() => {
    const c = state.type === "expense" ? categories?.expense : categories?.income;
    return Array.isArray(c) ? c : [];
  }, [state.type, categories]);

  // 편집 시작 시 값 주입
  useEffect(() => {
    if (editTarget) dispatch({ type: ACT.INIT_FROM_EDIT, payload: editTarget });
  }, [editTarget?.id]); 

  // 타입 변경 시 현재 카테고리가 옵션에 없으면 비우기
  useEffect(() => {
    if (!state.category) return;
    if (!catOptions.includes(state.category)) {
      dispatch({ type: ACT.SET_FIELD, field: "category", value: "" });
    }
  }, [state.type, catOptions, state.category]);

  // 편집 모드 변경 여부
  const isDirty = useMemo(() => {
    if (!editTarget) return false;
    const money = parseMoney(state.amount);
    return (
      editTarget.type !== state.type ||
      editTarget.date !== state.date ||
      (editTarget.amount ?? 0) !== money ||
      (editTarget.category ?? "") !== (state.category ?? "") ||
      (editTarget.payment ?? "") !== (state.payment ?? "") ||
      (editTarget.memo ?? "") !== (state.memo ?? "")
    );
  }, [editTarget, state]);

  // 유효성
  const valid = useMemo(() => {
    return (
      (state.type === "expense" || state.type === "income") &&
      !!state.date &&
      parseMoney(state.amount) > 0 &&
      !!state.category &&
      state.payment !== ""
    );
  }, [state]);

  // 제출
  const onSubmit = useCallback(() => {
    const money = parseMoney(state.amount);
    const today = toYMD(new Date()); // 로컬 기준

    if (state.date > today) {
      alert("미래 일자는 입력할 수 없습니다.");
      return;
    }
    if (money <= 0) {
      alert("금액을 입력하세요.");
      return;
    }
    if (money > 100_000_000) {
      alert("금액 상한(1억원)을 초과했습니다.");
      return;
    }
    if (state.memo.length > MAX_MEMO) {
      alert("메모는 32자 이내로 입력하세요.");
      return;
    }

    if (editTarget) {
      updateRecord(editTarget.id, {
        type: state.type,
        date: state.date,
        amount: money,
        category: state.category,
        payment: state.payment,
        memo: state.memo,
      });
      onFinishEdit?.();
      dispatch({ type: ACT.RESET });
      return;
    }

    addRecord({
      type: state.type,
      date: state.date,
      amount: money,
      category: state.category,
      payment: state.payment,
      memo: state.memo,
    });
    dispatch({ type: ACT.RESET });
  }, [state, editTarget, addRecord, updateRecord, onFinishEdit]);

  // 금액 입력 
  const onAmountChange = (e) => {
    const raw = e.target.value.replaceAll(",", "").replace(/[^\d]/g, "");
    dispatch({ type: ACT.SET_FIELD, field: "amount", value: comma(raw) });
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && valid) onSubmit();
  };

  const paymentsFooter = (
    <div className="flex items-center justify-between px-3 py-2">
      <button className="text-blue-600" onClick={() => dispatch({ type: ACT.OPEN_ADD })}>
        + 추가하기
      </button>
      {state.payment && (
        <button
          className="text-red-600"
          onClick={() => dispatch({ type: ACT.OPEN_REMOVE, value: state.payment })}
        >
          X 삭제
        </button>
      )}
    </div>
  );

  return (
    <section className="mb-4 rounded-lg bg-white p-3 shadow" onKeyDown={onKeyDown}>
      <div className="flex flex-wrap items-end gap-2">
        {/* 수입/지출 토글 */}
        <button
          onClick={() => dispatch({ type: ACT.TOGGLE_TYPE })}
          className={`rounded px-3 py-2 text-white ${
            state.type === "expense" ? "bg-expense" : "bg-income"
          }`}
          title={state.type === "expense" ? "지출 입력 중 (클릭 시 수입)" : "수입 입력 중 (클릭 시 지출)"}
        >
          {state.type === "expense" ? "− 지출" : "+ 수입"}
        </button>

        {/* 날짜 */}
        <input
          type="date"
          value={state.date}
          onChange={(e) => dispatch({ type: ACT.SET_FIELD, field: "date", value: e.target.value })}
          className="rounded border px-3 py-2"
          min={startOfMonthISO(currentMonth)}
        />

        {/* 금액 */}
        <input
          inputMode="numeric"
          value={state.amount}
          onChange={onAmountChange}
          placeholder="금액"
          className="w-36 rounded border px-3 py-2"
        />

        {/* 분류 */}
        <Dropdown
          value={state.category}
          onChange={(v) => dispatch({ type: ACT.SET_FIELD, field: "category", value: v })}
          options={catOptions}
          placeholder={state.type === "expense" ? "지출 분류" : "수입 분류"}
          className="w-40"
        />

        {/* 결제수단 */}
        <Dropdown
          value={state.payment}
          onChange={(v) => dispatch({ type: ACT.SET_FIELD, field: "payment", value: v })}
          options={Array.isArray(payments) ? payments : []}
          placeholder="결제수단"
          className="w-36"
          footer={paymentsFooter}
        />

        {/* 메모 + 글자수 */}
        <div className="relative flex-1 min-w-[180px]">
          <span className="pointer-events-none absolute left-2 top-1.5 select-none text-xs text-gray-500">
            {state.memo.length}/{MAX_MEMO}
          </span>
          <input
            value={state.memo}
            onChange={(e) =>
              dispatch({
                type: ACT.SET_FIELD,
                field: "memo",
                value: e.target.value.slice(0, MAX_MEMO),
              })
            }
            placeholder="내용(최대 32자)"
            className="w-full rounded border px-10 py-2"
          />
        </div>

        {/* 확인/완료 버튼 */}
        <button
          onClick={onSubmit}
          disabled={!valid || (editTarget ? !isDirty : false)}
          className="ml-auto rounded bg-black px-4 py-2 text-white disabled:opacity-40"
        >
          {editTarget ? "완료" : "확인"}
        </button>
      </div>

      {/* 모달들 */}
      <AddItemModal
        open={state.openAddPayment}
        title="추가하실 결제 수단을 입력해주세요."
        placeholder="예: 체크카드"
        onAdd={(name) => useLedgerStore.getState().addPayment(name)}
        onClose={() => dispatch({ type: ACT.CLOSE_ADD })}
      />

      <ConfirmModal
        open={state.openRemovePayment}
        title="결제 수단 삭제"
        message="해당 결제 수단을 삭제하시겠습니까?"
        confirmText="삭제"
        onConfirm={() => {
          const { removePayment } = useLedgerStore.getState();
          const removing = state.targetPaymentToRemove || state.payment;
          dispatch({ type: ACT.CLOSE_REMOVE });
          setTimeout(() => {
            removePayment(removing);
            dispatch({ type: ACT.CLEAR_PAYMENT_IF_REMOVED, value: removing });
          }, 1000);
        }}
        onClose={() => dispatch({ type: ACT.CLOSE_REMOVE })}
      />
    </section>
  );
}
