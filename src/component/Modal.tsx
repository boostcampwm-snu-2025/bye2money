// src/components/Modal.tsx
import React, { PropsWithChildren } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function Modal({
  open,
  title,
  onClose,
  onConfirm,
  confirmText = "추가",
  cancelText = "취소",
  children,
}: PropsWithChildren<ModalProps>) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      {/* dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-md bg-white shadow-xl">
          {title && (
            <div className="px-6 pt-5 pb-3 text-center text-sm text-slate-700">
              {title}
            </div>
          )}
          <div className="px-6">{children}</div>
          <div className="mt-5 grid grid-cols-2 divide-x border-t">
            <button
              type="button"
              className="py-3 text-slate-600 hover:bg-slate-50"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="py-3 font-medium text-slate-900 hover:bg-slate-50"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
