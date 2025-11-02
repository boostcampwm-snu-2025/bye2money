package com.example.demo.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.domain.Transaction;
import com.example.demo.repository.TransactionRepository;

@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository repo;

    // endpoint: /api/transactions/getTransactionList
    @GetMapping("/getTransactionList")
    public List<Transaction> getTransactionList() {
        return repo.findAll();
    }

    @PostMapping
    public Transaction create(@RequestBody Transaction tx) {
        return repo.save(tx);
    }
}
