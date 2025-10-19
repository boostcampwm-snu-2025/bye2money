import express from "express";
import cors from "cors";
import fs from 'fs';
import path from 'path';
import { DATA } from "./data.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataFilePath = path.resolve('./data.js');

function saveDataToFile() {
  const fileContent = `export const DATA = ${JSON.stringify(DATA, 2)};\n`;
  
  try {
    fs.writeFileSync(dataFilePath, fileContent, 'utf8');
    console.log('Data successfully saved to data.js');
  } catch (error) {
    console.error('Error saving data to file:', error);
  }
}



app.get("/api/paymentMethods", (req, res) => {
    const handleSearchPaymentMethodsRequest = (req, res) => {
        const result = DATA["PAYMENTMETHODS"]
        res.json({ paymentMethods: result ? result : [], total: result ? result.length : 0});
    }
    handleSearchPaymentMethodsRequest(req, res);
});

app.post("/api/paymentMethods", (req, res) => {
    const handlePostPaymentMethodsRequest = (req, res) => {
        const { newPaymentMethod } = req.body;
        DATA["PAYMENTMETHODS"].push(newPaymentMethod);
    }
    handlePostPaymentMethodsRequest(req, res);
    saveDataToFile();
});

app.delete("/api/paymentMethods", (req, res) => {
    const handleDeletePaymentMethodsRequest = (req, res) => {
        const { targetPaymentMethod } = req.body;
        DATA["PAYMENTMETHODS"] = DATA["PAYMENTMETHODS"].filter(method => method !== targetPaymentMethod);
    }
    handleDeletePaymentMethodsRequest(req, res);
    saveDataToFile();
});

app.get("/api/transactions/:yearMonth", (req, res) => {
    const handleSearchTransactionsRequest = (req, res) => {
        const { yearMonth } = req.params;
        const result = DATA["TRANSACTIONS"][yearMonth];
        res.json({ transactions: result ? result : [], total: result ? result.length : 0 });
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
        DATA["TRANSACTIONS"][yearMonth] ? DATA["TRANSACTIONS"][yearMonth].push(newTransaction)
                                        : DATA["TRANSACTIONS"][yearMonth] = [newTransaction];
        res.status(201).json(newTransaction);
    }
    handlePostTransactionsRequest(req, res);
    saveDataToFile();
})

app.delete("/api/transactions/:yearMonth/:id", (req, res) => {
    const handleDeleteTransactionsRequest = (req, res) => {
        const { yearMonth, id } = req.params;
        const numericID = parseInt(id, 10)
        DATA["TRANSACTIONS"][yearMonth] = DATA["TRANSACTIONS"][yearMonth]
                                        .filter(transcation => transcation["id"] !== numericID);
    }
    handleDeleteTransactionsRequest(req, res);
    saveDataToFile();
})

app.listen(PORT, () => {
    console.log(`Serer running at http://localhost:${PORT}`);
})