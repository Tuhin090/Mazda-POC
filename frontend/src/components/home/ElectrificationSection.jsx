import { useRef } from "react";
import { ELECTRIFICATION } from "../../data/homeData";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./ElectrificationSection.css";

export default function ElectrificationSection() {
  const headRef = useScrollReveal();
  const videoRef = useRef(null);
  const iihsRef = useScrollReveal({
    onVisible: () => videoRef.current?.play().catch(() => {}),
  });

  return (
    <section className="mz-elec">
      <div className="mz-container">
        <div className="mz-elec__head mz-reveal" ref={headRef}>
          <span className="mz-eyebrow">{ELECTRIFICATION.eyebrow}</span>
          <h2 className="mz-section-title">{ELECTRIFICATION.title}</h2>
        </div>

        <div className="mz-elec__split">
          <img src={ELECTRIFICATION.img} alt="" loading="lazy" />
          <div className="mz-elec__card">
            <h2>{ELECTRIFICATION.cardTitle}</h2>
            <p>{ELECTRIFICATION.cardText}</p>
            <a className="mz-cta-text" href={ELECTRIFICATION.cardCta[1]} target="_blank" rel="noreferrer">
              {ELECTRIFICATION.cardCta[0]}
            </a>
          </div>
        </div>

        <div className="mz-elec__split mz-elec__split--iihs mz-reveal" ref={iihsRef}>
          <video
            ref={videoRef}
            src={ELECTRIFICATION.iihsVideo}
            aria-label={ELECTRIFICATION.iihsAlt}
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="mz-elec__card">
            <h3>{ELECTRIFICATION.iihsTitle}</h3>
            <p>
              {ELECTRIFICATION.iihsText[0]}
              <em>{ELECTRIFICATION.iihsText[1]}</em>
              {ELECTRIFICATION.iihsText[2]}
              <em>{ELECTRIFICATION.iihsText[3]}</em>
              {ELECTRIFICATION.iihsText[4]}
            </p>
            <p className="mz-elec__ref">
              Visit{" "}
              <a href={ELECTRIFICATION.iihsLink[1]} target="_blank" rel="noreferrer">
                {ELECTRIFICATION.iihsLink[0]}
              </a>{" "}
              to learn more.
            </p>
            <a className="mz-cta-text" href={ELECTRIFICATION.iihsCta[1]} target="_blank" rel="noreferrer">
              {ELECTRIFICATION.iihsCta[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
