import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardData } from "../data/dashboardData";
import Layout from "../components/Layout";
import "./Dashboard.css";

const { user, vehicleStatus, upcomingService, recentActivity, quickActions } = dashboardData;

const QUICK_ACTION_ROUTES = {
  support: "/support",
  service: "/service",
};

function getLoggedInUser() {
  try {
    const token = sessionStorage.getItem("mazda_auth");
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function maskVin(vin) {
  if (!vin || vin.length < 9) return vin || "—";
  return vin.slice(0, 5) + "*".repeat(vin.length - 8) + vin.slice(-3);
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function daysUntil(dateStr) {
  if (!dateStr) return 0;
  const diff = new Date(dateStr + "T00:00:00") - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function trialPercentUsed(purchasedDate, trialEndDate) {
  if (!purchasedDate || !trialEndDate) return 0;
  const start = new Date(purchasedDate + "T00:00:00");
  const end = new Date(trialEndDate + "T00:00:00");
  const now = new Date();
  const total = end - start;
  const elapsed = now - start;
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}

function formatLoginTime() {
  try {
    const ts = sessionStorage.getItem("mazda_login_time");
    const d = ts ? new Date(Number(ts)) : new Date();
    const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    const date = d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    return { time, date };
  } catch {
    return { time: "just now", date: "" };
  }
}

function vehicleSelector(name) {
  if (!name) return dashboardData.vehicle.selector;
  const parts = name.split(" ");
  return parts.length >= 3 ? `${parts[0]} ${parts.slice(2).join(" ")}` : name;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();
  const firstName = loggedInUser?.first_name || loggedInUser?.username || dashboardData.user.name;

  const prefetched = (() => {
    try {
      const raw = sessionStorage.getItem("mazda_sf_data");
      if (raw) { sessionStorage.removeItem("mazda_sf_data"); return JSON.parse(raw); }
    } catch { /* ignore */ }
    return null;
  })();

  const { time: loginTime, date: loginDate } = formatLoginTime();

  const [sfData, setSfData] = useState(prefetched);
  const [sfLoading, setSfLoading] = useState(!prefetched);

  useEffect(() => {
    if (prefetched) return; // already have data from login — skip fetch
    const token = sessionStorage.getItem("mazda_auth");
    if (!token) { setSfLoading(false); return; }
    fetch("/api/sf/customer360", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (!data.error) setSfData(data); })
      .catch(() => {})
      .finally(() => setSfLoading(false));
  }, []);

  const sfVehicle = sfData?.vehicle;
  const sfOwnership = sfData?.ownership;
  const staticVehicle = dashboardData.vehicle;

  const vehicleName = sfLoading ? "—" : sfVehicle?.VehicleName__c
    ? sfVehicle.VehicleName__c.toUpperCase()
    : staticVehicle.name;
  const vehicleVin = sfLoading ? "—" : (sfVehicle?.VIN__c ?? staticVehicle.vin);
  const vehicleConnected = sfLoading ? false : (sfVehicle ? sfVehicle.IsActive__c : staticVehicle.connected);
  const vehicleModelYear = sfLoading ? "—" : sfVehicle?.VehicleName__c
    ? sfVehicle.VehicleName__c.split(" ")[0]
    : staticVehicle.modelYear;

  const trialEndDate = sfOwnership?.TrialEndDate__c ?? null;
  const purchasedDate = sfOwnership?.PurchasedDate__c ?? null;
  const subStatus = sfLoading ? "—" : (sfOwnership?.SubscriptionStatus__c?.toUpperCase() ?? "—");
  const subEndDateFormatted = sfLoading ? "—" : (trialEndDate ? formatDate(trialEndDate) : "—");
  const subDaysRemaining = sfLoading ? "—" : (trialEndDate ? daysUntil(trialEndDate) : "—");
  const subPercentUsed = sfLoading ? 0 : ((purchasedDate && trialEndDate)
    ? trialPercentUsed(purchasedDate, trialEndDate)
    : 0);

  return (
    <Layout>
      <div className="db-body">

        {/* Welcome row */}
        <div className="db-welcome-row">
          <div>
            <h1 className="db-welcome-title">WELCOME BACK, {firstName.toUpperCase()}</h1>
            <p className="db-welcome-sub">Last synced {loginTime} · {loginDate}</p>
          </div>
          <div className="db-vehicle-selector">
            <span className="db-selector-label">VEHICLE</span>
            <button className="db-selector-btn">
              <CarIcon />
              {sfLoading ? "—" : vehicleSelector(sfVehicle?.VehicleName__c)}
              <ChevronIcon />
            </button>
          </div>
        </div>

        {/* Vehicle info + Status */}
        <div className="db-top-grid">

          {/* Vehicle card */}
          <div className="db-vehicle-card">
            <div className="db-vehicle-hero">
              <div className="db-vehicle-hero-meta">
                <span className="db-vehicle-trim">{staticVehicle.trim}</span>
                <span className={`db-connected-badge${vehicleConnected ? " connected" : ""}`}>
                  <span className="db-connected-dot" />
                  {vehicleConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <h2 className="db-vehicle-name">{vehicleName}</h2>
              <div className="db-vehicle-img-wrap">
                <img src={staticVehicle.image} alt={vehicleName} className="db-vehicle-img" />
              </div>
            </div>
            <div className="db-vehicle-specs">
              <div className="db-spec-row">
                <div className="db-spec">
                  <span className="db-spec-label">VIN</span>
                  <span className="db-spec-value">{maskVin(vehicleVin)}</span>
                </div>
                <div className="db-spec">
                  <span className="db-spec-label">Odometer</span>
                  <span className="db-spec-value">{staticVehicle.odometer}</span>
                </div>
              </div>
              <div className="db-spec-row">
                <div className="db-spec">
                  <span className="db-spec-label">Warranty</span>
                  <span className={`db-spec-value${staticVehicle.warrantyActive ? " warranty-active" : ""}`}>{staticVehicle.warranty}</span>
                </div>
                <div className="db-spec">
                  <span className="db-spec-label">Software</span>
                  <span className="db-spec-value">{staticVehicle.software}</span>
                </div>
              </div>
              <div className="db-spec-row">
                <div className="db-spec">
                  <span className="db-spec-label">Last trip</span>
                  <span className="db-spec-value bold">{staticVehicle.lastTrip}</span>
                </div>
                <div className="db-spec">
                  <span className="db-spec-label">Model year</span>
                  <span className="db-spec-value">{vehicleModelYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Status */}
          <div className="db-status-section">
            <h3 className="db-section-title">VEHICLE STATUS</h3>
            <div className="db-status-grid">

              {/* Fuel */}
              <div className="db-status-card">
                <div className="db-status-header">
                  <FuelIcon /> <span className="db-status-label">Fuel</span>
                </div>
                <p className="db-status-value">{vehicleStatus.fuel.percent}%</p>
                <div className="db-progress-bar">
                  <div className="db-progress-fill red" style={{ width: `${vehicleStatus.fuel.percent}%` }} />
                </div>
                <p className="db-status-detail">{vehicleStatus.fuel.range}</p>
              </div>

              {/* Oil Life */}
              <div className="db-status-card">
                <div className="db-status-header">
                  <OilIcon /> <span className="db-status-label">Oil life</span>
                </div>
                <p className="db-status-value">{vehicleStatus.oilLife.percent}%</p>
                <div className="db-progress-bar">
                  <div className="db-progress-fill green" style={{ width: `${vehicleStatus.oilLife.percent}%` }} />
                </div>
                <p className="db-status-detail">{vehicleStatus.oilLife.mileage}</p>
              </div>

              {/* Doors */}
              <div className="db-status-card">
                <div className="db-status-header">
                  <LockIcon /> <span className="db-status-label">Doors</span>
                </div>
                <p className="db-status-value">{vehicleStatus.doors.status}</p>
                <p className="db-status-detail">{vehicleStatus.doors.detail}</p>
              </div>

              {/* Tire Pressure */}
              <div className="db-status-card">
                <div className="db-status-header">
                  <TireIcon /> <span className="db-status-label">Tire pressure</span>
                </div>
                <p className="db-status-value">{vehicleStatus.tirePressure.value}</p>
                <p className={`db-status-detail${vehicleStatus.tirePressure.ok ? " green-text" : ""}`}>
                  {vehicleStatus.tirePressure.detail}
                </p>
              </div>

              {/* Battery + Lights — full width */}
              <div className="db-status-card db-status-card--wide">
                <div className="db-status-inline-row">
                  <div className="db-status-inline">
                    <BatteryIcon />
                    <span className="db-status-label">12V battery</span>
                  </div>
                  <span className="db-status-value-sm">{vehicleStatus.battery.value}</span>
                </div>
                <div className="db-status-inline-row">
                  <div className="db-status-inline">
                    <LightIcon />
                    <span className="db-status-label">Exterior lights</span>
                  </div>
                  <span className="db-status-value-sm">{vehicleStatus.exteriorLights.status}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="db-subscription">
          <div className="db-sub-top">
            <div>
              <div className="db-sub-header-row">
                <h3 className="db-sub-title">SUBSCRIPTION STATUS</h3>
                <span className="db-sub-badge">{subStatus}</span>
              </div>
              <p className="db-sub-ends">
                Trial ends <strong>{subEndDateFormatted}</strong>
              </p>
            </div>
            <span className="db-sub-days">{subDaysRemaining} days remaining</span>
          </div>
          <div className="db-sub-progress-bar">
            <div className="db-sub-progress-fill" style={{ width: `${subPercentUsed}%` }} />
          </div>
          <div className="db-sub-bottom">
            <span className="db-sub-pct">{subPercentUsed}% of trial used</span>
            <button className="db-upgrade-btn" onClick={() => navigate("/connected-services")}>View Plans →</button>
          </div>
        </div>

        {/* Service + Activity */}
        <div className="db-mid-grid">

          {/* Upcoming Service */}
          <div className="db-card">
            <h3 className="db-section-title">UPCOMING SERVICE</h3>
            <div className="db-service-row">
              <div className="db-date-badge">
                <span className="db-date-month">{upcomingService.month}</span>
                <span className="db-date-day">{upcomingService.day}</span>
              </div>
              <div>
                <p className="db-service-title">{upcomingService.title}</p>
                <p className="db-service-time">{upcomingService.time}</p>
              </div>
            </div>
            <div className="db-divider" />
            <div className="db-service-meta">
              <p><LocationIcon /> {upcomingService.dealer}</p>
              <p><PersonIcon /> Advisor: {upcomingService.advisor}</p>
            </div>
            <div className="db-service-actions">
              <button className="db-outline-btn">Reschedule</button>
              <button className="db-outline-btn">Add to calendar</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="db-card">
            <h3 className="db-section-title">RECENT ACTIVITY</h3>
            <ul className="db-activity-list">
              {recentActivity.map((item, i) => (
                <li key={i} className="db-activity-item">
                  <span className="db-activity-icon">
                    {item.type === "trip" && <TripIcon />}
                    {item.type === "lock" && <LockIcon />}
                    {item.type === "update" && <UpdateIcon />}
                  </span>
                  <div>
                    <p className="db-activity-text">{item.text}</p>
                    <p className="db-activity-time">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="db-quick-section">
          <h3 className="db-section-title">QUICK ACTIONS</h3>
          <div className="db-quick-grid">
            {quickActions.map((action) => (
              <button
                key={action.type}
                className="db-quick-btn"
                onClick={() => QUICK_ACTION_ROUTES[action.type] && navigate(QUICK_ACTION_ROUTES[action.type])}
              >
                <span className="db-quick-icon">
                  {action.type === "remote" && <RemoteIcon />}
                  {action.type === "locate" && <LocateIcon />}
                  {action.type === "service" && <ServiceIcon />}
                  {action.type === "manual" && <ManualIcon />}
                  {action.type === "billing" && <BillingIcon />}
                  {action.type === "support" && <SupportIcon />}
                </span>
                <span className="db-quick-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}

/* ── Icons ── */
function CarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 17H3v-5l2.5-6.5A2 2 0 0 1 7.36 4h9.28a2 2 0 0 1 1.86 1.5L21 12v5h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>;
}
function ChevronIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>;
}
function FuelIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M3 22V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16"/><path d="M3 11h11"/><path d="M14 7h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L19 6"/></svg>;
}
function OilIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 6v6l4 2"/></svg>;
}
function LockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}
function TireIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>;
}
function BatteryIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg>;
}
function LightIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
function LocationIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{display:"inline",marginRight:4}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function PersonIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{display:"inline",marginRight:4}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function TripIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>;
}
function UpdateIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>;
}
function RemoteIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="3"/><path d="M8.93 8.93a6 6 0 0 0 0 6.14M15.07 8.93a6 6 0 0 1 0 6.14"/><path d="M5.64 5.64a10 10 0 0 0 0 12.72M18.36 5.64a10 10 0 0 1 0 12.72"/></svg>;
}
function LocateIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function ServiceIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function ManualIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>;
}
function BillingIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
}
function SupportIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
