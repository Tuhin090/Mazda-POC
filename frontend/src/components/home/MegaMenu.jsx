import { Link } from "react-router-dom";
import { useState } from "react";
import {
  VEHICLES,
  VEHICLE_CATEGORIES,
  VEHICLES_MENU,
  SHOPPING_MENU,
  DRIVES_MENU,
  OWNERS_MENU,
  OWNERS_MYMAZDA,
} from "../../data/homeData";
import "./MegaMenu.css";

function MenuLink({ label, href, internal, onNavigate }) {
  if (internal) {
    return (
      <Link to={href} onClick={onNavigate}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

function Tout({ tout }) {
  return (
    <div className="mz-menu__tout">
      <img src={tout.img} alt={tout.alt || ""} loading="lazy" />
      <div className="mz-menu__tout-body">
        {tout.text && (
          <p>
            {tout.text}
            {tout.textSup && <sup>{tout.textSup}</sup>}
          </p>
        )}
        {tout.sub && <p className="mz-menu__tout-sub">{tout.sub}</p>}
        {tout.cta && (
          <a className="mz-cta-text" href={tout.cta[1]} target="_blank" rel="noreferrer">
            {tout.cta[0]}
          </a>
        )}
      </div>
    </div>
  );
}

function VehiclesMenu() {
  const [cat, setCat] = useState("all");
  const list = VEHICLES.filter((v) => cat === "all" || v.categories.includes(cat));
  return (
    <div className="mz-menu mz-menu--vehicles">
      <aside className="mz-menu__rail">
        <ul className="mz-menu__links">
          {VEHICLES_MENU.quickLinks.map(([label, href]) => (
            <li key={label}>
              <MenuLink label={label} href={href} />
            </li>
          ))}
        </ul>
        <div className="mz-menu__rail-tout">
          <img src={VEHICLES_MENU.tout.img} alt="" loading="lazy" />
          <p>{VEHICLES_MENU.tout.text}</p>
          <p className="mz-menu__tout-sub">{VEHICLES_MENU.tout.sub}</p>
          <a className="mz-cta-text" href={VEHICLES_MENU.tout.cta[1]} target="_blank" rel="noreferrer">
            {VEHICLES_MENU.tout.cta[0]}
          </a>
        </div>
      </aside>
      <div className="mz-menu__models">
        <ul className="mz-menu__tabs" role="tablist">
          {VEHICLE_CATEGORIES.map((c) => (
            <li key={c.key}>
              <button
                type="button"
                role="tab"
                aria-selected={cat === c.key}
                className={cat === c.key ? "is-active" : ""}
                onClick={() => setCat(c.key)}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
        <ul className="mz-menu__grid">
          {list.map((v) => (
            <li key={v.id} className="mz-menu__model">
              <a href={v.navExplore} target="_blank" rel="noreferrer">
                <span className="mz-menu__model-frame">
                  <img src={v.sprite} alt={`${v.year} ${v.name}`} loading="lazy" />
                </span>
                <span className="mz-menu__model-year">{v.year}</span>
                <span className="mz-menu__model-name">{v.navName || v.name}</span>
                {v.trim && <span className="mz-menu__model-trim">{v.trim}</span>}
                <span className="mz-menu__model-spec">
                  Starting At {v.price}
                  <sup>{v.priceSup}</sup>
                </span>
              </a>
              <span className="mz-menu__model-ctas">
                <a href={v.navExplore} target="_blank" rel="noreferrer">EXPLORE</a>
                <a href={v.navBuild} target="_blank" rel="noreferrer">BUILD</a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ShoppingMenu() {
  return (
    <div className="mz-menu mz-menu--cols">
      {SHOPPING_MENU.map((col) => (
        <section className="mz-menu__col" key={col.title}>
          <h2>{col.title}</h2>
          <ul className="mz-menu__links">
            {col.links.map(([label, href]) => (
              <li key={label}>
                <MenuLink label={label} href={href} />
              </li>
            ))}
          </ul>
          <Tout tout={col.tout} />
        </section>
      ))}
    </div>
  );
}

function DrivesMenu() {
  return (
    <div className="mz-menu mz-menu--cols mz-menu--drives">
      {DRIVES_MENU.map((col) => (
        <section className="mz-menu__col" key={col.title}>
          <div className="mz-menu__tout">
            <img src={col.img} alt={col.alt} loading="lazy" />
            <div className="mz-menu__tout-body">
              <h2>{col.title}</h2>
              <p>{col.text}</p>
              <a className="mz-cta-text" href={col.cta[1]} target="_blank" rel="noreferrer">
                {col.cta[0]}
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function OwnersMenu({ onNavigate }) {
  return (
    <div className="mz-menu mz-menu--cols mz-menu--owners">
      {OWNERS_MENU.map((col) => (
        <section className="mz-menu__col" key={col.title}>
          <h2>{col.title}</h2>
          <nav>
            <ul className="mz-menu__links">
              {col.links.map(([label, href, opts]) => (
                <li key={label}>
                  <MenuLink label={label} href={href} internal={opts?.internal} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </nav>
          <Tout tout={col.tout} />
        </section>
      ))}
      <section className="mz-menu__col mz-menu__mymazda">
        <img src={OWNERS_MYMAZDA.img} alt={OWNERS_MYMAZDA.alt} loading="lazy" />
        <p>{OWNERS_MYMAZDA.text}</p>
        <div className="mz-menu__mymazda-ctas">
          {/* POC: LOGIN routes to the internal login page */}
          <Link className="mz-cta mz-cta--black" to="/login" onClick={onNavigate}>
            {OWNERS_MYMAZDA.login[0]}
          </Link>
          {/* POC: REGISTER is a visual placeholder — no action */}
          <span className="mz-cta-text mz-cta-text--placeholder" aria-disabled="true">
            {OWNERS_MYMAZDA.register[0]}
          </span>
        </div>
      </section>
    </div>
  );
}

export default function MegaMenu({ menu, onNavigate }) {
  if (menu === "vehicles") return <VehiclesMenu />;
  if (menu === "shopping") return <ShoppingMenu />;
  if (menu === "drives") return <DrivesMenu />;
  if (menu === "owners") return <OwnersMenu onNavigate={onNavigate} />;
  return null;
}
