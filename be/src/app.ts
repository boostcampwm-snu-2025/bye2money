import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import paymentsMethodRouter from "./routes/paymentMethods";
import transactionsRouter from "./routes/transactions";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(cors());          // 모든 요청 허용
app.use(express.json());  // JSON 파싱

app.use("/api/transactions", transactionsRouter);
app.use("/api/payment-methods", paymentsMethodRouter);

app.listen(PORT, () => {
  console.log(` Server on http://localhost:${PORT}`);
});
