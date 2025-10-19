export const toYMD = (d = new Date()) => d.toISOString().slice(0, 10);
export const monthLabel = (y, m) => `${y}.${String(m).padStart(2, '0')}`;
