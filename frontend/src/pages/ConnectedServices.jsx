import Layout from "../components/Layout";
import { dashboardData } from "../data/dashboardData";
import "./ConnectedServices.css";

const { connectedServices } = dashboardData;

export default function ConnectedServices() {
  return (
    <Layout>
      <div className="cs-body">
        {/* Page header */}
        <div className="cs-header">
          <h1 className="cs-title">Connected Services</h1>
          <div className="cs-trial-row">
            <span className="cs-trial-badge">{connectedServices.trialStatus}</span>
            <span className="cs-trial-days">{connectedServices.daysRemaining} days remaining</span>
            <span className="cs-trial-ends">· Ends {connectedServices.endDate}</span>
          </div>
        </div>

        {/* Plan cards */}
        <div className="cs-plans">
          {connectedServices.plans.map((plan) => (
            <div key={plan.id} className={`cs-plan-card${plan.recommended ? " cs-plan-card--recommended" : ""}`}>
              {plan.recommended && (
                <div className="cs-recommended-badge">RECOMMENDED</div>
              )}

              <div className="cs-plan-top">
                <h2 className="cs-plan-name">{plan.name}</h2>
                <div className="cs-plan-price">
                  <span className="cs-price-amount">{plan.price}</span>
                  <span className="cs-price-period">/{plan.period}</span>
                </div>
                <p className="cs-plan-desc">{plan.description}</p>
              </div>

              <div className="cs-plan-divider" />

              <ul className="cs-feature-list">
                {plan.features.map((f) => (
                  <li key={f.label} className={`cs-feature-item${f.included ? "" : " cs-feature-item--excluded"}`}>
                    <span className="cs-feature-icon">
                      {f.included ? <CheckIcon /> : <XIcon />}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <button className={`cs-plan-btn${plan.recommended ? " cs-plan-btn--primary" : " cs-plan-btn--outline"}`}>
                {plan.ctaLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="cs-footer-note">{connectedServices.footerNote}</p>
      </div>
    </Layout>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
