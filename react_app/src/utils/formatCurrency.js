export const formatAmountInput = (raw) => {
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return '';
  const norm = String(parseInt(digits, 10));
  return norm.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseAmount = (formatted) =>
  Number(formatted.replace(/,/g, '')) || 0;
