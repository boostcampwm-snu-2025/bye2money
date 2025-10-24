import { React } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { InputBarContextProvider } from "@/contexts/InputBarContext";
import { DateInput } from "./DateInput";
import { AmountInput } from "./AmountInput";
import { DescriptionInput } from "./DescriptionInput";
import { PaymentMethodSelect } from "./PaymentMethodSelect";
import { CategorySelect } from "./CategorySelect";
import { SaveButton } from "./SaveButton";

export function InputBar() {
    return (
        <InputBarContextProvider>
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
                    <DateInput/>
                    <AmountInput/>
                    <DescriptionInput/>
                    <PaymentMethodSelect/>
                    <CategorySelect/>
                    <SaveButton/>
                    </Stack>
                </Paper>
            </Box>
        </InputBarContextProvider>
    );
}
