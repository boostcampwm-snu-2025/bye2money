import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.resolve("data/transactions.json");

const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Read
router.get("/", (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "파일 읽기 실패", details: err.message });
  }
});

// Create
router.post("/", (req, res) => {
  try {
    const data = readData();
    const newTx = req.body;
    data.push(newTx);
    writeData(data);
    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ error: "파일 저장 실패", details: err.message });
  }
});

// Update
router.put("/:id", (req, res) => {
  try {
    const data = readData();
    const id = Number(req.params.id);
    const idx = data.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ error: "거래 내역 없음" });

    data[idx] = { ...data[idx], ...req.body };
    writeData(data);
    res.json(data[idx]);
  } catch (err) {
    res.status(500).json({ error: "수정 실패", details: err.message });
  }
});

// Delete
router.delete("/:id", (req, res) => {
  try {
    const data = readData();
    const id = Number(req.params.id);
    const filtered = data.filter((t) => t.id !== id);
    writeData(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "삭제 실패", details: err.message });
  }
});

// 결제수단 삭제 시, 해당 결제수단 사용 항목 -> ""로 표시
router.patch("/cleanup-payment/:name", (req, res) => {
  try {
    const deletedName = decodeURIComponent(req.params.name);
    const data = readData();
    const updated = data.map((t) =>
      t.payment === deletedName ? { ...t, payment: "" } : t
    );
    writeData(updated);
    res.json({ success: true, cleaned: deletedName });
  } catch (err) {
    res.status(500).json({ error: "결제수단 정리 실패", details: err.message });
  }
});

export default router;