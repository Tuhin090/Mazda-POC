import { useState } from "react";
import { OFFERS } from "../../data/homeData";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./OffersSlider.css";

export default function OffersSlider() {
  const [slide, setSlide] = useState(0);
  const ref = useScrollReveal();
  const total = OFFERS.slides.length;
  const current = OFFERS.slides[slide];

  return (
    <section className="mz-offers mz-reveal" ref={ref}>
      <div className="mz-container">
        <div className="mz-offers__intro">
          <span className="mz-eyebrow">{OFFERS.eyebrow}</span>
          <h2 className="mz-section-title">{OFFERS.title}</h2>
          <p className="mz-section-text">{OFFERS.text}</p>
        </div>

        <div className="mz-offers__head">
          <h3>{OFFERS.heading}</h3>
          <span className="mz-offers__count">
            {slide + 1} / {total}
          </span>
        </div>

        <div className="mz-offers__media">
          {OFFERS.slides.map((s, i) => (
            <img key={s.text} src={s.img} alt="" loading="lazy" className={i === slide ? "is-active" : ""} />
          ))}
          <button
            type="button"
            className="mz-offers__arrow mz-offers__arrow--prev"
            aria-label="Previous slide"
            onClick={() => setSlide((s) => (s - 1 + total) % total)}
          >
            <span className="mz-icon" aria-hidden="true">&#xf148;</span>
          </button>
          <button
            type="button"
            className="mz-offers__arrow mz-offers__arrow--next"
            aria-label="Next slide"
            onClick={() => setSlide((s) => (s + 1) % total)}
          >
            <span className="mz-icon" aria-hidden="true">&#xf149;</span>
          </button>
        </div>

        <div className="mz-offers__slide" key={current.text}>
          <p className="mz-offers__deal">
            {current.text}
            <sup>{current.sup}</sup>
          </p>
          <div className="mz-offers__ctas">
            {current.ctas.map(([label, href], i) => (
              <a
                key={label + href}
                className={i === current.ctas.length - 1 ? "mz-cta mz-cta--black" : "mz-cta-text"}
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
