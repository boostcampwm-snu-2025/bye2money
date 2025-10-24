import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export function PaymentAdditionModal({ onAddition, setOnAddition, paymentMethods, setPaymentMethods, requestPostPaymentMethods }) {
    const [paymentMethodInput, setPaymentMethodInput] = useState("");

    return (
        <Dialog 
            open={onAddition}
            onClose={() => setOnAddition(false)}>
            <DialogTitle>결제수단 추가</DialogTitle>   
            <DialogContent>
                <DialogContentText>
                    추가하실 결제 수단을 입력해주세요.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="새로운 결제 수단"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={paymentMethodInput}
                    onChange={(event) => setPaymentMethodInput(event.target.value)}>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {setOnAddition(false)}}>
                    취소
                </Button>
                <Button
                    onClick={() => {
                        requestPostPaymentMethods(paymentMethodInput);
                        setPaymentMethods([...paymentMethods, paymentMethodInput]);
                        setOnAddition(false);
                    }}>
                    추가
                </Button>
            </DialogActions>
        </Dialog>
    )
}
