const { Pool } = require('pg');

/**
 * Pool configuration will use DATABASE_URL if provided, otherwise build from individual PG* env vars.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
});

module.exports = { pool };
