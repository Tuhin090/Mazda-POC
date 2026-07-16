import { useEffect, useState } from "react";

const KB_URL = "/knowledge_base/connected_services_faq.json";

// Module-level cache: the knowledge base is static, so topic -> article
// navigation reuses the first fetch instead of hitting the network again.
let cached = null;
let pending = null;

function loadKnowledgeBase() {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = fetch(KB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load FAQ knowledge base (${res.status})`);
        return res.json();
      })
      .then((data) => {
        cached = data;
        return data;
      })
      .catch((err) => {
        pending = null; // allow retry on next mount
        throw err;
      });
  }
  return pending;
}

/**
 * Loads the Connected Services FAQ knowledge base
 * (public/knowledge_base/connected_services_faq.json).
 * Returns { topic, articles, loading, error }.
 */
export default function useConnectedServicesFaq() {
  const [state, setState] = useState(() => ({
    topic: cached?.topic ?? "Connected Services",
    articles: cached?.articles ?? [],
    loading: !cached,
    error: null,
  }));

  useEffect(() => {
    if (cached) return;
    let alive = true;
    loadKnowledgeBase()
      .then((data) => {
        if (alive) setState({ topic: data.topic, articles: data.articles, loading: false, error: null });
      })
      .catch((err) => {
        if (alive) setState((s) => ({ ...s, loading: false, error: err }));
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
