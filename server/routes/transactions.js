import express from "express";
import { openDb } from "../models/database.js";

const router = express.Router();

// ✅ 거래 삭제 API 추가
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const db = await openDb();
    await db.run("DELETE FROM transactions WHERE id = ?", [id]);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("❌ 삭제 오류:", err);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

router.get("/", async (req, res) => {
  const db = await openDb();
  const transactions = await db.all("SELECT * FROM transactions");
  res.json(transactions);
});

router.get("/month", async (req, res) => {
  const { month } = req.query;
  const db = await openDb();
  const transactions = await db.all(
    "SELECT * FROM transactions WHERE strftime('%Y-%m', date) = ?",
    [month]
  );
  res.json(transactions);
});

router.post("/", async (req, res) => {
  const { date, category, amount, memo, paymentMethod, type } = req.body;
  const db = await openDb();
  await db.run(
    "INSERT INTO transactions (date, category, amount, memo, paymentMethod, type) VALUES (?, ?, ?, ?, ?, ?)",
    [date, category, amount, memo, paymentMethod, type]
  );
  res.status(201).json({ message: "Transaction added successfully" });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, category, amount, memo, paymentMethod, type } = req.body;
  try {
    const db = await openDb();
    await db.run(
      "UPDATE transactions SET date=?, category=?, amount=?, memo=?, paymentMethod=?, type=? WHERE id=?",
      [date, category, amount, memo, paymentMethod, type, id]
    );
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (err) {
    console.error("❌ 업데이트 오류:", err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

export default router;
