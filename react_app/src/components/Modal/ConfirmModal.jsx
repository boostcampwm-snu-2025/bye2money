import "./modal.css";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "삭제",
  cancelText = "취소",
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <strong className="modal-title">{title}</strong>
        {message && <p className="modal-msg">{message}</p>}

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>
            {cancelText}
          </button>
          <button
            className="btn danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
