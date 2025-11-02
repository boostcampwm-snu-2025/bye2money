import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ConfirmModal from "../Modal/ConfirmModal";
import "./paymentdropdown.css";

export default function PaymentDropdown({
  value,
  onChange,
  verticalGap = 14,
}) {
  // Local payment method list (no context)
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "cash", name: "현금" },
    { id: "visa", name: "VISA카드" },
  ]);

  const [open, setOpen] = useState(false);
  const [askDeleteId, setAskDeleteId] = useState(null);
  const [askAdd, setAskAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [menuStyle, setMenuStyle] = useState({});
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Calculate dropdown position relative to the button
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMenuStyle({
        position: "absolute",
        top: `${rect.bottom + verticalGap}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
  }, [open, verticalGap]);

  // Delete and add handlers
  const confirmDelete = () => {
    setPaymentMethods((prev) => prev.filter((p) => p.id !== askDeleteId));
    setAskDeleteId(null);
  };

  const confirmAdd = () => {
    const name = newName.trim();
    if (!name) return;
    const newPm = { id: Math.random().toString(36).slice(2), name };
    setPaymentMethods((prev) => [...prev, newPm]);
    onChange(name);
    setNewName("");
    setAskAdd(false);
    setOpen(false);
  };

  // Floating dropdown menu (rendered via portal)
  const dropdownMenu = (
    <div className="dropdown-menu" style={menuStyle}>
      {paymentMethods.map((pm) => (
        <div key={pm.id} className="option row">
          <span
            onClick={() => {
              onChange(pm.name);
              setOpen(false);
            }}
            className="option-text"
          >
            {pm.name}
          </span>
          <button
            type="button"
            className="x"
            onClick={() => setAskDeleteId(pm.id)}
          >
            ×
          </button>
        </div>
      ))}
      <div className="separator" />
      <div className="option add" onClick={() => setAskAdd(true)}>
        + 추가하기
      </div>
    </div>
  );

  return (
    <div ref={ref} className="dropdown-wrapper">
      <button
        type="button"
        className="select"
        onClick={() => setOpen((o) => !o)}
      >
        {value || "결제수단 선택"}
      </button>

      {open && createPortal(dropdownMenu, document.body)}

      {/* Delete confirmation modal */}
      <ConfirmModal
        open={!!askDeleteId}
        title="해당 결제 수단을 삭제하시겠습니까?"
        message="삭제하면 기존 내역의 결제수단은 빈칸으로 남습니다."
        onConfirm={confirmDelete}
        onClose={() => setAskDeleteId(null)}
      />

      {/* Add modal */}
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
              <button className="btn ghost" onClick={() => setAskAdd(false)}>
                취소
              </button>
              <button className="btn" onClick={confirmAdd}>
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
