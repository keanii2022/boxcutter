"use client";

import { useEffect, useState } from "react";

const CHAPTERS: { id: string; label: string }[] = [
  { id: "chapter-hero", label: "" },
  { id: "chapter-services", label: "Services" },
  { id: "chapter-about", label: "About" },
  { id: "chapter-portfolio", label: "Portfolio" },
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
      <a className="oa-nav__mark" href="#chapter-hero">
        <span className="oa-nav__bracket">[</span>
        outside.ai
        <span className="oa-nav__bracket">]</span>
      </a>
      <span className="oa-nav__folio" aria-live="polite">
        {active}
      </span>
    </nav>
  );
}
