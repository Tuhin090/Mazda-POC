# Mazda POC — Project Summary

## Overview

A React + Express web application replicating the Mazda dealer portal (`portal.mazdausa.com`). Built with a pixel-faithful login page, authenticated dashboard, and connected services/support tabs. Features JWT authentication, SQLite database, Salesforce Agentforce widget integration, and a Salesforce data integration layer.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite, React Router v6 |
| Backend | Node.js (v23 via Homebrew), Express.js |
| Database | SQLite via `better-sqlite3` |
| Auth | JWT (`jsonwebtoken`) + bcrypt (`bcryptjs`) |
| Env config | `dotenv` |

---

## Project Structure

```
Mazda-POC/
├── backend/
│   ├── server.js           # Main Express server
│   ├── db.js               # SQLite schema + connection
│   ├── seed.js             # Seed users with hashed passwords
│   ├── salesforce.js       # SF OAuth token manager + REST helpers
│   ├── users.js            # Legacy static user list (kept for rollback)
│   ├── routes/
│   │   └── salesforce.js   # Salesforce API route handlers
│   ├── mazda.db            # SQLite database file (gitignored)
│   └── .env                # Environment variables (gitignored)
└── frontend/
    └── src/
        ├── App.jsx                     # Routes + PrivateRoute (JWT expiry check)
        ├── pages/
        │   ├── Login.jsx / Login.css
        │   ├── Dashboard.jsx / Dashboard.css
        │   ├── ConnectedServices.jsx / ConnectedServices.css
        │   └── Support.jsx / Support.css
        ├── components/
        │   ├── Layout.jsx / Layout.css  # Shared nav + footer (all authenticated pages)
        └── data/
            └── dashboardData.js         # Central data file for all pages
```

---

## Running the App

### Backend
```bash
cd /Users/tuhin/Documents/Projects/Mazda-POC/backend
PATH="/opt/homebrew/bin:$PATH" node server.js
```

### Frontend
```bash
cd /Users/tuhin/Documents/Projects/Mazda-POC/frontend
PATH="/opt/homebrew/bin:$PATH" npm run dev
```

> **Note:** Must use Homebrew Node (`/opt/homebrew/bin/node` = v23). System default is v16 which is incompatible.

### URLs
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## Authentication

### Active: JWT + bcrypt + SQLite

**Login flow:**
1. POST `/api/auth/login` with `{ username, password }`
2. Backend looks up user in SQLite, verifies password with bcrypt
3. Returns signed JWT (8h expiry) containing `id`, `username`, `role`, `first_name`, `last_name`, `email`
4. Frontend stores JWT in `sessionStorage` as `mazda_auth`
5. `PrivateRoute` in `App.jsx` decodes JWT client-side and checks expiry on every route change

**To revert to static login (legacy):**
- In `Login.jsx`, change fetch URL from `/api/auth/login` → `/api/login`
- Store `data.username` instead of `data.token`
- The old endpoint is preserved intact in `server.js`

### Users (in SQLite DB)

| Username | Password | Role |
|---|---|---|
| admin | Admin@123 | admin |
| dealer01 | Dealer@456 | dealer |
| dealer02 | Dealer@789 | dealer |
| mazda_user | Mazda@2026 | user |
| testuser | Test@111 | user |
| tuhin.bhunia@cloudkaptan.com | Tuhin@123 | admin |

**To add/update users:** Edit `seed.js` then run:
```bash
PATH="/opt/homebrew/bin:$PATH" node seed.js
```

---

## Pages

### Login (`/`)
- Split layout: 60% hero image (left), 40% form panel (right)
- Hero image: `https://portal.mazdausa.com/pics/images/WSLBanner.webp`
- Mazda logo from `https://portal.mazdausa.com/pics/images/mazda_logo.png`
- Social icons linking to real Mazda USA handles (Facebook, YouTube, X, Instagram, Threads, LinkedIn)
- **"Login with Salesforce"** button — Coming Soon (disabled), wired to `/api/auth/salesforce` stub for future SSO
- Agentforce widget (`Mazda_Prechat_ESD` deployment) loaded here only
- After successful login: `window.location.href = '/dashboard'` (hard navigate, not React Router — ensures the login-page Agentforce bootstrap is cleared from memory)

### Dashboard (`/dashboard`)
Data-driven from `dashboardData.js`. Sections:
- Welcome row with vehicle selector
- Vehicle card (dark hero with car image, specs: VIN, odometer, warranty, software, last trip, model year)
- Vehicle status grid (fuel, oil life, doors, tyre pressure, battery, exterior lights)
- Subscription status with progress bar + **"View Plans →"** button (navigates to Connected Services)
- Upcoming service card
- Recent activity list
- Quick actions grid (6 buttons — Support button navigates to `/support`)

### Connected Services (`/connected-services`)
- Trial status banner
- Basic ($10.99/mo) vs Premier ($24.99/mo) plan cards
- Premier has dark red border and RECOMMENDED badge
- Feature comparison with check/cross icons
- Data from `dashboardData.connectedServices`

### Support (`/support`)
- 3 contact cards: Live Chat, Call Help Center, Roadside Assistance
- FAQ accordion with live search filter
- Support requests with OPEN/RESOLVED badges
- "Still need help?" dark card
- Data from `dashboardData.support`
- FAQs are configurable — add `{ question, answer }` objects to `dashboardData.support.faqs`

---

## Layout (Authenticated Pages)

`Layout.jsx` wraps all authenticated pages with:
- Top nav bar (Mazda logo, nav links, bell icon, avatar)
- Avatar shows first letter of logged-in username (decoded from JWT)
- Active nav tab highlighted based on current route
- Clicking avatar logs out (clears `sessionStorage`, redirects to `/`)
- Footer with Privacy/Terms/Accessibility links
- **Agentforce widget** (`SDO_Messaging_for_Web` deployment) loaded here for all post-login pages

