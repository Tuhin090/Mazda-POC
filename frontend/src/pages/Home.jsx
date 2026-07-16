import HomeHeader from "../components/home/HomeHeader";
import Hero from "../components/home/Hero";
import ShoppingToolsRow from "../components/home/ShoppingToolsRow";
import SafetySection from "../components/home/SafetySection";
import VehicleCarousel from "../components/home/VehicleCarousel";
import OffersSlider from "../components/home/OffersSlider";
import ElectrificationSection from "../components/home/ElectrificationSection";
import MiataBanner from "../components/home/MiataBanner";
import DealerBanner from "../components/home/DealerBanner";
import OwnershipSection from "../components/home/OwnershipSection";
import HomeFooter from "../components/home/HomeFooter";
import AgentforceWidget from "../components/AgentforceWidget";
import "./Home.css";

/**
 * Landing page — component-by-component replica of the mazdausa.com homepage
 * (content snapshot 2026-07-16). POC deltas: header Help button (opens the
 * unauthorized Agentforce chat), user icon → /login, Owners → FAQs → /faq.
 */
export default function Home() {
  return (
    <div className="mz-home">
      <HomeHeader />
      <main>
        <Hero />
        <ShoppingToolsRow />
        <SafetySection />
        <VehicleCarousel />
        <OffersSlider />
        <ElectrificationSection />
        <MiataBanner />
        <DealerBanner />
        <OwnershipSection />
      </main>
      <HomeFooter />

      {/* static accessiBe-style widget (dummy per requirements) */}
      <button type="button" className="mz-accessibe" aria-label="Accessibility options (static demo control)">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 5.5c0 .6-.4 1-1 1h-5v2.6l1.9 8.2a1 1 0 0 1-1.95.45L13 13.4h-2l-1.95 6.35a1 1 0 0 1-1.95-.45L9 11.1V8.5H4a1 1 0 1 1 0-2h16c.6 0 1 .4 1 1z" />
        </svg>
      </button>

      {/* Same unauthorized prechat deployment as PublicShell — keeps the
          "not logged in" agent reachable from the new landing page. */}
      <AgentforceWidget
        scriptId="agentforce-login-bootstrap"
        deploymentName="Mazda_Prechat_ESD"
        siteUrl="https://storm-957a49fe9c0bc1.my.site.com/ESWMazdaPrechatESD1779882151775"
        scrt2Url="https://storm-957a49fe9c0bc1.my.salesforce-scrt.com"
      />
    </div>
  );
}
