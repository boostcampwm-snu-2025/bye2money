// 거래 타입 정의
export type TransactionType = 'income' | 'expense';

export type PaymentMethod = '현금' | '체크카드' | '신용카드' | '기타';

export type Category = 
  | '식비' 
  | '교통' 
  | '쇼핑' 
  | '문화/여가' 
  | '의료/건강' 
  | '교육' 
  | '경조사비'
  | '급여'
  | '용돈'
  | '기타';

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  type: TransactionType;
  value: number;
  description: string;
  payment: PaymentMethod;
  category: Category;
  createdAt: number;
}