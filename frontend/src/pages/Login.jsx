import { useState, useEffect } from "react";
import "./Login.css";

const SOCIAL_ICONS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/MazdaUSA",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/mazdausa",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/MazdaUSA",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mazdausa",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@mazdausa",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.397-.89h-.048c-.832 0-1.983.228-2.717 1.181l-1.658-1.282c.98-1.266 2.528-1.98 4.372-1.98h.072c3.602.045 5.58 2.109 5.7 5.894.407.192.793.415 1.148.666 1.144.802 1.928 1.862 2.264 3.063.567 2.012.151 4.736-2.056 6.901C17.568 23.243 15.36 24 12.186 24zm.639-9.744c-.088 0-.176.002-.264.006-1.099.059-1.975.331-2.536.787-.506.41-.75.961-.717 1.593.066 1.202 1.181 1.793 3.042 1.69 1.158-.065 2.028-.52 2.587-1.35.43-.63.668-1.479.71-2.528a12.93 12.93 0 0 0-2.822-.198z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mazda-north-american-operations",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingPhase, setLoadingPhase] = useState(null); // null | "auth" | "data"
  useEffect(() => {
    const SCRIPT_ID = "agentforce-login-bootstrap";
    if (document.getElementById(SCRIPT_ID)) return;
    if (window.embeddedservice_bootstrap) return;


    window.initEmbeddedMessaging = function () {
      try {
        window.embeddedservice_bootstrap.settings.language = "en_US";
        window.embeddedservice_bootstrap.init(
          "00DHo00000dXCjt",
          "Mazda_Prechat_ESD",
          "https://storm-957a49fe9c0bc1.my.site.com/ESWMazdaPrechatESD1779882151775",
          { scrt2URL: "https://storm-957a49fe9c0bc1.my.salesforce-scrt.com" }
        );
      } catch (err) {
        console.error("Error loading Embedded Messaging: ", err);
      }
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://storm-957a49fe9c0bc1.my.site.com/ESWMazdaPrechatESD1779882151775/assets/js/bootstrap.min.js";
    script.onload = () => window.initEmbeddedMessaging();
    document.body.appendChild(script);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoadingPhase("auth");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setLoadingPhase("data");

        // Pre-fetch SF data so dashboard renders instantly with no flash
        try {
          const sfRes = await fetch("/api/sf/customer360", {
            headers: { Authorization: `Bearer ${data.token}` },
          });
          const sfData = await sfRes.json();
          if (!sfData.error) {
            sessionStorage.setItem("mazda_sf_data", JSON.stringify(sfData));
            sessionStorage.setItem("mazda_login_time", Date.now().toString());
          }
        } catch { /* non-fatal — dashboard will fetch on its own */ }

        // Clear Agentforce session before navigating
        try {
          const clearFn = window.embeddedservice_bootstrap?.userVerificationAPI?.clearSession;
          if (typeof clearFn === "function") {
            await Promise.race([
              clearFn.call(window.embeddedservice_bootstrap.userVerificationAPI, true),
              new Promise((res) => setTimeout(res, 2000)),
            ]);
          }
        } catch (e) { void e; }

        const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || window.location.origin;
        window.location.href = `${dashboardUrl}/auth?t=${encodeURIComponent(data.token)}`;
      } else {
        setError(data.message || "Invalid username or password.");
        setLoadingPhase(null);
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
      setLoadingPhase(null);
    }
  }

  function handleSalesforceLogin() {
    // Placeholder — will call /api/auth/salesforce to start OAuth flow
    window.location.href = "/api/auth/salesforce";
  }

  return (
    <div className="login-root">

      {/* Full-screen loading overlay — shown while fetching SF data */}
      {loadingPhase === "data" && (
        <div className="login-data-overlay">
          <div className="login-data-overlay-inner">
            <img src="https://portal.mazdausa.com/pics/images/mazda_logo.png" alt="Mazda" className="mazda-m-logo" />
            <div className="login-overlay-spinner" />
            <p className="login-overlay-text">Loading your vehicle data...</p>
          </div>
        </div>
      )}

      <div className="login-ext-badge">External Website (Outside Salesforce)</div>
      {/* Left panel */}
      <div className="login-hero">
        <div className="hero-overlay" />
        {/* <div className="hero-content">
          <p className="hero-tagline">MAZDA IS THE NEW LEADER IN SAFETY.</p>
          <div className="hero-badges">
            <div className="badge-iihs">
              <span className="badge-year">2026</span>
              <span className="badge-text">
                IIHS TOP SAFETY <em>PICK+</em>
              </span>
            </div>
            <div className="badge-cr">
              <div className="cr-logo">
                <span className="cr-letters">CR</span>
                <span className="cr-sub">Consumer<br />Reports</span>
              </div>
              <p className="cr-caption">Safest New-Car Brand</p>
            </div>
          </div>
          <p className="hero-footnote">
            MORE THAN ANY OTHER BRAND AS OF APRIL 2026 ——
          </p>
        </div> */}
      </div>

      {/* Right panel */}
      <div className="login-panel">
        <div className="login-panel-inner">
          {/* Mazda logo */}
          <div className="mazda-logo-wrap">
            <img src="https://portal.mazdausa.com/pics/images/mazda_logo.png" alt="Mazda" height="55" />
          </div>

          <h1 className="login-title">WELCOME TO MAZDA</h1>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label className="field-label">USERNAME</label>
              <div className="field-input-wrap">
                <span className="field-icon">
                  <PersonIcon />
                </span>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Sign in using your Email ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">PASSWORD</label>
              <div className="field-input-wrap">
                <span className="field-icon">
                  <LockIcon />
                </span>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <div className="forgot-row">
              <a href="#" className="forgot-link">
                Forgot your password?
              </a>
            </div>

            <div className="login-btn-row">
              <button type="submit" className="login-btn" disabled={!!loadingPhase}>
                {loadingPhase === "auth" ? "SIGNING IN..." : "LOGIN"}
              </button>
            </div>
          </form>

          {/* OR divider + Salesforce SSO */}
          <div className="login-divider">
            <span className="login-divider-line" />
            <span className="login-divider-text">OR</span>
            <span className="login-divider-line" />
          </div>

          <button className="login-sf-btn" onClick={handleSalesforceLogin}>
            <SalesforceIcon />
            Login with Salesforce
            <span className="login-sf-badge">Coming Soon</span>
          </button>

          <div className="login-notice">
            <p>
              After several unsuccessful attempts, your account will be
              temporarily disabled for 60 minutes.
            </p>
            <p>
              For assistance, call Help Center{" "}
              <strong>(800) 421-6507</strong>.
              <br />
              For Mazda Canada Dealer users, call{" "}
              <strong>(866) 544-0414</strong>.
            </p>
          </div>

          <div className="login-social">
            {SOCIAL_ICONS.map((s) => (
              <a key={s.name} href={s.href} className="social-icon" aria-label={s.name}>
                {s.svg}
              </a>
            ))}
          </div>

          <p className="login-copyright">
            © 2026 MAZDA NORTH AMERICAN OPERATIONS. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
}

function SalesforceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M10.014 4.585a4.45 4.45 0 0 1 3.128-1.271 4.47 4.47 0 0 1 3.592 1.808 3.517 3.517 0 0 1 1.393-.285 3.535 3.535 0 0 1 3.535 3.535c0 .275-.033.542-.092.8A3.16 3.16 0 0 1 23 12.284a3.16 3.16 0 0 1-3.16 3.16H4.535A3.535 3.535 0 0 1 1 11.91a3.535 3.535 0 0 1 2.91-3.484 4.45 4.45 0 0 1 6.104-3.841z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

