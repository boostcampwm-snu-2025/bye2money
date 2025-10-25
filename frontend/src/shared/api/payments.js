const BASE_URL = "http://localhost:3001/api/payments";

export async function getPayments() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("결제수단 불러오기 실패");
  return res.json();
}

export async function addPayment(name) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("결제수단 추가 실패");
  return res.json();
}

export async function deletePayment(name) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(name)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("결제수단 삭제 실패");
  return res.json();
}