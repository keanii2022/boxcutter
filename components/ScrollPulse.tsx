"use client";

import { useEffect, useRef } from "react";

/**
 * A fixed frame around the viewport that pulses (dimmed neon orange) while
 * the page is actively scrolling, and goes quiet ~200ms after the last
 * scroll event — a wayfinding cue that something is happening, standing in
 * for the missing "next section" affordance. Not tied to scroll-craft's own
 * progress pipeline; this only cares whether the page is moving right now.
 */
export default function ScrollPulse() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let hideTimer: number;
    const onScroll = () => {
      el.classList.add("scroll-pulse--active");
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        el.classList.remove("scroll-pulse--active");
      }, 220);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return <div ref={ref} className="scroll-pulse" aria-hidden="true" />;
}
