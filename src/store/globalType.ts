// 개별 거래 내역 타입
export interface Transaction {
    id: number | string;
    date: string;
    amount: number;
    content: string;
    category: string;
    paymentMethod: string;
}

// transactions 슬라이스의 상태 타입
export interface TransactionsState {
    items: Transaction[];
    editingTransaction: Transaction | null;
    filter: {
        income: boolean;
        expense: boolean;
    };
    status: "idle" | "loading" | "succeeded" | "failed";
}
