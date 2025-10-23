import { useEffect, useRef, useState } from "react";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../../data/categories";

export default function CategoryDropdown({ type, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const list = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="field" ref={ref}>
      <label>분류</label>
      <button type="button" className="select" onClick={() => setOpen((o) => !o)}>
        {value || "카테고리 선택"}
      </button>

      {open && (
        <div className="dropdown">
          {list.map((name) => (
            <div
              key={name}
              className="option"
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
