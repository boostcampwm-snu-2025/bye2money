import { React, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function DescriptionInput({ descriptionInput, setDescriptionInput }) {
    const [numChar, setNumChar] = useState(0);

    const descriptionInputHandler = (event) => {
        const input = event.target.value;
        if (input.length <= 32) {
            setNumChar(input.length);
            setDescriptionInput(input);
        }
    }

    return (
        <Box sx={{ flex: 2.5, textAlign: "start" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Typography variant="body2" color="text.secondary">내용</Typography>
                <Typography variant="body2" color="grey">{`${numChar}/32`}</Typography>
            </Box>
            <Box>
                <input 
                    type="text"
                    placeholder="입력하세요"
                    value={descriptionInput}
                    onChange={descriptionInputHandler}
                    style={{ 
                        width: "100%",
                        textAlign: "start",
                        border: "none", 
                        color: "black",
                        fontSize: "1rem",
                        background: "transparent",
                        outline: "none"}}/>
            </Box>
        </Box>
    );
}
