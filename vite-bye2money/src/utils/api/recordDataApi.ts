import axios from "axios";

import { RECORDS_API } from "../../constants/api";

import type { RecordItemData } from "../../types/types";

export const fetchRecords = async (): Promise<RecordItemData[]> => {
	const res = await axios.get(RECORDS_API);
	return res.data;
};
