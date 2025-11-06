import { React } from "react";
import Box from "@mui/material/Box";

import { TransactionsHeader } from "./TransactionsHeader.jsx";
import { TransactionsList } from "./TransactionsList";
import { TransactionsContextProvider } from "@/contexts/TransactionsContext.jsx";

export function Transactions() { 
    
    return (
        <TransactionsContextProvider>
            <Box
                sx={{
                    position: "absolute",
                    top: "280px",
                    width: "846px",
                    boxSizing: "border-box"}}>
                <TransactionsHeader/>
                <TransactionsList/>
            </Box>
        </TransactionsContextProvider>
    )
}
