import express from "express";
import cors from "cors";
import { DATA } from "./data.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/paymentMethods", (req, res) => {
    const handleSearchPaymentMethodsRequest = (req, res) => {
        const result = DATA["PAYMENTMETHODS"]
        res.json({ paymentMethods: result ? result : {}, total: result ? result.length : 0});
    }
    handleSearchPaymentMethodsRequest(req, res);
});

let lastPaymentMethodID = 0;
app.post("/api/paymentMethods", (req, res) => {
    const handlePostPaymentMethodsRequest = (req, res) => {
        const { paymentMethod } = req.body;
        const newPaymentMethod = { "id": lastPaymentMethodID++, "paymentMethod": paymentMethod };
        DATA["PAYMENTMETHODS"].push(newPaymentMethod);
    }
    handlePostPaymentMethodsRequest(req, res);
});

app.delete("/api/paymentMethods/:id", (req, res) => {
    const handleDeletePaymentMethodsRequest = (req, res) => {
        const { id } = req.params;
        const numericID = parseInt(id, 10);
        DATA["PAYMENTMETHODS"] = DATA["PAYMENTMETHODS"].filter(paymentMethod => paymentMethod["id"] !== numericID);
    }
    handleDeletePaymentMethodsRequest(req, res);
});

app.get("/api/transactions/:yearMonth", (req, res) => {
    const handleSearchTransactionsRequest = (req, res) => {
        const { yearMonth } = req.params;
        const result = DATA["TRANSACTION"][yearMonth];
        res.json({ transactions: result, total: result.length });
    }
    handleSearchTransactionsRequest(req, res);
})


let lastTransactionID = 0;
app.post("/api/transactions/:yearMonth", (req, res) => {
    const handlePostTransactionsRequest = (req, res) => {
        const { yearMonth } = req.params;
        const { date, type, amount, description, paymentMethod, category } = req.body;
        const newTransaction = {
            "id": lastTransactionID++, 
            "date": date,
            "type": type,
            "amount": amount,
            "description": description,
            "paymentMethod": paymentMethod,
            "category": category};
        DATA["TRANSACTION"][yearMonth].push(newTransaction);
    }
    handlePostTransactionsRequest(req, res);
})

app.delete("/api/transactions/:yearMonth/:id", (req, res) => {
    const handleDeleteTransactionsRequest = (req, res) => {
        const { yearMonth, id } = req.params;
        const numericID = parseInt(id, 10)
        DATA["TRANSACTION"][yearMonth] = DATA["TRANSACTION"][yearMonth]
                                        .filter(transcation => transcation["id"] !== numericID);
    }
    handleDeleteTransactionsRequest(req, res);
})

app.listen(PORT, () => {
    console.log(`Serer running at http://localhost:${PORT}`);
})