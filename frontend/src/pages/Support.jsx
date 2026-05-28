import { useState } from "react";
import Layout from "../components/Layout";
import { dashboardData } from "../data/dashboardData";
import "./Support.css";

const { support } = dashboardData;

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = support.faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="sp-body">

        {/* Header */}
        <div className="sp-header">
          <h1 className="sp-title">Support</h1>
          <p className="sp-subtitle">{support.subtitle}</p>
        </div>

        {/* Contact cards */}
        <div className="sp-contacts">
          {support.contacts.map((c) => (
            <div key={c.type} className="sp-contact-card">
              <div className={`sp-contact-icon sp-contact-icon--${c.type}`}>
                {c.type === "chat" && <ChatIcon />}
                {c.type === "phone" && <PhoneIcon />}
                {c.type === "roadside" && <AlertIcon />}
              </div>
              <h3 className="sp-contact-title">{c.title}</h3>
              <p className="sp-contact-desc">{c.description}</p>
              {c.statusLabel && (
                <p className="sp-contact-status">
                  <span className={`sp-status-dot sp-status-dot--${c.statusType}`} />
                  {c.statusLabel}
                </p>
              )}
              {c.phone && (
                <p className={`sp-contact-phone${c.phoneRed ? " sp-contact-phone--red" : ""}`}>
                  {c.phone}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ + Support requests */}
        <div className="sp-bottom-grid">

          {/* FAQ */}
          <div className="sp-card">
            <div className="sp-card-header">
              <h2 className="sp-card-title">Frequently asked questions</h2>
              <button className="sp-view-all">View all</button>
            </div>

            {/* Search */}
            <div className="sp-search-wrap">
              <SearchIcon />
              <input
                className="sp-search-input"
                type="text"
                placeholder="Search help articles"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Accordion */}
            <ul className="sp-faq-list">
              {filteredFaqs.length === 0 && (
                <li className="sp-faq-empty">No results found.</li>
              )}
              {filteredFaqs.map((faq, i) => (
                <li key={i} className="sp-faq-item">
                  <button
                    className="sp-faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    <span className={`sp-faq-chevron${openFaq === i ? " sp-faq-chevron--open" : ""}`}>
                      <ChevronIcon />
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="sp-faq-answer">{faq.answer}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="sp-right-col">

            {/* Support requests */}
            <div className="sp-card">
              <h2 className="sp-card-title">Your support requests</h2>
              <ul className="sp-requests-list">
                {support.supportRequests.map((req, i) => (
                  <li key={i} className={`sp-request-item${i < support.supportRequests.length - 1 ? " sp-request-item--divider" : ""}`}>
                    <span className="sp-request-icon">
                      {req.status === "OPEN" ? <OpenIcon /> : <ResolvedIcon />}
                    </span>
                    <div className="sp-request-info">
                      <div className="sp-request-top">
                        <span className="sp-request-title">{req.title}</span>
                        <span className={`sp-request-badge sp-request-badge--${req.status.toLowerCase()}`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="sp-request-meta">{req.caseNumber} · {req.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Still need help */}
            <div className="sp-card sp-card--dark">
              <h2 className="sp-still-title">Still need help?</h2>
              <p className="sp-still-desc">
                Submit a request and a specialist will reach out within 24 hours.
              </p>
              <button className="sp-submit-btn">Submit a request</button>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}

/* ── Icons ── */
function ChatIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function PhoneIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>;
}
function AlertIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" fill="none"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" fill="none"/></svg>;
}
function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function ChevronIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>;
}
function OpenIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#c8862a" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10" strokeDasharray="4 2"/></svg>;
}
function ResolvedIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>;
}
