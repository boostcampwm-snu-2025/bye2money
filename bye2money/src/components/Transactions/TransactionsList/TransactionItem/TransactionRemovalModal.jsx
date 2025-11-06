import { React } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTransactionsContext } from "@/contexts/TransactionsContext";


export function TransactionRemovalModal() {
    const { 
        onRemoval, setOnRemoval, 
        transactions, setTransactions, 
        removalTarget, 
        requestDeleteTransaction 
    } = useTransactionsContext();

    return (
        <Dialog
            open={onRemoval}
            onClose={() => {setOnRemoval(false)}}>
            <DialogTitle>해당 내역을 삭제하시겠습니까?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    카테고리: {removalTarget.type === "expense" ? "지출" : "수입"}/{removalTarget.category}
                </DialogContentText>
                <DialogContentText>
                    내용: {removalTarget.description}
                </DialogContentText>
                <DialogContentText>
                    결제수단: {removalTarget.paymentMethod}
                </DialogContentText>
                <DialogContentText>
                    금액: {removalTarget.amount}원
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {setOnRemoval(false);}}>
                    취소
                </Button>
                <Button
                    onClick={() => {
                        setTimeout(() => {
                            requestDeleteTransaction(removalTarget);
                            setTransactions(transactions.filter(transaction => transaction.id !== removalTarget.id));
                            setOnRemoval(false);
                        }, 1000);
                    }}>
                    삭제
                </Button>
            </DialogActions>
        </Dialog>
    )
}
