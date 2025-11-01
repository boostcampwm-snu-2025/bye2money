import { Badge } from "../../../shared/ui/Badge/Badge";
import { CATEGORY_COLORS } from "../model/categoryColors";
import type { CategoryKey } from "../model/categoryTypes";
import { categoryLabels } from "../model/categoryLabels";

interface CategoryBadgeProps {
  category: CategoryKey;
  className?: string;
}

export const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  return (
    <Badge
      label={categoryLabels[category]}
      colorClass={CATEGORY_COLORS[category]}
      className={className}
    />
  );
};
