# Mazda POC — Project Summary

## Overview

A React + Express web application replicating the Mazda dealer portal (`portal.mazdausa.com`). Features a pixel-faithful login page, authenticated dashboard, connected services, and support tabs. Built with JWT authentication, SQLite, Salesforce Agentforce (Embedded Messaging for Web) integration, and a Salesforce data integration layer.

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
    ├── index.html                      # Entry HTML — contains sync SF storage clear script
    ├── vite.config.js                  # host: "0.0.0.0" to allow 127.0.0.1 access
    └── src/
        ├── App.jsx                     # Routes + PrivateRoute + AuthHandoff
        ├── pages/
        │   ├── Login.jsx / Login.css
        │   ├── Dashboard.jsx / Dashboard.css
        │   ├── ConnectedServices.jsx / ConnectedServices.css
        │   └── Support.jsx / Support.css
        ├── components/
        │   ├── Layout.jsx / Layout.css     # Shared nav, dropdown, account modal, footer
        │   └── AgentforceWidget.jsx        # Unused — created during refactor, kept for reference
        └── data/
            └── dashboardData.js            # Central data file for all pages
```

---

## Running the App

### Backend
```bash
cd /Users/tuhin/Documents/Projects/Mazda-POC/backend
PATH="/opt/homebrew/bin:$PATH" node server.js
```

### Frontend
Two dev servers — run both simultaneously:
```bash
cd /Users/tuhin/Documents/Projects/Mazda-POC/frontend

# Dashboard server (authenticated pages)
PATH="/opt/homebrew/bin:$PATH" npm run dev

# Login server (separate origin for Agentforce session isolation)
PATH="/opt/homebrew/bin:$PATH" npm run dev:login
```

> **Note:** Must use Homebrew Node (`/opt/homebrew/bin/node` = v23). System default v16 is incompatible.

### URLs

| Purpose | URL |
|---|---|
| Login page | `http://localhost:5174` |
| Dashboard (post-login) | `http://localhost:5173` |
| Backend API | `http://localhost:5000` |

> **Important:** Login and Dashboard run on different ports (`5174` vs `5173`). Different ports = different browser origins = isolated `localStorage`/`sessionStorage`. This is intentional — see Agentforce Session Isolation section below.

---

## Authentication

### Flow
1. POST `/api/auth/login` with `{ username, password }`
2. Backend looks up user in SQLite, verifies password with bcrypt
3. Returns signed JWT (8h expiry) containing `id`, `username`, `role`, `first_name`, `last_name`, `email`
4. Frontend navigates from `localhost:5174` to `http://localhost:5173/auth?t=<JWT>` (cross-port hand-off — see Agentforce section)
5. `AuthHandoff` component reads `?t=` param, stores JWT in `sessionStorage` as `mazda_auth`, redirects to `/dashboard`
6. `PrivateRoute` in `App.jsx` decodes JWT client-side and checks expiry on every route change

### Users (SQLite DB)

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

### Login (`/`) — served at `http://localhost:5174`
- Split layout: 60% hero image (left), 40% form panel (right)
- Hero image: `https://portal.mazdausa.com/pics/images/WSLBanner.webp`
- Mazda logo from `https://portal.mazdausa.com/pics/images/mazda_logo.png`
- Social icons linking to real Mazda USA handles (Facebook, YouTube, X, Instagram, Threads, LinkedIn)
- **"Login with Salesforce"** button hidden via CSS (`display: none`) — wired to `/api/auth/salesforce` stub for future SSO. JSX kept intact, only hidden.
- **OR divider** also hidden via CSS
- `Mazda_Prechat_ESD` Agentforce widget loaded on this page only
- On successful login: attempts `clearSession(true)` on the Mazda widget (to end the Salesforce session cleanly), then navigates to `http://localhost:5173/auth?t=<JWT>`

### Dashboard (`/dashboard`) — served at `http://localhost:5173`
Data-driven from `dashboardData.js`. Sections:
- Welcome row with vehicle selector dropdown
- Vehicle card (dark hero with car image, specs: VIN, odometer, warranty, software version, last trip, model year)
- Vehicle status grid (fuel %, oil life, doors lock state, tyre pressure, battery %, exterior lights)
- Subscription status with progress bar + **"View Plans →"** button (navigates to Connected Services)
- Upcoming service card
- Recent activity list
- Quick actions grid (6 buttons — Support navigates to `/support`)

