import { createContext, useState, useEffect, useContext } from "react";

const InputBarContext = createContext(null);

export function InputBarContextProvider({ children }) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const defaultDate = `${year}.${month}.${day}`;
    const [dateInput, setDateInput] = useState(defaultDate);
    const [isExpense, setIsExpense] = useState(true);
    const [amountInput, setAmountInput] = useState("0");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("선택하세요");
    const [category, setCategory] = useState("선택하세요");
    const [isValid, setIsValid] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        const checkInputValidity = (dateInput, amountInput, descriptionInput, paymentMethod, category) => {
            const dateInputValidity = checkDateInputValidity(dateInput);
            const amountInputValidity = checkAmountInputValdity(amountInput);
            const descriptionInputValidity = checkDescriptionInputValidity(descriptionInput);
            const paymentMethodValidity = checkPaymentMethodValidity(paymentMethod);
            const categoryValidity = checkCategoryValidity(category)
            return dateInputValidity && amountInputValidity && descriptionInputValidity && paymentMethodValidity && categoryValidity;
        }

        const checkDateInputValidity = (dateInput) => {
            if (!/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(dateInput)) {
                return false;
            }
            
            const parsedDateInput = dateInput.split(".");
            const year = Number(parsedDateInput[0]);
            const month = Number(parsedDateInput[1]);
            const day = Number(parsedDateInput[2]);

            const monthValidity = (month >= 1 && month <= 12);    
            const lastDayOfMonth = new Date(year, month, 0).getDate();
            const dayValidity = (day >= 1 && day <= lastDayOfMonth);
            return monthValidity && dayValidity
        }
        
        const checkAmountInputValdity = (amountInput) => {return true};
        const checkDescriptionInputValidity = (descriptionInput) => {return descriptionInput !== ""};
        const checkPaymentMethodValidity = (paymentMethod) => {return paymentMethod !== "선택하세요"};
        const checkCategoryValidity = (category) => {return category !== "선택하세요"};
    
        const inputValidity = checkInputValidity(dateInput, amountInput, descriptionInput, paymentMethod, category);
        setIsValid(inputValidity);
    })

    const [paymentMethods, setPaymentMethods] = useState([])
    const [isPaymentMethodSelectActive, 
           setIsPaymentMethodSelectActive] = useState(false);
    const [onAddition, setOnAddition] = useState(false);
    const [onRemoval, setOnRemoval] = useState(false);
    const [removalTarget, setRemovalTarget] = useState("");
    
    const fetchPaymentMethods = async () => {
        const res = await fetch("http://localhost:3001/api/paymentMethods");
        const data = await res.json();
        setPaymentMethods(data.paymentMethods || []);
    };

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

    const saveHandler = () => {
        const yearMonth = parseYearMonth(dateInput);
        const transaction = {
            date: dateInput, 
            type: isExpense ? "expense" : "income",
            amount: Number(amountInput), 
            description: descriptionInput, 
            paymentMethod: paymentMethod, 
            category: category
        }
        
        if (editingTransaction === null) {
            requestPostTransaction(yearMonth, transaction);
        } else {
            requestUpdateTransaction(yearMonth, editingTransaction.id, transaction);
        }
    }

    const parseYearMonth = (dateInput) => {
        const parsedDate = dateInput.split(".");
        const year = parsedDate[0];
        const month = parsedDate[1];
        const yearMonth = `${year}-${month}`;
        return yearMonth;
    }

    const requestPostTransaction = async (yearMonth, transaction) => {
        const url = `http://localhost:3001/api/transactions/${yearMonth}`;
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(transaction)
        }).then(response => {response.ok ? resetInputBar() : {}})
    }

    const requestUpdateTransaction = async (yearMonth, id, transaction) => {
        const url = `http://localhost:3001/api/transactions/${yearMonth}/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(transaction)
        }).then(response => {response.ok ? resetInputBar() : {}})
    }

    const resetInputBar = () => {
        setDateInput(defaultDate);
        setAmountInput("0");
        setDescriptionInput("");
        setPaymentMethod("선택하세요");
        setCategory("선택하세요");
        setIsExpense(false);
        setIsValid(false);
    }

    const inputBarContextValue = {
        dateInput, setDateInput,
        isExpense, setIsExpense,
        amountInput, setAmountInput,
        descriptionInput, setDescriptionInput,
        paymentMethod, setPaymentMethod,
        paymentMethods, setPaymentMethods,
        isPaymentMethodSelectActive, 
        setIsPaymentMethodSelectActive,
        onAddition, setOnAddition,
        onRemoval, setOnRemoval,
        removalTarget, setRemovalTarget,
        fetchPaymentMethods,
        requestPostPaymentMethods,
        requestDeletePaymentMethods,
        category, setCategory,
        isValid, setIsValid,
        saveHandler,
        editingTransaction, setEditingTransaction
    };
    
    return (
        <InputBarContext.Provider value={inputBarContextValue}>
            {children}
        </InputBarContext.Provider>
    )
}

export const useInputBarContext = () => {
    const context = useContext(InputBarContext);
    if (context === null) {
        throw new Error("No Input Bar Context");
    }
    return context;
}