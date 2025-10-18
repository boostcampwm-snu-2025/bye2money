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
    <div className="relative" ref={wrapRef}>
      <button type="button" onClick={()=>setOpen(v=>!v)}
              className="w-full rounded bg-transparent text-left outline-none">
        {current?.name ?? '선택하세요'}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-56 rounded-xl border bg-white p-1 shadow">
          <ul className="max-h-64 overflow-auto">
            {methods.map(m=>(
              <li key={m.id} className="group flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-zinc-50">
                <button className="truncate text-left" onClick={()=>{ onChange(m.id); setOpen(false); }}>
                  {m.name}
                </button>
                <button className="invisible rounded px-1.5 py-0.5 text-xs text-zinc-500 hover:bg-zinc-100 group-hover:visible"
                        aria-label={`${m.name} 삭제`} onClick={()=>setAskRemove(m.id)}>✕</button>
              </li>
            ))}
          </ul>
          <div className="mt-1 border-t pt-1">
            <button className="w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-zinc-50"
                    onClick={()=>setAskAdd(true)}>＋ 추가하기</button>
          </div>
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
