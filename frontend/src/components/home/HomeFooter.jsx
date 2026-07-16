import { Link } from "react-router-dom";
import { FOOTER_COLUMNS, FOOTER_LEGAL, FOOTER_SOCIALS } from "../../data/homeData";
import "./HomeFooter.css";

/**
 * Homepage footer replica (5 columns — superset of the FAQ PublicShell
 * footer, so it is intentionally its own component). Accessibility button
 * and cookie-preferences entry are static no-ops for the POC.
 */
export default function HomeFooter() {
  return (
    <footer className="mz-footer">
      <div className="mz-footer__inner">
        <div className="mz-footer__top">
          <span className="mz-footer__logo mz-icon" aria-hidden="true">&#xf141;</span>
          <div className="mz-footer__updates">
            <a href="https://www.mazdausa.com/keep-me-updated" target="_blank" rel="noreferrer">
              <span className="mz-icon" aria-hidden="true">&#xf13e;</span> Subscribe to updates
            </a>
            <a href="https://www.mazdausa.com/cpc" target="_blank" rel="noreferrer">
              <span className="mz-icon" aria-hidden="true">&#xf116;</span> MANAGE PREFERENCES
            </a>
          </div>
        </div>
        <hr />

        <div className="mz-footer__cols">
          {FOOTER_COLUMNS.map((col) => (
            <div className="mz-footer__col" key={col.title}>
              <p>{col.title}</p>
              <ul>
                {col.links.map(([label, href, opts]) => (
                  <li key={label}>
                    {opts?.internal ? (
                      <Link to={href}>{label}</Link>
                    ) : (
                      <a href={href} target="_blank" rel="noreferrer">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mz-footer__social-row">
          <ul className="mz-footer__socials">
            {FOOTER_SOCIALS.map(([name, href, d]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={name}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d={d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="mz-footer__lang">
            {/* static a11y control for the POC */}
            <button type="button">Accessibility</button>
            <a href="https://www.mazdaespanol.com/" target="_blank" rel="noreferrer">
              Español
            </a>
          </div>
        </div>

        <hr />
        <ul className="mz-footer__legal">
          {FOOTER_LEGAL.map(([label, href, opts]) => (
            <li key={label}>
              {opts?.noop ? (
                <a href="#cookies" onClick={(e) => e.preventDefault()}>
                  {label}
                </a>
              ) : (
                <a href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="mz-footer__copyright">©2026 MAZDA NORTH AMERICAN OPERATIONS. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
