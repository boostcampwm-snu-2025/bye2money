export const toYMD = (d = new Date()) => d.toISOString().slice(0, 10);
export const monthLabel = (y, m) => `${y}.${String(m).padStart(2, '0')}`;


/**
 * Returns the English month name for a given month number (1–12).
 *
 * @param {number} m - Month number (1 = January, 12 = December)
 * @returns {string} The English month name (e.g., "October")
 *
 * @example
 * monthNameEng(1);  // "January"
 * monthNameEng(10); // "October"
 */
export const monthNameEng = (m) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[m - 1];
};