import { MIATA } from "../../data/homeData";
import "./MiataBanner.css";

export default function MiataBanner() {
  return (
    <section className="mz-miata">
      <img src={MIATA.img} alt={MIATA.alt} loading="lazy" />
      <div className="mz-miata__content">
        <h2>{MIATA.eyebrow}</h2>
        <h1>{MIATA.title}</h1>
        <p>{MIATA.text}</p>
        <a className="mz-cta mz-cta--white" href={MIATA.cta[1]} target="_blank" rel="noreferrer">
          {MIATA.cta[0]}
        </a>
      </div>
    </section>
  );
}
