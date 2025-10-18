import { useState } from "react";

export default function AddItemModal({ open, title="추가", placeholder="이름", onAdd, onClose }) {
  const [name, setName] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-[320px] rounded bg-white p-4 shadow">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <input value={name} onChange={e=>setName(e.target.value)} maxLength={32}
               className="mb-4 w-full rounded border px-3 py-2" placeholder={placeholder}/>
        <div className="flex gap-2 justify-end">
          <button className="rounded border px-3 py-2" onClick={onClose}>취소</button>
          <button className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
                  disabled={!name.trim()}
                  onClick={() => { onAdd(name.trim()); setName(""); onClose(); }}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