---

## Agentforce (Salesforce Embedded Messaging)

### Two separate deployments:

| Deployment | Page | Script ID |
|---|---|---|
| `Mazda_Prechat_ESD` | Login page only | `agentforce-login-bootstrap` |
| `SDO_Messaging_for_Web` | All authenticated pages (via Layout) | `agentforce-bootstrap` |

### Pre-chat field mapping (authenticated agent)

From `onEmbeddedMessagingReady`, two API calls are made:

```js
// Visible fields (pre-populated, user can edit)
embeddedservice_bootstrap.prechatAPI.setVisiblePrechatFields({
  "_firstName": { value: user.first_name, isEditableByEndUser: true },
  "_lastName":  { value: user.last_name,  isEditableByEndUser: true },
  "_email":     { value: user.email,      isEditableByEndUser: true },
  "_subject":   { value: "Support Request", isEditableByEndUser: true },
});

// Hidden field (invisible to user, visible to agent)
embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({
  EndUserEmail: user.email,
});
```

Field keys match Salesforce Parameter Mappings:
- `_firstName`, `_lastName`, `_email`, `_subject` (Channel Variable Names)
- `EndUserEmail` (Hidden Pre-Chat Field)

User data is decoded from the JWT token stored in `sessionStorage`.

### Known Issue — Agentforce not loading
The SDO org has:
1. **IP range restrictions** blocking requests from non-whitelisted IPs
2. **`frame-ancestors` CSP header** set to `*.abc.com` only — blocks localhost from framing the Experience Site

**Salesforce-side configs already done:**
- Trusted URLs: `http://localhost:5173` added ✅
- Sites → Trusted Domains for Inline Frames: `http://localhost:5173` added ✅
- Experience Builder → Clickjack Protection: "Allow framing by any page" ✅

**Remaining fix needed (Salesforce admin):**
- The `frame-ancestors` restriction appears to be set at the SDO infrastructure level (not overridable via UI)
- Options: get IP whitelisted on the SDO org, or use a regular Salesforce Developer Org instead of SDO

---

## Salesforce Data Integration

Backend routes available under `/api/sf/*` — all protected by JWT middleware.

### Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/sf/test` | Connection test — returns org info, username |
| GET | `/api/sf/accounts` | Fetch Accounts (limit param) |
| GET | `/api/sf/contacts` | Fetch Contacts |
| GET | `/api/sf/cases` | Fetch Cases (maps to Support Requests) |
| GET | `/api/sf/assets` | Fetch Assets (maps to Vehicle info) |
| GET | `/api/sf/service-appointments` | Fetch Service Appointments (requires FSL) |
| GET | `/api/sf/opportunities` | Fetch Opportunities |
| GET | `/api/sf/query?soql=...` | Generic SOQL query endpoint |
| GET | `/api/sf/objects` | List all objects in the org |
| POST | `/api/sf/refresh-token` | Force token cache clear |

### Setup Required (not yet done)

Fill in `backend/.env`:
```
SF_LOGIN_URL=https://login.salesforce.com
SF_CLIENT_ID=your_connected_app_consumer_key
SF_CLIENT_SECRET=your_connected_app_consumer_secret
SF_USERNAME=your_salesforce_username
SF_PASSWORD=your_salesforce_password
SF_SECURITY_TOKEN=your_security_token
SF_API_VERSION=v62.0
```

**Salesforce steps:**
1. Setup → App Manager → New Connected App
2. Enable OAuth, scopes: `api`, `refresh_token`
3. Setup → OAuth and OpenID Connect Settings → Enable "Allow OAuth Username-Password Flows"
4. My Settings → Reset My Security Token (check email)

**Test after setup:**
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

curl http://localhost:5000/api/sf/test -H "Authorization: Bearer $TOKEN"
```

### Dashboard field mapping (pending)
Data is fetched but NOT yet mapped to dashboard UI fields. Next step after confirming the integration works: replace `dashboardData.js` static values with live Salesforce data.

---

## Salesforce SSO (Future — Login with Salesforce)

Stubs are already in place:

**Backend (`server.js`):**
- `GET /api/auth/salesforce` → Will redirect to Salesforce OAuth authorization URL
- `GET /api/auth/salesforce/callback` → Will exchange code for SF access token, verify identity, issue app JWT

**Frontend (`Login.jsx`):**
- "Login with Salesforce" button rendered with "Coming Soon" badge
- `handleSalesforceLogin()` wired to `window.location.href = 'http://localhost:5000/api/auth/salesforce'`

**To implement:** Create a Salesforce Connected App with a Web OAuth flow, configure redirect URI to `/api/auth/salesforce/callback`, implement the OAuth code exchange in the backend stub.

---

## Pending / TODO

| Item | Status |
|---|---|
| Service tab (`/service`) | Not built — no design provided yet |
| Salesforce data → dashboard field mapping | Integration built, mapping pending |
| Salesforce SSO (Login with Salesforce) | Stubs in place, implementation pending |
| Agentforce widget on SDO | Blocked by SDO IP/CSP restrictions |
| Add new users via UI | Currently requires editing `seed.js` manually |

---

## Environment Variables Reference

**`backend/.env`**
```
JWT_SECRET=mazda_poc_jwt_secret_2026_change_before_production
PORT=5000
SF_LOGIN_URL=https://login.salesforce.com
SF_CLIENT_ID=your_connected_app_consumer_key
SF_CLIENT_SECRET=your_connected_app_consumer_secret
SF_USERNAME=your_salesforce_username@example.com
SF_PASSWORD=your_salesforce_password
SF_SECURITY_TOKEN=your_security_token
SF_API_VERSION=v62.0
```
