// 가계부 거래 내역 타입
export interface Transaction {
  id: string;           // 고유 ID
  date: string;         // 날짜 (YYYY-MM-DD)
  isExpense: boolean;   // true=지출, false=수입
  amount: number;       // 금액
  content: string;      // 내용
  method: string;       // 결제수단
  category: string;     // 분류
}
