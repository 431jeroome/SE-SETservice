const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = path.join(__dirname, 'expense_tracker.db');

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Could not open database', err);
  } else {
    console.log('Connected to SQLite database at', DB_FILE);
  }
});

function initialize() {
  const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT,
      full_name TEXT,
      password TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  const createTransactions = `
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('income','expense')),
      description TEXT,
      transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`;

  db.serialize(() => {
    db.run(createUsers);
    db.run(createTransactions);
  });
}

function run(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function get(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function createUser(username, email, fullName=null, password=null) {
  const sql = 'INSERT INTO users (username, email, full_name, password) VALUES (?, ?, ?, ?)';
  const res = await run(sql, [username, email, fullName, password]);
  return res.lastID;
}

async function getUserByUsername(username) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  return await get(sql, [username]);
}

async function addTransaction(userId, amount, category, type, description) {
  const sql = 'INSERT INTO transactions (user_id, amount, category, type, description) VALUES (?, ?, ?, ?, ?)';
  return await run(sql, [userId, amount, category, type, description]);
}

async function getAllTransactions(userId) {
  const sql = 'SELECT * FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC';
  return await all(sql, [userId]);
}

async function calculateBalance(userId) {
  const sql = `SELECT COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as balance FROM transactions WHERE user_id = ?`;
  const row = await get(sql, [userId]);
  return row ? row.balance : 0.0;
}

async function getExpenseSummary(userId) {
  const sql = `
    SELECT category, type, SUM(amount) as total
    FROM transactions
    WHERE user_id = ?
    GROUP BY category, type
    ORDER BY total DESC
  `;
  return await all(sql, [userId]);
}

async function deleteTransaction(transactionId, userId) {
  const sql = 'DELETE FROM transactions WHERE transaction_id = ? AND user_id = ?';
  return await run(sql, [transactionId, userId]);
}

module.exports = {
  initialize,
  createUser,
  getUserByUsername,
  addTransaction,
  getAllTransactions,
  calculateBalance,
  getExpenseSummary,
  deleteTransaction,
  raw: db
};
