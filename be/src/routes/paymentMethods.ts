import { Router } from "express";

import { delay } from "../utils";

const payments = ["현금", "신용카드"] as string[];

const router: Router = Router();

// 조회
router.get("/", async (_req, res) => {
  await delay(1000);
  res.json(payments);
});

// 생성
router.post("/", async (req, res) => {
  await delay(1000);
  const { payment } = req.body;
  if (payments.includes(payment)) {
    res.status(409).json({ message: "이미 존재하는 결제수단입니다." });
    return;
  }
  payments.push(payment);
  res.status(201).json(payment);
});

// 삭제
router.delete("/:id", async (req, res) => {
  await delay(1000);
  const { id } = req.params;
  const index = payments.indexOf(id);
  if (index === -1) {
    res.status(404).json({ message: "존재하지 않는 결제수단입니다." });
    return;
  }
  payments.splice(index, 1);
  res.status(204).send();
});

export default router;
