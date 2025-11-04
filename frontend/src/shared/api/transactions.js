const BASE_URL = "http://localhost:3001/api/transactions";

export async function getTransactions() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("거래 내역 불러오기 실패");
  return res.json();
}

export async function addTransaction(item) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("거래 추가 실패");
  return res.json();
}

export async function updateTransaction(updated) {
  const res = await fetch(`${BASE_URL}/${updated.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error("거래 수정 실패");
  return res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("거래 삭제 실패");
  return res.json();
}

export async function cleanupTransactions(paymentName) {
  const res = await fetch(`${BASE_URL}/cleanup-payment/${encodeURIComponent(paymentName)}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("결제수단 정리 실패");
  return res.json(); 
}