import { useEffect, useRef, useState } from 'react';
import type { PaymentMethod } from '../types/ledger';
import { InputModal, Modal } from './Modal';

export function PaymentMethodSelect({
  methods, value, onChange, onAdd, onRemove
}:{
  methods: PaymentMethod[];
  value: string;
  onChange: (id: string)=>void;
  onAdd: (name: string)=>void;
  onRemove: (id: string)=>void;
}) {
  const [open, setOpen] = useState(false);
  const [askAdd, setAskAdd] = useState(false);
  const [askRemove, setAskRemove] = useState<string|undefined>();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const onDoc = (e: MouseEvent)=>{
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return ()=>document.removeEventListener('mousedown', onDoc);
  }, []);

  const current = methods.find(m=>m.id===value);

  return (
    <div className="relative w-full" ref={wrapRef}>
      <button type="button" onClick={()=>setOpen(v=>!v)}
              className="w-full bg-transparent text-left outline-none flex items-center justify-between">
        <span className="flex-1">{current?.name ?? '선택하세요'}</span>
        <svg className="w-4 h-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 top-full left-0 w-full mt-0 border border-zinc-200 bg-white shadow-lg">
          <ul className="max-h-64 overflow-auto">
            {methods.map((m, idx) => (
              <li key={m.id}>
                <div className="flex items-center justify-between px-2 py-1.5 hover:bg-zinc-50">
                  <button 
                    className="flex-1 truncate text-left body-14 text-zinc-900" 
                    onClick={()=>{ onChange(m.id); setOpen(false); }}
                  >
                    {m.name}
                  </button>
                  <button 
                    className="shrink-0 ml-2 w-4 h-4 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
                    aria-label={`${m.name} 삭제`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setAskRemove(m.id);
                    }}
                  >
                    <span className="text-xs leading-none">✕</span>
                  </button>
                </div>
                {idx < methods.length - 1 && <div className="h-px bg-zinc-200"></div>}
              </li>
            ))}
          </ul>
          <div className="h-px bg-zinc-200"></div>
          <button 
            className="w-full px-2 py-1.5 text-left body-14 text-zinc-900 hover:bg-zinc-50"
            onClick={()=>setAskAdd(true)}
          >
            추가하기
          </button>
        </div>
      )}

      <InputModal open={askAdd} title="추가하실 결제 수단을 입력하세요"
                  placeholder="예: 현대카드" onCancel={()=>setAskAdd(false)}
                  onSubmit={(name)=>{
                    const n = name.trim();
                    if(n){ onAdd(n); setAskAdd(false); }
                  }} submitText="추가"/>

      <Modal open={!!askRemove} title="해당 결제 수단을 삭제하시겠습니까?"
             onCancel={()=>setAskRemove(undefined)} onConfirm={()=>{
               if(askRemove){ onRemove(askRemove); setAskRemove(undefined); }
             }} confirmText="삭제">
        삭제 시 해당 결제수단이 지정된 내역의 결제수단은 빈칸으로 남습니다.
      </Modal>
    </div>
  );
}
