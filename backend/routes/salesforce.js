const express = require("express");
const router = express.Router();
const { getAccessToken, sfQuery, sfGet, clearTokenCache } = require("../salesforce");

// ── Connection Test ───────────────────────────────────────────────────────────
// GET /api/sf/test
// Verifies credentials and returns org/user info. Use this first.
router.get("/test", async (req, res) => {
  try {
    const { instanceUrl } = await getAccessToken();
    const identity = await sfGet("/services/oauth2/userinfo");
    res.json({
      connected: true,
      instanceUrl,
      orgId: identity.organization_id,
      userId: identity.user_id,
      username: identity.preferred_username,
      displayName: identity.name,
    });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

// ── Force token refresh ───────────────────────────────────────────────────────
// POST /api/sf/refresh-token
router.post("/refresh-token", (req, res) => {
  clearTokenCache();
  res.json({ message: "Token cache cleared. Next request will re-authenticate." });
});

// ── Accounts ─────────────────────────────────────────────────────────────────
// GET /api/sf/accounts
router.get("/accounts", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await sfQuery(
      `SELECT Id, Name, Type, Phone, BillingCity, BillingState, OwnerId
       FROM Account
       ORDER BY LastModifiedDate DESC
       LIMIT ${limit}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Contacts ─────────────────────────────────────────────────────────────────
// GET /api/sf/contacts
router.get("/contacts", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await sfQuery(
      `SELECT Id, FirstName, LastName, Email, Phone, AccountId, Account.Name
       FROM Contact
       ORDER BY LastModifiedDate DESC
       LIMIT ${limit}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Cases (maps to Support Requests in dashboard) ─────────────────────────────
// GET /api/sf/cases
router.get("/cases", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await sfQuery(
      `SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate, ClosedDate,
              Account.Name, Contact.Name
       FROM Case
       ORDER BY CreatedDate DESC
       LIMIT ${limit}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Assets (maps to Vehicle info in dashboard) ────────────────────────────────
// GET /api/sf/assets
router.get("/assets", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await sfQuery(
      `SELECT Id, Name, SerialNumber, Status, InstallDate, UsageEndDate,
              Account.Name, Contact.Name, Product2.Name
       FROM Asset
       ORDER BY LastModifiedDate DESC
       LIMIT ${limit}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Service Appointments (maps to Upcoming Service in dashboard) ──────────────
// GET /api/sf/service-appointments
// Note: Requires Field Service Lightning. Falls back to empty if not available.
router.get("/service-appointments", async (req, res) => {
  try {
    const data = await sfQuery(
      `SELECT Id, AppointmentNumber, Subject, Status, SchedStartTime, SchedEndTime,
              ServiceTerritoryId, Description
       FROM ServiceAppointment
       ORDER BY SchedStartTime ASC
       LIMIT 5`
    );
    res.json(data);
  } catch (err) {
    // ServiceAppointment may not exist in the org — return informative message
    res.status(500).json({ error: err.message, note: "ServiceAppointment requires Field Service Lightning" });
  }
});

// ── Opportunities ─────────────────────────────────────────────────────────────
// GET /api/sf/opportunities
router.get("/opportunities", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await sfQuery(
      `SELECT Id, Name, StageName, Amount, CloseDate, Account.Name, OwnerId
       FROM Opportunity
       ORDER BY CloseDate DESC
       LIMIT ${limit}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Generic SOQL Query (for exploration / testing) ────────────────────────────
// GET /api/sf/query?soql=SELECT+Id,Name+FROM+Account+LIMIT+5
router.get("/query", async (req, res) => {
  const { soql } = req.query;
  if (!soql) {
    return res.status(400).json({ error: "Missing required query param: soql" });
  }
  try {
    const data = await sfQuery(soql);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── List all custom objects in the org ────────────────────────────────────────
// GET /api/sf/objects
// Useful for discovering what custom objects exist (e.g. Vehicle__c, Subscription__c)
router.get("/objects", async (req, res) => {
  try {
    const { accessToken, instanceUrl } = await getAccessToken();
    const url = `${instanceUrl}/services/data/${process.env.SF_API_VERSION}/sobjects`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));

    // Return just names + labels to keep response small
    const objects = data.sobjects.map((o) => ({
      name: o.name,
      label: o.label,
      custom: o.custom,
      queryable: o.queryable,
    }));
    res.json({ total: objects.length, objects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
