package com.example.demo.domain;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "transactions") // existing table name
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String type;
    private Double amount;
    private String category;

    @Column(name = "payment_method")
    private String paymentMethod;

    private String description;
}
