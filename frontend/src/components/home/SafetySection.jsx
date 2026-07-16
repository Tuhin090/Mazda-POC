import { SAFETY } from "../../data/homeData";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./SafetySection.css";

export default function SafetySection() {
  const ref = useScrollReveal();
  return (
    <section className="mz-safety mz-reveal" ref={ref}>
      <div className="mz-container">
        <span className="mz-eyebrow">{SAFETY.eyebrow}</span>
        <h2 className="mz-section-title">{SAFETY.title}</h2>
        <p className="mz-section-text">{SAFETY.text}</p>

        <img className="mz-safety__award" src={SAFETY.awardImg} alt={SAFETY.awardAlt} loading="lazy" />

        <div className="mz-safety__feature">
          <img src={SAFETY.cardImg} alt={SAFETY.cardAlt} loading="lazy" />
          <div className="mz-safety__card">
            <p className="mz-safety__disclaimer">{SAFETY.cardDisclaimer}</p>
            <h2>{SAFETY.cardTitle}</h2>
            <p className="mz-safety__copy">
              {SAFETY.cardText[0]}
              <em>{SAFETY.cardText[1]}</em>
              {SAFETY.cardText[2]}
            </p>
            <a className="mz-cta-text" href={SAFETY.cardCta[1]} target="_blank" rel="noreferrer">
              {SAFETY.cardCta[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
