import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "../../categories.constants";

const INCOME_CATEGORIES = ["월급", "기타 수입", "용돈"];

export default function CategoryDropdown({ value, onSelect, isExpense }) {
  const [isOpen, setIsOpen] = useState(false);
  const filteredCategories = CATEGORIES.filter((c) =>
    isExpense
        ? !INCOME_CATEGORIES.includes(c.name)
        : INCOME_CATEGORIES.includes(c.name)
    );

  return (
    <div className="relative inline-block">
      <div 
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <span className="font-sans font-semibold text-xs text-neutral-text-weak">
          {value || "선택하세요"}
        </span>
        <ChevronDown
          size={14}
          className={`ml-1 transition-transform duration-150 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="w-34 absolute top-full mt-5 bg-white translate-x-[-16px] border-[0.5px] border-t-0 flex divide-y flex-col items-center">
          {filteredCategories.map((c) => (
            <div 
              key={c.name}
              className="w-30 flex items-center justify-between gap-2 p-4"
            >
              <span
                className="font-sans font-light text-xs"
                onClick={() => {
                  onSelect(c.name);
                  setIsOpen(false);
                }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}