"use client";

import { useEffect, useRef, useState } from "react";
import BoxCutterLogo from "../BoxCutterLogo";
import { BOOKING_URL } from "../../lib/content";

const CHAPTERS: { id: string; label: string }[] = [
  { id: "chapter-hero", label: "" },
  { id: "chapter-services", label: "Services" },
  { id: "chapter-about", label: "About" },
  { id: "chapter-github", label: "GitHub" },
  { id: "chapter-contact", label: "Contact" },
];

/**
 * Mobile counterpart to Nav.tsx's Token$ button (PLAN.md Step 27) — same
 * coming-soon popup, but anchored upward: the trigger lives in a
 * bottom-fixed bar here, so a popup opening downward (the desktop
 * version's behavior) would render off-screen below the viewport.
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
    <span className="m-nav-bottom__token-wrap" ref={wrapRef}>
      <button
        type="button"
        className="m-nav-bottom__token"
        aria-expanded={open}
        aria-label="Token marketplace — coming soon"
        onClick={() => setOpen((o) => !o)}
      >
        Token$
      </button>
      {open && (
        <span className="m-nav-bottom__token-popup" role="status">
          Coming soon :)
        </span>
      )}
    </span>
  );
}

/**
 * Mobile-composed nav (PLAN.md Step 30). Desktop's single fixed bar mixes
 * two different roles — brand identity/chapter status, and the two tap
 * actions ("Book a call", "Token$") — that don't compete for the same
 * space once thumb reach is the constraint. Split by position instead of
 * squeezed into one strip: brand + chapter folio stay in a slim top bar
 * (nothing there needs a thumb, so it costs no reach), while both actions
 * move to a bottom bar sized for comfortable one-handed tapping. Reuses
 * Nav.tsx's exact brand-mark markup/classes (`.oa-nav__lockup*`,
 * `.oa-nav__word*`) so the logo/wordmark styling stays a single source of
 * truth — only the surrounding bar layout is mobile-specific. Drops the
 * typing tagline that desktop's `.oa-nav__mark` carries: on a phone-width
 * top bar it's one more thing competing with the folio for a single row,
 * and the hero immediately below already carries the brand's voice.
 */
export default function MobileNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;

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
    <>
      <nav className="oa-nav m-nav-top" aria-label="Brand">
        <div className="oa-nav__mark">
          <a
            className="oa-nav__lockup-link"
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
        </div>
        <span className="oa-nav__folio" aria-live="polite">
          {active}
        </span>
      </nav>
      <nav className="m-nav-bottom" aria-label="Primary actions">
        <a
          className="m-nav-bottom__cta"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call
        </a>
        <TokenButton />
      </nav>
    </>
  );
}
