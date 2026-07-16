import { SEARCH_OVERLAY } from "../../data/homeData";
import "./SearchOverlay.css";

/**
 * Search flydown replica. The input is decorative for the POC — submit is a
 * no-op; every link points at the live site.
 */
export default function SearchOverlay() {
  return (
    <div className="mz-search">
      <form className="mz-search__form" onSubmit={(e) => e.preventDefault()} role="search">
        <span className="mz-icon" aria-hidden="true">&#xf160;</span>
        <input type="search" placeholder="Search" aria-label="Search mazdausa.com" />
      </form>

      <div className="mz-search__body">
        <div className="mz-search__links">
          <div className="mz-search__group">
            <p>Recommended Searches</p>
            <ul>
              {SEARCH_OVERLAY.recommended.map((q) => (
                <li key={q}>
                  <a href={`https://www.mazdausa.com/search?q=${encodeURIComponent(q)}`} target="_blank" rel="noreferrer">
                    <span className="mz-icon" aria-hidden="true">&#xf160;</span>
                    {q}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div className="mz-search__group">
            <p>Shortcuts</p>
            <ul>
              {SEARCH_OVERLAY.shortcuts.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mz-search__explore">
          <h2>Explore Mazda</h2>
          <div className="mz-search__articles">
            {SEARCH_OVERLAY.articles.map((a) => (
              <a className="mz-search__article" key={a.title} href={a.href} target="_blank" rel="noreferrer">
                <img src={a.img} alt={a.alt || ""} loading="lazy" />
                <span className="mz-search__article-eyebrow">{a.eyebrow}</span>
                <span className="mz-search__article-title">{a.title}</span>
                {a.sub && <span className="mz-search__article-sub">{a.sub}</span>}
              </a>
            ))}
          </div>
          <a className="mz-cta-text" href={SEARCH_OVERLAY.exploreMore[1]} target="_blank" rel="noreferrer">
            {SEARCH_OVERLAY.exploreMore[0]}
          </a>
        </div>
      </div>
    </div>
  );
}
