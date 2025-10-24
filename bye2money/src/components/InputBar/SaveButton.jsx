import { React } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';

export function SaveButton({ dateInput, isExpense, amountInput, descriptionInput, paymentMethodInput, categoryInput, isValid, onSaveSuccess }) {

    const saveHandler = (dateInput, amountInput, descriptionInput, paymentMethodInput, categoryInput) => {
        const yearMonth = parseYearMonth(dateInput);
        const transaction = {
            date: dateInput, 
            type: isExpense ? "expense" : "income",
            amount: Number(amountInput), 
            description: descriptionInput, 
            paymentMethod: paymentMethodInput, 
            category: categoryInput}
        requestPostTransaction(yearMonth, transaction);
    }

    const parseYearMonth = (dateInput) => {
        const parsedDate = dateInput.split(".");
        const year = parsedDate[0];
        const month = parsedDate[1];
        const yearMonth = `${year}-${month}`;
        return yearMonth;
    }

    const requestPostTransaction = async (yearMonth, transaction) => {
        const url = `http://localhost:3001/api/transactions/${yearMonth}`;
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(transaction)
        }).then(response => {response.ok ? onSaveSuccess() : {}})
    }
    
    return (
        <Box 
            sx={{ 
                flex: 1, 
                margin: 0,
                padding: 0 }}>
            <Box
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignContent: "center",    
                    width: "40px",
                    height: "40px",
                    padding: 0,
                    backgroundColor: `rgba(0, 0, 0, ${isValid ? 1.0 : 0.4})`,
                    borderRadius: "50%"}}>
                <IconButton
                    onClick={() => {isValid ? saveHandler(dateInput, amountInput, descriptionInput, paymentMethodInput, categoryInput) : {}}}>
                    <CheckIcon
                        sx={{
                            fontSize: "large",
                            color: "white"
                        }}>
                    </CheckIcon>
                </IconButton>
            </Box>
        </Box>
    );
}
