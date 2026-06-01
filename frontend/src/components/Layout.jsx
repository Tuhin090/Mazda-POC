import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { dashboardData } from "../data/dashboardData";
import "./Layout.css";

const NAV_ROUTES = {
  "DASHBOARD": "/dashboard",
  "CONNECTED SERVICES": "/connected-services",
  "SERVICE": "/service",
  "SUPPORT": "/support",
};

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  function getUserFromToken() {
    try {
      const token = sessionStorage.getItem("mazda_auth");
      if (!token) return {};
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return {};
    }
  }
  const user = getUserFromToken();
  const username = user.username || dashboardData.user.name;
  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || username;
  const roleLabel = { admin: "Administrator", dealer: "Dealer", user: "User" }[user.role] || user.role || "User";

  useEffect(() => {
    const SCRIPT_ID = "agentforce-bootstrap";
    if (document.getElementById(SCRIPT_ID)) return;

    // This is the first time the dashboard loads (full page reload from login).
    // Wipe any Mazda_Prechat_ESD session before SDO_Messaging_for_Web initialises.
    // SF's beforeunload handler on the login page writes the session back to
    // storage after we clear it there — so we clear here instead, after the
    // reload, before the SDO bootstrap script ever reads storage.

    function getUserFromToken() {
      try {
        const token = sessionStorage.getItem("mazda_auth");
        if (!token) return {};
        return JSON.parse(atob(token.split(".")[1]));
      } catch {
        return {};
      }
    }

    window.initEmbeddedMessaging = function () {
      try {
        window.embeddedservice_bootstrap.settings.language = "en_US";
        window.embeddedservice_bootstrap.init(
          "00DHo00000dXCjt",
          "SDO_Messaging_for_Web",
          "https://storm-957a49fe9c0bc1.my.site.com/ESWSDOMessagingforWeb1774113255797",
          { scrt2URL: "https://storm-957a49fe9c0bc1.my.salesforce-scrt.com" }
        );
      } catch (err) {
        console.error("Error loading Embedded Messaging: ", err);
      }
    };

    window.addEventListener("onEmbeddedMessagingReady", function () {
      try {
        const user = getUserFromToken();
        // window.embeddedservice_bootstrap.prechatAPI.setVisiblePrechatFields({
        //   "_firstName": { value: user.first_name || "", isEditableByEndUser: true },
        //   "_lastName":  { value: user.last_name  || "", isEditableByEndUser: true },
        //   "_email":     { value: user.email || user.username || "", isEditableByEndUser: true },
        //   "_subject":   { value: "Support Request", isEditableByEndUser: true },
        // });
        window.embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({
          UserEmailId: user.email
          // UserEmailId: "alex.thompson@email.com"
        });
      } catch (err) {
        console.error("Error setting pre-chat fields: ", err);
      }
    });

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://storm-957a49fe9c0bc1.my.site.com/ESWSDOMessagingforWeb1774113255797/assets/js/bootstrap.min.js";
    script.onload = () => window.initEmbeddedMessaging();
    document.body.appendChild(script);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("mazda_auth");
    window.location.href = import.meta.env.VITE_LOGIN_URL || window.location.origin;
  }

  function activeNav() {
    for (const [label, path] of Object.entries(NAV_ROUTES)) {
      if (location.pathname === path) return label;
    }
    return "DASHBOARD";
  }

  return (
    <div className="layout-root">
      <header className="layout-nav">
        <div className="layout-nav-left">
          <img
            src="https://portal.mazdausa.com/pics/images/mazda_logo.png"
            alt="Mazda"
            className="layout-nav-logo"
          />
          <nav className="layout-nav-links">
            {dashboardData.nav.map((item) => (
              <button
                key={item}
                className={`layout-nav-link${activeNav() === item ? " layout-nav-link--active" : ""}`}
                onClick={() => navigate(NAV_ROUTES[item] || "/dashboard")}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className="layout-nav-center">
          <span className="layout-nav-ext-badge">External Website (Not in Salesforce)</span>
        </div>
        <div className="layout-nav-right">
          <button className="layout-nav-bell" aria-label="Notifications">
            <BellIcon />
          </button>
          <div className="layout-nav-profile" ref={dropdownRef}>
            <button
              className={`layout-nav-avatar${dropdownOpen ? " layout-nav-avatar--active" : ""}`}
              onClick={() => setDropdownOpen(v => !v)}
              aria-label="Profile menu"
            >
              {username.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="profile-dropdown-avatar-lg">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className="profile-dropdown-info">
                    <span className="profile-dropdown-name">{displayName}</span>
                    <span className="profile-dropdown-email">{user.email || username}</span>
                    <span className="profile-dropdown-role">{roleLabel}</span>
                  </div>
                </div>

                <div className="profile-dropdown-divider" />

                <button
                  className="profile-dropdown-item"
                  onClick={() => { setDropdownOpen(false); setShowAccount(true); }}
                >
                  <AccountIcon />
                  My Account
                </button>

                <div className="profile-dropdown-divider" />

                <button className="profile-dropdown-item profile-dropdown-item--logout" onClick={handleLogout}>
                  <LogoutIcon />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showAccount && (
        <div className="account-modal-overlay" onClick={() => setShowAccount(false)}>
          <div className="account-modal" onClick={e => e.stopPropagation()}>
            <div className="account-modal-header">
              <h2 className="account-modal-title">My Account</h2>
              <button className="account-modal-close" onClick={() => setShowAccount(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            <div className="account-modal-avatar-wrap">
              <div className="account-modal-avatar">{username.charAt(0).toUpperCase()}</div>
              <div className="account-modal-role-badge">{roleLabel}</div>
            </div>

            <div className="account-modal-fields">
              <div className="account-field">
                <span className="account-field-label">Full Name</span>
                <span className="account-field-value">{displayName}</span>
              </div>
              <div className="account-field">
                <span className="account-field-label">Username</span>
                <span className="account-field-value">{username}</span>
              </div>
              <div className="account-field">
                <span className="account-field-label">Email</span>
                <span className="account-field-value">{user.email || username}</span>
              </div>
              <div className="account-field">
                <span className="account-field-label">Role</span>
                <span className="account-field-value">{roleLabel}</span>
              </div>
            </div>

            <button className="account-modal-logout" onClick={handleLogout}>
              <LogoutIcon />
              Sign Out
            </button>
          </div>
        </div>
      )}

      <main className="layout-body">{children}</main>

      <footer className="layout-footer">
        <span>© 2026 Mazda Motor Corporation</span>
        <div className="layout-footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Accessibility</a>
        </div>
      </footer>
    </div>
  );
}

function AccountIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
