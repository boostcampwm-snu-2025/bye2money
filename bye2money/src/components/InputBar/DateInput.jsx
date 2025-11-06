import { React } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useInputBarContext } from "@/contexts/InputBarContext";

export function DateInput() {
    const { dateInput, setDateInput } = useInputBarContext();
    
    const dateInputHandler = (event) => {
        const prevInput = dateInput;
        const rawInput = event.target.value;
        const input = rawInput.split(".").length === 3 ? rawInput : prevInput;
        setDateInput(input);
    }

    return (
        <Box sx={{ flex: 1.5, textAlign: "start", pl: 2 }}>
            <Typography variant="body2" color="text.secondary">일자</Typography>
            <input 
                value={dateInput}
                onChange={dateInputHandler}
                style={{ 
                    width: "100%",
                    border: "none", 
                    color: "black",
                    fontSize: "1rem",
                    background: "transparent",
                    outline: "none"}}/>
        </Box>
    );
}
