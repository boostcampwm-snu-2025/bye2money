import { React, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { PaymentMethodSelectBox } from "./PaymentMethodSelectBox";
import { PaymentAdditionModal } from "./PaymentAdditionModal";
import { PaymentRemovalModal } from "./PaymentRemovalModal";
import { useInputBarContext } from "@/contexts/InputBarContext";

export function PaymentMethodSelect() {
    const { 
        paymentMethod,
        isPaymentMethodSelectActive, 
        setIsPaymentMethodSelectActive,
        onAddition, onRemoval,
        fetchPaymentMethods,
    } = useInputBarContext();
  
    useEffect(() => {
        fetchPaymentMethods();
    }, []);
    
    return (
        <Box sx={{ flex: 2, textAlign: "start", alignContent: "center", position: "relative" }}>
            <Box>
                <Typography variant="body2" color="text.secondary">결제수단</Typography>
            </Box>
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    cursor: "pointer"}}>
                <Typography variant="body1">{paymentMethod}</Typography>
                <IconButton 
                    onClick={() => setIsPaymentMethodSelectActive(!isPaymentMethodSelectActive)} 
                    aria-label={isPaymentMethodSelectActive ? "dropdown active" : "dropdown inactive"}>
                    {isPaymentMethodSelectActive ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
                </IconButton>
            </Box>
            {isPaymentMethodSelectActive ? <PaymentMethodSelectBox/> : <></>}
            {onAddition ? <PaymentAdditionModal/> : <></>}
            {onRemoval ? <PaymentRemovalModal/> : <></>} 
        </Box>
    );
}
