import { DEALER } from "../../data/homeData";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./DealerBanner.css";

export default function DealerBanner() {
  const ref = useScrollReveal();
  return (
    <section className="mz-dealer mz-reveal" ref={ref}>
      <div className="mz-container mz-dealer__split">
        <img src={DEALER.img} alt={DEALER.alt} loading="lazy" />
        <div className="mz-dealer__copy">
          <h2 className="mz-section-title">{DEALER.title}</h2>
          <p className="mz-section-text">{DEALER.text}</p>
          <a className="mz-cta-text" href={DEALER.cta[1]} target="_blank" rel="noreferrer">
            {DEALER.cta[0]}
          </a>
        </div>
      </div>
    </section>
  );
}
