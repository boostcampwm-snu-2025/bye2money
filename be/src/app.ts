import cors from "cors";
import express, { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import sample from "../data/sample.json" with { type: "json" };

type Category = ExpenseCategory | IncomeCategory;
type ExpenseCategory = "culture"
  | "etc-income"
  | "food"
  | "health"
  | "life"
  | "shopping"
  | "transport";
type IncomeCategory = "allowance" | "etc-income" | "salary";

type Item = {
  amount: number;
  category: Category;
  date: string;
  description: string;
  // id는 생성한 시간 순으로 부여됩니다.
  id: number;
  payment: string;
};

const items = sample as Item[];
const payments = [] as string[];

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(cors());          // 모든 요청 허용
app.use(express.json());  // JSON 파싱

const router = Router();

// 조회
router.get("/account/list", async (req, res) => {
  const { month } = req.query;
  const filteredItems = items.filter(item => new Date(item.date).getMonth() + 1 === Number(month));

  await delay(1000);
  res.json({ items: filteredItems });
});

// 생성
router.post("/account/item", async (req, res) => {
  await delay(1000);
  res.json({});
});

// 수정
router.patch("/account/item/:id", async (req, res) => {
  await delay(1000);
  res.json({});
});

// 삭제
router.delete("/account/item/:id", async (req, res) => {
  await delay(1000);
  res.json({});
});

// 조회
router.get("/payment/list", async (req, res) => {
  await delay(1000);
  res.json({});
});

// 생성
router.put("/payment/:payment", async (req, res) => {
  await delay(1000);
  res.json({});
});

// 삭제
router.delete("/payment/:payment", async (req, res) => {
  await delay(1000);
  res.json({});
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(` Server on http://localhost:${PORT}`);
});

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
