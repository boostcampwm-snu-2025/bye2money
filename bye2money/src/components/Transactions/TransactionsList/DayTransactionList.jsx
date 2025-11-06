import { React } from "react";
import Box from "@mui/material/Box";

import { TransactionItem } from "./TransactionItem";

export function DayTransactionsList({ dayTransactions }) {
    const dayTransactionsList = dayTransactions.map((transaction) => {
        return (
            <TransactionItem 
                key={transaction.id} 
                transaction={transaction}>
            </TransactionItem>
        );
    });
    
    return (
        <Box
            sx={{ 
                mt: 1,
                borderTop: '0.1px solid #000000',
                borderBottom: '0.1px solid #000000'}}>
            {dayTransactionsList}
        </Box>  
    );
}
