import { useRef, useState } from "react";
import { VEHICLES, VEHICLE_CATEGORIES } from "../../data/homeData";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./VehicleCarousel.css";

const PER_VIEW = 4;

/**
 * Card video is injected lazily on first hover (preload="none" equivalent):
 * no video bytes move over the network until the user mouses over a card.
 */
function VehicleCard({ v, index, total }) {
  const [videoOn, setVideoOn] = useState(false);
  const videoRef = useRef(null);

  const play = () => {
    if (v.video) setVideoOn(true);
    videoRef.current?.play().catch(() => {});
  };

  const stop = () => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  return (
    <div className="mz-vcard" role="group" aria-label={`${index + 1} / ${total}`} onMouseEnter={play} onMouseLeave={stop}>
      <div className="mz-vcard__inner">
        <a className="mz-vcard__media" href={v.exploreUrl} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
          <img src={v.poster} alt={v.posterAlt || `${v.year} ${v.name}`} loading="lazy" />
          {videoOn && (
            <video ref={videoRef} src={v.video} muted loop playsInline autoPlay preload="none" aria-hidden="true" />
          )}
        </a>
        <div className="mz-vcard__body">
          <div className="mz-vcard__title">
            <span className="mz-vcard__year">{v.year}</span>
            <p className="mz-vcard__name">{v.name}</p>
          </div>
          <div className="mz-vcard__specs">
            <p>
              Starting at {v.price}
              <sup>{v.priceSup}</sup>
            </p>
            <p>
              {v.mpg}
              <sup>{v.mpgSup}</sup>
            </p>
          </div>
          <ul className="mz-vcard__ctas">
            <li>
              <a href={v.exploreUrl} target="_blank" rel="noreferrer">EXPLORE</a>
            </li>
            <li>
              <a href={v.buildUrl} target="_blank" rel="noreferrer">BUILD</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function VehicleCarousel() {
  const [cat, setCat] = useState("all");
  const [page, setPage] = useState(0);
  const ref = useScrollReveal();

  const list = VEHICLES.filter((v) => cat === "all" || v.categories.includes(cat));
  const maxPage = Math.max(0, Math.ceil(list.length / PER_VIEW) - 1);

  const pickCategory = (key) => {
    setCat(key);
    setPage(0);
  };

  return (
    <section className="mz-discover mz-reveal" ref={ref}>
      <div className="mz-discover__head">
        <h4>DISCOVER YOUR NEXT DRIVE</h4>
        <div className="mz-discover__mode">
          {/* live site offers a category/lifestyle tab-set toggle — POC keeps
              the control visible with the category set active */}
          <button type="button" className="is-active">category</button>
          <button type="button">lifestyle</button>
        </div>
        <ul className="mz-discover__tabs" role="tablist">
          {VEHICLE_CATEGORIES.map((c) => (
            <li key={c.key}>
              <button
                type="button"
                role="tab"
                aria-selected={cat === c.key}
                className={cat === c.key ? "is-active" : ""}
                onClick={() => pickCategory(c.key)}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mz-discover__viewport">
        <div className="mz-discover__track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {list.map((v, i) => (
            <VehicleCard key={v.id} v={v} index={i} total={list.length} />
          ))}
        </div>
      </div>

      <div className="mz-discover__controls">
        <button type="button" aria-label="Previous slide" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
          <span className="mz-icon" aria-hidden="true">&#xf148;</span>
        </button>
        <span className="mz-discover__count">
          {page + 1} / {maxPage + 1}
        </span>
        <button
          type="button"
          aria-label="Next slide"
          disabled={page === maxPage}
          onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
        >
          <span className="mz-icon" aria-hidden="true">&#xf149;</span>
        </button>
      </div>
    </section>
  );
}
