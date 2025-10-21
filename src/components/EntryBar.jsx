import { useEffect, useMemo, useState } from "react";
import { useLedgerStore } from "../store/useLedgerStore";
import Dropdown from "./Dropdown";
import AddItemModal from "./AddItemModal";
import ConfirmModal from "./ConfirmModal";
import { comma, parseMoney } from "../utils/format";
import { startOfMonthISO, toYMD } from "../utils/date";

const MAX_MEMO = 32;

export default function EntryBar({ editTarget, onFinishEdit }) {
  const currentMonth = useLedgerStore((s) => s.currentMonth);
  const categories = useLedgerStore((s) => s.categories);
  const payments = useLedgerStore((s) => s.payments);
  const addRecord = useLedgerStore((s) => s.addRecord);
  const updateRecord = useLedgerStore((s) => s.updateRecord);

  const [type, setType] = useState("expense"); // expense | income
  const [date, setDate] = useState(() => toYMD(new Date()));
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");
  const [memo, setMemo] = useState("");

  const [openAddPayment, setOpenAddPayment] = useState(false);
  const [openRemovePayment, setOpenRemovePayment] = useState(false);
  const [targetPaymentToRemove, setTargetPaymentToRemove] = useState("");

  useEffect(() => {
    if (!editTarget) return;
    setType(editTarget.type);
    setDate(editTarget.date);
    setAmount(editTarget.amount.toString());
    setCategory(editTarget.category || "");
    setPayment(editTarget.payment || "");
    setMemo(editTarget.memo || "");
  }, [editTarget?.id]);

  const catOptions = type === "expense" ? categories.expense : categories.income;

  const isDirty = useMemo(() => {
    if (!editTarget) return false;
    const money = parseMoney(amount);
    return (
      editTarget.type !== type ||
      editTarget.date !== date ||
      (editTarget.amount ?? 0) !== money ||
      (editTarget.category ?? "") !== (category ?? "") ||
      (editTarget.payment ?? "") !== (payment ?? "") ||
      (editTarget.memo ?? "") !== (memo ?? "")
    );
  }, [editTarget, type, date, amount, category, payment, memo]);

  const valid = useMemo(() => {
    return (
      (type === "expense" || type === "income") &&
      date &&
      parseMoney(amount) > 0 &&
      category &&
      payment !== undefined
    );
  }, [type, date, amount, category, payment]);

  const reset = () => {
    setType("expense");
    setDate(toYMD(new Date()));
    setAmount("");
    setCategory("");
    setPayment("");
    setMemo("");
  };

  const onSubmit = () => {
    const money = parseMoney(amount);
    const todayISO = new Date().toISOString().slice(0, 10);
    if (date > todayISO) {
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
    if (memo.length > MAX_MEMO) {
      alert("메모는 32자 이내로 입력하세요.");
      return;
    }

    if (editTarget) {
      updateRecord(editTarget.id, { type, date, amount: money, category, payment, memo });
      onFinishEdit?.();
      reset();
      return;
    }

    addRecord({ type, date, amount: money, category, payment, memo });
    reset();
  };

  const onAmountChange = (e) => {
    const raw = e.target.value.replaceAll(",", "").replace(/[^\d]/g, "");
    setAmount(comma(raw));
  };

  const paymentsFooter = (
    <div className="flex items-center justify-between px-3 py-2">
      <button className="text-blue-600" onClick={() => setOpenAddPayment(true)}>
        + 추가하기
      </button>
      {payment && (
        <button
          className="text-red-600"
          onClick={() => {
            setTargetPaymentToRemove(payment);
            setOpenRemovePayment(true);
          }}
        >
          X 삭제
        </button>
      )}
    </div>
  );

  return (
    <section className="mb-4 rounded-lg bg-white p-3 shadow">
      <div className="flex flex-wrap items-end gap-2">
        {/* 수입/지출 토글 버튼 */}
        <button
          onClick={() => setType(type === "expense" ? "income" : "expense")}
          className={`rounded px-3 py-2 text-white ${type === "expense" ? "bg-expense" : "bg-income"}`}
          title={type === "expense" ? "지출 입력 중 (클릭 시 수입)" : "수입 입력 중 (클릭 시 지출)"}
        >
          {type === "expense" ? "− 지출" : "+ 수입"}
        </button>

        {/* 날짜 */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded border px-3 py-2"
          min={startOfMonthISO(currentMonth)}
        />

        {/* 금액 */}
        <input
          inputMode="numeric"
          value={amount}
          onChange={onAmountChange}
          placeholder="금액"
          className="w-36 rounded border px-3 py-2"
        />

        {/* 분류 */}
        <Dropdown
          value={category}
          onChange={setCategory}
          options={catOptions}
          placeholder={type === "expense" ? "지출 분류" : "수입 분류"}
          className="w-40"
        />

        {/* 결제수단 */}
        <Dropdown
          value={payment}
          onChange={setPayment}
          options={payments}
          placeholder="결제수단"
          className="w-36"
          footer={paymentsFooter}
        />

        {/* 메모 (좌측 글자수 카운트) */}
        <div className="relative flex-1">
          <span className="absolute left-2 top-1.5 text-xs text-gray-500">
            {memo.length}/{MAX_MEMO}
          </span>
          <input
            value={memo}
            onChange={(e) => setMemo(e.target.value.slice(0, MAX_MEMO))}
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
        open={openAddPayment}
        title="추가하실 결제 수단을 입력해주세요."
        placeholder="예: 체크카드"
        onAdd={(name) => useLedgerStore.getState().addPayment(name)}
        onClose={() => setOpenAddPayment(false)}
      />
      <ConfirmModal
        open={openRemovePayment}
        title="결제 수단 삭제"
        message="해당 결제 수단을 삭제하시겠습니까?"
        confirmText="삭제"
        onConfirm={() => {
          const { removePayment } = useLedgerStore.getState();
          setTimeout(() => removePayment(targetPaymentToRemove), 1000); // 1초 지연
          setOpenRemovePayment(false);
        }}
        onClose={() => setOpenRemovePayment(false)}
      />
    </section>
  );
}
