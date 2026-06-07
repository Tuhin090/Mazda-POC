const fetch = require("node-fetch");

let _cache = null; // { accessToken, instanceUrl, expiresAt }

async function getAccessToken() {
  if (_cache && Date.now() < _cache.expiresAt) {
    return _cache;
  }

  const { SF_LOGIN_URL, SF_CLIENT_ID, SF_CLIENT_SECRET } = process.env;

  if (!SF_CLIENT_ID || SF_CLIENT_ID === "your_connected_app_consumer_key") {
    throw new Error("Salesforce credentials not configured in .env");
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: SF_CLIENT_ID,
    client_secret: SF_CLIENT_SECRET,
  });

  const res = await fetch(`${SF_LOGIN_URL}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`SF auth failed: ${data.error_description || data.error}`);
  }

  // Cache for 55 minutes (SF tokens live ~2 hours; refresh early to be safe)
  _cache = {
    accessToken: data.access_token,
    instanceUrl: data.instance_url,
    expiresAt: Date.now() + 55 * 60 * 1000,
  };

  return _cache;
}

async function sfQuery(soql) {
  const { accessToken, instanceUrl } = await getAccessToken();
  const url = `${instanceUrl}/services/data/${process.env.SF_API_VERSION}/query?q=${encodeURIComponent(soql)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

async function sfGet(path) {
  const { accessToken, instanceUrl } = await getAccessToken();
  const res = await fetch(`${instanceUrl}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

function clearTokenCache() {
  _cache = null;
}

module.exports = { getAccessToken, sfQuery, sfGet, clearTokenCache };
