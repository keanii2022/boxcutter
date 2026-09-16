"use client";

import { useEffect, useState } from "react";
import BoxCutterLogo from "./BoxCutterLogo";
import TerminalLine from "./TerminalLine";

const CHAPTERS: { id: string; label: string }[] = [
  { id: "chapter-hero", label: "" },
  { id: "chapter-services", label: "Services" },
  { id: "chapter-about", label: "About" },
  { id: "chapter-github", label: "GitHub" },
  { id: "chapter-contact", label: "Contact" },
];

/**
 * Chaptered editorial's nav treatment: no fixed marketing bar, a folio
 * mark + the current chapter's title, updating as chapters pass.
 */
export default function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;

    // A thin band at the viewport's vertical centre, not the section's own
    // area: a pinned chapter can be many viewport-heights tall, so ratio
    // against its own bounding box never climbs past a sliver and a
    // threshold-based read never fires while scrolling through it.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const chapter = CHAPTERS.find((c) => c.id === entry.target.id);
          if (chapter) setActive(chapter.label);
        }
      },
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="oa-nav" aria-label="Page section">
      <a
        className="oa-nav__mark pulse-hover"
        href="#chapter-hero"
        aria-label="BoxCutter"
      >
        <span className="oa-nav__lockup">
          <BoxCutterLogo className="oa-nav__icon" />
          <span className="oa-nav__word">
            <span className="oa-nav__word-a">box</span>
            <svg
              className="oa-nav__word-crack"
              viewBox="0 0 10 24"
              aria-hidden="true"
            >
              <path
                d="M5 0 L8 6 L2 10 L9 16 L4 24"
                fill="none"
                stroke="var(--sc-accent)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="oa-nav__word-b">Cutter</span>
          </span>
        </span>
        <TerminalLine text="think outside the box" className="oa-nav__tagline" />
      </a>
      <span className="oa-nav__folio" aria-live="polite">
        {active}
      </span>
    </nav>
  );
}
