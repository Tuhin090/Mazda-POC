import { useNavigate } from "react-router-dom";
import "./Faq.css";
import AgentforceWidget from "../components/AgentforceWidget";
import FaqContent from "../components/FaqContent";

import logo from "../assets/faq/logo.png";

const FOOTER_COLUMNS = [
  {
    title: "Shopping Tools",
    links: [
      ["BUILD AND PRICE", "https://www.mazdausa.com/shopping-tools/build-and-price"],
      ["INVENTORY SEARCH", "https://www.mazdausa.com/shopping-tools/inventory/results"],
      ["CPO INVENTORY SEARCH", "https://www.mazdausa.com/shopping-tools/inventory/results?c=c#cond=c"],
      ["REQUEST A QUOTE", "https://www.mazdausa.com/shopping-tools/request-a-quote"],
      ["SPECIAL OFFERS", "https://www.mazdausa.com/shopping-tools/special-offers-and-incentives"],
      ["PAYMENT ESTIMATOR", "https://www.mazdausa.com/shopping-tools/payment-estimator"],
      ["APPLY FOR FINANCING", "https://www.mazdausa.com/shopping-tools/apply-for-financing"],
    ],
  },
  {
    title: "Other Mazda Sites",
    links: [
      ["MAZDA GLOBAL", "https://www.mazda.com/"],
      ["MAZDA FOUNDATION", "https://www.mazdafoundation.org/"],
      ["MOTORSPORTS", "https://www.mazdamotorsports.com/"],
      ["MAZDA RECALL INFO", "https://www.mazdarecallinfo.com/"],
      ["MAZDA STORIES", "https://mazdastories.com/"],
      ["MAZDA FINANCIAL SERVICES", "https://www.mazdafinancialservices.com/"],
      ["MAZDA PROTECTION PRODUCTS", "https://www.mazdafinancialservices.com/us/en/vehicle-protection/which-plan-is-right-for-you.html"],
      ["MAZDA COLLECTION", "https://www.mazdacollection.com/"],
    ],
  },
  {
    title: "About",
    links: [
      ["MAZDA NEWS", "https://news.mazdausa.com/media-home"],
      ["CAREERS", "https://www.mazdausa.com/site/careers"],
      ["MAZDA MOBILE APPS", "https://www.mazdausa.com/about-mazda/mobile-apps"],
      ["ESG & SUSTAINABILITY", "https://www.mazdausa.com/why-mazda/sustainability"],
      ["RESOURCE CENTER", "https://www.mazdausa.com/resource-center"],
    ],
  },
  {
    title: "Help",
    links: [
      ["ACCESSIBILITY", "https://www.mazdausa.com/accessibility"],
      ["SITEMAP", "https://www.mazdausa.com/sitemap"],
      ["FAQ", "https://faq.mazdausa.com/s"],
      ["CONTACT US", "https://www.mazdausa.com/contact-us"],
      ["DEALER DIRECTORY", "https://www.mazdausa.com/find-a-dealer"],
    ],
  },
];

const SOCIALS = [
  ["Facebook", "M13 22v-8h2.7l.4-3H13V9.1c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8h3z"],
  ["YouTube", "M23 12s0-3-.4-4.4c-.2-.8-.9-1.4-1.7-1.6C19.4 5.6 12 5.6 12 5.6s-7.4 0-8.9.4c-.8.2-1.5.8-1.7 1.6C1 9 1 12 1 12s0 3 .4 4.4c.2.8.9 1.4 1.7 1.6 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.8 1.7-1.6C23 15 23 12 23 12zm-13 3V9l5 3-5 3z"],
  ["X", "M17.5 3h3l-6.6 7.6L21.8 21h-6l-4.7-6.1L5.7 21h-3l7-8L2.6 3h6.1l4.2 5.6L17.5 3zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19z"],
  ["Instagram", "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"],
  ["LinkedIn", "M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5zM3 8.98h4V21H3zM9 8.98h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2.1c4 0 4.8 2.6 4.8 6.1V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"],
];

export default function Faq() {
  const navigate = useNavigate();

  return (
    <div className="faq-page">
      {/* ---------- Top navbar ---------- */}
      <header className="faq-navbar">
        <a className="faq-logo" href="https://www.mazdausa.com/" aria-label="Mazda FAQs - Home">
          <img src={logo} alt="Mazda" />
        </a>
        <nav className="faq-nav-right">
          <button className="faq-login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </nav>
      </header>

      <main className="faq-main">
        <FaqContent />
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="faq-footer">
        <div className="faq-footer-cols">
          {FOOTER_COLUMNS.map((col) => (
            <div className="faq-footer-col" key={col.title}>
              <p className="faq-footer-col-title">{col.title}</p>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="faq-social">
          {SOCIALS.map(([name, d]) => (
            <li key={name}>
              <a href="#" aria-label={name} onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d={d} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <hr className="faq-footer-sep" />

        <ul className="faq-legal">
          <li><a href="https://www.onemazdausa.com/admin/terms--conditions" target="_blank" rel="noreferrer">TERMS &amp; CONDITIONS</a></li>
          <li className="faq-legal-sep">|</li>
          <li><a href="https://www.onemazdausa.com/admin/privacy-policy2" target="_blank" rel="noreferrer">PRIVACY POLICY</a></li>
          <li className="faq-legal-sep">|</li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>MANAGE COOKIE PREFERENCES</a></li>
          <li className="faq-legal-sep">|</li>
          <li><a href="https://privacy.mazdausa.com/us/request_opt_out_form" target="_blank" rel="noreferrer">DO NOT SELL OR SHARE MY PERSONAL INFORMATION</a></li>
        </ul>
        <p className="faq-copyright">© 2026 MAZDA NORTH AMERICAN OPERATIONS. ALL RIGHTS RESERVED.</p>
      </footer>

      {/* ---------- Unauthorized Agentforce chatbot ---------- */}
      <AgentforceWidget
        scriptId="agentforce-login-bootstrap"
        deploymentName="Mazda_Prechat_ESD"
        siteUrl="https://storm-957a49fe9c0bc1.my.site.com/ESWMazdaPrechatESD1779882151775"
        scrt2Url="https://storm-957a49fe9c0bc1.my.salesforce-scrt.com"
      />
    </div>
  );
}
