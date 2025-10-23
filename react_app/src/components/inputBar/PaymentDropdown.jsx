import { useEffect, useRef, useState } from "react";
import { useTransactions } from "../../context/TransactionContext";
import ConfirmModal from "../Modal/ConfirmModal";

export default function PaymentDropdown({ value, onChange }) {
  const { paymentMethods, deletePaymentMethod, addPaymentMethod } = useTransactions();
  const [open, setOpen] = useState(false);
  const [askDeleteId, setAskDeleteId] = useState(null);
  const [askAdd, setAskAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const ref = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const confirmDelete = () => {
    if (askDeleteId) deletePaymentMethod(askDeleteId);
  };

  const confirmAdd = () => {
    const name = newName.trim();
    if (!name) return;
    const pm = addPaymentMethod(name);
    onChange(pm.name);
    setNewName("");
    setAskAdd(false);
    setOpen(false);
  };

  return (
    <div className="field" ref={ref}>
      <label>결제수단</label>
      <button type="button" className="select" onClick={() => setOpen((o) => !o)}>
        {value || "결제수단 선택"}
      </button>

      {open && (
        <div className="dropdown">
          {paymentMethods.map((pm) => (
            <div key={pm.id} className="option row">
              <span onClick={() => { onChange(pm.name); setOpen(false); }}>{pm.name}</span>
              <button type="button" className="x" onClick={() => setAskDeleteId(pm.id)}>X</button>
            </div>
          ))}
          <div className="separator" />
          <div className="option add" onClick={() => setAskAdd(true)}>+ 추가하기</div>
        </div>
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        open={!!askDeleteId}
        title="해당 결제 수단을 삭제하시겠습니까?"
        message="삭제하면 기존 내역의 결제수단은 빈칸으로 남습니다."
        onConfirm={confirmDelete}
        onClose={() => setAskDeleteId(null)}
      />

      {/* Add new payment modal */}
      {askAdd && (
        <div className="modal-backdrop">
          <div className="modal">
            <strong className="modal-title">추가하실 결제 수단을 입력해주세요</strong>
            <input
              placeholder="예: 계좌이체"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength={20}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: 8,
                margin: "12px 0",
              }}
            />
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setAskAdd(false)}>취소</button>
              <button className="btn" onClick={confirmAdd}>추가</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
