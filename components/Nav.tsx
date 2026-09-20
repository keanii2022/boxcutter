"use client";

import { useEffect, useRef, useState } from "react";
import BoxCutterLogo from "./BoxCutterLogo";
import TerminalLine from "./TerminalLine";
import { BOOKING_URL } from "../lib/content";

const CHAPTERS: { id: string; label: string }[] = [
  { id: "chapter-hero", label: "" },
  { id: "chapter-services", label: "Services" },
  { id: "chapter-about", label: "About" },
  { id: "chapter-github", label: "GitHub" },
  { id: "chapter-contact", label: "Contact" },
];

/**
 * Nav's second CTA (PLAN.md Step 27): the token/credit marketplace's entry
 * point, live before the marketplace itself is — just a "coming soon" note
 * for now, no purchase flow and no link out to the estimator or a checkout.
 * Green fill (`--oa-green`/`--oa-green-ink`), not the orange `.oa-nav__cta`
 * treatment, so it reads as a distinct, secondary action next to "Book a
 * call" rather than a second copy of the primary CTA.
 */
function TokenButton() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClickAway = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, [open]);

  return (
    <span className="oa-nav__token-wrap" ref={wrapRef}>
      <button
        type="button"
        className="oa-nav__token pulse-hover"
        aria-expanded={open}
        aria-label="Token marketplace — coming soon"
        onClick={() => setOpen((o) => !o)}
      >
        Token$
      </button>
      {open && (
        <span className="oa-nav__token-popup" role="status">
          Coming soon :)
        </span>
      )}
    </span>
  );
}

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
      <div className="oa-nav__mark">
        <a
          className="oa-nav__lockup-link pulse-hover"
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
        </a>
        {/* Outside the link on purpose: this is a looping typing animation
            (see TerminalLine), so its visible text never holds still long
            enough to match any static aria-label on a wrapping link —
            axe's label-content-name-mismatch check compares against
            whatever's on screen at that instant, aria-hidden or not. */}
        <TerminalLine text="think outside the box" className="oa-nav__tagline" />
      </div>
      <span className="oa-nav__right">
        <a
          className="oa-nav__cta pulse-hover"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call
        </a>
        <TokenButton />
        <span className="oa-nav__folio" aria-live="polite">
          {active}
        </span>
      </span>
    </nav>
  );
}
