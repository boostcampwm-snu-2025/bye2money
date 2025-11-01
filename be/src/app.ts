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
let id = items.length + 1;
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
  await delay(1000);
  const { month } = req.query;
  const filteredItems = items.filter(item => new Date(item.date).getMonth() + 1 === Number(month));
  res.json(filteredItems);
});

// 생성
router.post("/account/item", async (req, res) => {
  await delay(1000);
  const newItem = { id: id++, ...req.body } as Item;
  items.push(newItem);
  res.status(201).json(newItem);
});

// 수정
router.patch("/account/item/:id", async (req, res) => {
  await delay(1000);
  const { id } = req.params;
  const index = items.findIndex(item => item.id === Number(id));
  if (index === -1) {
    res.status(404).json({ message: "존재하지 않는 항목입니다." });
    return;
  }
  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

// 삭제
router.delete("/account/item/:id", async (req, res) => {
  await delay(1000);
  const { id } = req.params;
  const index = items.findIndex(item => item.id === Number(id));
  if (index === -1) {
    res.status(404).json({ message: "존재하지 않는 항목입니다." });
    return;
  }
  items.splice(index, 1);
  res.status(204).send();
});

// 조회
router.get("/payment/list", async (req, res) => {
  await delay(1000);
  res.json(payments);
});

// 생성
router.put("/payment/:payment", async (req, res) => {
  await delay(1000);
  const { payment } = req.params;
  if (payments.includes(payment)) {
    res.status(409).json({ message: "이미 존재하는 결제수단입니다." });
    return;
  }
  payments.push(payment);
  res.status(201).json(payment);
});

// 삭제
router.delete("/payment/:payment", async (req, res) => {
  await delay(1000);
  const { payment } = req.params;
  const index = payments.indexOf(payment);
  if (index === -1) {
    res.status(404).json({ message: "존재하지 않는 결제수단입니다." });
    return;
  }
  payments.splice(index, 1);
  res.status(204).send();
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(` Server on http://localhost:${PORT}`);
});

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
