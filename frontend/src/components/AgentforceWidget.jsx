import { useEffect } from "react";

const ORG_ID = "00DHo00000dXCjt";
const SF_SESSION_KEY = `${ORG_ID}_WEB_STORAGE`;

export default function AgentforceWidget({ scriptId, deploymentName, siteUrl, scrt2Url, onReady }) {
  useEffect(() => {
    if (document.getElementById(scriptId)) return;

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

    return () => {
      document.getElementById(scriptId)?.remove();
      delete window.embeddedservice_bootstrap;
      delete window.initEmbeddedMessaging;
      localStorage.removeItem(SF_SESSION_KEY);
      sessionStorage.removeItem(SF_SESSION_KEY);
      if (onReady) window.removeEventListener("onEmbeddedMessagingReady", onReady);
    };
  }, []);

  return null;
}
