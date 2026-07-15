import "../pages/Faq.css";

import imgCx5 from "../assets/faq/2026-cx5.jpg";
import imgOwnersClub from "../assets/faq/owners-club.jpg";
import imgFeatures from "../assets/faq/vehicle-features.jpg";
import imgWarranty from "../assets/faq/ownership-warranty.jpg";
import imgAccessories from "../assets/faq/accessories.jpg";
import imgElectrification from "../assets/faq/electrification.jpg";
import imgContact from "../assets/faq/contact-us.jpg";
import imgTech from "../assets/faq/technology-software.jpg";
import imgConnected from "../assets/faq/connected-services.jpg";
import imgSales from "../assets/faq/sales-financing.jpg";
import imgEmissions from "../assets/faq/emissions.jpg";

const FAQ_BASE = "https://faq.mazdausa.com";

const FEATURED_TOPICS = [
  { title: "2026 CX-5", img: imgCx5, url: `${FAQ_BASE}/s/topic/0TOPb000000QAa1OAG/2026-cx5` },
  { title: "Mazda Owner's Club", img: imgOwnersClub, url: `${FAQ_BASE}/s/topic/0TOPb000000HDldOAG/mazda-owners-club` },
  { title: "Vehicle Features and Specs", img: imgFeatures, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnROAW/vehicle-features-and-specs` },
  { title: "Ownership Maintenance and Warranty", img: imgWarranty, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnOOAW/ownership-maintenance-and-warranty` },
  { title: "Accessories and Customization", img: imgAccessories, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnJOAW/accessories-and-customization` },
  { title: "Electrification", img: imgElectrification, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnMOAW/electrification` },
  { title: "Contact Us", img: imgContact, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnLOAW/contact-us` },
  { title: "Technology and Software", img: imgTech, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnQOAW/technology-and-software` },
  { title: "Connected Services", img: imgConnected, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnKOAW/connected-services` },
  { title: "Sales and Financing", img: imgSales, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnPOAW/sales-and-financing` },
  { title: "Emissions", img: imgEmissions, url: `${FAQ_BASE}/s/topic/0TOPb000000FLnNOAW/emissions` },
];

const HOLIDAYS = [
  ["Adjusted Hours", "Martin Luther King - January 19th, 2026, 6:00am-3:00pm"],
  ["Closed", "Memorial Day - May 25th, 2026"],
  ["Adjusted Hours", "Juneteenth - June 19th, 2026, 6:00am-3:00pm"],
  ["Closed", "Independence Day - July 4th, 2026"],
  ["Closed", "Labor Day - September 7th, 2026"],
  ["Adjusted Hours", "Veteran's Day - November 11th, 2026, 6:00am-3:00pm"],
  ["Closed", "Thanksgiving Day - November 26th, 2026"],
  ["Adjusted Hours", "Day after Thanksgiving - November 27th, 2026, 6:00am-3:00pm"],
  ["Closed", "Christmas Eve - December 24th, 2026"],
  ["Closed", "Christmas Day - December 25th, 2026"],
  ["Adjusted Hours", "New Years Eve - December 31st, 2026, 6:00am-3:00pm"],
  ["Closed", "New Years Day - January 1st, 2027"],
];

/* ---- small inline icons ---- */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H8l-4 4V6c0-1.1.9-2 2-2z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

/**
 * Shared FAQ page body (search band, tabs, featured grid, contact cards, holiday
 * schedule). Rendered both on the public landing (Faq.jsx, with the public navbar +
 * footer + unauthorized chat) and inside the logged-in portal (Service.jsx, wrapped
 * in Layout). Returns a fragment — the wrapper element is the caller's responsibility.
 */
