"use client";

import { useEffect, useRef, useState } from "react";
import { ESTIMATOR_TRIGGER_COPY } from "../lib/content";
import CostEstimator from "./CostEstimator";

/**
 * The Services-section estimator entry point (PLAN.md Step 25): a trigger
 * that opens an attached modal rather than a new top-level chapter or a
 * separate /pricing route — the estimator should cost no scroll real estate.
 * This component owns its own open/close state, same self-contained pattern
 * as ServicesCarousel's toggle. The panel is chrome only — CostEstimator
 * (Step 26) supplies the actual controls and running total.
 */
export default function CostEstimatorModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    // Lock background scroll while the modal is up — it's attached to the
    // page, not a new route, so nothing else stops the page scrolling under it.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" className="estimator-trigger" onClick={() => setOpen(true)}>
        {ESTIMATOR_TRIGGER_COPY}
      </button>
      {open && (
        <div
          className="estimator-modal__overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="estimator-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="estimator-modal-title"
          >
            <button
              type="button"
              ref={closeRef}
              className="estimator-modal__close"
              onClick={() => setOpen(false)}
              aria-label="Close cost estimator"
            >
              ×
            </button>
            <p className="sc-label">cost estimator</p>
            <h2 id="estimator-modal-title" className="estimator-modal__title">
              Rough numbers, no pressure
            </h2>
            <CostEstimator />
          </div>
        </div>
      )}
    </>
  );
}
