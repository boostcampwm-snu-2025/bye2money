// src/components/SelectWithModal.tsx
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

type SelectWithModalProps = {
  label: string;                       // "결제수단" | "분류"
  placeholder?: string;                // "선택하세요"
  initialOptions: string[];            // 초기 옵션 목록
  value: string | null;                // 현재 선택 값
  onChange: (v: string) => void;       // 선택 시 부모로 전달
};

export default function SelectWithModal({
  label,
  placeholder = "선택하세요",
  initialOptions,
  value,
  onChange,
}: SelectWithModalProps) {
  const [open, setOpen] = useState(false);              // 드롭다운 열림
  const [options, setOptions] = useState<string[]>(initialOptions);
  const [addOpen, setAddOpen] = useState(false);        // 모달 열림
  const [newText, setNewText] = useState("");           // 모달 입력값
  const boxRef = useRef<HTMLDivElement>(null);

  // 클릭 바깥 감지 → 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const remove = (name: string) => {
    setOptions((prev) => prev.filter((x) => x !== name));
    if (value === name) onChange(""); // 선택했던 항목을 지우면 초기화
  };

  const confirmAdd = () => {
    const v = newText.trim();
    if (!v) return;
    if (!options.includes(v)) setOptions((prev) => [...prev, v]);
    onChange(v);
    setNewText("");
    setAddOpen(false);
    setOpen(false);
  };

  return (
    <div className="relative" ref={boxRef}>
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      {/* 상자 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-40 justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm hover:bg-slate-50 flex items-center"
      >
        <span className={value ? "" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <span className="ml-2 select-none">▾</span>
      </button>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-50 mt-1 w-56 overflow-hidden rounded-md border bg-white shadow-lg">
          {options.length === 0 && (
            <div className="px-4 py-3 text-sm text-slate-500">항목 없음</div>
          )}
          {options.map((opt, i) => (
            <div key={opt}>
              {i !== 0 && <div className="mx-4 h-px bg-slate-200" />}
              <div className="flex items-center justify-between px-4 py-2 text-sm">
                <button
                  type="button"
                  className="flex-1 text-left hover:underline"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
                {/* 삭제 아이콘(빨간 X) */}
                <button
                  type="button"
                  className="ml-3 text-red-500"
                  onClick={() => remove(opt)}
                  aria-label="옵션 삭제"
                  title="삭제"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          {/* 추가하기 */}
          <div className="mx-4 my-2 h-px bg-slate-200" />
          <button
            type="button"
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
            onClick={() => setAddOpen(true)}
          >
            추가하기
          </button>
        </div>
      )}

      {/* 추가하기 모달 */}
      <Modal
        open={addOpen}
        title={`추가하실 ${label}을 입력해주세요.`}
        onClose={() => setAddOpen(false)}
        onConfirm={confirmAdd}
        confirmText="추가"
        cancelText="취소"
      >
        <input
          autoFocus
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="placeholder"
          className="mb-5 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 focus:border-slate-500 focus:outline-none"
        />
      </Modal>
    </div>
  );
}
