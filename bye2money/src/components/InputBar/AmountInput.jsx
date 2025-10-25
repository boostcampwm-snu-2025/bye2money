import { React } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useInputBarContext } from "@/contexts/InputBarContext";

export function AmountInput() {
    const { 
        isExpense, setIsExpense, 
        amountInput, setAmountInput 
    } = useInputBarContext();

    const amountInputHandler = (event) => {
        const rawInput = event.target.value;
        const numberOnlyInput = rawInput.replace(/[^0-9]/g, "") 
        setAmountInput(numberOnlyInput);
    }

    const formattedAmount = Number(amountInput).toLocaleString("ko-KR");

    return (
        <Box sx={{ flex: 2, textAlign: "start", justifyContent: "space-between" }}>
            <Box sx={{ justifyContent: "start" }}>
                <Typography variant="body2" color="text.secondary">금액</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <IconButton 
                    sx={{
                        padding: 0
                    }}
                    onClick={() => setIsExpense(!isExpense)} 
                    aria-label={"transcation type"}>
                    {isExpense ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                </IconButton>
                <input 
                    value={`${formattedAmount} 원`}
                    onChange={amountInputHandler}
                    style={{ 
                        width: "100%",
                        textAlign: "end",
                        border: "none", 
                        color: "black",
                        fontSize: "1rem",
                        background: "transparent",
                        outline: "none"}}/>
            </Box>
        </Box>
    );
}
