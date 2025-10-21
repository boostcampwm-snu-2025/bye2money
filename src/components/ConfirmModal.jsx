export default function ConfirmModal({ open, title, message, confirmText="삭제", cancelText="취소", onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-[320px] rounded bg-white p-4 shadow">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-700">{message}</p>
        <div className="flex gap-2 justify-end">
          <button className="rounded border px-3 py-2" onClick={onClose}>{cancelText}</button>
          <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
