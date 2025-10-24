import { MONTHS } from "./const";

export function stepMonth(
	currentYear: number,
	currentMonth: number,
	delta: 1 | -1
) {
	// If prev, delta = -1
	// If next, delta = 1
	let newYear = currentYear;
	let newMonth = currentMonth + delta;
	if (newMonth > 12) {
		// Next year January
		newMonth = 1;
		newYear += 1;
	} else if (newMonth < 1) {
		// Previous year December
		newMonth = 12;
		newYear -= 1;
	}
	return { year: newYear, month: newMonth, label: MONTHS[newMonth - 1].label };
}
