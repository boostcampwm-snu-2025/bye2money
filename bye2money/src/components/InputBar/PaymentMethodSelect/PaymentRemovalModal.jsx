import { React } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useInputBarContext } from "@/contexts/InputBarContext";

export function PaymentRemovalModal() {
    const { 
        onRemoval, setOnRemoval, 
        paymentMethods, setPaymentMethods, 
        removalTarget, 
        requestDeletePaymentMethods 
    } = useInputBarContext();
    
    return (
        <Dialog
            open={onRemoval}
            onClose={() => {setOnRemoval(false)}}
            BackdropProps={{style: {backgroundColor: "rgba(0, 0, 0, 0.4)"}}}>
            <DialogTitle>결제수단 삭제</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    해당 결제 수단({removalTarget})을 삭제하시겠습니까?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        requestDeletePaymentMethods(removalTarget);
                        setPaymentMethods(paymentMethods.filter(method => method !== removalTarget));
                        setOnRemoval(false);
                    }}>
                    삭제
                </Button>
            </DialogActions>
        </Dialog>
    )
}
