import { useEffect, useRef, useState } from 'react';

export function Modal({
  open, title, children, onCancel, onConfirm,
  confirmText='확인', cancelText='취소', busy=false
}:{
  open:boolean; title:string; children?:React.ReactNode;
  onCancel:()=>void; onConfirm:()=>void; confirmText?:string; cancelText?:string; busy?:boolean;
}) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3 className="mb-3 title-sb-16">{title}</h3>
        <div className="mb-4 body-14 text-neutral-text-weak">{children}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn btn-secondary">{cancelText}</button>
          <button onClick={onConfirm} disabled={busy} className={`btn ${busy?'btn-disabled':'btn-primary'}`}>
            {busy ? '처리 중…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function InputModal({
  open, title, placeholder, initial='', onCancel, onSubmit, submitText='추가'
}:{
  open:boolean; title:string; placeholder?:string; initial?:string;
  onCancel:()=>void; onSubmit:(value:string)=>void; submitText?:string;
}) {
  const [v, setV] = useState(initial);
  useEffect(()=>{ if(open) setV(initial); }, [open, initial]);
  if (!open) return null;
  return (
    <Modal open={open} title={title} onCancel={onCancel} onConfirm={()=>onSubmit(v)} confirmText={submitText}>
      <input className="input" value={v} onChange={e=>setV(e.target.value)} placeholder={placeholder}/>
    </Modal>
  );
}
