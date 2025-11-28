require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db');
const app = express();
const port = process.env.PORT || 3001;

// enable CORS (configurable via CORS_ORIGIN env var)
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// simple DB ping endpoint — returns server time from Postgres (if connected)
app.get('/api/db-ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as now');
    return res.json({ ok: true, dbTime: result.rows[0].now });
  } catch (err) {
    console.error('DB ping error', err.message || err);
    return res.status(500).json({ ok: false, error: err.message || 'DB error' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
