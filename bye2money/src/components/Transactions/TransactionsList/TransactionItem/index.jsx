import { React, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useTransactionsContext } from "@/contexts/TransactionsContext";

export function TransactionItem({ transaction }) {
    const { removeHandler } = useTransactionsContext();
    const isIncome = transaction.type === "income";
    const amountColor = isIncome ? "primary.main" : "error.main";
    const amountSign = isIncome ? "+" : "-";
    const categoryColor = {
        "생활": "#A7B9E9",
        "쇼핑/뷰티": "#D7CA6B",
        "의료/건강": "#BCDFD3",
        "식비": "#C5E0EB",
        "교통": "#7DB7BF",
        "문화/여가": "#BDA6E1",
        "미분류": "#F0B0D3",
        "월급": "#E39D5D",
        "용돈": "#AACD7E",
        "기타수입": "#A28878"
    }
    const [onHovered, setOnHovered] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "48px",
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#EEEEEE"
                }}}
                onMouseEnter={() => setOnHovered(true)}
                onMouseLeave={() => setOnHovered(false)}>
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: categoryColor[transaction.category],
                    alignContent: "center"}}>
                <Typography
                    variant="body2" 
                    sx={{ textAlign: "center" }}> 
                    {transaction.category}
                </Typography>
            </Box>
            <Box
                sx={{ 
                    flex: 4,
                    alignContent: "center",
                    ml: "16px"}}>
                <Typography
                    variant="body2" 
                    sx={{ textAlign: "left" }}> 
                    {transaction.description}
                </Typography>
            </Box>
            <Box
                sx={{ 
                    flex: 1,
                    alignContent: "center"}}>
                <Typography
                    variant="body2" 
                    sx={{ textAlign: "left" }}> 
                    {transaction.paymentMethod}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end", 
                    pr: "12px",
                    }}>
                <Typography
                    variant="body2"
                    color={amountColor}
                    sx={{ textAlign: "right" }}>
                    {amountSign} {Number(transaction.amount).toLocaleString()}원
                </Typography>

                {onHovered && (
                    <Box
                        onClick={() => removeHandler(transaction)}
                        sx={{
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "right",
                        alignItems: "center",
                        ml: "16px"
                        }}>
                        <IconButton
                            sx={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "#E93B5A",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#c72e47" },
                            }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ ml: "4px", color: "#E93B5A" }}>삭제</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
