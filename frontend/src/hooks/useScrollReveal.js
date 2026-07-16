import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` to the ref'd element when it enters the viewport
 * (once, then unobserves). Pair with the .mz-reveal CSS classes.
 * onVisible fires the first time it appears — used to start section videos.
 */
export default function useScrollReveal({ threshold = 0.15, onVisible } = {}) {
  const ref = useRef(null);
  const onVisibleRef = useRef(onVisible);

  useEffect(() => {
    onVisibleRef.current = onVisible;
  }, [onVisible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          onVisibleRef.current?.();
          io.unobserve(el);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
