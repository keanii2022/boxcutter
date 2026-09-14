"use client";

import { useEffect, useRef, useState } from "react";
import { STORY_STEPS } from "../lib/content";

/**
 * The signature move: a fixed to-do list that watches the Services chapter's
 * own --sc-p (published by the engine on its act element) and checks off a
 * real story step as the reader passes it. It rides quietly through About
 * and GitHub, then totals up in Contact. Bespoke JS reading --sc-p, per
 * uniqueness.md §3 — no engine edit, no kit device.
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
    const servicesEl = document.getElementById("chapter-services");
    const contactEl = document.getElementById("chapter-contact");
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
      setVisible(servicesP > 0);

      setChecked((prev) => {
        let changed = false;
        const next = prev.map((was, i) => {
          const threshold =
            STORY_STEPS[i].cueFrom +
            (STORY_STEPS[i].cueTo - STORY_STEPS[i].cueFrom) * 0.5;
          const now = servicesP >= threshold;
          if (now !== was) changed = true;
          return now;
        });
        return changed ? next : prev;
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
            <span className="todo__strike">{step.label}</span>
            <span className="todo__handled">done</span>
          </li>
        ))}
      </ul>
      <p className="todo__total">
        {total} {total === 1 ? "step" : "steps"} checked off. One conversation.
      </p>
    </aside>
  );
}
