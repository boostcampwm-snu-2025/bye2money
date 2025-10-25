import type React from "react";
import type { Category } from "../types/types";
import { getBgColorClass, getLabel } from "../utils/typeHelpers";

interface CategoryTagProps {
  category: Category;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
  return <div className={getBgColorClass(category)}>{getLabel(category)}</div>;
};
