import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../../data/categories";
import "./categorydropdown.css";

export default function CategoryDropdown({
  type,
  value,
  onChange,
  verticalGap = 14,
}) {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const ref = useRef(null);
  const list = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // When dropdown opens, calculate position relative to viewport
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMenuStyle({
        position: "absolute",
        top: `${rect.bottom + verticalGap}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
  }, [open, verticalGap]);

  const menu = (
    <div className="dropdown-menu" style={menuStyle}>
      {list.map((name, idx) => (
        <div
          key={name}
          className={`dropdown-item ${
            idx < list.length - 1 ? "with-line" : ""
          }`}
          onClick={() => {
            onChange(name);
            setOpen(false);
          }}
        >
          {name}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={ref} className="dropdown-wrapper">
      <button
        type="button"
        className="select"
        onClick={() => setOpen((o) => !o)}
      >
        {value || "카테고리 선택"}
      </button>

      {open && createPortal(menu, document.body)} {/* ✅ render to body */}
    </div>
  );
}
