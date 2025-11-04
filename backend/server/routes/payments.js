import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.resolve("data/payments.json");

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
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "결제수단 이름 필요" }); // 이건 프론트에서 검증되긴 하겠지만...?
    if (data.includes(name)) return res.status(409).json({ error: "이미 존재하는 결제수단" });

    data.push(name);
    writeData(data);
    res.status(201).json({ name });
  } catch (err) {
    res.status(500).json({ error: "파일 저장 실패", details: err.message });
  }
});

// Delete
router.delete("/:name", (req, res) => {
  try {
    const data = readData();
    const name = decodeURIComponent(req.params.name);
    const filtered = data.filter((p) => p !== name);
    writeData(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "삭제 실패", details: err.message });
  }
});

export default router;