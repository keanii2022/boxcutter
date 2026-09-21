"use client";

import { useEffect, useRef, useState } from "react";
import { ESTIMATOR_TRIGGER_COPY } from "../../lib/content";
import MobileCostEstimator from "./CostEstimator";

/**
 * Mobile entry point for the Cost Estimator (PLAN.md Step 32). Desktop's
 * CostEstimatorModal opens a centered overlay panel — on a phone that just
 * crams the same crowded content into a smaller box. This opens a genuine
 * full-screen screen instead, matching the step-wizard content it hosts.
 */
export default function MobileCostEstimatorModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

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
          className="m-estimator-screen"
          role="dialog"
          aria-modal="true"
          aria-labelledby="m-estimator-title"
        >
          <div className="m-estimator-screen__header">
            <div>
              <p className="sc-label">cost estimator</p>
              <h2 id="m-estimator-title" className="m-estimator-screen__title">
                Rough numbers, no pressure
              </h2>
            </div>
            <button
              type="button"
              ref={closeRef}
              className="m-estimator-screen__close"
              onClick={() => setOpen(false)}
              aria-label="Close cost estimator"
            >
              ×
            </button>
          </div>
          <MobileCostEstimator onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
