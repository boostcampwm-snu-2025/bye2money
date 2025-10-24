import { React, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { CategorySelectBox } from "./CategorySelectBox";

export function CategorySelect({ isExpense, category, setCategory }) {
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const expenseCategories = ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"]
    const incomeCategories = ["월급", "용돈", "기타 수입"];
    
    return (
        <Box sx={{ flex: 2, textAlign: "start", alignContent: "center", position: "relative" }}>
            <Box>
                <Typography variant="body2" color="text.secondary">분류</Typography>
            </Box>
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    cursor: "pointer"}}>
                <Typography variant="body1">{category}</Typography>
                <IconButton 
                    onClick={() => setIsDropdownActive(!isDropdownActive)} 
                    aria-label={isDropdownActive ? "dropdown active" : "dropdown inactive"}>
                    {isDropdownActive ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
                </IconButton>
            </Box>
            {isDropdownActive ? <CategorySelectBox 
                                    setCategory={setCategory}
                                    categories={isExpense ? expenseCategories : incomeCategories}
                                    setIsDropdownActive={setIsDropdownActive}/> 
                               : <></>}
            
        </Box>
    );
}
