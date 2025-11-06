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

export interface SpendingDetail {
  id: string;
  year: number;
  month: number;
  day: number;
  description: string;
  amount: number;
  isExpenditure: boolean;
  paymentMethod: string | undefined;
  category: Category;
}
export interface DaySpendings {
  year: number;
  month: number;
  day: number;
  spendings: SpendingDetail[];
}

const BTN_VARIANT = { SM: "sm", MD: "md", LG: "lg" } as const;
export type BtnVariant = (typeof BTN_VARIANT)[keyof typeof BTN_VARIANT];

export interface CategorySpending {
  category: Category;
  total: number;
}

const NAV_STATE = {
  MAIN: "/",
  CALENDAR: "/calendar",
  CHART: "/chart",
} as const;
export type NavState = (typeof NAV_STATE)[keyof typeof NAV_STATE];
