import axios from "axios";

import { RECORDS_API } from "../../constants/api";

import type { RecordItemData } from "../../types/types";

export const fetchRecords = async (): Promise<RecordItemData[]> => {
	const res = await axios.get(RECORDS_API);
	return res.data;
};

export const createRecord = async (data: {
	date: string;
	category: string;
	title: string;
	payment: string;
	amount: number;
}): Promise<RecordItemData> => {
	const res = await axios.post(RECORDS_API, data, {
		headers: { "Content-Type": "application/json" },
	});
	return res.data;
};