### Connected Services (`/connected-services`)
- Trial status banner
- Basic ($10.99/mo) vs Premier ($24.99/mo) plan cards
- Premier has dark red border and RECOMMENDED badge
- Feature comparison table with check/cross icons

### Support (`/support`)
- 3 contact cards: Live Chat, Call Help Center, Roadside Assistance
- FAQ accordion with live search/filter
- Support requests list with OPEN/RESOLVED badges
- "Still need help?" dark card

### Auth Handoff (`/auth`)
- Invisible route handled by `AuthHandoff` component in `App.jsx`
- Reads `?t=` JWT from URL, stores in `sessionStorage`, immediately redirects to `/dashboard`
- Required for the two-origin Agentforce session isolation strategy

---

## Layout (Authenticated Pages)

`Layout.jsx` wraps all authenticated pages with:
- Top nav bar: Mazda logo, nav links, bell icon, avatar
- **Profile dropdown** (click avatar): shows user's full name, email, role badge, "My Account" button, "Sign Out" button
- **My Account modal**: full-screen overlay with avatar, role badge, and field list (Full Name, Username, Email, Role) — all decoded from JWT
- Active nav tab highlighted based on current route
- **Sign Out**: calls `window.location.href = "http://localhost:5174"` (hard redirect to login origin, destroys SDO widget DOM and global)
- Footer with Privacy/Terms/Accessibility links
- `SDO_Messaging_for_Web` Agentforce widget loaded on all authenticated pages

---

## Agentforce (Salesforce Embedded Messaging for Web)

### Two Deployments

| Deployment | Page | Origin | Script ID |
|---|---|---|---|
| `Mazda_Prechat_ESD` | Login | `http://localhost:5174` | `agentforce-login-bootstrap` |
| `SDO_Messaging_for_Web` | All authenticated pages (Layout) | `http://localhost:5173` | `agentforce-bootstrap` |

### Deployment Config (both)

| Setting | Value |
|---|---|
| Org ID | `00DHo00000dXCjt` |
| Site URL (Mazda) | `https://storm-957a49fe9c0bc1.my.site.com/ESWMazdaPrechatESD1779882151775` |
| Site URL (SDO) | `https://storm-957a49fe9c0bc1.my.site.com/ESWSDOMessagingforWeb1774113255797` |
| SCRT2 URL (both) | `https://storm-957a49fe9c0bc1.my.salesforce-scrt.com` |

### Pre-Chat Field Mapping (SDO — authenticated agent)

Populated from JWT token on `onEmbeddedMessagingReady`:

```js
embeddedservice_bootstrap.prechatAPI.setVisiblePrechatFields({
  "_firstName": { value: user.first_name, isEditableByEndUser: true },
  "_lastName":  { value: user.last_name,  isEditableByEndUser: true },
  "_email":     { value: user.email,      isEditableByEndUser: true },
  "_subject":   { value: "Support Request", isEditableByEndUser: true },
});
embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({
  EndUserEmail: user.email,
});
```

### Session Isolation — Two-Origin Strategy

**The Problem:** Both ESDs use the same Salesforce org (`00DHo00000dXCjt`). Salesforce stores the session under a single org-scoped key (`00DHo00000dXCjt_WEB_STORAGE`) in BOTH `localStorage` AND `sessionStorage` of the host page, AND in the Experience Site iframe's own storage (`storm-957a49fe9c0bc1.my.site.com`). The `destroyEmbeddedMessaging` API does not exist in the deployed SDK version. When the user chats on the login page and logs in, the `Mazda_Prechat_ESD` session was bleeding into the dashboard instead of `SDO_Messaging_for_Web` starting fresh.

**The Solution:** Run the two pages on different ports, which the browser treats as separate origins:
- Login → `http://localhost:5174` (Mazda_Prechat_ESD)
- Dashboard → `http://localhost:5173` (SDO_Messaging_for_Web)

Different ports = different browser origins, giving each page completely isolated `localStorage` and `sessionStorage`. The JWT token is handed off via URL query parameter (`?t=<JWT>`) through the `/auth` route.

