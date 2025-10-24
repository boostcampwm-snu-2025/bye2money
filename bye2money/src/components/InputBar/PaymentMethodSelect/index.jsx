import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { PaymentMethodSelectBox } from "./PaymentMethodSelectBox";
import { PaymentAdditionModal } from "./PaymentAdditionModal";
import { PaymentRemovalModal } from "./PaymentRemovalModal";

export function PaymentMethodSelect({ paymentMethod, setPaymentMethod }) {
    const requestPostPaymentMethods = async (paymentMethod) => {
        const url = "http://localhost:3001/api/paymentMethods";
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({newPaymentMethod: paymentMethod})
        })
    }

    const requestDeletePaymentMethods = async (paymentMethod) => {
        const url = "http://localhost:3001/api/paymentMethods";
        fetch(url, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({targetPaymentMethod: paymentMethod})
        })
    }

    const [paymentMethods, setPaymentMethods] = useState([])
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [onAddition, setOnAddition] = useState(false);
    const [onRemoval, setOnRemoval] = useState(false);
    const [removalTarget, setRemovalTarget] = useState("");

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            const res = await fetch("http://localhost:3001/api/paymentMethods");
            const data = await res.json();
            setPaymentMethods(data.paymentMethods || []);
        };
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
                    onClick={() => setIsDropdownActive(!isDropdownActive)} 
                    aria-label={isDropdownActive ? "dropdown active" : "dropdown inactive"}>
                    {isDropdownActive ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
                </IconButton>
            </Box>
            {isDropdownActive ? <PaymentMethodSelectBox 
                                    setPaymentMethod={setPaymentMethod}
                                    paymentMethods={paymentMethods}
                                    setIsDropdownActive={setIsDropdownActive}
                                    setOnAddition={setOnAddition}
                                    setOnRemoval={setOnRemoval}
                                    setRemovalTarget={setRemovalTarget}/> 
                               : <></>}
            {onAddition ? <PaymentAdditionModal
                            onAddition={onAddition}
                            setOnAddition={setOnAddition}
                            paymentMethods={paymentMethods}
                            setPaymentMethods={setPaymentMethods}
                            requestPostPaymentMethods={requestPostPaymentMethods}/> 
                        : <></>}
            {onRemoval ? <PaymentRemovalModal 
                            onRemoval={onRemoval}
                            setOnRemoval={setOnRemoval}
                            paymentMethods={paymentMethods}
                            setPaymentMethods={setPaymentMethods}
                            removalTarget={removalTarget}
                            requestDeletePaymentMethods={requestDeletePaymentMethods}/> : <></>} 
        </Box>
    );
}
