export const comma = (v) =>
  (v ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const parseMoney = (s) => {
  const n = Number(String(s).replaceAll(",", ""));
  return Number.isFinite(n) ? n : 0;
};
