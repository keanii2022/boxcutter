"use client";

import { useState } from "react";
import { BOOKING_URL } from "../../lib/content";
import {
  MOBILE_UX_ADDON,
  SOLUTION_TRAINING,
  CREDIT_PACKS,
  SETUP_TIERS,
  MANAGEMENT_TIERS,
  MOBILE_UX_PRICE,
  money,
  useCostEstimator,
} from "../../lib/useCostEstimator";
import { ChoicePill, ToggleRow, RangeSlider } from "../EstimatorControls";

const STEP_LABELS = ["Setup", "Mobile UX", "Management", "Credits", "Training", "Total"];
const LAST_STEP = STEP_LABELS.length - 1;

/**
 * Mobile Cost Estimator (PLAN.md Step 32): the desktop panel's five
 * fieldsets plus a decorative node diagram don't work stacked in a modal
 * that also has to coexist with page scroll — a slider's drag gesture and
 * the page's vertical scroll gesture fight over the same input. Rebuilt as
 * a full-screen step wizard instead: one decision per screen, a compact
 * progress spine standing in for the desktop diagram, and a sticky running
 * total so the number is never more than a glance away. State/price math
 * comes from useCostEstimator, shared with the desktop panel so the two
 * surfaces can't quote different totals for the same selections.
 */
export default function MobileCostEstimator({ onClose }: { onClose: () => void }) {
  const est = useCostEstimator();
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, LAST_STEP));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="m-estimator">
      <div
        className="m-estimator__spine"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEP_LABELS.length}
        aria-valuenow={step + 1}
        aria-label={`Step ${step + 1} of ${STEP_LABELS.length}: ${STEP_LABELS[step]}`}
      >
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={`m-estimator__dot${i === step ? " m-estimator__dot--active" : ""}${
              i < step ? " m-estimator__dot--done" : ""
            }`}
          />
        ))}
      </div>

      <div className="m-estimator__body">
        {step === 0 && (
          <fieldset className="cost-estimator__group m-estimator__step">
            <legend className="m-estimator__legend">One-time setup</legend>
            <div className="cost-estimator__pills" role="radiogroup" aria-label="One-time setup">
              <ChoicePill
                label="None"
                active={est.setup === "none"}
                onClick={() => est.chooseSetup("none")}
              />
              <ChoicePill
                label={SETUP_TIERS.starter.label}
                active={est.setup === "starter"}
                onClick={() => est.chooseSetup("starter")}
              />
              <ChoicePill
                label={SETUP_TIERS.fullLaunch.label}
                active={est.setup === "fullLaunch"}
                onClick={() => est.chooseSetup("fullLaunch")}
              />
            </div>
            {est.setup !== "none" && (
              <>
                <p className="cost-estimator__note">{SETUP_TIERS[est.setup].description}</p>
                <RangeSlider
                  id="m-estimator-setup-range"
                  min={SETUP_TIERS[est.setup].min}
                  max={SETUP_TIERS[est.setup].max}
                  value={est.setupValue}
                  onChange={est.setSetupValue}
                />
              </>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="cost-estimator__group m-estimator__step">
            <legend className="m-estimator__legend">{MOBILE_UX_ADDON.label}</legend>
            <ToggleRow
              label={`Add it on (+${money(MOBILE_UX_PRICE)})`}
              checked={est.mobileUX}
              onChange={est.setMobileUX}
            />
            <p className="cost-estimator__note">{MOBILE_UX_ADDON.description}</p>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="cost-estimator__group m-estimator__step">
            <legend className="m-estimator__legend">Monthly management</legend>
            <div
              className="cost-estimator__pills"
              role="radiogroup"
              aria-label="Monthly management"
            >
              <ChoicePill
                label="None"
                active={est.management === "none"}
                onClick={() => est.chooseManagement("none")}
              />
              <ChoicePill
                label={MANAGEMENT_TIERS.general.label}
                active={est.management === "general"}
                onClick={() => est.chooseManagement("general")}
              />
              {est.setup === "fullLaunch" && (
                <ChoicePill
                  label={MANAGEMENT_TIERS.fullLaunchMgmt.label}
                  active={est.management === "fullLaunchMgmt"}
                  onClick={() => est.chooseManagement("fullLaunchMgmt")}
                />
              )}
            </div>
            {est.management !== "none" && (
              <>
                <p className="cost-estimator__note">
                  {MANAGEMENT_TIERS[est.management].description}
                </p>
                <RangeSlider
                  id="m-estimator-management-range"
                  min={MANAGEMENT_TIERS[est.management].min}
                  max={MANAGEMENT_TIERS[est.management].max}
                  value={est.managementValue}
                  onChange={est.setManagementValue}
                />
              </>
            )}
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="cost-estimator__group m-estimator__step">
            <legend className="m-estimator__legend">Credits</legend>
            <ToggleRow
              label="Add a credit pack"
              checked={est.creditsOn}
              onChange={est.setCreditsOn}
            />
            {est.creditsOn && (
              <div className="cost-estimator__select-row">
                <label className="cost-estimator__select-label" htmlFor="m-estimator-credit-pack">
                  Pack
                </label>
                <select
                  id="m-estimator-credit-pack"
                  className="cost-estimator__select"
                  value={est.creditPackIndex}
                  onChange={(e) => est.setCreditPackIndex(Number(e.target.value))}
                >
                  {CREDIT_PACKS.map((p, i) => (
                    <option key={p.price} value={i}>
                      {p.price} → {p.credits + (p.bonus ?? 0)} credits
                      {p.bonus ? ` (${p.bonus} bonus)` : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className="cost-estimator__group m-estimator__step">
            <legend className="m-estimator__legend">{SOLUTION_TRAINING.label}</legend>
            <ToggleRow
              label={`Add it on (${SOLUTION_TRAINING.price})`}
              checked={est.trainingOn}
              onChange={est.setTrainingOn}
            />
            <p className="cost-estimator__note">{SOLUTION_TRAINING.description}</p>
          </fieldset>
        )}

        {step === 5 && (
          <div className="m-estimator__step m-estimator__summary">
            {est.tooMany ? (
              <p className="cost-estimator__warning">
                You may be including services you may not need — @boxcutter, we&rsquo;re all
                about efficiency.
              </p>
            ) : (
              <p className="cost-estimator__disclaimer">
                A rough estimate, not a bill — it can change, and whatever you choose, you get
                the solution you actually need.
              </p>
            )}
            <a
              className="m-estimator__cta"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call →
            </a>
          </div>
        )}
      </div>

      <div className="m-estimator__footer">
        <div className="m-estimator__total">
          <span className="m-estimator__total-value">{money(est.oneTime)}</span>
          <span className="m-estimator__total-label">one-time</span>
          {est.monthly > 0 && (
            <>
              <span className="m-estimator__total-value">{money(est.monthly)}</span>
              <span className="m-estimator__total-label">/ month</span>
            </>
          )}
        </div>
        <div className="m-estimator__nav">
          {step > 0 && (
            <button type="button" className="m-estimator__back" onClick={back}>
              Back
            </button>
          )}
          {step < LAST_STEP ? (
            <button type="button" className="m-estimator__next" onClick={next}>
              Next
            </button>
          ) : (
            <button type="button" className="m-estimator__next" onClick={onClose}>
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
