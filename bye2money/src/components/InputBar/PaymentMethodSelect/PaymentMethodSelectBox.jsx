import React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CancelIcon from "@mui/icons-material/Cancel";
import { useInputBarContext } from "@/contexts/InputBarContext";

export function PaymentMethodSelectBox() {
    const { 
        setPaymentMethod, 
        paymentMethods, 
        setIsPaymentMethodSelectActive, 
        setOnAddition, setOnRemoval, 
        setRemovalTarget 
    } = useInputBarContext();

    const paymentMethodsList = paymentMethods.map((paymentMethod) => {
        return (
            <React.Fragment key={paymentMethod}>
                <ListItem
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}> 
                    <Button
                        onClick={() => {
                            setPaymentMethod(paymentMethod);
                            setIsPaymentMethodSelectActive(false);
                            }}>
                        {paymentMethod}
                    </Button>
                    <IconButton 
                        onClick={() => {
                            setOnRemoval(true); 
                            setRemovalTarget(paymentMethod);
                        }} 
                        aria-label="remove payment method">   
                        <CancelIcon fontSize="small" /> 
                    </IconButton>
                </ListItem>  
                <Divider />
            </React.Fragment> 
        )
    })
    
    return (
        <Paper
            sx={{
                position: "absolute",
                top: "115%",
                left: "-10%",
                width: "120%",
                zIndex: 20,
                mt: 0.5,
                bgcolor: "background.paper",
                boxShadow: 3,}}>
            <List dense>
                {paymentMethodsList}
                <ListItem
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        "&hover": { bgcolor: "action.hover"},
                        cursor: "pointer",
                    }}>
                    <Button
                        onClick={() => {
                            setOnAddition(true)}}>
                        추가하기
                    </Button>
                </ListItem>
            </List>  
        </Paper>
    )
}
