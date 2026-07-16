import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import Layout from "../components/Layout";
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
 * Connected Services FAQ article page — internal replica of
 * faq.mazdausa.com/s/article/<slug>. Renders the question as the title, the
 * answer body, and the "Was this answer helpful?" prompt.
 *
 * `portal`: false (default) = public shell at /faq/...; true = logged-in
 * Layout (portal chrome + authorized agent) at /service/... .
 */
export default function FaqArticlePage({ portal = false }) {
  const { slug } = useParams();
  const { topic, articles, loading, error } = useConnectedServicesFaq();
  const Shell = portal ? Layout : PublicShell;
  const base = portal ? "/service/connected-services" : "/faq/connected-services";
  const homeCrumb = portal ? ["/service", "Service"] : ["/", "Home"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const article = articles.find((a) => a.slug === slug);

  if (!loading && !error && !article) {
    return <Navigate to={base} replace />;
  }

  const body = (
    <>
      <FaqSearchCard />

      <nav className="faqt-breadcrumbs" aria-label="Breadcrumbs">
        <Link to={homeCrumb[0]}>{homeCrumb[1]}</Link>
        <span className="faqt-crumb-sep" aria-hidden="true">&#9656;</span>
        <Link to={base}>{topic}</Link>
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
    </>
  );

  return <Shell>{portal ? <div className="faq-portal">{body}</div> : body}</Shell>;
}
