import express from "express";
import cors from "cors";

import { version, MOCK_RECORD_ITEMS } from "./data.js";

import { delay, isISODate, nextRecordId } from "./utils.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/test/version", async (req, res) => {
	await delay(1000);
	res.json({ version: version });
});

// get all records
app.get("/records", async (req, res) => {
	await delay(1000);
	res.json(MOCK_RECORD_ITEMS);
});

// post (add) a record
app.post("/records", async (req, res) => {
	const { date, category, title, payment, amount } = req.body ?? {};

	// 이미 frontend에서 처리하는 exception들이지만, 예비로 backend에서도 exception 처리
	if (!isISODate(date)) {
		return res
			.status(400)
			.json({ error: "date must be ISO string YYYY-MM-DD" });
	}
	if (typeof title !== "string" || !title.trim()) {
		return res.status(400).json({ error: "title is required" });
	}
	if (typeof category !== "string" || !category.trim()) {
		return res.status(400).json({ error: "category is required" });
	}
	if (typeof payment !== "string" || !payment.trim()) {
		return res.status(400).json({ error: "payment is required" });
	}
	if (typeof amount !== "number" || Number.isNaN(amount)) {
		return res.status(400).json({ error: "amount must be a number" });
	}

	const newItem = {
		id: nextRecordId(MOCK_RECORD_ITEMS),
		date,
		category,
		title,
		payment,
		amount,
	};

	MOCK_RECORD_ITEMS.push(newItem);
	return res.status(201).json(newItem);
});

app.listen(PORT, () => {
	console.log(`> API server listening on http://localhost:${PORT}`);
});
