import type React from "react";
import { TextInput } from "./TextInput";
import { type ChangeEvent } from "react";

interface ModalProps {
  text: string;
  value: string;
  setValue: (e: any) => void;
  close: () => void;
  action: () => void;
  actionTitle: string;
  actionColor: string;
  disabled: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  text,
  action,
  actionTitle,
  actionColor,
  value,
  setValue,
  close,
  disabled,
}) => {
  return (
    <div className="fixed top-0 left-0 grid w-screen h-screen bg-gray-500/75 place-items-center z-50">
      <div className="flex flex-col w-[384px] h-[200px] bg-neutral-surface-default z-[100]">
        <div className="flex flex-col w-full h-[144px] px-[32px] py-[32px] justify-between border-[1px] border-neutral-border-default">
          <h2>{text}</h2>
          <TextInput
            disabled={disabled}
            value={value}
            onChange={setValue}
            placeholder="결제수단"
            isHollow={false}
            width={320}
          />
        </div>
        <div className="flex flex-row w-full h-[56px]">
          <button
            onClick={close}
            className="grid place-items-center h-full w-1/2 border-[1px] border-neutral-border-default"
          >
            취소
          </button>
          <button
            style={{ color: actionColor }}
            onClick={action}
            className="grid place-items-center h-full w-1/2 border-[1px] border-neutral-border-default"
          >
            {actionTitle}
          </button>
        </div>
      </div>
    </div>
  );
};
