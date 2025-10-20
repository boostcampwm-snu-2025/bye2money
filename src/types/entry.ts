export type PayMethod = 'card' | 'cash' | 'transfer' | '';
export type Category = 'food' | 'life' | 'transport' | '';

export interface TransactionEntry {
  date: string;
  amount: number;
  memo: string;
  payMethod: PayMethod;
  category: Category;
}
