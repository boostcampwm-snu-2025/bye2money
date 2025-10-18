import type { CategoryKey } from "./categoryTypes";

export const categoryColors: Record<CategoryKey, string> = {
  livingExpenses: "bg-colorchip-90",
  shoppingBeauty: "bg-colorchip-30",
  medicalHealth: "bg-colorchip-50",
  food: "bg-colorchip-60",
  transportation: "bg-colorchip-70",
  entertainmentLeisure: "bg-colorchip-100",
  uncategorized: "bg-colorchip-110",
  salary: "bg-colorchip-20",
  otherIncome: "bg-colorchip-10",
  allowance: "bg-colorchip-120",
} as const;
