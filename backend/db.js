const { Pool } = require('pg');

/**
 * Create a pool that supports DATABASE_URL or individual PG* env vars, and optional SSL (PGSSLMODE).
 */
const sslMode = process.env.PGSSLMODE || process.env.DB_SSL || 'disable';

const poolOptions = {};
if (process.env.DATABASE_URL) {
  poolOptions.connectionString = process.env.DATABASE_URL;
}

if (!poolOptions.connectionString) {
  poolOptions.host = process.env.PGHOST || 'localhost';
  poolOptions.port = process.env.PGPORT ? Number(process.env.PGPORT) : 5432;
  poolOptions.user = process.env.PGUSER || 'postgres';
  poolOptions.password = process.env.PGPASSWORD || '';
  poolOptions.database = process.env.PGDATABASE || 'postgres';
}

// If SSL is required in the environment (PGSSLMODE not 'disable'), set SSL options.
if (sslMode && sslMode !== 'disable') {
  // For many hosted providers the certificate won't be signed for TLS hostname verification in CI, so
  // disable strict verification by default (rejectUnauthorized=false). If you need full verification set
  // PGSSLMODE=verify-full and ensure a proper CA is supplied.
  poolOptions.ssl = {
    rejectUnauthorized: sslMode === 'verify-full'
  };
}

const pool = new Pool(poolOptions);

module.exports = { pool };
