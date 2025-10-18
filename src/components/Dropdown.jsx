import { useState, useRef, useEffect } from "react";

export default function Dropdown({ value, onChange, options, placeholder="선택", className, footer }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <button type="button" className="w-full rounded border bg-white px-3 py-2 text-left"
              onClick={() => setOpen(v => !v)}>
        {value || <span className="text-gray-400">{placeholder}</span>}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
          <ul className="max-h-64 overflow-auto py-2">
            {options.map(opt => (
              <li key={opt}>
                <button type="button"
                        className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${value===opt ? "bg-gray-50":""}`}
                        onClick={() => { onChange(opt); setOpen(false); }}>
                  {opt}
                </button>
              </li>
            ))}
            {footer && <li className="border-t pt-2">{footer}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
