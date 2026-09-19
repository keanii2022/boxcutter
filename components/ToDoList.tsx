"use client";

import { useEffect, useRef, useState } from "react";
import { STORY_STEPS } from "../lib/content";

/**
 * The signature move: a fixed to-do list that checks off as the reader
 * physically arrives at each milestone — not as a reward for interacting
 * with something unrelated (this used to check "Idea" off from opening a
 * carousel card, which had nothing to do with what "Idea" represents).
 *
 *   Idea          — Bridge's scrub video (the lightbulb-passing clip) has
 *                   scrolled fully past, i.e. it's played to its last frame.
 *   Box Cutter SF — the Services chapter (intro + the dropdown cards) has
 *                   scrolled fully past.
 *   Execute       — the Book a call CTA in Contact has entered view.
 *
 * Visibility/expansion still watch the Services chapter's own --sc-p
 * (published by the engine on its act element). Bespoke JS, no engine edit,
 * no kit device, per uniqueness.md §3.
 */
export default function ToDoList() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    STORY_STEPS.map(() => false)
  );
  const [visible, setVisible] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const bridgeEl = document.getElementById("chapter-bridge");
    const servicesEl = document.getElementById("chapter-services");
    const contactEl = document.getElementById("chapter-contact");
    const ctaEl = document.getElementById("contact-cta");
    if (!servicesEl) return;

    // Full detail only while Services (building the list) is on screen —
    // that section already reserves room for this panel (TaskMarquee's own
    // `right: 24rem` clearance). Contact stays in the minimised, single-
    // line form the rest of the page already uses: at typical viewport
    // heights this panel's full (expanded) height doesn't fit any gap in
    // Contact's own copy or its social-proof video without overlapping
    // one of them, in either corner. The minimised badge is short enough
    // to clear both, and still shows the final tally in Contact.
    // A pinned section's own box extends a viewport before and after its
    // pin, per devices.md's "clip time is not cue time" note, so plain
    // isIntersecting stays true well into the next chapter's own content.
    // Gate on the viewport's centre line instead, same fix as Nav's folio.
    const onScreen = new Set<Element>();
    const expandObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onScreen.add(e.target);
          else onScreen.delete(e.target);
        });
        setExpanded(onScreen.has(servicesEl));
      },
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );
    expandObserver.observe(servicesEl);

    const readP = (el: Element) => {
      const raw = getComputedStyle(el).getPropertyValue("--sc-p").trim();
      const p = parseFloat(raw);
      return Number.isFinite(p) ? p : 0;
    };

    const tick = () => {
      const servicesP = readP(servicesEl);
      // >0 fires the instant Services' box starts entering the viewport —
      // which, for a section right after a pinned scrub act, is a full
      // viewport before its own content is actually on screen (the scrub
      // stage takes that long to slide away). Wait for real content.
      setVisible(servicesP > 0.08);

      // A section's own bottom edge scrolling past the top of the viewport
      // is the same moment as a pinned act's clip finishing its full
      // on-screen life (Bridge has no exit slide left once its box has
      // cleared the viewport) or a flow act's raw progress hitting 1 — both
      // just "has this element's box gone by".
      const bridgeDone = !bridgeEl || bridgeEl.getBoundingClientRect().bottom <= 0;
      const servicesDone = servicesP >= 0.999;
      const ctaReached = !!ctaEl && ctaEl.getBoundingClientRect().top < innerHeight;

      setChecked((prev) => {
        const next = [prev[0] || bridgeDone, prev[1] || servicesDone, prev[2] || ctaReached];
        return next[0] === prev[0] && next[1] === prev[1] && next[2] === prev[2]
          ? prev
          : next;
      });

      if (contactEl) {
        const contactP = readP(contactEl);
        setFinalized(contactP >= 0.5);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      expandObserver.disconnect();
    };
  }, []);

  const total = checked.filter(Boolean).length;

  return (
    <aside
      className={`todo${visible ? " todo--visible" : ""}${
        finalized ? " todo--final" : ""
      }${expanded ? " todo--expanded" : ""}`}
      aria-live="polite"
      aria-label="Running list of steps from idea to client"
    >
      <p className="todo__label">the to-do list</p>
      <ul className="todo__list">
        {STORY_STEPS.map((step, i) => (
          <li
            key={step.label}
            className={`todo__line${checked[i] ? " todo__line--done" : ""}`}
          >
            <span className="todo__strike">{step.todoLabel}</span>
            <span className="todo__handled">done</span>
          </li>
        ))}
      </ul>
      <p className="todo__total">
        {total} {total === 1 ? "step" : "steps"}, one conversation.
      </p>
    </aside>
  );
}
