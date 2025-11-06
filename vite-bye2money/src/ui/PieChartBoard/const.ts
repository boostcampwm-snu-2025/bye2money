import type { CategoryTagTone } from "../../types/types";

export const CATEGORY_COLORS: Record<CategoryTagTone, string> = {
	life: "var(--token-colorchip-90)",
	shopping_beauty: "var(--token-colorchip-30)",
	medical_health: "var(--token-colorchip-50)",
	food: "var(--token-colorchip-60)",
	transportation: "var(--token-colorchip-70)",
	culture_leisure: "var(--token-colorchip-100)",
	salary: "var(--token-colorchip-20)",
	other_income: "var(--token-colorchip-10)",
	allowance: "var(--token-colorchip-40)",
	unclassified: "var(--token-colorchip-110)",
};

export const CATEGORY_COLORS_ORDERED: string[] = Object.values(CATEGORY_COLORS);
