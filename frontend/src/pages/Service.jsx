import Layout from "../components/Layout";
import FaqContent from "../components/FaqContent";
import "./Faq.css";
import "./Service.css";

/**
 * SERVICE tab — the FAQ content rendered inside the logged-in portal.
 * Layout supplies the portal header/nav/footer and the authorized Agentforce
 * agent, so we do NOT mount an AgentforceWidget here. Living at /service makes
 * Layout's activeNav() highlight the SERVICE tab automatically.
 */
export default function Service() {
  return (
    <Layout>
      <div className="faq-portal">
        <FaqContent />
      </div>
    </Layout>
  );
}
