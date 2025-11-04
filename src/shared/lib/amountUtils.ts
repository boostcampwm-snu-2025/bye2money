export const formatAmount = (value: number | string): string => {
  const numericValue =
    typeof value === "string" ? value.replace(/,/g, "") : String(value);

  if (!numericValue || numericValue === "0") return "0";

  const number = parseInt(numericValue, 10);
  if (isNaN(number)) return "0";
  return number.toLocaleString("ko-KR");
};

export const parseAmount = (formatted: string): string => {
  return formatted.replace(/,/g, "");
};
