import type { Tx, Method, Category } from "./types";

const BASE = "http://localhost:3001";

export async function fetchTxs(): Promise<Tx[]> {
  const r = await fetch(`${BASE}/tx`);
  return r.json();
}

export async function addTx(params: {
  amount: number | string;
  content: string;
  method?: Method;
  category?: Category;
}): Promise<Tx> {
  const r = await fetch(`${BASE}/tx`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return r.json();
}
