"use client";

import {
  MOBILE_UX_ADDON,
  SOLUTION_TRAINING,
  CREDIT_PACKS,
  SETUP_TIERS,
  MANAGEMENT_TIERS,
  MOBILE_UX_PRICE,
  money,
  useCostEstimator,
} from "../lib/useCostEstimator";
import { ChoicePill, ToggleRow, RangeSlider } from "./EstimatorControls";

type DiagramActive = {
  setup: boolean;
  mobileUX: boolean;
  management: boolean;
  credits: boolean;
  training: boolean;
};

const NODES: { key: keyof DiagramActive; label: string; x: number; y: number }[] = [
  { key: "setup", label: "Setup", x: 40, y: 24 },
  { key: "mobileUX", label: "Mobile UX", x: 40, y: 76 },
  { key: "management", label: "Management", x: 40, y: 128 },
  { key: "credits", label: "Credits", x: 40, y: 180 },
  { key: "training", label: "Training", x: 40, y: 232 },
];
const HUB = { x: 300, y: 128 };

function wirePath(x: number, y: number) {
  return `M ${x + 16} ${y} Q ${(x + HUB.x) / 2} ${y} ${HUB.x - 22} ${HUB.y}`;
}

/**
 * The estimator's own node diagram — a live echo of which of the five
 * offerings below are switched on, not a control surface itself (every
 * input is a real HTML form control underneath). Wires to active nodes
 * carry a travelling pulse dot, same offset-path idiom as Bridge.tsx, and
 * respect prefers-reduced-motion the same way (frozen mid-path, in CSS only).
 * Desktop-only: this needs the horizontal room a phone screen doesn't have —
 * the mobile wizard (Step 32) uses a compact progress spine instead.
 */
function EstimatorDiagram({ active }: { active: DiagramActive }) {
  const activeNodes = NODES.filter((n) => active[n.key]);
  const activeCount = activeNodes.length;

  return (
    <div
      className="cost-estimator__diagram"
      role="img"
      aria-label={`Estimator diagram: ${activeCount} of ${NODES.length} services selected`}
    >
      <svg viewBox="0 0 340 256" className="cost-estimator__diagram-svg" aria-hidden="true">
        {NODES.map((n) => (
          <path
            key={`wire-${n.key}`}
            className={`cost-estimator__wire${active[n.key] ? " cost-estimator__wire--active" : ""}`}
            d={wirePath(n.x, n.y)}
          />
        ))}
        {activeNodes.map((n) => (
          <circle
            key={`pulse-${n.key}`}
            r="3.5"
            className="cost-estimator__pulse"
            style={{ offsetPath: `path("${wirePath(n.x, n.y)}")` }}
          />
        ))}
        {NODES.map((n) => (
          <g
            key={n.key}
            className={`cost-estimator__node${active[n.key] ? " cost-estimator__node--active" : ""}`}
          >
            <circle cx={n.x} cy={n.y} r="13" />
            <text x={n.x} y={n.y + 27}>
              {n.label}
            </text>
          </g>
        ))}
        <g className={`cost-estimator__hub${activeCount > 0 ? " cost-estimator__hub--active" : ""}`}>
          <circle cx={HUB.x} cy={HUB.y} r="27" />
          <text x={HUB.x} y={HUB.y + 5}>
            Total
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Mounted inside CostEstimatorModal's shell (PLAN.md Step 26). Every
 * control maps to a real BoxCutter offering from Step 23 — this produces a
 * rough running total, not a quote, and nothing here locks a client into
 * anything or takes a payment (that's explicitly out of scope until token
 * demand is proven). State/price math lives in useCostEstimator so this
 * can't drift out of sync with the mobile wizard (Step 32).
 */
export default function CostEstimator() {
  const est = useCostEstimator();

  return (
    <div className="cost-estimator">
      <EstimatorDiagram
        active={{
          setup: est.setup !== "none",
          mobileUX: est.mobileUX,
          management: est.management !== "none",
          credits: est.creditsOn,
          training: est.trainingOn,
        }}
      />

      <fieldset className="cost-estimator__group">
        <legend>One-time setup</legend>
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
              id="estimator-setup-range"
              min={SETUP_TIERS[est.setup].min}
              max={SETUP_TIERS[est.setup].max}
              value={est.setupValue}
              onChange={est.setSetupValue}
            />
          </>
        )}
      </fieldset>

      <fieldset className="cost-estimator__group">
        <legend>{MOBILE_UX_ADDON.label}</legend>
        <ToggleRow
          label={`Add it on (+${money(MOBILE_UX_PRICE)})`}
          checked={est.mobileUX}
          onChange={est.setMobileUX}
        />
        <p className="cost-estimator__note">{MOBILE_UX_ADDON.description}</p>
      </fieldset>

      <fieldset className="cost-estimator__group">
        <legend>Monthly management</legend>
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
              id="estimator-management-range"
              min={MANAGEMENT_TIERS[est.management].min}
              max={MANAGEMENT_TIERS[est.management].max}
              value={est.managementValue}
              onChange={est.setManagementValue}
            />
          </>
        )}
      </fieldset>

      <fieldset className="cost-estimator__group">
        <legend>Credits</legend>
        <ToggleRow label="Add a credit pack" checked={est.creditsOn} onChange={est.setCreditsOn} />
        {est.creditsOn && (
          <div className="cost-estimator__select-row">
            <label className="cost-estimator__select-label" htmlFor="estimator-credit-pack">
              Pack
            </label>
            <select
              id="estimator-credit-pack"
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

      <fieldset className="cost-estimator__group">
        <legend>{SOLUTION_TRAINING.label}</legend>
        <ToggleRow
          label={`Add it on (${SOLUTION_TRAINING.price})`}
          checked={est.trainingOn}
          onChange={est.setTrainingOn}
        />
        <p className="cost-estimator__note">{SOLUTION_TRAINING.description}</p>
      </fieldset>

      <div
        className={`cost-estimator__summary${est.tooMany ? " cost-estimator__summary--warn" : ""}`}
      >
        <div className="cost-estimator__totals">
          <div className="cost-estimator__stat">
            <span className="cost-estimator__stat-value">{money(est.oneTime)}</span>
            <span className="cost-estimator__stat-label">one-time</span>
          </div>
          {est.monthly > 0 && (
            <div className="cost-estimator__stat">
              <span className="cost-estimator__stat-value">{money(est.monthly)}</span>
              <span className="cost-estimator__stat-label">/ month</span>
            </div>
          )}
        </div>
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
      </div>
    </div>
  );
}
