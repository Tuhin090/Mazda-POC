import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import { EXTERNAL } from "../../data/homeData";
import "./HomeHeader.css";

const NAV_ITEMS = [
  ["vehicles", "Vehicles"],
  ["shopping", "Shopping Tools"],
  ["drives", "What Drives Us"],
  ["owners", "Owners"],
];

/**
 * Overlay header replica. Transparent ("dark" theme, white text) while it sits
 * over the hero; solid white ("light" theme) whenever a flydown menu or the
 * search overlay is open. The Help button inverts with the theme and opens the
 * unauthorized Agentforce chat; the user icon replaces the live site's
 * zip-code button and routes to /login.
 */
export default function HomeHeader() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const headerRef = useRef(null);
  const theme = openMenu ? "light" : "dark";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const toggle = (key) => setOpenMenu((cur) => (cur === key ? null : key));

  const openChat = () => {
    setOpenMenu(null);
    // MIAW launcher — retry briefly in case the widget is still booting.
    let tries = 0;
    const attempt = () => {
      const api = window.embeddedservice_bootstrap?.utilAPI;
      if (api?.launchChat) {
        api.launchChat().catch(() => {});
      } else if (tries++ < 10) {
        setTimeout(attempt, 500);
      }
    };
    attempt();
  };

  return (
    <header className="mz-header" data-theme={theme} data-menu-open={openMenu ? "true" : "false"} ref={headerRef}>
      <div className="mz-header__bar">
        <nav className="mz-header__nav" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map(([key, label]) => (
              <li key={key}>
                <button
                  type="button"
                  className={openMenu === key ? "is-open" : ""}
                  aria-expanded={openMenu === key}
                  onClick={() => toggle(key)}
                >
                  {label}
                  <span className="mz-header__caret" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <a className="mz-header__logo" href="https://www.mazdausa.com/" target="_blank" rel="noreferrer" aria-label="Mazda USA">
          <span className="mz-icon" aria-hidden="true">&#xf142;</span>
        </a>

        <nav className="mz-header__misc" aria-label="Utility">
          <ul>
            <li>
              {/* POC addition: Help opens the unauthorized Agentforce chat */}
              <button type="button" className="mz-header__help mz-cta" onClick={openChat}>
                Help
              </button>
            </li>
            <li>
              <a href={EXTERNAL.findADealer} target="_blank" rel="noreferrer" className="mz-header__dealer">
                Find a Dealer
              </a>
            </li>
            <li>
              {/* POC swap: user icon → /login (replaces the zip-code button) */}
              <button type="button" className="mz-header__user" aria-label="Log in" onClick={() => navigate("/login")}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.6" />
                  <path d="M4.5 20c1.4-3.4 4.2-5.1 7.5-5.1s6.1 1.7 7.5 5.1" strokeLinecap="round" />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="mz-header__search"
                aria-label="Search"
                aria-expanded={openMenu === "search"}
                onClick={() => toggle("search")}
              >
                <span className="mz-icon" aria-hidden="true">&#xf160;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`mz-flydown ${openMenu ? "is-open" : ""}`}>
        <div className="mz-flydown__panel">
          {openMenu === "search" ? <SearchOverlay /> : openMenu ? <MegaMenu menu={openMenu} onNavigate={() => setOpenMenu(null)} /> : null}
        </div>
      </div>
    </header>
  );
}