**Additional clearing layers (belt-and-suspenders):**
- `index.html` contains a synchronous inline script that clears all `00DHo00000dXCjt*` keys from both `localStorage` and `sessionStorage` on any non-login path — runs before React loads
- On login, `clearSession(true)` is attempted on the Mazda bootstrap before navigation — ends the conversation server-side, which also clears Salesforce iframe storage
- Both transitions (login→dashboard and dashboard→login) use `window.location.href` (full page reload) to ensure Salesforce globals and DOM elements are fully destroyed

### Salesforce Configuration Required

For `Mazda_Prechat_ESD` to work from `http://localhost:5174`, the following must be configured in Salesforce:

| Setting Location | Value to Add |
|---|---|
| ESD → Allowed Domains (Mazda_Prechat_ESD) | `http://localhost:5174` |
| Setup → CORS | `http://localhost:5174` |
| Setup → Trusted URLs | `http://localhost:5174` |
| Experience Builder → Settings → Security → CSP Trusted Sites | `http://localhost:5174` |

For `SDO_Messaging_for_Web` to work from `http://localhost:5173`:

| Setting Location | Value to Add |
|---|---|
| ESD → Allowed Domains (SDO_Messaging_for_Web) | `http://localhost:5173` |
| Setup → CORS | `http://localhost:5173` |
| Setup → Trusted URLs | `http://localhost:5173` |

> After any changes to ESD Allowed Domains, **republish the Experience Cloud site** in Experience Builder for the changes to take effect.

### Vite Config

`vite.config.js` must have `host: "0.0.0.0"` so the dev server accepts connections on both `localhost` and `127.0.0.1`:

```js
server: {
  host: "0.0.0.0",
  port: 5173,
}
```

### Key Technical Finding

Salesforce's `utilAPI` array is empty in the currently deployed SDK version — `destroyEmbeddedMessaging`, `removeAllComponents`, and similar teardown APIs are unavailable. The `userVerificationAPI.clearSession(true)` call is attempted but may not be available for unauthenticated sessions. The two-origin isolation strategy is the primary solution and does not depend on any Salesforce teardown APIs.

---

## Salesforce Data Integration

Backend routes under `/api/sf/*` — all protected by JWT middleware.

### Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/sf/test` | Connection test — returns org info, username |
| GET | `/api/sf/accounts` | Fetch Accounts |
| GET | `/api/sf/contacts` | Fetch Contacts |
| GET | `/api/sf/cases` | Fetch Cases (maps to Support Requests) |
| GET | `/api/sf/assets` | Fetch Assets (maps to Vehicle info) |
| GET | `/api/sf/service-appointments` | Fetch Service Appointments (requires FSL) |
| GET | `/api/sf/opportunities` | Fetch Opportunities |
| GET | `/api/sf/query?soql=...` | Generic SOQL query endpoint |
| GET | `/api/sf/objects` | List all objects in the org |
| POST | `/api/sf/refresh-token` | Force token cache clear |

### Setup Required

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

**Salesforce setup steps:**
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

> Data is fetched but NOT yet mapped to dashboard UI fields. Next step after confirming integration works: replace `dashboardData.js` static values with live Salesforce data.

---

## Salesforce SSO (Future — Login with Salesforce)

Stubs in place but hidden via CSS:

**Backend (`server.js`):**
- `GET /api/auth/salesforce` → redirects to Salesforce OAuth authorization URL
- `GET /api/auth/salesforce/callback` → exchanges code for SF access token, issues app JWT

**Frontend (`Login.jsx`):**
- Button rendered in JSX but hidden via `.login-sf-btn { display: none }` in `Login.css`
- OR divider also hidden via `.login-divider { display: none }`
- To re-enable: remove `display: none` from both CSS rules

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

---

## Pending / TODO

| Item | Status |
|---|---|
| Service tab (`/service`) | Not built — no design provided yet |
| Salesforce data → dashboard field mapping | Integration built, mapping pending |
| Salesforce SSO (Login with Salesforce) | Stubs built, hidden via CSS, implementation pending |
| Agentforce session isolation | Two-origin approach implemented; `clearSession` attempted on login — testing in progress |
| Add new users via UI | Currently requires editing `seed.js` manually |
| `AgentforceWidget.jsx` | Dead file — created during refactor attempt, not imported anywhere, can be deleted |
