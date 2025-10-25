// Function to set delay - use if needed
export const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const isISODate = (s) => typeof s === "string" && isoDateRegex.test(s);

// make item id
export function nextRecordId(items) {
	const maxNum = items.reduce((mx, r) => {
		const n = Number(String(r.id || "").replace(/^r/, "")) || 0;
		return Math.max(mx, n);
	}, 0);
	return `r${maxNum + 1}`;
}
