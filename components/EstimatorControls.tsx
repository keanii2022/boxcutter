"use client";

import { money } from "../lib/useCostEstimator";

// Small, viewport-agnostic form atoms shared between the desktop Cost
// Estimator panel and the mobile step wizard (PLAN.md Steps 26, 32) — same
// markup/behavior either way, only the surrounding layout differs.

export function ChoicePill({
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

export function ToggleRow({
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

export function RangeSlider({
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
