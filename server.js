const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize DB
db.initialize();

// Register
app.post('/api/register', async (req, res) => {
  const { username, email, fullName, password } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });
  try {
    const existing = await db.getUserByUsername(username);
    if (existing) return res.status(409).json({ error: 'username already exists' });
    const id = await db.createUser(username, email || null, fullName || null, password || null);
    const user = await db.getUserByUsername(username);
    res.json({ userId: id, username: user.username, email: user.email, fullName: user.full_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });
  try {
    const user = await db.getUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'user not found' });
    res.json({ userId: user.user_id, username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Add transaction (expense/income)
app.post('/api/transaction', async (req, res) => {
  const { username, amount, category, type, description } = req.body;
  if (!username || amount == null || !category || !type) return res.status(400).json({ error: 'missing fields' });
  try {
    const user = await db.getUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'user not found' });
    await db.addTransaction(user.user_id, amount, category, type, description || null);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Get transactions
app.get('/api/transactions', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'username required' });
  try {
    const user = await db.getUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'user not found' });
    const tx = await db.getAllTransactions(user.user_id);
    res.json(tx.map(t => ({
      transactionId: t.transaction_id,
      userId: t.user_id,
      amount: t.amount,
      category: t.category,
      type: t.type,
      description: t.description,
      transactionDate: t.transaction_date
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Get balance
app.get('/api/balance', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'username required' });
  try {
    const user = await db.getUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'user not found' });
    const balance = await db.calculateBalance(user.user_id);
    res.json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Get summary
app.get('/api/summary', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'username required' });
  try {
    const user = await db.getUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'user not found' });
    const summary = await db.getExpenseSummary(user.user_id);
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Delete transaction by ID
app.post('/api/transaction/delete', async (req, res) => {
  const { transactionId, username } = req.body;
  if (!transactionId || !username) return res.status(400).json({ error: 'transactionId and username required' });
  try {
    const user = await db.getUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'user not found' });
    console.log(`Deleting transaction ${transactionId} for user ${user.user_id}`);
    const result = await db.deleteTransaction(transactionId, user.user_id);
    console.log(`Delete result:`, result);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete transaction: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
