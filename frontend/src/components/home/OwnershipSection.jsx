import { OWNERSHIP } from "../../data/homeData";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./OwnershipSection.css";

export default function OwnershipSection() {
  const ref = useScrollReveal();
  return (
    <section className="mz-own mz-reveal" ref={ref}>
      <div className="mz-container">
        <span className="mz-eyebrow">{OWNERSHIP.eyebrow}</span>
        <h2 className="mz-section-title">{OWNERSHIP.title}</h2>
        <p className="mz-section-text">{OWNERSHIP.text}</p>

        <div className="mz-own__cards">
          {OWNERSHIP.cards.map((card) => (
            <div className="mz-own__card" key={card.title}>
              <img src={card.img} alt={card.alt} loading="lazy" />
              <div className="mz-own__card-body">
                <h2>{card.title}</h2>
                <p>{card.text}</p>
                <a className="mz-cta-text" href={card.cta[1]} target="_blank" rel="noreferrer">
                  {card.cta[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
