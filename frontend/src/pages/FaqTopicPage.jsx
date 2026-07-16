import { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import Layout from "../components/Layout";
import { FaqSearchCard, FaqSupportSections } from "../components/FaqContent";
import useConnectedServicesFaq from "../hooks/useConnectedServicesFaq";
import "./FaqTopic.css";

/**
 * Connected Services FAQ topic page — internal replica of
 * faq.mazdausa.com/s/topic/.../connected-services. Lists every article as a
 * question + one-line answer preview; clicking a row opens the article page.
 *
 * `portal`: false (default) renders in the public shell (unauthorized chat) at
 * /faq/connected-services; true renders inside the logged-in Layout (portal
 * chrome + authorized agent) at /service/connected-services.
 */
export default function FaqTopicPage({ portal = false }) {
  const { topic, articles, error } = useConnectedServicesFaq();
  const Shell = portal ? Layout : PublicShell;
  const base = portal ? "/service/connected-services" : "/faq/connected-services";
  const homeCrumb = portal ? ["/service", "Service"] : ["/", "Home"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const body = (
    <>
      <FaqSearchCard />

      <nav className="faqt-breadcrumbs" aria-label="Breadcrumbs">
        <Link to={homeCrumb[0]}>{homeCrumb[1]}</Link>
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
              <Link className="faqt-qa" to={`${base}/article/${a.slug}`}>
                <p className="faqt-question">{a.question}</p>
                <p className="faqt-summary">{a.answer}</p>
              </Link>
              <hr className="faqt-divider" />
            </li>
          ))}
        </ul>
      </section>

      <FaqSupportSections />
    </>
  );

  return <Shell>{portal ? <div className="faq-portal">{body}</div> : body}</Shell>;
}
