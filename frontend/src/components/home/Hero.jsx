import { HERO } from "../../data/homeData";
import "./Hero.css";

export default function Hero() {
  const scrollPastHero = () => {
    const hero = document.querySelector(".mz-hero");
    window.scrollTo({ top: hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="mz-hero">
      <video
        className="mz-hero__video"
        src={HERO.video}
        poster={HERO.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="mz-hero__overlay">
        <h1>{HERO.title}</h1>
        {/* live layout: CTA sits at the bottom of the video window */}
        <a className="mz-cta mz-cta--white mz-hero__cta" href={HERO.cta[1]} target="_blank" rel="noreferrer">
          {HERO.cta[0]}
        </a>
      </div>
      <button type="button" className="mz-hero__scroll" aria-label="Scroll to content" onClick={scrollPastHero}>
        <span aria-hidden="true" />
      </button>
    </section>
  );
}
