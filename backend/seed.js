require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("./db");

// Same users as users.js — passwords will be hashed and stored in DB
const users = [
  { username: "admin",                          password: "Admin@123",   role: "admin",  first_name: "Admin",  last_name: "User"    },
  { username: "dealer01",                       password: "Dealer@456",  role: "dealer", first_name: "Dealer", last_name: "One"     },
  { username: "dealer02",                       password: "Dealer@789",  role: "dealer", first_name: "Dealer", last_name: "Two"     },
  { username: "mazda_user",                     password: "Mazda@2026",  role: "user",   first_name: "Mazda",  last_name: "User"    },
  { username: "testuser",                       password: "Test@111",    role: "user",   first_name: "Test",   last_name: "User"    },
  { username: "tuhin.bhunia@cloudkaptan.com",   password: "Tuhin@123",   role: "admin",  first_name: "Tuhin",  last_name: "Bhunia"  },
  { username: "john.thompson@email.com",        password: "John@123",    role: "admin",   first_name: "John",   last_name: "Thompson" },
  { username: "alex.thompson@email.com",        password: "Alex@123",    role: "user",    first_name: "Alex",   last_name: "Thompson" },
];

const insert = db.prepare(
  "INSERT OR REPLACE INTO users (username, password_hash, role, first_name, last_name) VALUES (?, ?, ?, ?, ?)"
);

console.log("Seeding users into mazda.db...\n");

for (const user of users) {
  const hash = bcrypt.hashSync(user.password, 12);
  insert.run(user.username, hash, user.role, user.first_name, user.last_name);
  console.log(`  ✓ ${user.username}  [${user.role}]`);
}

console.log("\nDone. Database ready.");