export default function FaqContent() {
  return (
    <>
      {/* ---------- Search band ---------- */}
      <section className="faq-search-band">
        <div className="faq-search-inner">
          <div className="faq-search-eyebrow">
            <span className="faq-search-icon" aria-hidden="true">
              <SearchIcon />
            </span>
            <h2>Search FAQs</h2>
          </div>
          <h1 className="faq-search-title">
            Find your answer quickly using our Frequently Asked Questions.
          </h1>
          <form className="faq-search-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Search FAQs" aria-label="Search FAQs" />
            <div className="faq-search-actions">
              <button type="submit" className="faq-search-submit">
                Search
              </button>
              <button type="button" className="faq-search-clear" disabled>
                Clear
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ---------- Tabs ---------- */}
      <section className="faq-topics">
        <div className="faq-tabs" role="tablist">
          <button className="faq-tab is-active" role="tab" aria-selected="true">Featured</button>
          <button className="faq-tab" role="tab" aria-selected="false">Top articles</button>
          <button className="faq-tab" role="tab" aria-selected="false">Trending</button>
        </div>

        {/* ---------- Featured grid ---------- */}
        <ul className="faq-grid">
          {FEATURED_TOPICS.map((t) => (
            <li key={t.title}>
              <a className="faq-card" href={t.url} target="_blank" rel="noreferrer">
                <span className="faq-card-img" style={{ backgroundImage: `url(${t.img})` }} />
                <span className="faq-card-title">{t.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Contact section ---------- */}
      <section className="faq-contact">
        <h3 className="faq-contact-heading">NOT FINDING YOUR ANSWER?</h3>
        <p className="faq-contact-sub">
          Our Customer Experience Center Representatives are here to help:
        </p>

        <div className="faq-contact-grid">
          {/* By Phone */}
          <article className="faq-contact-card">
            <div className="faq-cc-head">
              <span className="faq-cc-icon orange"><PhoneIcon /></span>
              <h2>By Phone</h2>
            </div>
            <div className="faq-cc-body">
              <p>Monday - Friday: 5:00 a.m. - 6:00 p.m. PST</p>
              <p>Saturday: 7:00 a.m. - 3:00 p.m. PST</p>
              <a className="faq-tel" href="tel:+18002225500">(800) 222-5500</a>
              <p className="faq-bestfor">BEST FOR:</p>
              <ul>
                <li>Time-sensitive Vehicle Related Assistance</li>
                <li>Real-time Connected Services Troubleshooting and Guidance</li>
                <li>Case Status Updates</li>
                <li>General Warranty and Customer Support</li>
              </ul>
            </div>
          </article>

          {/* By Chat */}
          <article className="faq-contact-card">
            <div className="faq-cc-head">
              <span className="faq-cc-icon orange"><ChatIcon /></span>
              <h2>By Chat</h2>
            </div>
            <div className="faq-cc-body">
              <p>Chat hours are listed below.</p>
              <p>Monday - Friday: 5:00 a.m. - 5:30 p.m. PST</p>
              <p>Saturday - Sunday: Closed</p>
              <p className="faq-bestfor">BEST FOR:</p>
              <ul>
                <li>On-demand Support for General Questions</li>
                <li>MyMazda Account or App Related Assistance</li>
                <li>Quick Policy or Program Related Enquires</li>
              </ul>
            </div>
          </article>

          {/* By Email */}
          <article className="faq-contact-card">
            <div className="faq-cc-head">
              <span className="faq-cc-icon gray"><MailIcon /></span>
              <h2>By Email</h2>
            </div>
            <div className="faq-cc-body">
              <p>
                Please check our FAQ section; However, should you require additional
                assistance, please contact our Customer Experience Center.{" "}
                <a href="https://webpage.mazdausa.com/MazdaStatic/contactus.action" target="_blank" rel="noreferrer">Email Us</a>
              </p>
              <p className="faq-bestfor">BEST FOR:</p>
              <ul>
                <li>Non-urgent Enquiries about Vehicle Maintenance, Technology and more</li>
                <li>Product Suggestions and Feedback</li>
              </ul>
            </div>
          </article>

          {/* Mazda Financial Services */}
          <article className="faq-contact-card">
            <div className="faq-cc-head">
              <span className="faq-cc-icon orange"><PhoneIcon /></span>
              <h2>Mazda Financial Services</h2>
            </div>
            <div className="faq-cc-body">
              <p>Customer Service: (866) 693-2332</p>
              <p>Hours of Operation:</p>
              <p>Payment &amp; Account Info: Mon.-Fri. 8 a.m.-5 p.m. (all timezones)</p>
              <p>Insurance Servicing: Mon.-Fri. 7 a.m.-5 p.m.; Sat 8 a.m.-1 p.m. CT</p>
              <p>
                Website:{" "}
                <a href="https://www.mazdafinancialservices.com/" target="_blank" rel="noreferrer">mazdafinancialservices.com</a>
              </p>
            </div>
          </article>

          {/* Roadside Assistance */}
          <article className="faq-contact-card">
            <div className="faq-cc-head">
              <span className="faq-cc-icon orange"><PhoneIcon /></span>
              <h2>Roadside Assistance</h2>
            </div>
            <div className="faq-cc-body">
              <p>Roadside Available 24 hours a day, 7 days a week anywhere in the United States and Canada.</p>
              <a className="faq-tel" href="tel:+18008661998">(800) 866-1998</a>
            </div>
          </article>

          {/* By Mail */}
          <article className="faq-contact-card">
            <div className="faq-cc-head">
              <span className="faq-cc-icon green"><MapPinIcon /></span>
              <h2>By Mail</h2>
            </div>
            <div className="faq-cc-body">
              <p>Mazda North American Operations</p>
              <p>Attn: Customer Experience Center</p>
              <p>PO Box 19734</p>
              <p>Irvine, CA 92623-9734</p>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- Holiday schedule ---------- */}
      <section className="faq-holiday">
        <div className="faq-holiday-img" style={{ backgroundImage: `url(${imgCx5})` }} />
        <div className="faq-holiday-body">
          <h2>Customer Experience Center Holiday Schedule</h2>
          <ul>
            {HOLIDAYS.map(([label, text]) => (
              <li key={text}>
                <strong>{label}</strong> {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
