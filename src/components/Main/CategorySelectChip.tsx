import type React from "react";
import { useSpendingEditStore } from "../../store/useSpendingEditStore";
import { useDropdownStore } from "../../store/useDropdownStore";
import type { Category } from "../../types/types";
import { getLabel } from "../../utils/typeHelpers";

interface CategorySelectChipProps {
  category: Category;
}
export const CategorySelectChip: React.FC<CategorySelectChipProps> = ({
  category,
}) => {
  const { closeCategoryDropdown } = useDropdownStore();
  const { setCategory } = useSpendingEditStore();
  return (
    <button
      className="flex flex-row items-center h-[56px] w-[152px] px-[24px]"
      onClick={() => {
        setCategory(category);
        closeCategoryDropdown();
      }}
    >
      {getLabel(category)}
    </button>
  );
};
