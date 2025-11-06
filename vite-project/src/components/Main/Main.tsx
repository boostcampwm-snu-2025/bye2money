import React, { useReducer, useState } from 'react';
import Form from './Form/Form';
import TransactionList from './TransactionList/TransactionList';
import { TransactionContext } from '../../contexts/TransactionContext';
import type { Transaction, TransactionAction } from '../../contexts/TransactionContext';
import { areTransactionsEqual } from '../../utils';

const transactionReducer = (state: Transaction[], action: TransactionAction): Transaction[] => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [action.payload, ...state]; // 새 항목을 맨 위에 추가
        case 'DELETE_ITEM':
            return state.filter(t => !areTransactionsEqual(t, action.payload));
        case 'UPDATE_ITEM':
            return state.map(t =>
                areTransactionsEqual(t, action.payload.oldItem) ? action.payload.newItem : t
            );
        default:
            return state;
    }
};

export default function Main() {
    const [transactions, dispatch] = useReducer(transactionReducer, []);
    const [editingItem, setEditingItem] = useState<Transaction | null>(null);

    return (
        <TransactionContext.Provider value={{ transactions, dispatch, editingItem, setEditingItem }}>
            <main>
                <Form />
                <TransactionList />
            </main>
        </TransactionContext.Provider>
    );
}