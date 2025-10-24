import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { DateInput } from "./DateInput";
import { AmountInput } from "./AmountInput";
import { DescriptionInput } from "./DescriptionInput";
import { PaymentMethodSelect } from "./PaymentMethodSelect";
import { CategorySelect } from "./CategorySelect";
import { SaveButton } from "./SaveButton";

export function InputBar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const defaultDate = `${year}.${month}.${day}`;
    const [dateInput, setDateInput] = useState(defaultDate);
    const [isExpense, setIsExpense] = useState(true);
    const [amountInput, setAmountInput] = useState("0");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("선택하세요");
    const [category, setCategory] = useState("선택하세요");
    const [isValid, setIsValid] = useState(false);
    
    useEffect(() => {
        const checkInputValidity = (dateInput, amountInput, descriptionInput, paymentMethod, category) => {
            const dateInputValidity = checkDateInputValidity(dateInput);
            const amountInputValidity = checkAmountInputValdity(amountInput);
            const descriptionInputValidity = checkDescriptionInputValidity(descriptionInput);
            const paymentMethodValidity = checkPaymentMethodValidity(paymentMethod);
            const categoryValidity = checkCategoryValidity(category)
            return dateInputValidity && amountInputValidity && descriptionInputValidity && paymentMethodValidity && categoryValidity;
        }

        const checkDateInputValidity = (dateInput) => {
            if (!/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(dateInput)) {
                return false;
            }
            
            const parsedDateInput = dateInput.split(".");
            const year = Number(parsedDateInput[0]);
            const month = Number(parsedDateInput[1]);
            const day = Number(parsedDateInput[2]);

            const monthValidity = (month >= 1 && month <= 12);    
            const lastDayOfMonth = new Date(year, month, 0).getDate();
            const dayValidity = (day >= 1 && day <= lastDayOfMonth);
            return monthValidity && dayValidity
        }
        
        const checkAmountInputValdity = (amountInput) => {return true};
        const checkDescriptionInputValidity = (descriptionInput) => {return descriptionInput !== ""};
        const checkPaymentMethodValidity = (paymentMethod) => {return paymentMethod !== "선택하세요"};
        const checkCategoryValidity = (category) => {return category !== "선택하세요"};
    
        const inputValidity = checkInputValidity(dateInput, amountInput, descriptionInput, paymentMethod, category);
        setIsValid(inputValidity);
    })

    const resetInput = () => {
        setDateInput(defaultDate);
        setAmountInput("0");
        setDescriptionInput("");
        setPaymentMethod("");
        setCategory("");
        setIsExpense(false);
        setIsValid(false);
    }

    return (
        <Box 
            sx={{
                position: "absolute",
                display: "flex", 
                justifyContent: "center",
                top: "180px"}}>
            <Paper 
                sx={{
                width: "846px",
                height: "76px",
                boxSizing: "border-box"}}>
                <Stack 
                direction="row" 
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{ height: "100%", alignItems: "center" }}>
                <DateInput
                    dateInput={dateInput}
                    setDateInput={setDateInput}/>
                <AmountInput 
                    isExpense={isExpense}
                    setIsExpense={setIsExpense}
                    amountInput={amountInput}
                    setAmountInput={setAmountInput}/>
                <DescriptionInput
                    descriptionInput={descriptionInput}
                    setDescriptionInput={setDescriptionInput}/>
                <PaymentMethodSelect
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}/>
                <CategorySelect
                    isExpense={isExpense}
                    category={category}
                    setCategory={setCategory}/>
                <SaveButton 
                    dateInput={dateInput}
                    isExpense={isExpense}
                    amountInput={amountInput}
                    descriptionInput={descriptionInput}
                    paymentMethodInput={paymentMethod}
                    categoryInput={category}
                    isValid={isValid}
                    onSaveSuccess={resetInput}/>
                </Stack>
            </Paper>
        </Box>
    );
}
