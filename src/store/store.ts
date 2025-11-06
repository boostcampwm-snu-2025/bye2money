import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
    },
});

// store의 state로부터 RootState 타입을 자동으로 추론하여 export
// RootState 인터페이스를 수동으로 만들 필요가 없음
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 export
export type AppDispatch = typeof store.dispatch;
