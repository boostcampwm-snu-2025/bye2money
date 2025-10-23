export type SpendCategory = '생활'|'식비'|'교통'|'쇼핑/뷰티'|'의료/건강'|'문화/여가'|'미분류';
export type IncomeCategory = '월급'|'용돈'|'기타수입';
export type Category = SpendCategory | IncomeCategory;

export type PaymentMethodId = string;
export interface PaymentMethod { id: PaymentMethodId; name: string; }

export interface Txn {
  id: string;
  date: string;      // 'YYYY-MM-DD'
  amount: number;    // 음수=지출, 양수=수입
  memo: string;      // 최대 32자
  methodId: PaymentMethodId;
  category: Category;
  createdAt: number; // 생성 시각(ms)
}

export type Tab = 'list'|'calendar'|'stats';
export interface UiState { tab: Tab; year: number; month: number; editingId?: string; }
export interface LedgerState { txns: Txn[]; methods: PaymentMethod[]; ui: UiState; }
