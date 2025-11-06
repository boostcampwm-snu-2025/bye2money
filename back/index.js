import express from "express";
import cors from "cors";
import { mockData } from "./data.js";
import { z } from "zod";
import { validate } from "./middlewares.js";
import { spendingDetailsSchema } from "./schemas.js";
// import { sleep } from "./utils.js";

let spendingsData = [...mockData];

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
const errMsg = (statusCode, msg) => ({ status: statusCode, msg });

app.get("/api/spendings", async (req, res) => {
  res.send(spendingsData);
});
app.get("/api/search/:year/:month", async (req, res) => {
  const { year: yearStr, month: monthStr } = req.params;
  const year = +yearStr;
  const month = +monthStr;
  if (!year || !month) {
    res.status(400).json(errMsg(400, "올바른 연월로 요청해주세요."));
    return;
  }

  const searchRes = spendingsData.filter(
    ({ year: y, month: m }) => year === y && month === m,
  );
  searchRes.sort((a, b) => b.day - a.day);

  res.send(searchRes);
});
app.put(
  "/api/spendings/",
  validate(z.object({ body: spendingDetailsSchema })),
  async (req, res) => {
    const ids = new Set(req.body.map(({ id }) => id));

    spendingsData = [
      ...spendingsData.filter(({ id }) => !ids.has(id)),
      ...req.body,
    ];
    res.status(200).send();
  },
);
app.delete("/api/spending/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json(errMsg(400, "지출내역의 id 값이 없습니다."));
    return;
  }

  const didExist = spendingsData.find((m) => m.id === id) ? true : false;
  if (!didExist) {
    res.status(404).json(errMsg(404, "존재하지 않는 id 입니다."));
    return;
  }

  spendingsData = spendingsData.filter(({ id: i }) => i !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
