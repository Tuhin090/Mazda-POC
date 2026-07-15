import { useEffect } from "react";

const ORG_ID = "00DHo00000dXCjt";

export default function AgentforceWidget({ scriptId, deploymentName, siteUrl, scrt2Url, onReady }) {
  useEffect(() => {
    // Guard against double-boot: the Salesforce MIAW library sets this global
    // once loaded and cannot be cleanly re-initialized (e.g. React StrictMode
    // remount in dev). Same guard Login.jsx uses for its inline embed.
    if (document.getElementById(scriptId)) return;
    if (window.embeddedservice_bootstrap) return;

    window.initEmbeddedMessaging = function () {
      try {
        window.embeddedservice_bootstrap.settings.language = "en_US";
        window.embeddedservice_bootstrap.init(ORG_ID, deploymentName, siteUrl, {
          scrt2URL: scrt2Url,
        });
      } catch (err) {
        console.error("Error loading Embedded Messaging:", err);
      }
    };

    if (onReady) {
      window.addEventListener("onEmbeddedMessagingReady", onReady);
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `${siteUrl}/assets/js/bootstrap.min.js`;
    script.onload = () => window.initEmbeddedMessaging();
    document.body.appendChild(script);

    // NOTE: intentionally no destructive teardown of the SF bootstrap here.
    // Tearing the script/global down and re-appending it (StrictMode remount)
    // triggers "initialize bootstrap multiple times" errors. Session cleanup for
    // the unauthorized agent is handled centrally in index.html on route change.
    return () => {
      if (onReady) window.removeEventListener("onEmbeddedMessagingReady", onReady);
    };
  }, []);

  return null;
}
