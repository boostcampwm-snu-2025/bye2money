import type { ReactNode } from "react";
import { Button } from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText,
  cancelText,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[384px] border border-neutral-border bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-rows-[1fr_auto] gap-4 divide-y divide-neutral-border">
          <div className="flex flex-col gap-4 p-8">
            <h2 className="text-light-16">{title}</h2>
            {children}
          </div>

          <div className="grid grid-cols-2 divide-x divide-neutral-border">
            <Button
              layout="text"
              className="w-full !rounded-none py-4"
              label={cancelText}
              variant="ghost"
              onClick={onClose}
            />
            <Button
              layout="text"
              className="w-full !rounded-none py-4"
              variant="ghost"
              label={confirmText}
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
