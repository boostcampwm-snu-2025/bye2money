import express from "express";
import cors from "cors";

import { version, MOCK_RECORD_ITEMS } from "./data.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Function to set delay - use if needed
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

app.get("/test/version", async (req, res) => {
	await delay(1000);
	res.json({ version: version });
});

app.get("/records", async (req, res) => {
	await delay(1000);
	res.json(MOCK_RECORD_ITEMS);
});

app.listen(PORT, () => {
	console.log(`> API server listening on http://localhost:${PORT}`);
});
