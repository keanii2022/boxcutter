"use client";

import { useState } from "react";
import {
  STARTER_TIER,
  FULL_LAUNCH_TIER,
  MOBILE_UX_ADDON,
  FULL_LAUNCH_MANAGEMENT,
  GENERAL_MANAGEMENT,
  SOLUTION_TRAINING,
  CREDIT_PACKS,
} from "../lib/content";

// Slider bounds — mirror the price-range strings already in lib/content.ts
// (e.g. STARTER_TIER.price === "$150–$300"). Kept as plain numbers here
// since that field is display copy, not something to parse at runtime.
const SETUP_TIERS = {
  starter: { ...STARTER_TIER, min: 150, max: 300 },
  fullLaunch: { ...FULL_LAUNCH_TIER, min: 400, max: 800 },
} as const;
type SetupChoice = "none" | keyof typeof SETUP_TIERS;

const MANAGEMENT_TIERS = {
  general: { ...GENERAL_MANAGEMENT, min: 80, max: 300 },
  fullLaunchMgmt: { ...FULL_LAUNCH_MANAGEMENT, min: 100, max: 300 },
} as const;
type ManagementChoice = "none" | keyof typeof MANAGEMENT_TIERS;

const MOBILE_UX_PRICE = 60; // mirrors MOBILE_UX_ADDON.price
const TRAINING_PRICE = 200; // mirrors SOLUTION_TRAINING.price

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

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

function ChoicePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`cost-estimator__pill${active ? " cost-estimator__pill--active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="cost-estimator__toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function RangeSlider({
  id,
  min,
  max,
  value,
  onChange,
}: {
  id: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="cost-estimator__slider">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        aria-valuetext={money(value)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output htmlFor={id}>{money(value)}</output>
    </div>
  );
}

/**
 * Mounted inside CostEstimatorModal's shell (PLAN.md Step 26). Every
 * control maps to a real BoxCutter offering from Step 23 — this produces a
 * rough running total, not a quote, and nothing here locks a client into
 * anything or takes a payment (that's explicitly out of scope until token
 * demand is proven).
 */
export default function CostEstimator() {
  const [setup, setSetupState] = useState<SetupChoice>("none");
  const [setupValue, setSetupValue] = useState<number>(SETUP_TIERS.starter.min);
  const [mobileUX, setMobileUX] = useState(false);
  const [management, setManagementState] = useState<ManagementChoice>("none");
  const [managementValue, setManagementValue] = useState<number>(MANAGEMENT_TIERS.general.min);
  const [creditsOn, setCreditsOn] = useState(false);
  const [creditPackIndex, setCreditPackIndex] = useState(0);
  const [trainingOn, setTrainingOn] = useState(false);

  function chooseSetup(next: SetupChoice) {
    setSetupState(next);
    if (next !== "none") setSetupValue(SETUP_TIERS[next].min);
    // Full Launch Management is exclusive to Full Launch buyers — drop it
    // the moment Full Launch stops being the selected setup tier.
    if (next !== "fullLaunch" && management === "fullLaunchMgmt") {
      setManagementState("none");
    }
  }

  function chooseManagement(next: ManagementChoice) {
    setManagementState(next);
    if (next !== "none") setManagementValue(MANAGEMENT_TIERS[next].min);
  }

  const setupCost = setup === "none" ? 0 : setupValue;
  const managementCost = management === "none" ? 0 : managementValue;
  const mobileUXCost = mobileUX ? MOBILE_UX_PRICE : 0;
  const pack = CREDIT_PACKS[creditPackIndex];
  const creditsCost = creditsOn ? Number(pack.price.slice(1)) : 0;
  const trainingCost = trainingOn ? TRAINING_PRICE : 0;

  const oneTime = setupCost + mobileUXCost + creditsCost + trainingCost;
  const monthly = managementCost;

  // "Too many" isn't about the setup tier (almost everyone picks one) — it's
  // about stacking every optional add-on at once.
  const addOnCount = [mobileUX, management !== "none", creditsOn, trainingOn].filter(
    Boolean
  ).length;
  const tooMany = addOnCount >= 3;

  return (
    <div className="cost-estimator">
      <EstimatorDiagram
        active={{
          setup: setup !== "none",
          mobileUX,
          management: management !== "none",
          credits: creditsOn,
          training: trainingOn,
        }}
      />

      <fieldset className="cost-estimator__group">
        <legend>One-time setup</legend>
        <div className="cost-estimator__pills" role="radiogroup" aria-label="One-time setup">
          <ChoicePill label="None" active={setup === "none"} onClick={() => chooseSetup("none")} />
          <ChoicePill
            label={SETUP_TIERS.starter.label}
            active={setup === "starter"}
            onClick={() => chooseSetup("starter")}
          />
          <ChoicePill
            label={SETUP_TIERS.fullLaunch.label}
            active={setup === "fullLaunch"}
            onClick={() => chooseSetup("fullLaunch")}
          />
        </div>
        {setup !== "none" && (
          <>
            <p className="cost-estimator__note">{SETUP_TIERS[setup].description}</p>
            <RangeSlider
              id="estimator-setup-range"
              min={SETUP_TIERS[setup].min}
              max={SETUP_TIERS[setup].max}
              value={setupValue}
              onChange={setSetupValue}
            />
          </>
        )}
      </fieldset>

      <fieldset className="cost-estimator__group">
        <legend>{MOBILE_UX_ADDON.label}</legend>
        <ToggleRow
          label={`Add it on (+${money(MOBILE_UX_PRICE)})`}
          checked={mobileUX}
          onChange={setMobileUX}
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
            active={management === "none"}
            onClick={() => chooseManagement("none")}
          />
          <ChoicePill
            label={MANAGEMENT_TIERS.general.label}
            active={management === "general"}
            onClick={() => chooseManagement("general")}
          />
          {setup === "fullLaunch" && (
            <ChoicePill
              label={MANAGEMENT_TIERS.fullLaunchMgmt.label}
              active={management === "fullLaunchMgmt"}
              onClick={() => chooseManagement("fullLaunchMgmt")}
            />
          )}
        </div>
        {management !== "none" && (
          <>
            <p className="cost-estimator__note">{MANAGEMENT_TIERS[management].description}</p>
            <RangeSlider
              id="estimator-management-range"
              min={MANAGEMENT_TIERS[management].min}
              max={MANAGEMENT_TIERS[management].max}
              value={managementValue}
              onChange={setManagementValue}
            />
          </>
        )}
      </fieldset>

      <fieldset className="cost-estimator__group">
        <legend>Credits</legend>
        <ToggleRow label="Add a credit pack" checked={creditsOn} onChange={setCreditsOn} />
        {creditsOn && (
          <div className="cost-estimator__select-row">
            <label className="cost-estimator__select-label" htmlFor="estimator-credit-pack">
              Pack
            </label>
            <select
              id="estimator-credit-pack"
              className="cost-estimator__select"
              value={creditPackIndex}
              onChange={(e) => setCreditPackIndex(Number(e.target.value))}
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
          checked={trainingOn}
          onChange={setTrainingOn}
        />
        <p className="cost-estimator__note">{SOLUTION_TRAINING.description}</p>
      </fieldset>

      <div
        className={`cost-estimator__summary${tooMany ? " cost-estimator__summary--warn" : ""}`}
      >
        <div className="cost-estimator__totals">
          <div className="cost-estimator__stat">
            <span className="cost-estimator__stat-value">{money(oneTime)}</span>
            <span className="cost-estimator__stat-label">one-time</span>
          </div>
          {monthly > 0 && (
            <div className="cost-estimator__stat">
              <span className="cost-estimator__stat-value">{money(monthly)}</span>
              <span className="cost-estimator__stat-label">/ month</span>
            </div>
          )}
        </div>
        {tooMany ? (
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
