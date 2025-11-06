import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Transaction, TransactionsState } from "./globalType";

export const fetchTransactions = createAsyncThunk<Transaction[]>(
    "transactions/fetchTransactions", // action의 이름
    async () => {
        const response = await fetch("/mockData.json");
        const data = await response.json();
        return data as Transaction[];
    }
);

const initialState: TransactionsState = {
    items: [],
    editingTransaction: null,
    filter: {
        income: true,
        expense: true,
    },
    status: "idle",
};

// 'Slice' 생성 (Reducer + Actions)
const transactionsSlice = createSlice({
    name: "transactions", // 이 Slice의 이름
    initialState,

    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            // action.payload에 SectionForm에서 보낸 새 거래 내역(tx)이 담겨옴
            state.items.push(action.payload);
        },
        updateTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.items.findIndex(
                (tx) => tx.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
            state.editingTransaction = null; // 수정 모드 종료
        },
        deleteTransaction: (state, action: PayloadAction<number | string>) => {
            const idToDelete = action.payload; // payload가 id라고 가정
            if (idToDelete) {
                state.items = state.items.filter((tx) => tx.id !== idToDelete);
                // 만약 삭제한 항목이 수정 중인 항목이었다면
                if (state.editingTransaction?.id === idToDelete) {
                    state.editingTransaction = null;
                }
            }
        },
        setEditing: (state, action: PayloadAction<Transaction | null>) => {
            // action.payload에 수정할 tx(또는 null)가 담겨옴
            state.editingTransaction = action.payload;
        },
        setFilter: (state, action: PayloadAction<"income" | "expense">) => {
            // action.payload에 'income' 또는 'expense'가 담겨옴
            const filterType = action.payload;
            state.filter[filterType] = !state.filter[filterType];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
                state.status = "succeeded";
                state.items = action.payload; // fetch된 데이터로 items 상태 덮어쓰기
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setEditing,
    setFilter,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
