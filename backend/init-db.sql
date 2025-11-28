-- Sample init script: create a simple users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example insert
INSERT INTO users (name, email) VALUES ('Admin User', 'admin@example.com') ON CONFLICT DO NOTHING;
