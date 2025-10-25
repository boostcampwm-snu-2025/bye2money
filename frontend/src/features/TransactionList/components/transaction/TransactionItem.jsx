import { Trash2 } from "lucide-react";
import { CATEGORIES } from "../../categories.constants";

export default function TransactionItem({ t, selected, onSelect, onDelete }) {
  // 카테고리 색상은 고정되어 있는 건데, 아이템마다 참조하는 게 약간 마음에 안 들기는 하지만, 일단 이렇게 구현
  const color =
    CATEGORIES.find((c) => c.name === t.category)?.color || "";

  return (
    <button
      onClick={() => onSelect(t)}
      className="group flex justify-between items-center text-left hover:bg-gray-100"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-23 h-14 flex items-center justify-center text-xs text-black ${color}`}
        >
          {t.category || "기타"}
        </div>
        <span>{t.content}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-30">{t.payment}</span>
        <span
          className={`w-30 text-right mr-4 ${
            t.amount > 0
              ? "text-brand-text-income"
              : "text-brand-text-expense"
          }`}
        >
          {t.amount > 0
            ? `+${t.amount.toLocaleString()}`
            : t.amount.toLocaleString()}
          원
        </span>

        <Trash2
          size={14}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(t.id);
          }}
          className={`${
            selected?.id === t.id
              ? "block"
              : "hidden group-hover:block"
          } text-danger-text-default opacity-60 hover:opacity-100 cursor-pointer`}
        />
      </div>
    </button>
  );
}