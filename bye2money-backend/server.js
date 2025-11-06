const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Payments table
  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Failed to create payments table:', err.message);
      return;
    }

    // Insert default payment methods after table is created
    const defaultPayments = ['현금', '신용카드'];
    defaultPayments.forEach(payment => {
      db.run('INSERT OR IGNORE INTO payments (name) VALUES (?)', [payment], (err) => {
        if (err) {
          console.error(`Failed to insert default payment ${payment}:`, err.message);
        }
      });
    });
  });

  // Transactions table
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      amount INTEGER NOT NULL,
      description TEXT NOT NULL,
      payment TEXT NOT NULL,
      category TEXT NOT NULL,
      type TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (payment) REFERENCES payments(name)
    )
  `);

  console.log('Database tables initialization started');
}

// Routes

// Get all payments
app.get('/api/payments', (req, res) => {
  db.all('SELECT name FROM payments ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const payments = rows.map(row => row.name);
    res.json(payments);
  });
});

// Add payment
app.post('/api/payments', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Payment name is required' });
    return;
  }

  db.run('INSERT INTO payments (name) VALUES (?)', [name], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ name });
  });
});

// Delete payment
app.delete('/api/payments/:name', (req, res) => {
  const { name } = req.params;
  db.run('DELETE FROM payments WHERE name = ?', [name], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Payment deleted' });
  });
});

// Get all transactions
app.get('/api/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Convert amount to string for consistency
    const transactions = rows.map(row => ({
      ...row,
      amount: row.amount.toString()
    }));
    res.json(transactions);
  });
});

// Add transaction
app.post('/api/transactions', (req, res) => {
  const { date, amount, description, payment, category, type } = req.body;

  if (!date || !amount || !description || !payment || !category || !type) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Convert amount to number, removing commas if present
  const numericAmount = typeof amount === 'string'
    ? parseInt(amount.replace(/,/g, ''), 10)
    : amount;

  db.run(
    'INSERT INTO transactions (date, amount, description, payment, category, type) VALUES (?, ?, ?, ?, ?, ?)',
    [date, numericAmount, description, payment, category, type],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        date,
        amount: numericAmount.toString(),
        description,
        payment,
        category,
        type
      });
    }
  );
});

// Update transaction
app.put('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { date, amount, description, payment, category, type } = req.body;

  if (!date || !amount || !description || !payment || !category || !type) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Convert amount to number, removing commas if present
  const numericAmount = typeof amount === 'string'
    ? parseInt(amount.replace(/,/g, ''), 10)
    : amount;

  db.run(
    'UPDATE transactions SET date = ?, amount = ?, description = ?, payment = ?, category = ?, type = ? WHERE id = ?',
    [date, numericAmount, description, payment, category, type, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id,
        date,
        amount: numericAmount.toString(),
        description,
        payment,
        category,
        type
      });
    }
  );
});

// Delete transaction
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM transactions WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Transaction deleted' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
