import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// ✅ 월별 데이터 조회
export const getTransactionsByMonth = async (year, month) => {
  const formattedMonth = `${year}-${String(month).padStart(2, "0")}`;
  const res = await axios.get(
    `${API_BASE_URL}/transactions/month?month=${formattedMonth}`
  );
  return res.data;
};

// ✅ 거래 추가
export const addTransaction = async (tx) => {
  const res = await axios.post(`${API_BASE_URL}/transactions`, tx);
  return res.data;
};

// ✅ 거래 삭제
export const deleteTransaction = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/transactions/${id}`);
  return res.data;
};

// 거래 수정 (PUT or PATCH)
export const updateTransaction = async (id, data) => {
  const res = await axios.patch(`${API_BASE_URL}/transactions/${id}`, data);
  return res.data;
};
