import { Router } from "express";

import sample from "../../data/sample.json" with { type: "json" };
import { delay } from "../utils";

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

const router: Router = Router();

// 조회
router.get("/", async (req, res) => {
  await delay(1000);
  const { month, year } = req.query;
  const filteredItems = items.filter(item => {
    const date = new Date(item.date);
    return date.getFullYear() === Number(year) && date.getMonth() + 1 === Number(month);
  });
  res.json(filteredItems);
});

// 생성
router.post("/", async (req, res) => {
  await delay(1000);
  const newItem = { id: id++, ...req.body } as Item;
  items.push(newItem);
  res.status(201).json(newItem);
});

// 수정
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

export default router;
