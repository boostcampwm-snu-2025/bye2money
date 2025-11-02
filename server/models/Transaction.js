import { openDb } from "./database.js";

export async function createTable() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      category TEXT,
      amount INTEGER,
      memo TEXT,
      paymentMethod TEXT,
      type TEXT
    )
  `);
}
