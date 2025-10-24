import { React } from "react";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';

export function CheckBoxFilter({ isChecked, setIsChecked, children }) {
    return (
        <Box
            sx={{ 
                display: "flex", 
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"}}
            onClick={() => setIsChecked(!isChecked)}>
            <Box
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",    
                    width: "20px",
                    height: "20px",
                    backgroundColor: `rgba(0, 0, 0, ${isChecked ? 1.0 : 0.4})`,
                    borderRadius: "4px"}}>
                <CheckIcon sx={{ fontSize: "small", color: "white" }}/>
            </Box>
            {children}
        </Box>
    )
}
