import express from "express";
import cors from "cors";
import transactionsRouter from "./routes/transactions.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionsRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

import { createTable } from "./models/Transaction.js";
createTable();
