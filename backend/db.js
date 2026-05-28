const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "mazda.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    first_name TEXT DEFAULT '',
    last_name TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add columns if upgrading an existing DB that predates these fields
for (const col of ["first_name", "last_name"]) {
  try {
    db.exec(`ALTER TABLE users ADD COLUMN ${col} TEXT DEFAULT ''`);
  } catch {
    // Column already exists — safe to ignore
  }
}

module.exports = db;
