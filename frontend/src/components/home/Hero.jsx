import { HERO } from "../../data/homeData";
import "./Hero.css";

export default function Hero() {
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
        <a className="mz-cta mz-cta--white" href={HERO.cta[1]} target="_blank" rel="noreferrer">
          {HERO.cta[0]}
        </a>
      </div>
    </section>
  );
}
