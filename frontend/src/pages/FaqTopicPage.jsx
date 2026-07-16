import { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { FaqSearchCard, FaqSupportSections } from "../components/FaqContent";
import useConnectedServicesFaq from "../hooks/useConnectedServicesFaq";
import "./FaqTopic.css";

/**
 * Public Connected Services FAQ topic page — internal replica of
 * faq.mazdausa.com/s/topic/.../connected-services. Lists every article as a
 * question + one-line answer preview; clicking a row opens the article page.
 */
export default function FaqTopicPage() {
  const { topic, articles, error } = useConnectedServicesFaq();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PublicShell>
      <FaqSearchCard />

      <nav className="faqt-breadcrumbs" aria-label="Breadcrumbs">
        <Link to="/">Home</Link>
        <span className="faqt-crumb-sep" aria-hidden="true">&#9656;</span>
        <span className="faqt-crumb-current">{topic}</span>
      </nav>

      <section className="faqt-topic">
        <h1 className="faqt-title">{topic}</h1>

        {error && (
          <p className="faqt-error">Unable to load FAQs right now. Please try again later.</p>
        )}

        <ul className="faqt-list">
          {articles.map((a) => (
            <li key={a.slug} className="faqt-row">
              <Link className="faqt-qa" to={`/faq/connected-services/article/${a.slug}`}>
                <p className="faqt-question">{a.question}</p>
                <p className="faqt-summary">{a.answer}</p>
              </Link>
              <hr className="faqt-divider" />
            </li>
          ))}
        </ul>
      </section>

      <FaqSupportSections />
    </PublicShell>
  );
}
