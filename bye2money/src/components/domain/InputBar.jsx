import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useState } from "react";
import { DirtyLens } from "@mui/icons-material";

export function InputBar() {
    
    return (
        <Box 
            sx={{
                position: "absolute",
                display: "flex", 
                justifyContent: "center",
                top: "180px"}}>
        <Paper 
            sx={{
            width: "846px",
            height: "76px",
            boxSizing: "border-box"}}>
            <Stack 
            direction="row" 
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ height: "100%", alignItems: "center" }}>
            <DateInput />
            <AmountInput />
            <DescriptionInput />
            <PaymentMethodSelect />
            <CategorySelect />
            <SaveButton />
            </Stack>
        </Paper>
        </Box>
    );
}

function DateInput() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const defaultDate = `${year}.${month}.${day}`;
    const [dateInput, setDateInput] = useState(defaultDate);

    const dateInputHandler = (event) => {
        const prevInput = dateInput;
        const rawInput = event.target.value;
        const input = rawInput.split(".").length === 3 ? rawInput : prevInput;
        setDateInput(input);
    }

    return (
        <Box sx={{ flex: 1.5, textAlign: "start", pl: 2 }}>
            <Typography variant="body2" color="text.secondary">일자</Typography>
            <input 
                value={dateInput}
                onChange={dateInputHandler}
                style={{ 
                    width: "100%",
                    border: "none", 
                    color: "black",
                    fontSize: "1rem",
                    background: "transparent",
                    outline: "none"}}/>
        </Box>
    );
}

function AmountInput() {
    const [amountInput, setAmountInput] = useState("0");
    const [isExpense, setIsExpense] = useState(true);

    const amountInputHandler = (event) => {
        const rawInput = event.target.value;
        const numberOnlyInput = rawInput.replace(/[^0-9]/g, "") 
        setAmountInput(numberOnlyInput);
    }

    const formattedAmount = Number(amountInput).toLocaleString("ko-KR");

    return (
        <Box sx={{ flex: 2, textAlign: "start", justifyContent: "space-between" }}>
            <Box sx={{ justifyContent: "start" }}>
                <Typography variant="body2" color="text.secondary">금액</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <IconButton 
                    sx={{
                        padding: 0
                    }}
                    onClick={() => setIsExpense(!isExpense)} 
                    aria-label={"transcation type"}>
                    {isExpense ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                </IconButton>
                <input 
                    value={`${formattedAmount} 원`}
                    onChange={amountInputHandler}
                    style={{ 
                        width: "100%",
                        textAlign: "end",
                        border: "none", 
                        color: "black",
                        fontSize: "1rem",
                        background: "transparent",
                        outline: "none"}}/>
            </Box>
                </Box>
    );
}

function DescriptionInput() {
    const [numChar, setNumChar] = useState(0);
    const [descriptionInput, setDescriptionInput] = useState("");

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

function PaymentMethodSelect() {
    const [paymentMethod, setPaymentMethod] = useState("선택하세요");
    const [paymentMethods, setPaymentMethods] = useState([])
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [onAddition, setOnAddition] = useState(false);
    const [onRemoval, setOnRemoval] = useState(false);
    const [removalTarget, setRemovalTarget] = useState("");
    
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
                            setPaymentMethods={setPaymentMethods} /> 
                        : <></>}
            {onRemoval ? <PaymentRemovalModal 
                            onRemoval={onRemoval}
                            setOnRemoval={setOnRemoval}
                            paymentMethods={paymentMethods}
                            setPaymentMethods={setPaymentMethods}
                            removalTarget={removalTarget}
                        /> : <></>} 
        </Box>
    );
}

function PaymentMethodSelectBox({ setPaymentMethod, paymentMethods, setIsDropdownActive, setOnAddition, setOnRemoval, setRemovalTarget }) {
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
                            setIsDropdownActive(false);
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
                position: 'absolute',
                top: '115%',
                left: "-10%",
                width: "120%",
                zIndex: 20,
                mt: 0.5,
                bgcolor: 'background.paper',
                boxShadow: 3,}}>
            <List dense>
                {paymentMethodsList}
                <ListItem
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        '&hover': { bgcolor: "action.hover"},
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

function PaymentAdditionModal({ onAddition, setOnAddition, paymentMethods, setPaymentMethods }) {
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
                        setPaymentMethods([...paymentMethods, paymentMethodInput])
                        setOnAddition(false)
                    }}>
                    추가
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function PaymentRemovalModal({ onRemoval, setOnRemoval, paymentMethods, setPaymentMethods, removalTarget }) {
    return (
        <Dialog
            open={onRemoval}
            onClose={() => {setOnRemoval(false)}}>
            <DialogTitle>결제수단 삭제</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    해당 결제 수단({removalTarget})을 삭제하시겠습니까?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setPaymentMethods(paymentMethods.filter(method => method !== removalTarget));
                        setOnRemoval(false);
                    }}>
                    삭제
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function CategorySelect() {
  return (
    <Box sx={{ flex: 1.5, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">분류</Typography>
      <Typography variant="body1">식비</Typography>
    </Box>
  );
}

function SaveButton() {
  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Button variant="contained" sx={{ borderRadius: "8px" }}>
        확인
      </Button>
    </Box>
  );
}
