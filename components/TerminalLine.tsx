"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_MS = 32;
const ERASE_MS = 20;
const HOLD_MS = 4000; // 4 full cycles of the 1s cursor blink (styles/site.css `oa-blink`)
const PAUSE_MS = 400;
const START_DELAY_MS = 500;

/**
 * Small supporting flourish for the Contact chapter's "buzzing" energy —
 * not the signature move, just texture. Loops type/hold/erase/pause on
 * entry; reduced motion writes the final line immediately and never loops.
 */
export default function TerminalLine({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [shown, setShown] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timerId: ReturnType<typeof setTimeout> | undefined;

    const typeStep = (i: number) => {
      if (i > text.length) {
        timerId = setTimeout(() => eraseStep(text.length), HOLD_MS);
        return;
      }
      setShown(text.slice(0, i));
      timerId = setTimeout(() => typeStep(i + 1), TYPE_MS);
    };

    const eraseStep = (i: number) => {
      if (i < 0) {
        timerId = setTimeout(() => typeStep(0), PAUSE_MS);
        return;
      }
      setShown(text.slice(0, i));
      timerId = setTimeout(() => eraseStep(i - 1), ERASE_MS);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setShown(text);
          return;
        }

        timerId = setTimeout(() => typeStep(0), START_DELAY_MS);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerId) clearTimeout(timerId);
    };
  }, [text]);

  return (
    <span
      className={`terminal-line${className ? ` ${className}` : ""}`}
      ref={ref}
      aria-hidden="true"
    >
      <span className="terminal-line__text">{shown}</span>
      <span className="terminal-line__cursor" aria-hidden="true" />
    </span>
  );
}
