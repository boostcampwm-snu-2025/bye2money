import express from "express";
import cors from "cors";
import transactionsRouter from "./routes/transactions.js";
import paymentsRouter from "./routes/payments.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// CRUD API routers with help of GPT
app.use("/api/transactions", transactionsRouter);
app.use("/api/payments", paymentsRouter);

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});