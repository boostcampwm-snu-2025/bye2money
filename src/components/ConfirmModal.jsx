export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = "확인",
  cancelText = "취소",
  onlyOk = false,                 
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30">
      <div className="w-[420px] rounded bg-white p-5 shadow-lg">
        {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
        <p className="mb-5 text-gray-700 whitespace-pre-wrap">{message}</p>
        <div className="flex justify-end gap-2">
          {!onlyOk && (                         
            <button className="rounded border px-4 py-2" onClick={onClose}>
              {cancelText}
            </button>
          )}
          <button className={`rounded px-4 py-2 ${onlyOk ? "bg-black text-white" : "bg-red-600 text-white"}`}
                  onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
