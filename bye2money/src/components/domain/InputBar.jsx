import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";

export function InputBar() {
    
    return (
        <Box 
            sx={{
                display: "flex", 
                justifyContent: "center"}}>
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
            <DateInput />
            <AmountInput />
            <DescriptionInput />
            <PaymentMethodSelect />
            <CategorySelect />
            <SaveButton />
            </Stack>
        </Paper>
        </Box>
    );
}

function DateInput() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const defaultDate = `${year}.${month}.${day}`;
    const [dateInput, setDateInput] = useState(defaultDate);

    const inputHandler = (event) => {
        const prevInput = dateInput;
        const rawInput = event.target.value;
        const input = rawInput.split(".").length === 3 ? rawInput : prevInput;
        setDateInput(input);
    }

    return (
        <Box sx={{ flex: 2, textAlign: "start", pl: 2 }}>
            <Typography variant="body2" color="text.secondary">일자</Typography>
                <input 
                    value={dateInput}
                    onChange={inputHandler}
                    style={{ 
                        width: '100%',
                        border: 'none', 
                        color: "black",
                        fontSize: '1rem',
                        background: "transparent",
                        outline: "none"}}/>
        </Box>
    );
}

function AmountInput() {
  return (
    <Box sx={{ flex: 1.5, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">금액</Typography>
      <Typography variant="body1">5,000</Typography>
    </Box>
  );
}

function DescriptionInput() {
  return (
    <Box sx={{ flex: 3, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">내용</Typography>
      <Typography variant="body1">저녁 식사</Typography>
    </Box>
  );
}

function PaymentMethodSelect() {
  return (
    <Box sx={{ flex: 1.5, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">결제수단</Typography>
      <Typography variant="body1">현대카드</Typography>
    </Box>
  );
}

function CategorySelect() {
  return (
    <Box sx={{ flex: 1.5, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">분류</Typography>
      <Typography variant="body1">식비</Typography>
    </Box>
  );
}

function SaveButton() {
  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Button variant="contained" sx={{ borderRadius: "8px" }}>
        확인
      </Button>
    </Box>
  );
}
