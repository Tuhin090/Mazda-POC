require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Legacy static user list (kept for fallback — see /api/login below)
const staticUsers = require("./users");
const db = require("./db");
const sfRoutes = require("./routes/salesforce");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost/127.0.0.1 port (covers Vite port bumps in dev)
    if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));
app.use(express.json());

// ── LEGACY LOGIN (static hardcoded users — original implementation) ──────────
// Kept intact for rollback. Switch frontend to POST /api/login to revert.
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }
  const user = staticUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    return res.json({ success: true, message: "Login successful.", username: user.username });
  }
  return res.status(401).json({ success: false, message: "Invalid username or password." });
});

// ── JWT LOGIN (SQLite DB + bcrypt — active implementation) ───────────────────
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }

  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username or password." });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid username or password." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.username,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      token,
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ── JWT AUTH MIDDLEWARE ───────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Token expired or invalid." });
  }
}

// ── CURRENT USER (protected) ─────────────────────────────────────────────────
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// ── SALESFORCE DATA ROUTES (protected — requires app JWT) ────────────────────
app.use("/api/sf", requireAuth, sfRoutes);

// ── SALESFORCE SSO STUBS (to be wired up) ────────────────────────────────────
// Step 1: Frontend calls this → backend redirects to Salesforce OAuth page
app.get("/api/auth/salesforce", (req, res) => {
  // TODO: Build SF OAuth URL with client_id, redirect_uri, scope and redirect
  res.status(501).json({ message: "Salesforce SSO not yet configured." });
});

// Step 2: Salesforce redirects back here with ?code=... after user authenticates
app.get("/api/auth/salesforce/callback", (req, res) => {
  // TODO: Exchange code for SF access token, verify identity, issue app JWT
  res.status(501).json({ message: "Salesforce SSO callback not yet configured." });
});

app.listen(PORT, () => {
  console.log(`Mazda POC backend running on http://localhost:${PORT}`);
});
