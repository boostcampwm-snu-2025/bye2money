import { React } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';
import { useInputBarContext } from "@/contexts/InputBarContext";

export function SaveButton() {
    const { isValid, saveHandler } = useInputBarContext();

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
                    onClick={() => {isValid ? saveHandler() : {}}}>
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
