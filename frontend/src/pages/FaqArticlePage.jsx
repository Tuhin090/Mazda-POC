import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { FaqSearchCard, FaqSupportSections } from "../components/FaqContent";
import useConnectedServicesFaq from "../hooks/useConnectedServicesFaq";
import "./FaqTopic.css";

function ArticleFeedback() {
  const [voted, setVoted] = useState(false);

  return (
    <div className="faqt-feedback">
      <p className="faqt-feedback-heading">WAS THIS ANSWER HELPFUL?</p>
      {voted ? (
        <p className="faqt-feedback-thanks">Thank you for your feedback.</p>
      ) : (
        <div className="faqt-feedback-actions">
          <button type="button" onClick={() => setVoted(true)}>Yes</button>
          <button type="button" onClick={() => setVoted(true)}>No</button>
        </div>
      )}
    </div>
  );
}

/**
 * Public Connected Services FAQ article page — internal replica of
 * faq.mazdausa.com/s/article/<slug>. Renders the question as the title, the
 * answer body, and the "Was this answer helpful?" prompt.
 */
export default function FaqArticlePage() {
  const { slug } = useParams();
  const { topic, articles, loading, error } = useConnectedServicesFaq();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const article = articles.find((a) => a.slug === slug);

  if (!loading && !error && !article) {
    return <Navigate to="/faq/connected-services" replace />;
  }

  return (
    <PublicShell>
      <FaqSearchCard />

      <nav className="faqt-breadcrumbs" aria-label="Breadcrumbs">
        <Link to="/">Home</Link>
        <span className="faqt-crumb-sep" aria-hidden="true">&#9656;</span>
        <Link to="/faq/connected-services">{topic}</Link>
        {article && (
          <>
            <span className="faqt-crumb-sep" aria-hidden="true">&#9656;</span>
            <span className="faqt-crumb-current">{article.question}</span>
          </>
        )}
      </nav>

      <section className="faqt-article">
        {error && (
          <p className="faqt-error">Unable to load this FAQ right now. Please try again later.</p>
        )}

        {article && (
          <>
            <h1 className="faqt-title">{article.question}</h1>
            <div className="faqt-article-body">{article.answer}</div>

            <hr className="faqt-divider faqt-article-divider" />

            <ArticleFeedback key={slug} />

            <hr className="faqt-divider faqt-article-divider" />
          </>
        )}
      </section>

      <FaqSupportSections />
    </PublicShell>
  );
}
