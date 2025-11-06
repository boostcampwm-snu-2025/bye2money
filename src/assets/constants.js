export const CATEGORY_INCOMES = [
    { id: 1, name: "월급", color: "#FCA5A5", bgClass: "bg-red-200" }, // Red
    { id: 2, name: "용돈", color: "#FDBA74", bgClass: "bg-orange-200" }, // Orange
    { id: 3, name: "기타 수입", color: "#F9A8D4", bgClass: "bg-pink-200" }, // Pink
];

export const CATEGORY_EXPENSES = [
    { id: 1, name: "생활", color: "#93C5FD", bgClass: "bg-blue-200" }, // Blue
    { id: 2, name: "식비", color: "#7DD3FC", bgClass: "bg-sky-200" }, // Sky
    { id: 3, name: "교통", color: "#67E8F9", bgClass: "bg-cyan-200" }, // Cyan
    { id: 4, name: "쇼핑/뷰티", color: "#C4B5FD", bgClass: "bg-violet-200" }, // Violet
    { id: 5, name: "의료/건강", color: "#A5B4FC", bgClass: "bg-indigo-200" }, // Indigo
    { id: 6, name: "문화/여가", color: "#5EEAD4", bgClass: "bg-teal-200" }, // Teal (Blue-Green)
    { id: 7, name: "미분류", color: "#D1D5DB", bgClass: "bg-gray-300" }, // Gray
];

const allCategories = [...CATEGORY_INCOMES, ...CATEGORY_EXPENSES];
export const categoryStyleMap = new Map(
    allCategories.map((c) => [c.name, { bgClass: c.bgClass }])
);
export const DEFAULT_STYLE = {
    bgClass: "bg-gray-300",
};

export const INITIAL_PAYMENT_METHODS = [
    { id: 1, name: "현금" },
    { id: 2, name: "신용카드" },
    { id: 3, name: "체크카드" },
    { id: 4, name: "네이버페이" },
];

export const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const WEEKDAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];
