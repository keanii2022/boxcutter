"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small supporting flourish for the Contact chapter's "buzzing" energy —
 * not the signature move, just texture. Types once on entry; reduced motion
 * writes the final line immediately.
 */
export default function TerminalLine({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setShown(text);
          return;
        }

        let i = 0;
        intervalId = setInterval(() => {
          i += 1;
          setShown(text.slice(0, i));
          if (i >= text.length && intervalId) clearInterval(intervalId);
        }, 32);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, [text]);

  return (
    <span className="terminal-line" ref={ref}>
      <span className="terminal-line__text">{shown}</span>
      <span className="terminal-line__cursor" aria-hidden="true" />
    </span>
  );
}
