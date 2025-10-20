import type React from "react";

const CATEGORIES = {
  LIVING: "living",
  SHOPPING_BEAUTY: "shoppingBeauty",
  MEDICAL_HEALTH: "medicalHealth",
  FOOD: "food",
  TRANSPORT: "transport",
  CULTURE_LEISURE: "cultureLeisure",
  UNCLASSIFIED: "unclassified",
  SALARY: "salary",
  OTHER_INCOME: "otherIncome",
  ALLOWANCE: "allowance",
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

const getBgColorClass = (category: Category): string => {
  const categoryColorMap: Record<Category, string> = {
    living: "bg-colorchip-90",
    shoppingBeauty: "bg-colorchip-30",
    medicalHealth: "bg-colorchip-50",
    food: "bg-colorchip-60",
    transport: "bg-colorchip-70",
    cultureLeisure: "bg-pastel-perfume",
    unclassified: "bg-pastel-lavenderPink",
    salary: "bg-colorchip-20",
    otherIncome: "bg-colorchip-10",
    allowance: "bg-colorchip-40",
  };
  return `category-tag ${categoryColorMap[category]}`;
};
export const getBfColorRaw = (category: Category): string => {
  const categoryColorMap: Record<Category, string> = {
    living: "#a7b9e9",
    shoppingBeauty: "#d7ca6b",
    medicalHealth: "#bcdfd3",
    food: "#c5e0eb",
    transport: "#7db7bf",
    cultureLeisure: "#bda6e1",
    unclassified: "#f0b0d3",
    salary: "#e39d5d",
    otherIncome: "#a28878",
    allowance: "#aacd7e",
  };
  return `${categoryColorMap[category]}`;
};
export const getLabel = (category: Category): string => {
  const categoryLabelMap: Record<Category, string> = {
    living: "생활",
    shoppingBeauty: "쇼핑/뷰티",
    medicalHealth: "의료/건강",
    food: "식비",
    transport: "교통",
    cultureLeisure: "문화/여가",
    unclassified: "미분류",
    salary: "월급",
    otherIncome: "기타 수입",
    allowance: "용돈",
  };
  return categoryLabelMap[category];
};

interface CategoryTagProps {
  category: Category;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
  const label = getLabel(category);
  const bgColorClass = getBgColorClass(category);
  return <div className={bgColorClass}>{label}</div>;
};
