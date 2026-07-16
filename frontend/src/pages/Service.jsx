import Layout from "../components/Layout";
import FaqContent from "../components/FaqContent";
import "./Faq.css";
import "./Service.css";

/**
 * SERVICE tab — the FAQ content rendered inside the logged-in portal.
 * Layout supplies the portal header/nav/footer and the authorized Agentforce
 * agent, so we do NOT mount an AgentforceWidget here. Living at /service makes
 * Layout's activeNav() highlight the SERVICE tab automatically.
 * The Connected Services card stays inside the portal (/service/connected-services)
 * so the logged-in chrome and authorized agent survive the click.
 */
export default function Service() {
  return (
    <Layout>
      <div className="faq-portal">
        <FaqContent internalConnectedServices connectedServicesTo="/service/connected-services" />
      </div>
    </Layout>
  );
}
